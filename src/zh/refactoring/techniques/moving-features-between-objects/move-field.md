---
title: 移动字段
date: 2024-03-01
order: 2
category:
  - 重构
---


## 问题

一个字段在另一个类中比在它自己的类中使用得更多。

![Move Field - Before](https://refactoringguru.cn/images/refactoring/diagrams/Move%20Field%20-%20Before.png =x150)

## 解决方法

在新类中创建一个字段并将旧字段的所有用户重定向到它。

![Move Field - After](https://refactoringguru.cn/images/refactoring/diagrams/Move%20Field%20-%20After.png =x150)

## 为什么要重构？

通常将字段作为 [Extract Class](../extract-class.md) 技术的一部分进行移动。决定在哪个类中删除字段可能很困难。这是我们的经验法则：**将字段放在与使用它的方法相同的位置**（或者大多数这些方法所在的位置）。

当字段只是位于错误的位置时，此规则将在其他情况下有所帮助。

## 如何重构？

1. 如果该字段是公共的，那么如果将该字段设为私有并提供公共访问方法（为此，您可以使用 [Encapsulate Field](../organizing-data/encapsulate-field.md)），重构会容易得多。
2. 在收件人类（`recipient class`）中使用访问方法创建相同的字段。
3. 决定您将如何引用收件人类别（`recipient class`）。您可能已经有了返回适当对象的字段或方法；如果没有，您将需要编写一个新的方法或字段来存储收件人类的对象。
4. 将对旧字段的所有引用替换为对接收者类中方法的适当调用。如果该字段不是私有的，请在超类和子类中处理它。
5. 删除原来类中的字段。