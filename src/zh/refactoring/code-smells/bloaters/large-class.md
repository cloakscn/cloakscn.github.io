---
title: Large Class
date: 2023-02-18
---
<!-- more -->


## 🪧Signs and Symptoms

A class contains many fields/methods/lines of code.

一个类中包含了太多的属性、方法、代码行。

## ❓Reasons for the Problem

Classes usually start small. But over time, they get bloated as the program grows.

类规模起初很小，但随着项目的推进它变得越来越臃肿。

As is the case with long methods as well, programmers usually find it mentally less taxing(费力的) to place a new feature in an existing class than to create a new class for the feature.

长方法也是如此，开发者发现相比于在原有的类中添加一个功能，为了一个功能创建一个新的类显得更加轻松。

## ✨Treatment

When a class is wearing too many (functional) hats(帽子), think about splitting it up:

当一个类被扣了太多的帽子，首先应该思考如何拆分它：

- **Extract Class** helps if part of the behavior of the large class can be spun off(拆分) into a separate component.

    如果可以将大型类的部分行为拆分到单独的组件中，则 **Extract Class** 会有所帮助。
- **Extract Subclass** helps if part of the behavior of the large class can be implemented in different ways or is used in rare cases(极少数情况下).

    如果大型类的部分行为可以以不同的方式实现或在极少数情况下使用，则 **Extract Subclass** 会有所帮助
- **Extract Interface** helps if it's necessary to have a list of the operations and behaviors that the client can use.

    如果有必要列出客户端可以使用的操作和行为，则 **Extract Interface** 会有所帮助。
- If a large class is responsible(负责任的) for the graphical interface, you may try to move some of its data and behavior to a separate domain object. In doing so, it may be necessary to store copies of some data in two places and keep the data consistent. **Duplicate Observed Data** offers a way to do this.
    
    如果一个大型类负责图形界面，你可能会尝试将它的一些数据和行为移动到一个单独的域对象。这样做时，可能需要在两个地方存储一些数据的副本并保持数据的一致性。**Duplicate Observed Data** 提供了一种方法来做到这一点。

## ✨Payoff

- Refactoring of these classes spares developers from needing to remember a large number of attributes for a class.
    
    这些类的重构使开发人员无需记住类的大量属性。
- In many cases, splitting large classes into parts avoids duplication of code and functionality.
    
    在许多案例中，将大型类拆分成多个部分避免的代码和功能的重复。