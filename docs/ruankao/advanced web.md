# Web 应用开发（重要）

![img_10.png](images/img_10.png)

## Web 技术演变

* 单台机器到数据库与 Web 服务器分离
* 应用服务器集群

    存在问题：用户请求由谁来转发到具体的应用服务器；用户如果每次访问的服务器都不一致，那么如何维护 session 的一致性。

    解决方案：

        1. 设置 session 服务器，统一管理 session 会话信息

        2. 负载均衡，客户端保存 cookie 信息，每次访问携带 cookie 信息

```mermaid
flowchart TB
  subgraph a[容器 1]
    subgraph Web 应用
    A[学员]
    B[视频]
    C[直播]
    end
  end
  
  subgraph b[容器 2]
    subgraph Web 应用
    D[学员]
    E[视频]
    F[直播]
    end
  end
  
  G[数据库]
  
  a --> G
  b --> G

```

* 数据库集群，分为主从库
* 用缓存缓解从库读取压力

```mermaid
flowchart LR
    a[应用服务器集群]
    A[数据库 主]
    B[数据库 从]
    C[缓存集群]
    
    A <-->|同步| B
    
    a-->|写| A
    B-->|2.读| a
    C-->|1.读| a
```

## 面向服务架构 SOA

![img_18.png](images/img_18.png)

## Q&A

### CDN 内容分发网络

![img_11.png](images/img_11.png)

### REST 表述性状态传递

![img_12.png](images/img_12.png)

### 微服务架构

![img_13.png](images/img_13.png)

![img_14.png](images/img_14.png)

### 扩展标记语言 XML

![img_15.png](images/img_15.png)

### JSON 轻量级数据交换格式

![img_16.png](images/img_16.png)

### 无状态服务

![img_17.png](images/img_17.png)