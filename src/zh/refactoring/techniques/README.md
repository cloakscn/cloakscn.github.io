---
title: 解决方案
index: false
dir:
  order: 3
---

<Catalog />

<!-- ## [Composing Methods](./composing-methods)

重构的大部分工作都是为了正确组成方法。在大多数情况下，过长的方法是万恶之源。这些方法中变幻莫测的代码掩盖了执行逻辑，使方法极难理解，甚至难以改变。

本组中的重构技术可以精简方法，消除代码的重复，并为未来的改进铺平道路。

| 方法                                                                                       | 问题                                                               | 解决办法                                                                                                     |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| [Extract Method](./composing-methods#extract-method)                                       | 您有一个可以组合在一起的代码片段。                                 | 将此代码移动到单独的新方法（或函数），并将旧代码替换为对该方法的调用。                                       |
| [Inline Method](./composing-methods#inline-method)                                         | 当方法体比方法本身更明显时，使用此技术。                           | 将对方法的调用替换为方法的内容，并删除方法本身。                                                             |
| [Extract Variable](./composing-methods#extract-variable)                                   | 你有一个难以理解的表达。                                           | 将表达式的结果或其部分放在不言自明的独立变量中。                                                             |
| [Inline Temp](./composing-methods#inline-temp)                                             | 您有一个临时变量，它分配了简单表达式的结果，仅此而已。             | 将对变量的引用替换为表达式本身。                                                                             |
| [Replace Temp with Query](./composing-methods#replace-temp-with-query)                     | 将表达式的结果放在局部变量中，以便以后在代码中使用。               | 将整个表达式移动到单独的方法，并从中返回结果。查询方法，而不是使用变量。如有必要，将新方法合并到其他方法中。 |
| [Split Temporary Variable](./composing-methods#split-temporary-variable)                   | 您有一个局部变量，用于在方法中存储各种中间值（循环变量除外）。     | 对不同的值使用不同的变量。每个变量应该只负责一件特定的事情。                                                 |
| [Remove Assignments to Parameters](./composing-methods#remove-assignments-to-parameters)   | 将某个值分配给方法主体中的参数。                                   | 使用局部变量而不是参数。                                                                                     |
| [Replace Method with Method Object](./composing-methods#replace-method-with-method-object) | 您有一个长方法，其中局部变量交织在一起，以至于您无法应用提取方法。 | 将方法转换为单独的类，以便局部变量成为类的字段。然后，可以将该方法拆分为同一类中的多个方法。                 |
| [Substitute Algorithm](./composing-methods#substitute-algorithm)                           | 所以你想用一个新的算法替换现有的算法吗？                           | 将实现算法的方法的主体替换为新算法。                                                                         |

## [Moving Features between Objects](./moving-features-between-objects)

即使您以不太完美的方式在不同的类之间分配了功能，仍然有希望。

这些重构技术展示了如何在类之间安全地移动功能、创建新类以及对公共访问隐藏实现细节。

| 方法                                                                                       | 问题                                                                     | 解决办法                                                                                                                           |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| [Move Method](./moving-features-between-objects#move-method)                               | 一个方法在另一个类中比在它自己的类中使用得更多。                         | 在最常使用该方法的类中创建一个新方法，然后将代码从旧方法移到那里。将原始方法的代码转换为对其他类中新方法的引用，或者将其完全删除。 |
| [Move Field](./moving-features-between-objects#move-field)                                 | 一个字段在另一个类中比在它自己的类中使用得更多。                         | 在新类中创建一个字段并将旧字段的所有用户重定向到它。                                                                               |
| [Extract Class](./moving-features-between-objects#extract-class)                           | 当一个类做两个类的工作时，就会产生尴尬。                                 | 相反，创建一个新类并将负责相关功能的字段和方法放入其中。                                                                           |
| [Inline Class](./moving-features-between-objects#inline-class)                             | 一个类几乎什么也不做，也不负责任何事情，也没有计划为它承担额外的责任。   | 将所有特征从类移动到另一个类。                                                                                                     |
| [Hide Delegate](./moving-features-between-objects#hide-delegate)                           | 客户端从对象 A 的字段或方法中获取对象 B。然后客户端调用对象B的一个方法。 | 在类 A 中创建一个新方法，将调用委托给对象 B。现在客户端不知道或不依赖于类 B。                                                      |
| [Remove Middle Man](./moving-features-between-objects#remove-middle-man)                   | 一个类有太多的方法可以简单地委托给其他对象。                             | 删除这些方法，强制客户端直接调用结束方法。                                                                                         |
| [✨ Introduce Foreign Method](./moving-features-between-objects#introduce-foreign-method)   | 实用程序类不包含您需要的方法，您不能将该方法添加到类中。                 | 将方法添加到客户端类并将实用程序类的对象作为参数传递给它。                                                                         |
| [✨ Introduce Local Extension](./moving-features-between-objects#introduce-local-extension) | 实用程序类不包含您需要的某些方法。但是你不能将这些方法添加到类中。       | 创建一个包含这些方法的新类，并使其成为实用程序类的子类或包装类。                                                                   |

## [Organizing Data](./organizing-data)

这些重构技术有助于数据处理，用丰富的类功能替换原语。

另一个重要的结果是类关联的理清，这使得类更加可移植和可重用。

| 方法                                                                               | 问题                                                               | 解决办法                                                            |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [Self Encapsulate Field](./organizing-data#self-encapsulate-field)                 | 您可以直接访问类中的私有字段。                                     | 为该字段创建一个 `getter` 和 `setter`，并仅使用它们来访问该字段。   |
| [Replace Data Value with Object](./organizing-data#replace-data-value-with-object) | 一个类（或一组类）包含一个数据字段。该字段有自己的行为和相关数据。 | 新建一个类，将旧的字段及其行为放在类中，将类的对象存放在原类中。    |
| [Change Value to Reference](./organizing-data#change-value-to-reference)           | 所以您有许多相同的单个类实例，您需要用单个对象替换它们。           | 将相同的对象转换为单个引用对象。                                    |
| [Change Reference to Value](./organizing-data#change-reference-to-value)           | 您有一个参考对象太小且很少更改，无法证明管理其生命周期是合理的。   | 把它变成一个值对象。                                                |
| [Replace Array with Object](./organizing-data#replace-array-with-object )          | 您有一个包含各种类型数据的数组。                                   | 用每个元素都有单独字段的对象替换数组。                              |
| [Duplicate Observed Data](./organizing-data#duplicate-observed-data)               | 域数据是否存储在负责 GUI 的类中？                                  | 那么最好将数据分离到单独的类中，确保领域类和 GUI 之间的连接和同步。 |
|                                                                                    |                                                                    |                                                                     |
|                                                                                    |                                                                    |                                                                     |
|                                                                                    |                                                                    |                                                                     |
|                                                                                    |                                                                    |                                                                     |
|                                                                                    |                                                                    |                                                                     |
|                                                                                    |                                                                    |                                                                     |
|                                                                                    |                                                                    |                                                                     |
|                                                                                    |                                                                    |                                                                     |
|                                                                                    |                                                                    |                                                                     |

## [Simplifying Conditional Expressions](./simplifying-conditional-expressions)

随着时间的推移，条件语句的逻辑往往会变得越来越复杂，而且还有更多的技术可以解决这个问题。

| 方法 | 问题 | 解决办法 |
| ---- | ---- | -------- |
|      |      |          |
|      |      |          |
|      |      |          |
|      |      |          |
|      |      |          |
|      |      |          |
|      |      |          |
|      |      |          |

## [Simplifying Method Calls](./simplifying-method-calls)

这些技术使方法调用更简单、更容易理解。这反过来又简化了类之间交互的接口。

| 方法                                                           | 问题                                             | 解决办法                                                                     |
| -------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| [Rename Method](./rename-method)                               | 方法的名称并不能解释该方法的作用。               | 重新命名方法。                                                               |
| [Add Parameter](./add-parameter)                               | 方法没有足够的数据来执行某些操作。               | 创建一个新参数以传递必要的数据。                                             |
| [Remove Parameter](./remove-parameter)                         | 方法中的参数没有被使用。                         | 删除未使用的参数。                                                           |
| [Separate Query from Modifier](./separate-query-from-modifier) | 你有一个返回值但也改变对象内部某些东西的方法吗？ | 将该方法拆分为两个单独的方法。如您所料，其中一个应该返回值，另一个修改对象。 |
| [Parameterize Method](./add-parameter)                         |                                                  |                                                                              |
|                                                                |                                                  |                                                                              |
|                                                                |                                                  |                                                                              |
|                                                                |                                                  |                                                                              |

## [Dealing with Generalization](./dealing-with-generalization)

抽象有它自己的一组重构技术，主要与沿类继承层次结构移动功能、创建新类和接口以及用委托代替继承相关，反之亦然。
| 方法 | 问题 | 解决办法 |
| ---- | ---- | -------- |
|      |      |          |
|      |      |          |
|      |      |          |
|      |      |          | -->