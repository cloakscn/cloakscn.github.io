---
icon: page
# 这是文章的标题
title: CentOS 7 防火墙常用命令
date: 2022-03-12
category: Linux
author: Cloaks
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在首页的文章收藏板块中
star: true
tag:
  - Linux
  - CentOS
  - 防火墙
---

在 CentOs 7 中 firewalld,iptables,ebtables 这三种防火墙是共存的。

但是默认情况下使用 firewalld 来管理 netfilter 子系统。

<!-- more -->


## firewalld 的基本使用

```bash
# 启动
systemctl start firewalld
# 关闭
systemctl stop firewalld
# 查看状态
systemctl status firewalld 
# 开机禁用 
systemctl disable firewalld
# 开机启用
systemctl enable firewalld
```

**systemctl 是 CentOS 7 的服务管理工具中主要的工具**

```bash
# 启动一个服务
systemctl start firewalld.service
# 关闭一个服务
systemctl stop firewalld.service
# 重启一个服务
systemctl restart firewalld.service
# 显示一个服务的状态
systemctl status firewalld.service
# 在开机时启用一个服务
systemctl enable firewalld.service
# 在开机时禁用一个服务
systemctl disable firewalld.service
# 查看服务是否开机启动
systemctl is-enabled firewalld.service
# 查看已启动的服务列表
systemctl list-unit-files|grep enabled
# 查看启动失败的服务列表
systemctl --failed
```

## 配置 firewalld-cmd

```bash
# 查看防火墙版本： 
firewall-cmd --version
# 查看帮助： 
firewall-cmd --help
# 显示状态： 
firewall-cmd --state
# 查看所有打开的端口： 
firewall-cmd --zone=public --list-ports
# 更新防火墙规则： 
firewall-cmd --reload
# 查看区域信息:  
firewall-cmd --get-active-zones
# 查看指定接口所属区域： 
firewall-cmd --get-zone-of-interface=eth0
# 拒绝所有包：
firewall-cmd --panic-on
# 取消拒绝状态： 
firewall-cmd --panic-off
# 查看是否拒绝： 
firewall-cmd --query-panic 
```

## 端口的开放关闭操作

```bash
# 添加
firewall-cmd --zone=public --add-port=80/tcp --permanent    （--permanent永久生效，没有此参数重启后失效）
# 重新载入
firewall-cmd --reload
# 查看端口是否开放
firewall-cmd --zone= public --query-port=80/tcp
# 删除已开放的端口
firewall-cmd --zone= public --remove-port=80/tcp --permanent
```

## 调整默认策略

默认拒绝所有访问，改成允许所有访问

```bash
# 调整策略 是的其他端口可以访问
firewall-cmd --permanent --zone=public --set-target=ACCEPT
firewall-cmd --reload
```

## 对某个IP开放多个端口

```bash
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="10.159.60.29" port protocol="tcp" port="1:65535" accept"
# 重启防火墙使设定生效
firewall-cmd --reload
```