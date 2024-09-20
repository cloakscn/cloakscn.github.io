---
title: Istio 架构
date: 2023-02-16 12:04:46
categories: 
  - 札记
tags: 
- 服务治理
- 微服务
---
Istio 就是 [Service Mesh](/note-service-mesh)[^1] 架构的一种实现，服务之间的通信（比如这里的 Service A 访问 Service B）会通过代理（默认是 [Envoy](https://icloudnative.io/envoy-handbook/)[^2]）来进行。


[^2]: Envoy 是专为大型现代 SOA（面向服务架构）架构设计的 L7 代理和通信总线，体积小，性能高，它通过一款单一的软件满足了我们的众多需求，而不需要我们去搭配一些工具混合使用。

    **SideCar 模式**

    Envoy 是一个独立进程，设计为伴随每个应用程序服务运行。所有的 Envoy 形成一个透明的通信网格，每个应用程序发送消息到本地主机或从本地主机接收消息，不需要知道网络拓扑。

    **L3/L4/L7 架构**

    传统的网络代理，要么在 HTTP 层工作，要么在 TCP 层工作。Envoy 支持同时在 3/4 层和 7 层操作，以此应对这两种方法各自都有其实际限制的现实。

    **动态更新**

    与 Nginx 等代理的热加载不同，Envoy 可以通过 API 来实现其控制平面，控制平面可以集中服务发现，并通过 API 接口动态下发规则更新数据平面的配置，不需要重启数据平面的代理。

    **架构**

    ![Envoy Proxy Architecture Diagram](https://jsdelivr.icloudnative.io/gh/yangchuansheng/imghosting/img/20200504160047.png)

[^1]: A service mesh, like the open source project Istio, is a way to control how different parts of an application share data with one another. Unlike other systems for managing this communication, a service mesh is a dedicated infrastructure layer built right into an app. This visible infrastructure layer can document how well (or not) different parts of an app interact, so it becomes easier to optimize communication and avoid downtime as an app grows.

<!-- more -->

而且中间的网络协议支持 HTTP/1.1，HTTP/2，gRPC 或者 TCP，可以说覆盖了主流的通信协议。代理这一层，称之为数据平面。

控制平面做了进一步的细分，分成了 Pilot、Citadel 和 Galley，它们的各自功能如下：

* Pilot：为 Envoy 提供了服务发现，流量管理和智能路由（AB 测试、金丝雀发布等），以及错误处理（超时、重试、熔断）功能。
* Citadel：为服务之间提供认证和证书管理，可以让服务自动升级成 TLS 协议。
* Galley：Galley 是 Istio 的配置验证、提取、处理和分发组件。它负责将其余的 Istio 组件与从底层平台（例如 Kubernetes）获取用户配置的细节隔离开来。

数据平面会和控制平面通信，一方面可以获取需要的服务之间的信息，另一方面也可以汇报服务调用的 Metrics 数据。

## 为什么使用 Istio

通过负载均衡、服务间的身份验证、监控等方法，Istio 可以轻松地创建一个已经部署了服务的网络，而服务的代码只需很少更改甚至无需更改。通过在整个环境中部署一个特殊的 sidecar 代理为服务添加 Istio 的支持，而代理会拦截微服务之间的所有网络通信，然后使用其控制平面的功能来配置和管理 Istio，这包括：

* 为 HTTP、gRPC、WebSocket 和 TCP 流量自动负载均衡。
* 通过丰富的路由规则、重试、故障转移和故障注入对流量行为进行细粒度控制。
* 可插拔的策略层和配置 API，支持访问控制、速率限制和配额。
* 集群内（包括集群的入口和出口）所有流量的自动化度量、日志记录和追踪。
* 在具有强大的基于身份验证和授权的集群中实现安全的服务间通信。

Istio 为可扩展性而设计，可以满足不同的部署需求。

## 核心特性

> Istio 以统一的方式提供了许多跨服务网络的关键功能。

### 流量管理

Istio 简单的规则配置和流量路由允许您控制服务之间的流量和 API 调用过程。

Istio 简化了服务级属性（如熔断器、超时和重试）的配置，并且让它轻而易举的执行重要的任务（如 A/B 测试、金丝雀发布和按流量百分比划分的分阶段发布）。

有了更好的对流量的可视性和开箱即用的故障恢复特性，就可以在问题产生之前捕获它们，无论面对什么情况都可以使调用更可靠，网络更健壮。

### 安全

Istio 的安全特性解放了开发人员，使其只需要专注于应用程序级别的安全。

Istio 提供了底层的安全通信通道，并为大规模的服务通信管理认证、授权和加密。有了 Istio，服务通信在默认情况下就是受保护的，可以让您在跨不同协议和运行时的情况下实施一致的策略——而所有这些都只需要很少甚至不需要修改应用程序。

Istio 是独立于平台的，可以与 Kubernetes（或基础设施）的网络策略一起使用。但它更强大，能够在网络和应用层面保护 pod 到 pod 或者服务到服务之间的通信。

### 可观测

Istio 健壮的追踪、监控和日志特性让您能够深入的了解服务网格部署。

通过 Istio 的监控能力，可以真正的了解到服务的性能是如何影响上游和下游的；而它的定制 Dashboard 提供了对所有服务性能的可视化能力，并让您看到它如何影响其他进程。

Istio 的 Mixer 组件负责策略控制和遥测数据收集。它提供了后端抽象和中介，将一部分 Istio 与后端的基础设施实现细节隔离开来，并为运维人员提供了对网格与后端基础实施之间交互的细粒度控制。

所有这些特性都使您能够更有效地设置、监控和加强服务的 SLO。当然，底线是您可以快速有效地检测到并修复出现的问题。

## 平台支持

Istio 独立于平台，被设计为可以在各种环境中运行，包括跨云、内部环境、Kubernetes、Mesos 等等。您可以在 Kubernetes 或是装有 Consul 的 Nomad 环境上部署 Istio。Istio 目前支持：

* Kubernetes 上的服务部署
* 基于 Consul 的服务注册
* 服务运行在独立的虚拟机上
