---
icon: page
# 这是文章的标题
title: Nginx 安装
date: 2022-03-12
category: Nginx
author: Cloaks
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在首页的文章收藏板块中
star: true
tag:
  - Nginx
---

使用源码编译安装，包括具体的编译参数信息。

<!-- more -->

正式开始前，编译环境 gcc g++ 开发库之类的需要提前装好，这里默认你已经装好。

## 准备环境

ububtu平台编译环境可以使用以下指令

```bash
apt-get install build-essential
apt-get install libtool
```

centos 平台编译环境使用如下指令

安装 make：

```bash
yum -y install gcc automake autoconf libtool make
```
安装 g++

```bash
yum install gcc gcc-c++
```

## 正式安装

一般我们都需要先装 pcre, zlib，前者为了重写 rewrite，后者为了 gzip 压缩。

### 选定源码目录

可以是任何目录，本文选定的是 /usr/local/src

```bash
cd /usr/local/src
```

### 安装 PCRE 库

https://ftp.pcre.org/pub/pcre/ 下载最新的 PCRE 源码包，使用下面命令下载编译和安装 PCRE 包：

```bash
cd /usr/local/src

wget https://ftp.pcre.org/pub/pcre/pcre-8.44.tar.gz 
tar -zxvf pcre-8.44.tar.gz
cd pcre-8.44
./configure
make
make install
```

### 安装 zlib 库

http://zlib.net/zlib-1.2.11.tar.gz 下载最新的 zlib 源码包，使用下面命令下载编译和安装 zlib包：

```bash
cd /usr/local/src

wget http://zlib.net/zlib-1.2.11.tar.gz
tar -zxvf zlib-1.2.11.tar.gz
cd zlib-1.2.11
./configure
make
make install
```

### 安装 ssl（某些vps默认没装ssl)

```bash
cd /usr/local/src
wget https://www.openssl.org/source/openssl-1.1.1g.tar.gz
tar -zxvf openssl-1.1.1g.tar.gz
```

### 安装 Nginx

Nginx 一般有两个版本，分别是稳定版和开发版，您可以根据您的目的来选择这两个版本的其中一个，下面是把 Nginx 安装到 /usr/local/nginx 目录下的详细步骤：

```bash
cd /usr/local/src
wget http://nginx.org/download/nginx-1.18.0.tar.gz
tar -zxvf nginx-1.18.0.tar.gz
cd nginx-1.18.0

./configure --sbin-path=/usr/local/nginx/nginx \
--conf-path=/usr/local/nginx/nginx.conf \
--pid-path=/usr/local/nginx/nginx.pid \
--with-http_gzip_static_module \
--with-http_stub_status_module \
--with-file-aio \
--with-http_realip_module \
--with-http_ssl_module \
--with-pcre=/usr/local/src/pcre-8.44 \
--with-zlib=/usr/local/src/zlib-1.2.11 \
--with-openssl=/usr/local/src/openssl-1.1.1g

make -j2
make install
```

`--with-pcre=/usr/local/src/pcre-8.44` 指的是pcre-8.44 的源码路径。

`--with-zlib=/usr/local/src/zlib-1.2.11` 指的是zlib-1.2.11 的源码路径。

安装成功后 /usr/local/nginx 目录下如下

```text
fastcgi.conf            koi-win             nginx.conf.default
fastcgi.conf.default    logs                scgi_params
fastcgi_params          mime.types          scgi_params.default
fastcgi_params.default  mime.types.default  uwsgi_params
html                    nginx               uwsgi_params.default
koi-utf                 nginx.conf          win-utf
```

## 启动

确保系统的 80 端口没被其他程序占用，运行 `/usr/local/nginx/nginx` 命令来启动 Nginx，

```bash
netstat -ano|grep 80
```

如果查不到结果后执行，有结果则忽略此步骤（ubuntu下必须用sudo启动，不然只能在前台运行）

```bash
sudo /usr/local/nginx/nginx
```

打开浏览器访问此机器的 IP，如果浏览器出现 Welcome to nginx! 则表示 Nginx 已经安装并运行成功。

