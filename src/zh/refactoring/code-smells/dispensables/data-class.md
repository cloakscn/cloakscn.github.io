---
title: 数据类
date: 2024-02-29
order: 4
category:
  - 重构
---

## 特征

数据类是指仅包含字段和用于访问它们的原始方法（getter 和 setter）的类。这些只是其他类使用的数据的容器。这些类不包含任何附加功能，并且不能独立操作它们拥有的数据。

## 问题的原因

当新创建的类仅包含几个公共字段（甚至可能包含少数 getter/setter）时，这是很正常的事情。但对象的真正力量在于它们可以包含行为类型或对其数据的操作。

## 应对方案

- 如果类包含公共字段，请使用 [封装字段](../../techniques/organizing-data/encapsulate-field.md) 隐藏它们以防止直接访问，并要求仅通过 getter 和 setter 执行访问。
- 对存储在集合（例如数组）中的数据使用 [封装集合](../../techniques/organizing-data/encapsulate-collection.md)。
- 查看使用该类的客户端代码。在其中，您可能会发现更适合位于数据类本身的功能。如果是这种情况，请使用 [移动方法](../../techniques/moving-features-between-objects/move-method.md) 和 [提取方法](../../techniques/composing-methods/extract-method.md) 将此功能迁移到数据类。
- 在类中充满了经过深思熟虑的方法后，您可能希望摆脱旧的数据访问方法，这些方法对类数据提供了过于广泛的访问。为此，[删除设置方法](../../techniques/simplifying-method-calls/remove-setting-method.md) 和 [隐藏方法](../../techniques/simplifying-method-calls/hide-method.md) 可能会有所帮助。

## 回报

- 提高对代码的理解和组织。对特定数据的操作现在聚集在一个地方，而不是随意地分布在整个代码中。
- 帮助您发现客户端代码的重复。