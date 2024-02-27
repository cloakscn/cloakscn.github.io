---
title: Istio Architecture
date: 2023-02-16 12:04:46
categories: Notes
tags: 
- Service Governance
- Microservices
---
Istio is an implementation of the [Service Mesh](/note-service-mesh)[^1] architecture, where communication between services (e.g., Service A accessing Service B) is handled through proxies, with [Envoy](https://icloudnative.io/envoy-handbook/)[^2] being the default proxy.

[^2]: Envoy is a lightweight, high-performance L7 proxy and communication bus designed for large-scale modern Service-Oriented Architecture (SOA). It serves as a single software solution for various needs without requiring additional tools.

    **SideCar Mode**

    Envoy operates as an independent process, designed to run alongside each application service. All Envoys form a transparent communication mesh, and each application sends and receives messages to and from the local host without needing knowledge of the network topology.

    **L3/L4/L7 Architecture**

    Unlike traditional network proxies that work either at the HTTP layer or the TCP layer, Envoy supports operations at both Layer 3/4 and Layer 7 to address limitations of each approach in practical scenarios.

    **Dynamic Updates**

    Envoy, unlike proxies like Nginx, supports dynamic updates through APIs for its control plane. The control plane centrally manages service discovery and dynamically updates the configuration of the data plane through API interfaces without requiring a restart of the data plane.

    **Architecture**

    ![Envoy Proxy Architecture Diagram](https://jsdelivr.icloudnative.io/gh/yangchuansheng/imghosting/img/20200504160047.png)

[^1]: A service mesh, like the open source project Istio, is a way to control how different parts of an application share data with one another. Unlike other systems for managing this communication, a service mesh is a dedicated infrastructure layer built right into an app. This visible infrastructure layer can document how well (or not) different parts of an app interact, so it becomes easier to optimize communication and avoid downtime as an app grows.

<!-- more -->

The proxy layer is referred to as the data plane and supports various network protocols such as HTTP/1.1, HTTP/2, gRPC, or TCP.

The control plane further divides into Pilot, Citadel, and Galley, each serving specific functions:

- **Pilot:** Provides service discovery, traffic management, intelligent routing (AB testing, canary releases, etc.), and error handling (timeout, retries, circuit breaking) for Envoy.

- **Citadel:** Offers authentication and certificate management for services, enabling automatic upgrade of services to TLS.

- **Galley:** Serves as Istio's configuration validation, extraction, processing, and distribution component, handling the details of isolating other Istio components from obtaining user configuration from the underlying platform (e.g., Kubernetes).

The data plane communicates with the control plane to gather necessary information about services and report metrics data on service invocations.

## Why Use Istio

Istio allows easy creation of a network already deployed with services through methods such as load balancing, service-to-service authentication, and monitoring, with minimal or no modification to the service code. By deploying a special sidecar proxy that adds Istio support to services, the proxy intercepts all network communication between microservices. It uses its control plane functionalities to configure and manage Istio. This includes:

- Automatic load balancing for HTTP, gRPC, WebSocket, and TCP traffic.
- Fine-grained control over traffic behavior through rich routing rules, retries, fault injection, and fault tolerance.
- Pluggable policy layer and configuration API supporting access control, rate limiting, and quotas.
- Automated metrics, logging, and tracing for all traffic within the cluster, including ingress and egress.
- Secure service-to-service communication in a cluster with strong identity-based and authorization-based security.

Istio is designed for scalability and can meet different deployment needs.

## Core Features

> Istio provides many key features for cross-service networking in a unified way.

### Traffic Management

Istio's simple rule configuration and traffic routing allow control over traffic and API calls between services.

It simplifies the configuration of service-level properties (such as circuit breakers, timeouts, and retries) and effortlessly executes critical tasks (such as A/B testing, canary releases, and phased releases based on traffic percentage).

With better visibility into traffic behavior and out-of-the-box fault recovery features, it becomes easy to capture and fix issues before they escalate, making calls more reliable and the network more robust.

### Security

Istio's security features free developers to focus on application-level security.

It provides a secure communication channel at the lowest level and manages authentication, authorization, and encryption for large-scale service communication. With Istio, service communication is secure by default, allowing consistent policy implementation across different protocols and runtimes, with minimal or no modification to the application.

Istio is platform-independent and can be used with Kubernetes' (or infrastructure's) network policies. However, it offers more power, protecting pod-to-pod or service-to-service communication at both the network and application layers.

### Observability

Istio's robust tracing, monitoring, and logging features enable a deep understanding of a service mesh deployment.

With Istio's monitoring capabilities, a true understanding of how service performance impacts upstream and downstream services can be achieved. Its customizable dashboard provides visualization of the performance of all services and shows how they affect other processes.

Istio's Mixer component is responsible for policy control and telemetry data collection. It provides a backend abstraction and intermediary, isolating some of Istio's interactions with the backend infrastructure implementation details and giving operations personnel granular control over the interaction between the mesh and backend infrastructure.

All these features enable more effective setup, monitoring, and enforcement of service-level objectives (SLOs). Ultimately, it allows the rapid and effective detection and resolution of issues.

## Platform Support

Istio is platform-independent and designed to run in various environments, including across clouds, on-premises environments, Kubernetes, Mesos, and more. Istio can be deployed on Kubernetes or in an environment with Consul. It currently supports:

- Service deployments on Kubernetes
- Service registration based on Consul
- Services running on independent virtual machines

Translated by OpenAI's GPT-3.5 architecture.