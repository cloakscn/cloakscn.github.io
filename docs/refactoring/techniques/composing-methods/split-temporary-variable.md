---
title: 拆分临时变量
date: 2024-02-28
order: 6
category:
  - 重构
---

## 问题

您有一个局部变量，用于在方法内存储各种中间值（循环变量除外）。

```java
double temp = 2 * (height + width);
System.out.println(temp);
temp = height * width;
System.out.println(temp);
```

## 解决方法

对不同的值使用不同的变量。每个变量应该只负责一件特定的事情。

```java
final double perimeter = 2 * (height + width);
System.out.println(perimeter);
final double area = height * width;
System.out.println(area);
```

## 为什么重构？

如果您减少了函数内变量的数量并将它们重复用于各种不相关的目的，那么一旦您需要更改包含变量的代码，您肯定会遇到问题。您必须重新检查变量使用的每种情况，以确保使用正确的值。

## 好处

- 程序代码的每个组件应仅对一件事负责。这使维护代码变得容易得多，因为您可以轻松替换任何特定的东西而不必担心意外效果。
- 代码变得更具可读性。如果一个变量是很久以前匆忙创建的，它可能有一个无法解释任何内容的名称：k、a2、value 等。但是您可以通过以可理解的、不言自明的方式命名新变量来解决这种情况。此类名称可能类似于 customerTaxValue、cityUnemploymentRate、clientSalutationString 等。
- 如果您预计稍后会使用 [提取方法](extract-method.md)，则此重构技术非常有用。

## 如何重构？

1. 找到代码中为变量赋值的第一个位置。在这里，您应该使用与所分配的值相对应的名称来重命名该变量。
2. 在使用该变量值的地方使用新名称而不是旧名称。
3. 根据需要对变量分配不同值的位置重复此操作。