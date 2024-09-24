# 层次式架构设计理论与实践

## 表现层框架设计

### MVC（Model-View-Controller）模式

MVC 是一种软件设计模式。MVC 把一个应用的输入、处理、输出流程按照视图、控制、模型的方式进行分离，形成了控制器、模型、视图 3 个核心模块。其中：

* 控制器（Controller）：接受用户的输入，并调用模型和视图去完成用户的需求；
* 模型（Model）：应用程序的主体部分，表示业务数据和业务逻辑；
* 视图（View）：用户看到并与之交流的界面。

![MVC 三者协作关系图](image-4.png)

使用 MVC 来设计表现层可以有如下优点：

* 允许多种用户界面扩展；
* 易于维护；
* 易于构建功能强大的用户界面；
* 增加应用的可拓展性、强壮性、灵活性。

### MVP（Model-View-Presenter）模式

在 MVP 模式中 Model 提供数据，View 负责显示，`Controller/Presenter` 负责逻辑的处理。MVP 不仅仅避免了 View 和 Model 之间的耦合，还进一步降低了 Presenter 对 View 的依赖。

![MVP 设计模式](image-6.png)

使用 MVP 模式来设计表现层，可以有以下的优点：
* 模型与视图完全分离，可以修改视图而不影响模型。
* 所有的交互都发生在一个地方—Presenter 内部，因此可以更高效地使用模型。
* 可以将一个 Presenter 用于多个视图，而不需要改变 Presenter 的逻辑。因为视图的变化总是比模型的变化频繁。
* 如果把逻辑放在 Presenter 中，就可以脱离用户接口来测试这些逻辑（单元测试）。

### MVVM 模式

MVVM 和 MVC、MVP 类似，主要目的都是为了实现视图和模型的分离。不同的是 MVVM 中，View 与 Model 的交互通过 ViewModel 来实现，也就是 View 和 Model 不能直接通信，两者的通信只能通过 ViewModel 来实现。ViewModel 是 MVVM 的核心，通过 DataBinding 实现 View 与 Model 之间的双向绑定，其内容包括数据状态处理、数据绑定及数据转换。

![MVVM 流程设计模式](image-7.png)

