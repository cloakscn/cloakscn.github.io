---
title: 更改对值的引用
date: 2024-03-01
order: 4
category:
  - 重构
---

## 问题

您有一个参考对象太小且很少更改，无法证明管理其生命周期是合理的。

![Change Reference to Value - Before](https://refactoringguru.cn/images/refactoring/diagrams/Change%20Reference%20to%20Value%20-%20Before.png =x150)

## 解决方法

把它变成一个值对象。

![Change Reference to Value - After](https://refactoringguru.cn/images/refactoring/diagrams/Change%20Reference%20to%20Value%20-%20After.png =x150)

## 为什么要重构？

从引用切换到值的灵感可能来自使用引用的不便。引用需要您进行管理：

* 他们总是需要从存储中请求必要的对象。
* 内存中的引用可能不方便使用。
* 与值相比，在分布式和并行系统上使用引用特别困难。

如果您宁愿拥有不可更改的对象，也不愿拥有状态可能在其生命周期内发生变化的对象，那么值尤其有用。

## 好处

* 对象的一个​​重要属性是它们应该是不可改变的。每个返回对象值的查询都应该收到相同的结果。如果这是真的，那么即使有许多对象代表同一事物也不会出现问题。
* 价值观更容易实施。

## 缺点

如果一个值是可变的，请确保如果任何对象发生变化，表示同一实体的所有其他对象中的值都会更新。这太繁琐了，因此为此目的创建参考更容易。

## 如何重构？

1. 使对象不可更改。该对象不应有任何 `setter` 或其他更改其状态和数据的方法（[Remove Setting Method](../simplifying-method-calls/remove-setting-method.md) 可能会有所帮助）。唯一应该将数据分配给值对象字段的地方是构造函数。
2. 创建一个能够比较两个值的比较方法。
3. 检查是否可以删除工厂方法并公开对象构造函数。
