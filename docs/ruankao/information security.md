# 信息安全技术基础知识

## 信息安全知识

信息安全。

网络安全。网络安全漏洞和隐患表现在物理安全性、软件安全漏洞、不兼容使用安全漏洞等方面。网络安全威胁表现在非授权访问、信息泄露或丢失、破坏数据完整性、拒绝服务攻击、利用网络传播病毒等方面。安全措施的目标包括 **访问控制、认证、完整性、审计和保密** 等 5 个方面。

!!! info "2010 综合知识 64"

    网络安全漏洞通常是指网络节点的系统软件或应用软件在逻辑上的缺陷。

## 信息安全系统的组成框架

## 信息加解密技术

* 对称加密
* 非对称加密
* 信息摘要
* 数字签名
* 数字证书

## 密钥管理技术

密钥的使用控制。控制密钥的安全性主要有密钥标签和控制矢量两种技术。密钥的分配发送有 **物理方式**、**加密方式** 和 **第三方加密方式。** 该第三方即密钥分配中心（Key Distribution Center，KDC）。

公钥加密体制的密钥管理。有 **直接公开发布（如 PGP）**、**公用目录表**、**公钥管理机构** 和 **公钥证书** 4 种方式。公钥证书可以由个人下载后保存和传递，证书管理机构为 CA（Certificate Authority）。

???+ info "2011 综合知识 65"

    PGP (Pretty Good Privacy)是 Philip R. Zimmermann 在 1991 年开发的电子邮件加密软件包。PGP 已经成为使用最广泛的电子邮件加密软件。

## 访问控制及数字签名技术

## 信息安全的抗攻击技术

1. 密钥的选择
2. 拒绝服务（Denial of Service, DoS）攻击
3. 欺骗攻击与防御

    !!! info "2010 综合知识 65"

        ARP 攻击是针对以太网地址解析协议（ARP)的一种攻击技术，此种攻击可让攻击者取得局域网上的数据封包甚至可篡改封包，且可让网络上特定计算机或所有计算机无法正常连接。ARP 攻击造成网络无法跨网段通信的原因是伪造网关 ARP 报文使得数据包无法发送到网关。

4. 端口扫描
5. 针对 TCP/IP 堆栈的攻击方式
6. 系统漏洞扫描

## 信息安全的保障体系与评估方法
