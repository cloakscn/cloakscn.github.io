---
title: 引入参数对象
date: 2023-02-18 19:42:17
order: 9
category:
  - 重构
---

## 问题

您的方法包含一组重复的参数。

![](https://refactoringguru.cn/images/refactoring/diagrams/Introduce%20Parameter%20Object%20-%20Before.png =x150)

## 解决方法

将这些参数替换为对象。

![](https://refactoringguru.cn/images/refactoring/diagrams/Introduce%20Parameter%20Object%20-%20After.png =x150)

## 为什么重构？

在多种方法中经常会遇到相同的参数组。这会导致参数本身和相关操作的代码重复。通过将参数合并到单个类中，您还可以将处理此数据的方法移到那里，从而将其他方法从该代码中释放出来。

## 好处

- 更具可读性的代码。您看到的不是参数的大杂烩，而是具有易于理解的名称的单个对象。
- 分散在各处的相同参数组会产生自己的代码重复：虽然没有调用相同的代码，但会不断遇到相同的参数组和参数。

## 缺点

如果您仅将数据移动到新类，并且不打算将任何行为或相关操作移动到那里，那么这就会开始出现[数据类](../../code-smells/dispensables/data-class.md)的特征。

## 如何重构？

1. 创建一个新类来代表您的参数组。使类不可变。
2. 在要重构的方法中，使用 [添加参数](add-parameter.md)，这是参数对象将被传递的位置。在所有方法调用中，将从旧方法参数创建的对象传递给此参数。
3. 现在开始从方法中一一删除旧参数，并用参数对象的字段替换代码中的旧参数。每次参数替换后测试程序。
4. 完成后，看看是否有必要将方法的一部分（有时甚至是整个方法）移动到参数对象类。如果是这样，请使用 [移动方法](../moving-features-between-objects/move-method.md) 或 [提取方法](../composing-methods/extract-method.md)。