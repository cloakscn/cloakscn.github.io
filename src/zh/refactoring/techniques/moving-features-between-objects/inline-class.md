---
title: 内联类
date: 2024-03-01
order: 4
category:
  - 重构
---

## 问题

一个类几乎什么也不做，也不负责任何事情，也没有计划为它承担额外的责任。

![Inline Class - Before](https://refactoringguru.cn/images/refactoring/diagrams/Inline%20Class%20-%20Before.png =x150)

## 解决方法

将所有特征从类移动到另一个类。

![Inline Class - After](https://refactoringguru.cn/images/refactoring/diagrams/Inline%20Class%20-%20After.png =x150)

## 为什么要重构？

在一个类的特征被“移植”到其他类之后，通常需要这种技术，而使该类几乎无事可做。

## 好处

消除不必要的课程可以释放计算机上的操作内存以及您头脑中的带宽。

## 如何重构？

1. 在接收者类中，创建捐赠者类中存在的公共字段和方法。方法应该引用捐赠者类的等效方法。
2. 将对捐赠者类的所有引用替换为对接收者类的字段和方法的引用。
3. 现在测试程序并确保没有添加任何错误。如果测试表明一切正常，则开始使用 [Move Method](./move-method.md) 和 [Move Field](./move-field.md)) 将所有功能从原始类完全移植到接收类。继续这样做，直到原来的类完全空了。
4. 删除原来的类。