---
icon: page
title: WebDav 搭建
date: 2022-04-05
category: WebDav
tag:
  - 私服
  - 文件存储
---

WebDAV 基于 HTTP 协议的通信协议，在 GET、POST、HEAD 等几个HTTP标准方法以外添加了一些新的方法，使应用程序可对 Web Server 直接读写，并支持写文件锁定 (Locking) 及解锁(Unlock)，还可以支持文件的版本控制。

<!-- more -->

常用的文件共享有三种：FTP、Samba、WebDAV，它们各有优缺点，了解后才能更好地根据自己的需求选择方案。

* FTP 属于古老的文件共享方式了，因为安全性，现代浏览器最新已默认不能打开FTP协议。SFTP 在 FTP 基础上增加了加密，在 Linux 上安装 OpenSSH 后可以直接用 SFTP 协议传输。使用 SFTP 临时传送文件还可以，但做文件共享，性能不高，速度较慢。

* Samba 是 Linux 下 CIFS 协议的实现，优势在于对于小白使用简章，和 Windows 系统文件共享访问一样，不需要安装第三方软件，而且移动端也有大量 APP 支持。苹果手机文件 APP 中添加网络存储用的就是这种方式。Windows 下文件共享使用 445 端口，且不能更改。445 端口常常受黑客关照，在广域网上大多运营封掉了该端口，所以这种文件共享只适合在内网使用。

* WebDAV 基于 HTTP 协议的通信协议，在 GET、POST、HEAD 等几个 HTTP 标准方法以外添加了一些新的方法，使应用程序可对 Web Server 直接读写，并支持写文件锁定 (Locking) 及解锁 (Unlock)，还可以支持文件的版本控制。因为基于 HTTP，在广域网上共享文件有天然的优势，移动端文件管理 APP 也大多支持 WebDAV 协议。使用 HTTPS 还能保安全性。Apache 和Nginx 支持 WebDAV，可作为 WebDAV 文件共享服务器软件。也可以使用专门的 WebDAV 软件部署。

## 几种安装方式

之前有使用过 WebDav 服务，很多工具都对 WebDav 做了比较友好的支持，使用体验还不错。

我目前在用的有：
* 文件存储（RaiDriver、Solid Explorer）
* 静读天下（阅读工具）
* Joplin（优秀的 Mardown 笔记软件）
* Zotero（文献管理工具）

### Docker 部署（推荐）

这个方法很简单，安装 Docker 环境，就可以部署

#### 1. 安装 Docker 环境

安装命令如下：
```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

也可以使用国内 daocloud 一键安装命令：
```bash
curl -sSL https://get.daocloud.io/docker | sh
```

> 参考文章：[https://www.runoob.com/docker/docker-tutorial.html](https://www.runoob.com/docker/docker-tutorial.html)

#### 2. 部署 WebDav 服务

这个 Docker 镜像提供了 `Basic WebDAV server` 和 `Secure WebDAV with SSL` 两种部署方式。

运行命令就可以完成部署，不懂的可以看参考文章。

**Basic WebDAV server**

```bash
docker run --restart always -v /srv/dav:/var/lib/dav \
    -e AUTH_TYPE=Digest -e USERNAME=alice -e PASSWORD=secret1234 \
    --publish 80:80 -d bytemark/webdav
```

**Secure WebDAV with SSL**

虽然说镜像提供了基于 SSL 的校验模式，但是我没有成功复现😂

因为Joplin 要求基于 SSL 的校验模式，所以我参考了另一篇[博客](https://blog.csdn.net/airenKKK/article/details/121058783)，效果还不错。

```bash
docker run --restart always -v /srv/dav:/var/lib/dav \
    -e AUTH_TYPE=Basic -e USERNAME=test -e PASSWORD=test \
    -e SSL_CERT=selfsigned --publish 443:443 -d bytemark/webdav
