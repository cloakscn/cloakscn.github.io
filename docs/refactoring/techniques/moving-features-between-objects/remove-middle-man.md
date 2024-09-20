---
title: 移除中间人
date: 2024-03-01
order: 6
category:
  - 重构
---

## 问题

一个类有太多的方法可以简单地委托给其他对象。

![Remove Middle Man - Before](https://refactoringguru.cn/images/refactoring/diagrams/Remove%20Middle%20Man%20-%20Before.png =x150)

## 解决方法

删除这些方法，强制客户端直接调用结束方法。

![Remove Middle Man - After.png](https://refactoringguru.cn/images/refactoring/diagrams/Remove%20Middle%20Man%20-%20After.png =x150)

## 为什么要重构？

为了描述这种技术，我们将使用 [Hide Delegate](hide-delegate.md) 中的术语。

有两种类型的问题：

1. 服务器类本身不做任何事情，只会产生不必要的复杂性。在这种情况下，请考虑是否需要此类。
2. 每次向委托添加新功能时，都需要在服务器类中为其创建委托方法。如果进行大量更改，这将是相当令人厌烦的。

**如何重构？**

1. 创建用于从服务器类对象访问委托类对象的 `getter`。
2. 将对服务器类中委托方法的调用替换为对委托类中方法的直接调用。