![](https://gitee.com/biliit/pic-go/raw/master/202203121728638.png)

## nginx 编译选项

make 是用来编译的，它从 Makefile 中读取指令，然后编译。

make install 是用来安装的，它也从 Makefile 中读取指令，安装到指定的位置。

configure 命令是用来检测你的安装平台的目标特征的。它定义了系统的各个方面，包括 nginx 的被允许使用的连接处理的方法，比如它会检测你是不是有 CC 或 GCC，并不是需要 CC 或 GCC，它是个 shell 脚本，执行结束时，它会创建一个Makefile 文件。nginx 的 configure 命令支持以下参数：

```yml
--prefix=path: 定义一个目录，存放服务器上的文件，也就是 nginx 的安装目录。默认使用 /usr/local/nginx。
--sbin-path=path: 设置 nginx 的可执行文件的路径，默认为 prefix/sbin/nginx.
--conf-path=path: 设置在n ginx.conf 配置文件的路径。nginx 允许使用不同的配置文件启动，通过命令行中的 -c 选项。默认为 prefix/conf/nginx.conf.
--pid-path=path: 设置 nginx.pid 文件，将存储的主进程的进程号。安装完成后，可以随时改变的文件名，在 nginx.conf 配置文件中使用 PID 指令。默认情况下，文件名为 prefix/logs/nginx.pid.
--error-log-path=path: 设置主错误、警告、和诊断文件的名称。安装完成后，可以随时改变的文件名，在 nginx.conf 配置文件中使用的 error_log 指令。默认情况下，文件名为 prefix/logs/error.log.
--http-log-path=path: 设置主请求的 HTTP 服务器的日志文件的名称。安装完成后，可以随时改变的文件名 ，在 nginx.conf 配置文件中 使用的 access_log 指令。默认情况下，文件名为 prefix/logs/access.log.
--user=name: 设置 nginx 工作进程的用户。安装完成后，可以随时更改的名称在 nginx.conf 配置文件中 使用的 user 指令。默认的用户名是 nobody。
--group=name: 设置 nginx 工作进程的用户组。安装完成后，可以随时更改的名称在 nginx.conf 配置文件中 使用的  user 指令。默认的为非特权用户。
--with-select_module --without-select_module: 启用或禁用构建一个模块来允许服务器使用 select() 方法。该模块将自动建立，如果平台不支持的 kqueue，epoll，rtsig 或 /dev/poll。
--with-poll_module --without-poll_module: 启用或禁用构建一个模块来允许服务器使用 poll() 方法。该模块将自动建立，如果平台不支持的 kqueue，epoll，rtsig 或 /dev/poll。
--without-http_gzip_module: 不编译压缩的 HTTP 服务器的响应模块。编译并运行此模块需要 zlib 库。
--without-http_rewrite_module: 不编译重写模块。编译并运行此模块需要 PCRE 库支持。
--without-http_proxy_module: 不编译 http_proxy 模块。
--with-http_ssl_module: 使用 https 协议模块。默认情况下，该模块没有被构建。建立并运行此模块的 OpenSSL 库是必需的。
--with-pcre=path: 设置 PCRE 库的源码路径。PCRE 库的源码（版本4.4 - 8.30）需要从 PCRE 网站下载并解压。其余的工作是 Nginx 的 ./ configure 和 make 来完成。正则表达式使用在 location 指令和 ngx_http_rewrite_module 模块中。
--with-pcre-jit: 编译 PCRE 包含 “just-in-time compilation”（1.1.12中， pcre_jit指令）。
--with-zlib=path: 设置的 zlib 库的源码路径。要下载从 zlib（版本1.1.3 - 1.2.5）的并解压。其余的工作是 Nginx的 ./ configure 和 make 完成。ngx_http_gzip_module 模块需要使用 zlib 。
--with-cc-opt=parameters: 设置额外的参数将被添加到CFLAGS变量。例如,当你在 FreeBSD 上使用 PCRE 库时需要使用:--with-cc-opt="-I /usr/local/include。如需要需要增加 select() 支持的文件数量:--with-cc-opt="-D FD_SETSIZE=2048".
--with-ld-opt=parameters: 设置附加的参数，将用于在链接期间。例如，当在 FreeBSD 下使用该系统的 PCRE 库,应指定:--with-ld-opt="-L /usr/local/lib"。
```

典型实例(下面为了展示需要写在多行，执行时内容需要在同一行)

```bash
./configure
  --sbin-path=/usr/local/nginx/nginx
  --conf-path=/usr/local/nginx/nginx.conf
  --pid-path=/usr/local/nginx/nginx.pid
  --with-http_ssl_module
  --with-pcre=../pcre-4.4
  --with-zlib=../zlib-1.1.3
```