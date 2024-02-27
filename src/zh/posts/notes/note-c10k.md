---
title: C10K 问题：单机一万并发
date: 2023-03-01 17:46:47
category: 札记
tags:
---

Dan Kegel 在他的个人网站中发表了一篇讨论单机并发的问题，简称 [C10K 问题](http://www.kegel.com/c10k.html)。

文章中提及了当时的问题背景，以及可供参考的网站[^1]和文章[^2]。关于这个问题文中主要对 I/O 架构和 I/O 策略进行了讨论。

[^1]: Nick Black's [Fast UNIX Servers](https://nick-black.com/dankwiki/index.php/Network_servers) page

[^2]: [Unix Network Programming: Networking Apis: Sockets and Xti(Volume 1)](http://www.amazon.com/exec/obidos/ASIN/013490012X/) by the late W.Richard Stevens.

    这本书描述了许多与高性能服务器相关的 I/O 策略和陷阱，甚至还讨论了 [‘thundering herd’ 问题](http://www.citi.umich.edu/projects/linux-scalability/reports/accept.html)。结合 [Jeff Darcy's notes on high-performance server design](http://pl.atyp.us/content/tech/servers.html) 去阅读。很遗憾，这个文章已经索引不到了。

<!-- more -->

## I/O 架构

列举了几种架构，我没有去详细了解，可能下面介绍的技术正在使用，或者已经被弃用了：

* ACE，一个重量级的 C++ I/O 框架，包含一些 I/O 策略的面向对象的实现和许多其他有用的东西。特别是，他的 Reactor 是一种执行非阻塞 I/O 的 OO 方式，而 Proactor 是执行异步 I/O 的 OO 方式。
* ASIO，一个 C++ I/O 框架，它正在成为 Boost 库的一部分。就像为 STL 时代更新的 ACE。
* libevent 是 Niels Provos 的轻量级 C I/O 框架。它支持 kqueue 和 select，很快就会支持 poll 和 epoll。Niels 有一张很好的处理一个事件的时间图，它是连接数的函数。它显示 kqueue 和 sys_epoll 是明显的赢家。

![](https://monkey.org/~provos/libevent/libevent-benchmark.jpg)

* 作者自己尝试了两个轻量级的框架，但是没有持续更新：
  * Poller 是一个轻量级的 C++ I/O 框架，它使用您想要的任何底层就绪 API（poll、select、/dev/poll、kqueue 或 sigio）来实现级别触发的就绪 API。它对于比较各种 [API 性能的基准测试](http://www.kegel.com/dkftpbench/Poller_bench.html)很有用。原文档链接到下面的 Poller 子类，以说明如何使用每个就绪 API。
  * rn 是一个轻量级的 C I/O 框架，是我继 Poller 之后的第二次尝试。它是 lgpl（因此更易于在商业应用程序中使用）和 C（因此更易于在非 C++ 应用程序中使用）。它被用于一些商业产品中。
* Matt Welsh 在 2000 年 4 月写了一篇关于在构建可伸缩服务器时如何平衡工作线程和事件驱动技术的使用的[论文](http://www.cs.berkeley.edu/~mdw/papers/events.pdf)。该论文描述了他的 Sandstorm I/O 框架的一部分。
* `Cory Nelson's Scale! library - an async socket, file, and pipe I/O library for Windows` 很遗憾，这个文章已经索引不到了。

## I/O 策略

文中提到了一些策略：

* 是否以及如何从单个线程发出多个 I/O 调用；
  * 否定了这个策略，全程使用阻塞/同步调用，可能使用多线程或多进程实现并发；
  * 使用非阻塞调用（例如设置为 O_NONBLOCK 的套接字上的 write()）来启动 I/O，并使用就绪通知（例如 poll() 或 /dev/poll）来了解何时可以在该通道上启动下一个 I/O .通常只能用于网络 I/O，不能用于磁盘 I/O；
  * 使用异步调用（例如 aio_write()）来启动 I/O，并使用完成通知（例如信号或完成端口）来了解 I/O 何时完成。适用于网络和磁盘 I/O。
* 如何控制为每个客户端服务的代码；
  * 每个客户端一个进程（经典的 Unix 方法，自 1980 年左右开始使用）；
  * 一个操作系统级线程处理多个客户端；每个客户都由以下策略控制：
    * 用户级线程（例如 GNU 状态线程、带有绿色线程的经典 Java）；
    * 状态机（有点深奥，但在某些圈子中很受欢迎；我的最爱）；
    * a continuation（有点深奥，但在某些圈子里很受欢迎）；
  * 每个客户端一个操作系统级别的线程（例如 Java）；
  * 每个活动客户端一个操作系统级线程（例如，带 apache 前端的 Tomcat；线程池）；
* 是使用标准的O/S服务，还是将一些代码放入内核。

着重讨论了五种受欢迎的组合：

1. 每个线程为多个客户端提供服务, 并且使用非阻塞 I/O 和 level-triggered 就绪通知
2. 每个线程为多个客户端提供服务, 并且使用非阻塞 I/O 和就绪更改通知
3. 每个服务器线程为多个客户端提供服务，并使用异步 I/O
4. 每个服务器线程为一个客户端提供服务，并使用阻塞 I/O
5. 将服务器代码构建到内核中

### 每个线程为多个客户端提供服务, 并且使用非阻塞 I/O 和 level-triggered 就绪通知

在所有网络句柄上设置非阻塞模式，并使用 select() 或 poll() 来判断哪个网络句柄有数据等待。这是使用比较多的方法。使用此方案，内核会告诉您文件描述符是否准备就绪，自上次内核告诉您以来您是否对该文件描述符进行过任何操作。（“level triggered”这个名字来源于计算机硬件设计；它与“边缘触发”相反。 Jonathon Lemon 在他[关于 kqueue() 的 BSDCON 2000 论文](https://people.freebsd.org/~jlemon/papers/kqueue.pdf)中介绍了这些术语。）

**注意：**特别重要的是要记住来自内核的就绪通知只是一个提示；当您尝试从中读取时，文件描述符可能不再准备就绪。这就是为什么在使用就绪通知时使用非阻塞模式很重要。

此方法的一个重要瓶颈是，如果页面此时不在核心中，则磁盘中的 read() 或 sendfile() 会阻塞；在磁盘文件句柄上设置非阻塞模式无效。内存映射磁盘文件也是如此。服务器第一次需要磁盘 I/O 时，它的进程会阻塞，所有客户端都必须等待，原始的非线程性能就白白浪费了。

这就是异步 I/O 的用途，但在缺少 AIO 的系统上，执行磁盘 I/O 的工作线程或进程也可以绕过这个瓶颈。一种方法是使用内存映射文件，如果 mincore() 指示需要 I/O，请求资源执行 I/O，并继续处理网络流量。

单个线程有几种方法可以判断一组非阻塞套接字中的哪些套接字已准备好进行 I/O：

* **The traditional select()**

  不幸的是，select() 仅限于 FD_SETSIZE 句柄。此限制被编译到标准库和用户程序中。 （某些版本的 C 库允许您在用户应用程序编译时提高此限制。）

  有关如何与其他就绪通知方案互换使用 select() 的示例，请参见 [Poller_select (cc, h)0)](http://www.kegel.com/dkftpbench/doc/Poller_select.html)。

* **The traditional poll()**
  
  poll() 可以处理的文件描述符的数量没有硬编码限制，但它确实会变慢大约几千个，因为大多数文件描述符在任何时候都是空闲的，并且扫描数千个文件描述符需要时间。

  一些操作系统（例如 Solaris 8）通过使用轮询提示等技术来加速 poll() 等，该技术由 Niels Provos 在 1999 年针对 Linux 实施和基准测试。

  有关如何将 poll() 与其他就绪通知方案互换使用的示例，请参见 [Poller_poll (cc, h, benchmarks)](http://www.kegel.com/dkftpbench/doc/Poller_poll.html)。

* **/dev/poll**

  这是推荐的 Solaris 轮询替代品。

  /dev/poll 背后的想法是利用 poll() 通常使用相同参数多次调用这一事实。

  使用 /dev/poll，您可以获得 /dev/poll 的打开句柄，并通过写入该句柄来告诉操作系统您对哪些文件感兴趣；从那时起，您只需从该句柄中读取当前就绪的文件描述符集即可。

  **注意：**在 Linux 上尝试了 /dev/poll 的各种实现，但没有一个表现得像 epoll 那样好，而且从未真正完成。不建议在 Linux 上使用 /dev/poll。

* **kqueue()**

  这是 FreeBSD（以及即将推出的 NetBSD）的推荐轮询替代品。

  See below. kqueue() can specify either edge triggering or level triggering.

### 每个线程为多个客户端提供服务, 并且使用非阻塞 I/O 和就绪更改通知
### 每个服务器线程为多个客户端提供服务，并使用异步 I/O
### 每个服务器线程为一个客户端提供服务，并使用阻塞 I/O
### 将服务器代码构建到内核中

> 内容过多，消化中...
