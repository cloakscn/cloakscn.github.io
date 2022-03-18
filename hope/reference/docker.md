---
icon: page
# 这是文章的标题
title: Docker 常用服务安装
date: 2022-03-18
category: 微服务
author: Cloaks
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在首页的文章收藏板块中
star: true
tag:
  - 容器化
---

Docker 常用服务安装

<!-- more -->

## 脚本

```shell
# Mysql
docker run --name mysql -v /opt/data/mysql:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=Ycu061036 -d mysql:5.7.37
```

```shell
# redis
docker run --name redis -p 6379:6379 -d redis
```

```shell
# rabbitmq
docker run -d --hostname my-rabbit --name rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3.6.10-management
```

```shell
# zookeeper
docker run --name zookeeper -v /opt/data/zksingle:/data -p 2181:2181 -e ZOO_LOG4J_PRPO="INFO,ROLLINGFILE" -d zookeeper:3.4.13
```

```shell
# jenkins
docker run   --name jenkins-blueocean   -d   -p 8080:8080   -p 50000:50000   -v jenkins-data:/opt/data/jenkins_home   jenkinsci/blueocean
```

## Gitlab 服务端搭建

**下载 Gitlab Docker 镜像**

``` bash
docker pull gitlab/gitlab-ce
```

**运行如下命令来启动 Gitlab**

需要注意的是我们的 Gitlab 的 http 服务运行在宿主机的 `1080` 端口上，这里我们将 Gitlab 的配置，日志以及数据目录映射到了宿主机的指定文件夹下，防止我们在重新创建容器后丢失数据。

``` bash
docker run --detach \
  --publish 10443:443 --publish 1080:80 --publish 1022:22 \
  --name gitlab \
  --restart always \
  --volume /root/gitlab/config:/etc/gitlab \
  --volume /root/gitlab/logs:/var/log/gitlab \
  --volume /root/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```

**开启防火墙指定端口**

由于 Gitlab 运行在 1080 端口上，所以我们需要开放该端口，注意千万不要直接关闭防火墙，否则 Gitlab 会无法启动。

## WebDav 部署

**下载 WebDav 镜像**

``` bash
docker pull bytemark/webdav
```

**运行如下命令来启动 WebDav**

1. 部署基础的 WebDav 服务

This example starts a WebDAV server on port 80. It can only be accessed with a single username and password.

When using unencrypted HTTP, use `Digest` authentication (instead of `Basic`) to avoid sending plaintext passwords in the clear.

To make sure your data doesn't get deleted, you'll probably want to create a persistent storage volume (`-v vol-webdav:/var/lib/dav`) or bind mount a directory (`-v /path/to/directory:/var/lib/dav`):

``` bash
docker run --restart always -v /srv/dav:/var/lib/dav \
    -e AUTH_TYPE=Digest -e USERNAME=admin -e PASSWORD=admin \
    --publish 80:80 -d bytemark/webdav
```

2. 部署基于 SLL 的 WebDav 服务
