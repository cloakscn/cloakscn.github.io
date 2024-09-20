---
title: 重复的被观察的数据
date: 2024-03-01
order: 6
category:
  - 重构
---

## 问题

域数据是否存储在负责 GUI 的类中？

![Duplicate Observed Data - Before](https://refactoringguru.cn/images/refactoring/diagrams/Duplicate%20Observed%20Data%20-%20Before.png =x150)

## 解决方法

![Duplicate Observed Data - After](https://refactoringguru.cn/images/refactoring/diagrams/Duplicate%20Observed%20Data%20-%20After.png =x150)

那么最好将数据分离到单独的类中，确保领域类和 GUI 之间的连接和同步。

## 为什么要重构?

您希望同一数据有多个界面视图（例如，您同时拥有桌面应用程序和移动应用程序）。如果你不能把 GUI 和域分开，你将很难避免代码重复和大量的错误。

## 好处

* 您在业务逻辑类和表示类之间划分职责（参见单一职责原则），这使您的程序更具可读性和可理解性。
* 如果需要添加新的界面视图，则创建新的表示类；您无需接触业务逻辑代码（参见开放/封闭原则）。
* 现在不同的人可以处理业务逻辑和用户界面。

## 什么时候不使用？

* 这种重构技术以其经典形式使用 [Observer](../../../design-patterns/behavioral-patterns/observer.md) 模板执行，不适用于 Web 应用程序，在 Web 应用程序中，所有类都在对 Web 服务器的查询之间重新创建。
* 尽管如此，将业务逻辑提取到单独的类中的一般原则也适用于 Web 应用程序。但这将根据您的系统设计方式使用不同的重构技术来实现。

## 如何重构？

1. 在 GUI 类中隐藏对域数据的直接访问。为此，最好使用 [Self Encapsulate Field](self-encapsulate-field.md)。因此，您为此数据创建了 `getter` 和 `setter`。
2. 在 GUI 类事件的处理程序中，使用 `setter` 来设置新的字段值。这将使您将这些值传递给关联的域对象。
3. 创建一个域类并将必要的字段从 GUI 类复制到它。为所有这些字段创建 `getter` 和 `setter`。
4. 为这两个类创建观察者模式：
   * 在领域类中，创建一个数组用于存储观察者对象（GUI对象），以及注册、删除和通知它们的方法。
   * 在 GUI 类中，创建一个字段用于存储对域类的引用以及 `update()` 方法，该方法将对对象的更改做出反应并更新 GUI 类中字段的值。请注意，值更新应直接在方法中建立，以避免递归。
   * 在 GUI 类构造函数中，创建域类的实例并将其保存在您创建的字段中。将 GUI 对象注册为域对象中的观察者。
   * 在域类字段的设置器中，调用通知观察者的方法（换句话说，GUI 类中的更新方法），以便将新值传递给 GUI。
   * 更改 GUI 类字段的设置器，以便它们直接在域对象中设置新值。注意确保值不是通过域类设置器设置的——否则会导致无限递归。
