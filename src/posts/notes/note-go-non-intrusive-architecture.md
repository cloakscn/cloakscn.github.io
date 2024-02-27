---
title: About Non-Intrusive Architecture
date: 2023-03-26 22:41:06
categories: Notes
tags:
  - Go
---

In the working environment, many projects, whether large or small, present a common headache - technical debt. We cannot avoid it, but the demands won't wait for us to resolve these issues before moving forward. We need more elegant solutions, and that's where non-intrusive architecture comes into play, particularly popular in the field of automated operations.

The key to implementing non-intrusive architecture in Go lies in achieving loose coupling through interfaces and composition. Here are some techniques to implement non-intrusive architecture:

<!-- more -->

1. **Define Interfaces:** In Go, interfaces are a collection of methods that define the behavior a certain object should have. By defining interfaces, we can separate code into independent modules that can be tested and replaced independently. This also makes it easier to implement dependency injection and hot-swapping.

2. **Achieve Loose Coupling through Composition:** In Go, loose coupling can be achieved through composition by embedding one type into another. This allows us to break down the code into smaller parts, each of which can be tested and replaced independently. This also makes it easier to implement dependency injection and hot-swapping.

3. **Use Dependency Injection:** Dependency injection is a technique to achieve loose coupling by passing dependencies to objects. In Go, this can be achieved by passing interfaces as parameters to functions or methods. This makes it easier to replace different implementations for testing or production environments.

4. **Leverage Reflection:** Reflection is the ability to inspect the type and value of an object at runtime. In Go, reflection can be used to achieve dynamic type conversion and method invocation. While reflection might introduce some performance overhead, it can make the code more flexible and extensible in certain situations.

5. **Configuration Files:** Storing configuration information in configuration files rather than hardcoding it in the code makes the code more flexible and configurable. In Go, the standard library provides packages like flag and viper for reading and parsing configuration files. This makes it easier to use different configurations in different environments.

In summary, the key to implementing non-intrusive architecture is achieving loose coupling through interfaces and composition. Additionally, techniques like dependency injection, reflection, and configuration files can be employed to enhance flexibility and configurability.

## What is Non-Intrusive Architecture?

Non-intrusive architecture refers to a system design approach that aims to avoid extensive modifications and refactoring of existing systems. Instead, it focuses on extending system functionality by adding new modules or services. The advantage of this architectural design is the ability to maximize the stability and reliability of the existing system while meeting new requirements and functionality.

Non-intrusive architecture typically adopts a modular design, dividing the system into independent modules or services. Each module or service has specific functionality and can be developed, tested, and deployed independently. This design approach makes the system more flexible and scalable, facilitating system maintenance and upgrades.

The implementation of non-intrusive architecture requires the use of various technological means, such as microservices, containerization, API gateways, etc. These technologies assist developers in rapidly building, deploying, and managing system modules or services, enabling quick iteration and updates of the system.

> To be continued...