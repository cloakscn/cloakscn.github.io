---
title: 更改值为引用
date: 2024-03-01
order: 3
category:
  - 重构
---

## 问题

所以您有许多相同的单个类实例，您需要用单个对象替换它们。

![Change Value to Reference - Before](https://refactoringguru.cn/images/refactoring/diagrams/Change%20Value%20to%20Reference%20-%20Before.png =400x)

## 解决方法

将相同的对象转换为单个引用对象。

![Change Value to Reference - After](https://refactoringguru.cn/images/refactoring/diagrams/Change%20Value%20to%20Reference%20-%20After.png =400x)

## 为什么要重构？

在许多系统中，对象可以被分类为值或引用。

* **References：** 当一个现实世界的对象只对应于程序中的一个对象时。参考通常是用户/订单/产品/等对象。
* **Values：** 一个现实世界的对象对应程序中的多个对象。这些对象可以是日期、电话号码、地址、颜色等。

引用与值的选择并不总是明确的。有时会有一个简单的值和少量不变的数据。那么就需要添加可变数据，并在每次访问对象时传递这些变化。在这种情况下，有必要将其转换为引用。

## 好处

对象包含有关特定实体的所有最新信息。如果在程序的一部分中更改了对象，则可以从使用该对象的程序的其他部分访问这些更改。

## 缺点

引用更难实现。

## 如何重构？

1. 在要生成引用的类上使用 [Replace Constructor with Factory Method](../simplifying-method-calls/replace-constructor-with-factory-method.md)。
2. 确定哪个对象将负责提供对引用的访问。当您需要一个对象时，您现在需要从存储对象或静态字典字段中获取它，而不是创建一个新对象。
3. 确定引用是提前创建还是根据需要动态创建。如果对象是预先创建的，请确保在使用前加载它们。
4. 更改工厂方法，使其返回一个引用。如果对象是预先创建的，当请求一个不存在的对象时，决定如何处理错误。您可能还需要使用 [Rename Method](../simplifying-method-calls/rename-method.md) 来通知该方法仅返回现有对象。
