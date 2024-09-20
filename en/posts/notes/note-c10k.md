---
title: "C10K Problem: Handling 10,000 Concurrent Connections on a Single Machine"
date: 2023-03-01 17:46:47
category: Notes
tags:
---

Dan Kegel published an article on his personal website discussing the issue of handling concurrent connections on a single machine, known as the [C10K problem](http://www.kegel.com/c10k.html).

The article mentions the background of the problem at that time and refers to some websites[^1] and books[^2] for reference. The main focus of the article is on discussing I/O architecture and strategies.

[^1]: Nick Black's [Fast UNIX Servers](https://nick-black.com/dankwiki/index.php/Network_servers) page

[^2]: [Unix Network Programming: Networking Apis: Sockets and Xti(Volume 1)](http://www.amazon.com/exec/obidos/ASIN/013490012X/) by the late W.Richard Stevens.

    This book describes many I/O strategies and pitfalls related to high-performance servers and even discusses the ['thundering herd' problem](http://www.citi.umich.edu/projects/linux-scalability/reports/accept.html). Read it in conjunction with [Jeff Darcy's notes on high-performance server design](http://pl.atyp.us/content/tech/servers.html). Unfortunately, this article is no longer available.

<!-- more -->

## I/O Architecture

Various architectures are listed, and while I haven't delved into the details, the technologies introduced might be in use or obsolete:

* **ACE:** A heavyweight C++ I/O framework that includes object-oriented implementations of I/O strategies and many other useful features. In particular, its Reactor is an OO way to perform non-blocking I/O, and Proactor is an OO way to perform asynchronous I/O.
* **ASIO:** A C++ I/O framework that is becoming part of the Boost library. It's like an updated ACE for the STL era.
* **libevent:** A lightweight C I/O framework by Niels Provos. It supports kqueue and select and will soon support poll and epoll. Niels has a nice graph of the time taken to handle an event as a function of the number of connections. It shows kqueue and sys_epoll as clear winners.

![](https://monkey.org/~provos/libevent/libevent-benchmark.jpg)

* The author experimented with two lightweight frameworks, but they are not actively maintained:
  * **Poller:** A lightweight C++ I/O framework that uses any underlying readiness API you want (poll, select, /dev/poll, kqueue, or sigio) to implement level-triggered readiness API. It's useful for comparing the performance of various [APIs](http://www.kegel.com/dkftpbench/Poller_bench.html).
  * **rn:** A lightweight C I/O framework, the author's second attempt after Poller. It's LGPL (thus more suitable for commercial applications) and in C (thus easier to use in non-C++ applications). It has been used in some commercial products.
* In April 2000, Matt Welsh wrote a [paper](http://www.cs.berkeley.edu/~mdw/papers/events.pdf) on balancing the use of work threads and event-driven techniques when building scalable servers. The paper describes part of his Sandstorm I/O framework.
* `Cory Nelson's Scale! library - an async socket, file, and pipe I/O library for Windows`. Unfortunately, this article is no longer available.

## I/O Strategies

The article mentions several strategies:

* Whether and how to issue multiple I/O calls from a single thread;
  * Negating this strategy, using blocking/synchronous calls, possibly with multiple threads or processes for concurrency.
  * Using non-blocking calls (e.g., write() on a socket set to O_NONBLOCK) to initiate I/O and using readiness notifications (e.g., poll() or /dev/poll) to know when the next I/O can be initiated on that channel. Typically applicable only to network I/O, not disk I/O.
  * Using asynchronous calls (e.g., aio_write()) to initiate I/O and using completion notifications (e.g., signal or completion port) to know when I/O has completed. Applicable to both network and disk I/O.
* How to control the code that serves each client;
  * One process per client (the classic Unix method, used since around 1980);
  * One operating system-level thread serving multiple clients; each client is controlled by one of the following strategies:
    * User-level threads (e.g., GNU Portable Threads, classic Java with green threads);
    * State machines (a bit esoteric but popular in certain circles; my favorite);
    * A continuation (a bit esoteric but popular in certain circles);
  * One operating system-level thread per client (e.g., Java);
  * One operating system-level thread per active client (e.g., Tomcat with an Apache frontend; thread pool);
* Whether to use standard O/S services or put some code into the kernel.

The article focuses on discussing five popular combinations:

1. One thread serving multiple clients, using non-blocking I/O and level-triggered readiness notification.
2. One thread serving multiple clients, using non-blocking I/O and readiness change notification.
3. One server thread serving multiple clients, using asynchronous I/O.
4. One server thread serving one client, using blocking I/O.
5. Building server code into the kernel.

### One Thread Serving Multiple Clients, Using Non-blocking I/O and Level-triggered Readiness Notification

Set all network handles to non-blocking mode and use select() or poll() to determine which network handles have data waiting. This is a commonly used method. With this scheme, the kernel tells you which file descriptors are ready, whether you have done any operations on that file descriptor since the last time the kernel told you. ("Level triggered" comes from computer hardware design; it's the opposite of "edge-triggered." Jonathon Lemon introduced these terms in his [BSDCON 2000 paper about kqueue()](https://people.freebsd.org/~jlemon/papers/kqueue.pdf).)

**Note:** It's crucial to remember that readiness notifications from the kernel are just hints; the file descriptor may no longer be ready for the time you try to read from it. Hence, using non-blocking mode when using readiness notifications is essential.

A significant bottleneck of this method is that if the page is not in core when disk I/O (read() or sendfile()) is initiated, it will block; setting non-blocking mode on a disk file handle is ineffective. Memory-mapped disk files suffer from the same issue. When the server needs disk I/O for the first time, its process blocks, and all clients must wait, wasting the original non-threaded performance.

This is where asynchronous I/O comes into play, but on systems lacking AIO, a dedicated work thread or process to perform disk I/O can also bypass this bottleneck. One approach is using memory-mapped files, requesting resources to perform I/O when mincore() indicates I/O is needed, and continuing to handle network traffic.

Several methods can be employed by a single thread to determine which of a set of non-blocking sockets is ready for I/O:

* **The traditional

 select()**

  Unfortunately, select() is limited to FD_SETSIZE handles. This limitation is compiled into the standard library and user programs. (Some versions of the C library allow you to raise this limit at compile time for user applications.)

  Examples of how to use select() in conjunction with other readiness notification schemes can be found [here (Poller_select (cc, h))](http://www.kegel.com/dkftpbench/doc/Poller_select.html).

* **The traditional poll()**
  
  poll() doesn't have a hard-coded limit on the number of file descriptors it can handle, but it does get slower at a few thousand because most file descriptors are idle most of the time, and scanning thousands of file descriptors takes time.

  Some operating systems (e.g., Solaris 8) speed up poll() using techniques like poll hinting, implemented and benchmarked for Linux by Niels Provos in 1999.

  Examples of how to use poll() in conjunction with other readiness notification schemes can be found [here (Poller_poll (cc, h, benchmarks))](http://www.kegel.com/dkftpbench/doc/Poller_poll.html).

* **/dev/poll**

  This is the recommended polling replacement on Solaris.

  The idea behind /dev/poll is to take advantage of the fact that poll() often calls with the same arguments multiple times.

  With /dev/poll, you obtain an open handle to /dev/poll and tell the operating system which files you're interested in by writing to that handle; from then on, you merely read from that handle to get the currently ready set of file descriptors.

  **Note:** Various implementations of /dev/poll were tried on Linux, but none performed as well as epoll and were never completed. Using /dev/poll on Linux is not recommended.

* **kqueue()**

  This is the recommended polling replacement on FreeBSD (and upcoming on NetBSD).

  kqueue() can specify either edge-triggering or level-triggering.

### One Thread Serving Multiple Clients, Using Non-blocking I/O and Readiness Change Notification
### One Server Thread Serving Multiple Clients, Using Asynchronous I/O
### One Server Thread Serving One Client, Using Blocking I/O
### Building Server Code Into the Kernel

> Content too extensive, ongoing translation...