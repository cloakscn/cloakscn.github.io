---
title: 用对象替换数组
date: 2024-03-01
order: 5
category:
  - 重构
---

> 这种重构技术是 [Replace Data Value with Object](replace-data-value-with-object.md) 的特例。

## 问题

您有一个包含各种类型数据的数组。

```java
String[] row = new String[2];
row[0] = "Liverpool";
row[1] = "15";
```

## 解决方法

用每个元素都有单独字段的对象替换数组。

```java
Performance row = new Performance();
row.setName("Liverpool");
row.setWins("15");
```

## 为什么要重构？

数组是存储单一类型数据和集合的绝佳工具。但是，如果您使用像邮政信箱这样的数组，将用户名存储在第 1 个方框中，将用户的地址存储在第 14 个方框中，那么有一天您会非常不高兴。当有人将某些东西放在错误的“盒子”中时，这种方法会导致灾难性的失败，并且还需要您花时间弄清楚哪些数据存储在何处。

## 好处

* 在生成的类中，您可以放置​​以前存储在主类或其他地方的所有关联行为。
* 类的字段比数组的元素更容易记录。

## 如何重构？

1. 创建将包含数组数据的新类。将数组本身作为公共字段放在类中。
2. 在原类中创建一个字段用于存放该类的对象。不要忘记在启动数据数组的地方也创建对象本身。
3. 在新类中，为每个数组元素一一创建访问方法。给他们一个不言自明的名字，表明他们做什么。同时，将主代码中每次使用一个数组元素替换为相应的访问方法。
4. 为所有元素创建访问方法后，将数组设为私有。
5. 对于数组的每个元素，在类中创建一个私有字段，然后更改访问方法，以便它们使用此字段而不是数组。
6. 移动完所有数据后，删除数组。