```

> 参考文章：[https://hub.docker.com/r/bytemark/webdav](https://hub.docker.com/r/bytemark/webdav)

### Nginx 开启 WebDav 服务

我之前想要在树莓派上搭建这个服务用做本地网盘，为什么用这个可以看前边对常见文件共享的分析。

由于树莓派的芯片不是常规的 `arm`，所以只能用编译安装了。

参考文章省略了 `Nginx` 编译步骤，准备环境介绍也不清楚，可以参见我之前写的 [Nginx 源码编译安装](/reference/nginx/install)。

**编译命令**

```bash
./configure \
    --with-threads \
    --with-file-aio \
    --with-http_ssl_module \
    --with-http_v2_module \
    --with-http_realip_module \
    --with-http_addition_module \
    --with-http_xslt_module=dynamic \
    --with-http_image_filter_module=dynamic \
    --with-http_geoip_module=dynamic \
    --with-http_sub_module \
    --with-http_dav_module \
    --with-http_flv_module \
    --with-http_mp4_module \
    --with-http_gunzip_module \
    --with-http_gzip_static_module \
    --with-http_auth_request_module \
    --with-http_random_index_module \
    --with-http_secure_link_module \
    --with-http_degradation_module \
    --with-http_slice_module \
    --with-http_stub_status_module \
    --with-stream=dynamic \
    --with-stream_ssl_module \
    --with-stream_realip_module \
    --with-stream_geoip_module=dynamic \
    --with-stream_ssl_preread_module \
    --with-compat  \
    --with-pcre-jit \
    --add-module=../nginx-dav-ext-module \
    --add-module=../headers-more-nginx-module
    make && make install
```

命令中提到的 `nginx-dav-ext-module` `headers-more-nginx-module` 可以去 Github 上找

**设置登录账号及密码**

```bash
echo "admin:$(openssl passwd 123456)" >/usr/local/nginx/conf/.davpasswd
```

**Nginx 配置信息**

```bash
dav_ext_lock_zone zone=davlock:10m;                   # DAV文件锁内存共享区

server {
    listen 443 ssl http2;                             # 启用HTTPS及HTTP/2提升传输性能
    server_name  dav.nginxbar.org;
    access_log  logs/webdav.access.log  main;
    root    /root;
   
    ssl_certificate ssl/www_nginxbar_org.pem;         # 网站证书文件
    ssl_certificate_key ssl/www_nginxbar_org.key;     # 网站证书密钥文件
    ssl_password_file ssl/www_nginxbar_org.pass;      # 网站证书密钥密码文件
    ssl_session_cache shared:SSL:10m;                 # 会话缓存存储大小为10MB
    ssl_session_timeout  20m;                         # 会话缓存超时时间为20分钟

    client_max_body_size 20G;                         # 最大允许上传的文件大小

    location / {
        autoindex on;
        autoindex_localtime on;

        set $dest $http_destination;
        if (-d $request_filename) {                   # 对目录请求、对URI自动添加“/”
            rewrite ^(.*[^/])$ $1/;
            set $dest $dest/;
        }

        if ($request_method ~ (MOVE|COPY)) { # 对MOVE|COPY方法强制添加Destination请求头
            more_set_input_headers 'Destination: $dest';
        }

        if ($request_method ~ MKCOL) {
            rewrite ^(.*[^/])$ $1/ break;
        }

        dav_methods PUT DELETE MKCOL COPY MOVE;      # DAV支持的请求方法
        dav_ext_methods PROPFIND OPTIONS LOCK UNLOCK;# DAV扩展支持的请求方法
        dav_ext_lock zone=davlock;                   # DAV扩展锁绑定的内存区域
        create_full_put_path  on;                    # 启用创建目录支持
        dav_access user:rw group:r all:r;            # 设置创建的文件及目录的访问权限

        auth_basic "Authorized Users WebDAV";
        auth_basic_user_file /usr/local/nginx/conf/.davpasswd;
    }
}
```

> 参考文章：[https://www.weixueyuan.net/a/738.html](https://www.weixueyuan.net/a/738.html)