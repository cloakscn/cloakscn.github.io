---
title: 用对象替换数据值
date: 2024-03-01
order: 2
category:
  - 重构
---

## 问题

一个类（或一组类）包含一个数据字段。该字段有自己的行为和相关数据。

![Replace Data Value with Object - Before](https://refactoringguru.cn/images/refactoring/diagrams/Replace%20Data%20Value%20with%20Object%20-%20Before.png =x150)

## 解决方法

新建一个类，将旧的字段及其行为放在类中，将类的对象存放在原类中。

![Replace Data Value with Object - After](https://refactoringguru.cn/images/refactoring/diagrams/Replace%20Data%20Value%20with%20Object%20-%20After.png =x150)

## 为什么要重构？

这种重构基本上是 [Extract Class](../moving-features-between-objects/extract-class.md) 的一个特例。不同之处在于重构的原因。

在 [Extract Class](../moving-features-between-objects/extract-class.md) 中，我们有一个类负责不同的事情，我们想拆分它的职责。

通过用对象替换数据值，我们有一个原始字段（数字、字符串等），由于程序的增长，它不再那么简单，现在具有关联的数据和行为。一方面，这些领域本身并没有什么可怕的。但是，这个字段和行为系列可以同时出现在多个类中，从而创建重复代码。

因此，为此，我们创建了一个新类，并将字段和相关数据和行为都移至其中。

## 好处

提高类内部的相关性。数据和相关行为都在一个类中。

## 如何重构？

在开始重构之前，请查看类中是否存在对该字段的直接引用。如果是这样，请使用 [Self Encapsulate Field](./self-encapsulate-field.md) 以将其隐藏在原始类中。

1. 创建一个新类并将您的字段和相关的 `getter` 复制到它。此外，创建一个接受字段简单值的构造函数。此类不会有 `setter`，因为发送到原始类的每个新字段值都会创建一个新值对象。
2. 在原始类中，将字段类型更改为新类。
3. 在原类的 `getter` 中，调用关联对象的 `getter`。
4. 在 `setter` 中，创建一个新的值对象。如果之前已经为该字段设置了初始值，您可能还需要在构造函数中创建一个新对象。

> 应用此重构技术后，明智的做法是在包含该对象的字段上应用 [Change Value to Reference](./change-value-to-reference.md)。这允许存储对与值相对应的单个对象的引用，而不是为同一个值存储数十个对象。
>
> 当您想让一个对象负责一个真实世界的对象（例如用户、订单、文档等）时，通常需要这种方法。同时，这种方法对日期、货币、范围等对象没有用。
