# 系统架构设计基础知识（重要）

## 软件系统质量属性

### 面向架构评估的质量属性

> 重要的质量属性用 **`*`** 强调标识

| 属性                       | 子属性  | 作用及要点                   | 设计策略                               |
|--------------------------|------|-------------------------|------------------------------------|
| `*`性能                    |      | 效率指标：处理任务所需时间或单位时间内的处理量 | 优先级队列、增加计算资源、减少计算开销、引入并法机制、采用资源调度等 |
| `*`可靠性                   | 容错   | 出现错误后仍能保证系统正确运行，且自行修正错误 | 心跳、Ping/Echo、冗余、选举                 |
|                          | 健壮性  | 错误不对系统产生影响，指既定程序忽略错误    | 心跳、Ping/Echo、冗余、选举                 |
| `*`可用性（**与可靠性相比优先选可用性**） |      | 系统正常运行的时间比例             | 心跳、Ping/Echo、冗余、选举                 |
| `*`安全性                   |      | 系统向合法用户提供服务并阻止非法用户的能力   | 入侵检测、用户认证、用户授权、追踪审计                |
| `*`可修改性                  | 可维护性 | 局部修复使故障对架构的负面影响最小化      |                                    |
|                          | 可扩展性 | 因松散耦合更易实现新特性/功能，不影响架构   |                                    |
|                          | 结构重组 | 不影响主体进行的灵活配置            |                                    |
|                          | 可移植性 | 适用于多样的环境（硬件平台、语言、操作系统等） |                                    |
| `*`功能性                   |      | 需求满足程度                  |                                    |
| 可变性                      |      |                         |                                    |
| 互操作性                     |      | 通过可视化或接口方式提供更好的交互体验     |                                    |

### 质量属性场景描述

质量属性场景是一种面向特定质量属性的需求，由 6 部分组成：

* 刺激源：某个生成该刺激的实体（人、计算机系统或者任何其他刺激器）；
* 刺激：指当刺激到达系统时需要考虑的条件；
* 环境：指该刺激在某些条件内发生。当激励发生时，系统可能处于过载、运行或其他情况；
* 制品：某个制品被激励，可能是整个系统，也可能是系统的一部分；
* 响应：指在激励到达后所采取的行动；
* 响应度量：当响应发生时，应当能够以某种方式对其进行度量，以对需求进行测试。

## 系统架构评估


系统架构评估是在对架构分析、评估的基础上，对架构策略的选取进行决策，通常分为：

| 方法                       | 描述                                             |
| -------------------------- | ------------------------------------------------ |
| 基于调查问卷或检查表的方法 | 缺点是很大程度上依赖于评估人员的主观判断         |
| 基于场景的评估方法         | 应用在架构权衡分析法（**ATAM**）和软件架构分析方法（**SAAM**）中 |
| 基于度量的评估方法         | 建立质量属性和度量之间的映射原则->在软件文档中获取度量信息->分析推导系统质量属性 |

### 系统架构评估中的重要概念

1. 敏感点：实现质量目标时应注意的点，是一个或多个构建的特性；
2. 权衡点：影响多个质量属性的敏感点；
3. 风险承担者或利益相关人：影响体系结构或被体系结构影响的群体；
4. 场景：确定架构质量评估目标的交互机制，一般采用触发机制、环境和影响三方面来描述。

### 系统架构评估方法

#### `*`软件架构分析方法（ATAM）

ATAM 是一种架构评估方法，主要在系统开发之前，针对 **性能、可用性、安全性、可修改性** 等质量属性进行评价和折中。

分为 4 个主要活动阶段：**需求收集、架构视图描述、属性模型构造和分析、架构决策与折衷**，整个评估过程强调以属性作为架构评估的核心概念。

ATAM 方法评估实践阶段划分如下：

1. 演示和介绍阶段
      1. 介绍 ATAM 方法
      2. 描述商业目标
      3. 描述体系架构
2. 调查和分析阶段
      1. 标识体系结构步骤
      2. 产生质量属性树
      3. 分析体系结构步骤
3. 测试阶段
      1. 讨论质量需求的次序
      2. 分析体系结构步骤
4. 报告阶段
      1. 提交结果

#### 架构权衡分析法（**SAAM**）

SAAM 是一种非功能质量属性的架构分析方法，是最早形成文档并得到广泛应用的软件架构分析方法。SAAM 的主要输入是 **问题描述、需求说明和架构描述**，其分析过程主要包括 **场景开发、架构描述、单个场景评估、场景交互和总体评估**。

### 中间件

!!! inline end info "中间件 5 种主要类型"

      1. 数据库访问中间件
      2. 远程过程调用（RPC）
      3. 面向消息中间件（MOM）
      4. 分布式对象中间件
      5. 事务中间件

中间件在一个分布式系统环境中处于操作系统和应用程序之间的软件，可以在不同技术之间共享资源，将不同的操作系统、数据库、异构的网络环境以及若干应用结合成一个有机的协同工作整体。

中间件的任务是使应用程序开发变得更容易，通过提供统一的程序抽象，隐藏异构系统和分布式系统下低级别编成的复杂度。

---

#### 典型应用架构

!!! inline info "J2EE 层次结构"

      1. 客户层组件
      2. WEB 层组件
      3. 业务层组件
      4. 信息系统层

**J2EE 核心技术**

采用了多层分布式应用程序模型，实现不同逻辑功能的应用程序被封装到不同的构建中，处于不同层次的构建被分别部署到不同的机器中。

**JSP+Servlet+JavaBean+DAO**

---

* JSP：用于显示、收集数据的部分，作为 MVC 的视图层；
* Servlet：作为业务逻辑层，用于处理复杂的业务逻辑，如验证数据、实例化 JavaBean、调用 DAO 连接数据库等；
* JavaBean：用于数据的封装，方便将查询结果在 Servlet 和 JSP 页面之间进行传递等；
* DAO：用于连接数据库及进行数据库的操作，如：查询、删除、更改等；

JSP 发送一个数据到 Servlet， Servlet 收到后解析，根据数据调用相应的 Service 去服务， Service 如果调用数据库就通过 DAO 跟数据库交互，使用 JavaBean 完成封装，返回结果给 Servlet， Servlet 再返回给 JSP。



**.Net 平台**

`.Net` 框架处于操作系统和 `.Net` 应用语言之间，只适用于微软系统，而 J2EE 支持跨平台，任何安装了 JVM 平台。