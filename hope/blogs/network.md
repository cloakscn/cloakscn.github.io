---
icon: page
# 这是文章的标题
title: 计算机网络面试
date: 1999-01-19
category: 面试
tag:
  - 网络
---

&nbsp;
<!-- more -->

## OSI七层模型

### 物理层

建立、维护、断开物理连接

### 数据链路层

建立逻辑连接、进行硬件地址寻址、差错校验

### 网络层

进行逻辑地址寻址，实现不同网络之间的路径选择

### 传输层

定义传输数据的协议端口号，以及流控和差错校验

常见协议：**TCP、UDP**

数据包一旦离开网卡即进入网络传输层

**TCP三次握手**

所谓三次握手(Three-way Handshake)，是指建立一个TCP连接时，需要客户端和服务器总共发送3个包。

三次握手的目的是连接服务器指定端口，建立TCP连接,并同步连接双方的序列号和确认号并交换 TCP 窗口大小信息.在socket编程中，客户端执行connect()时。将触发三次握手。

![](https://gitee.com/biliit/pic-go/raw/master/202201061236575.png)

第一次握手:
客户端发送一个TCP的SYN标志位置1的包指明客户打算连接的服务器的端口，以及初始序号X,保存在包头的序列号(Sequence Number)字段里。

![](https://gitee.com/biliit/pic-go/raw/master/202201061236854.png)

第二次握手:
服务器发回确认包(ACK)应答。即SYN标志位和ACK标志位均为1同时，将确认序号(Acknowledgement Number)设置为客户的I S N加1以.即X+1。

![](https://gitee.com/biliit/pic-go/raw/master/202201061237932.png)

第三次握手.
客户端再次发送确认包(ACK) SYN标志位为0,ACK标志位为1.并且把服务器发来ACK的序号字段+1,放在确定字段中发送给对方.并且在数据段放写ISN的+1

![](https://gitee.com/biliit/pic-go/raw/master/202201061237689.png)

**TCP四次握手**

TCP的连接的拆除需要发送四个包，因此称为四次挥手(four-way handshake)。客户端或服务器均可主动发起挥手动作，在socket编程中，任何一方执行close()操作即可产生挥手操作。

![](https://gitee.com/biliit/pic-go/raw/master/202201061235996.png)

### 会话层

简历、管理、终止会话

### 表示层

数据表示、安全、压缩

### 应用层

网络服务与最终用户的一个接口

#### 常见网络协议含义及端口

|协议|含义|端口|
|-|-|-|
|FTP|文件传输协议|21|
|Telnet|远程登陆|23|
|SMTP|简单邮件传输协议|25|
|POP3|邮件接收协议|110|
|HTTP|超文本传输协议|80|
|DNS|域名解析|53|

#### HTTP协议

##### 状态码

五类响应：1XX(信息类状态码) 2XX(成功状态码) 3XX(重定向状态码) 4XX(客户端错误状态码) 5XX(服务器错误状态码)

常见状态码

|状态码|作用|
|-|-|
|200|成功|
|204|成功处理，报文不含内容|
|206|部分成功|
|301|永久性重定向|
|302、307|临时性重定向|
|303||
|304||
|400|请求错误|
|401|需要HTTP认证信息|
|403|请求拒绝|
|404|未找到请求地址|
|500|执行请求错误|
|503|超负载、停机维护|

##### 请求头/响应头

```yml
Content-Type: 
Accept: 
Origin: 
Cache-Control: 
Cookie: 
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36
Referer: 
X-Forwarded-For: 
Access-Control-Allow-Origin: 允许特定域名访问
Last-Modify: 
```

##### 请求方法

|方法|作用|
|-|-|
|GET|用于数据读取，幂等操作|
|POST|向指定资源提交数据，非幂等操作|
|HEAD|向服务器请求头信息|
|OPTIONS|查看服务器支持HTTP请求方法，测试功能是否正常|
|PUT|请求服务器修改信息|
|DELETE|请求服务器删除数据|
|TRACE|请求服务器回显信息，测试诊断服务器状态|

1. HTTP协议和GET和POST请求方法的区别

    1. 在进行后退操作时 GET 是无害的，但是 POST 请求会进行重新提交

    2. GET 可以收藏为书签，POST 不可以

    3. GET 可以被浏览器缓存，POST 不可以

    4. GET 可以被浏览器存到历史当中，POST 不可以

    5. GET URL限制为2038个字符，POST 没有限制

    6. GET 安全性较差

2. HTTPS 的工作原理

    1. HTTPS 是一种基于 SSL/TLS 的 HTTP 协议，所有的HTTP数据都是在 SSL/TLS 协议封装之上传输的

    2. HTTPS 协议在 HTTP 协议的基础上，添加了 SSL/TLS 握手以及数据加密传输，也属于应用层协议
