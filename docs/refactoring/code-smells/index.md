## 臃肿的代码

臃肿的代码、方法和类已经增加到如此巨大的比例，以至于它们很难工作。通常情况下，这些气味不会马上出现，而是随着程序的发展而不断积累（特别是当没有人努力去消除它们时）。

<!-- * [Long Method](./bloaters/long-method.md)                  -->
<!-- * [Large Class](./bloaters/large-class.md)                  -->
<!-- * [Primitive Obsession](./bloaters/primitive-obsession.md)  -->
* [长参数列表](./bloaters/long-parameter-list.md) 
<!-- * [Data Clumps](./bloaters/data-clumps.md)                  -->

<!-- 
## 滥用面向对象的开发模式

面向对象编程原则的不完整或不正确的应用。

| 名称                                                                           | 特征                                                                                                             |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| [Switch Statements](./object-orientation-abusers/)                             | 复杂的 `switch` 运算符或 `if` 语句序列。                                                                         |
| [Temporary Field](./object-orientation-abusers/)                               | 临时字段只有在某些情况下才能获得它们的值（因此是对象所需要的）。在这些情况之外，它们是空的。                     |
| [Refused Bequest](./object-orientation-abusers/)                               | 如果子类仅使用从其父类继承的某些方法和属性，则层次结构不平衡。不需要的方法可能只是未使用或被重新定义并发出异常。 |
| [Alternative Classes with Different Interfaces](./object-orientation-abusers/) | 两个类执行相同的功能但具有不同的方法名称。                                                                       | -->
<!-- 
## Change Preventers

如果您需要在代码中的一个地方更改某些内容，那么您也必须在其他地方进行许多更改。结果，程序开发变得更加复杂和昂贵。

| 名称                                                     | 特征                                                                                                                         |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [Divergent Change](./change-preventers/)                 | 当您对类进行更改时，您会发现自己不得不更改许多不相关的方法。例如，在添加新产品类型时，您必须更改查找、显示和订购产品的方法。 |
| [Shotgun Surgery](./change-preventers/)                  | 进行任何修改都需要对许多不同的类进行许多小的更改。                                                                           |
| [Parallel Inheritance Hierarchies](./change-preventers/) | 每当您为一个类创建子类时，您会发现自己需要为另一个类创建子类。                                                               |
-->

## Dispensables

一个可有可无的东西是没有意义和不需要的东西，如果没有它会使代码更干净、更高效和更容易理解。

<!-- | [Comments](./dispensables/)               | 一个方法充满了解释性注释。                                                                                                                                       | -->
<!-- | [Duplicate Code](./dispensables/)         | 两个代码片段看起来几乎相同。                                                                                                                                     | -->
<!-- | [Lazy Class](./dispensables/)             | 理解和维护类总是花费时间和金钱。因此，如果某个类不足以引起您的注意，则应将其删除。                                                                               | -->
* [Data Class](./dispensables/data-class.md)             
<!-- | [Dead Code](./dispensables/)              | 不再使用变量、参数、字段、方法或类（通常是因为它们已过时）。                                                                                                     | -->
<!-- | [Speculative Generality](./dispensables/) | 存在未使用的类、方法、字段或参数。                                                                                                                               | -->
<!--
## Couplers

该组中的所有特征都会导致类之间的过度耦合，或者显示如果耦合被过度委托取代会发生什么。

| 名称                                  | 特征                                                                 |
| ------------------------------------- | -------------------------------------------------------------------- |
| [Feature Envy](./couplers/)           | 方法访问另一个对象的数据多于它自己的数据。                           |
| [Inappropriate Intimacy](./couplers/) | 一个类使用另一个类的内部字段和方法。                                 |
| [Message Chains](./couplers/)         | 在代码中，您会看到一系列类似于 `$a->b()->c()->d()` 的调用            |
| [Middle Man](./couplers/)             | 如果一个类只执行一个动作，将工作委托给另一个类，那么它为什么存在呢？ |

## Other Smells

| 名称                                        | 特征                                                                                         |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Incomplete Library Class](./other-smells/) | 第三方库迟早会停止满足用户需求。问题的唯一解决方案——更改库——通常是不可能的，因为库是只读的。 |  -->