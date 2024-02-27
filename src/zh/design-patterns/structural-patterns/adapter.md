---
title: 适配器模式
date: 2023-02-25 17:18:47
category:
  - 设计模式
tag:
  - 建造者模式
---

适配器模式是一种结构型设计模式， 它能使接口不兼容的对象能够相互合作。

## 模式结构

![](https://refactoringguru.cn/images/patterns/diagrams/adapter/structure-object-adapter.png?id=33dffbe3aece294162440c7ddd3d5d4f)

1. **客户端 （Client）** 是包含当前程序业务逻辑的类。
2. **客户端接口 （Client Interface）** 描述了其他类与客户端代码合作时必须遵循的协议。
3. **服务 （Service）** 中有一些功能类 （通常来自第三方或遗留系统）。 客户端与其接口不兼容， 因此无法直接调用其功能。
4. **适配器 （Adapter）** 是一个可以同时与客户端和服务交互的类： 它在实现客户端接口的同时封装了服务对象。 适配器接受客户端通过适配器接口发起的调用， 并将其转换为适用于被封装服务对象的调用。
5. 客户端代码只需通过接口与适配器交互即可， 无需与具体的适配器类耦合。 因此， 你可以向程序中添加新类型的适配器而无需修改已有代码。 这在服务类的接口被更改或替换时很有用： 你无需修改客户端代码就可以创建新的适配器类。

## 类适配器

<div style="display: flex; flex-direction: row; justify-content: center; zoom: 100%; float: right">
<div>![](https://refactoringguru.cn/images/patterns/diagrams/adapter/structure-class-adapter.png?id=e1c60240508146ed3b98ac562cc8e510)</div>
</div>

这一实现使用了继承机制： 适配器同时继承两个对象的接口。 请注意， 这种方式仅能在支持多重继承的编程语言中实现， 例如 C++。

1. 类适配器不需要封装任何对象， 因为它同时继承了客户端和服务的行为。 适配功能在重写的方法中完成。 最后生成的适配器可替代已有的客户端类进行使用。

## 应用场景

* **当你希望使用某个类， 但是其接口与其他代码不兼容时， 可以使用适配器类。**

    适配器模式允许你创建一个中间层类， 其可作为代码与遗留类、 第三方类或提供怪异接口的类之间的转换器。
* **如果您需要复用这样一些类， 他们处于同一个继承体系， 并且他们又有了额外的一些共同的方法， 但是这些共同的方法不是所有在这一继承体系中的子类所具有的共性。**

    你可以扩展每个子类， 将缺少的功能添加到新的子类中。 但是， 你必须在所有新子类中重复添加这些代码， 这样会使得代码重复。

    将缺失功能添加到一个适配器类中是一种优雅得多的解决方案。 然后你可以将缺少功能的对象封装在适配器中， 从而动态地获取所需功能。 如要这一点正常运作， 目标类必须要有通用接口， 适配器的成员变量应当遵循该通用接口。 这种方式同**[装饰模式](./decorator)**非常相似。

## 实现方式

1. 确保至少有两个类的接口不兼容：
   * 一个无法修改 （通常是第三方、 遗留系统或者存在众多已有依赖的类） 的功能性服务类。

    ```go mac.go: 服务
    package main

    import "fmt"

    type Mac struct {
    }

    func (m *Mac) InsertIntoLightningPort() {
        fmt.Println("Lightning connector is plugged into mac machine.")
    }
    ```

   * 一个或多个将受益于使用服务类的客户端类。
2. 声明客户端接口， 描述客户端如何与服务交互。

    ```go client.go: 客户端代码
    package main

    import "fmt"

    type Client struct {
    }

    func (c *Client) InsertLightningConnectorIntoComputer(com Computer) {
        fmt.Println("Client inserts Lightning connector into computer.")
        com.InsertIntoLightningPort()
    }
    ```

    ```go computer.go: 客户端接口
    package main

    type Computer interface {
        InsertIntoLightningPort()
    }
    ```

3. 创建遵循客户端接口的适配器类。 所有方法暂时都为空。
4. 在适配器类中添加一个成员变量用于保存对于服务对象的引用。 通常情况下会通过构造函数对该成员变量进行初始化， 但有时在调用其方法时将该变量传递给适配器会更方便。

    ```go windowsAdapter.go: 适配器
    package main

    import "fmt"

    type WindowsAdapter struct {
        windowMachine *Windows
    }

    func (w *WindowsAdapter) InsertIntoLightningPort() {
        fmt.Println("Adapter converts Lightning signal to USB.")
        w.windowMachine.insertIntoUSBPort()
    }
    ```

5. 依次实现适配器类客户端接口的所有方法。 适配器会将实际工作委派给服务对象， 自身只负责接口或数据格式的转换。
6. 客户端必须通过客户端接口使用适配器。 这样一来， 你就可以在不影响客户端代码的情况下修改或扩展适配器。

```go main.go
package main

func main() {

    client := &Client{}
    mac := &Mac{}

    client.InsertLightningConnectorIntoComputer(mac)

    windowsMachine := &Windows{}
    windowsMachineAdapter := &WindowsAdapter{
        windowMachine: windowsMachine,
    }

    client.InsertLightningConnectorIntoComputer(windowsMachineAdapter)
}
```

```go output.txt: 执行结果
Client inserts Lightning connector into computer.
Lightning connector is plugged into mac machine.
Client inserts Lightning connector into computer.
Adapter converts Lightning signal to USB.
USB connector is plugged into windows machine.
```

## 优缺点

| 优点                                                                                                                       | 缺点                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 单一职责原则你可以将接口或数据转换代码从程序主要业务逻辑中分离。                                                           | 代码整体复杂度增加， 因为你需要新增一系列接口和类。 有时直接更改服务类使其与其他代码兼容会更简单。 |
| 开闭原则。 只要客户端代码通过客户端接口与适配器进行交互， 你就能在不修改现有客户端代码的情况下在程序中添加新类型的适配器。 |                                                                                                    |

## 与其他模式的关系

* **桥接模式**通常会于开发前期进行设计， 使你能够将程序的各个部分独立开来以便开发。 另一方面， **适配器模式**通常在已有程序中使用， 让相互不兼容的类能很好地合作。
* **适配器**可以对已有对象的接口进行修改， **装饰模式**则能在不改变对象接口的前提下强化对象功能。 此外， 装饰还支持递归组合， 适配器则无法实现。
* **适配器**能为被封装对象提供不同的接口， **代理模式**能为对象提供相同的接口， **装饰**则能为对象提供加强的接口。
* **外观模式**为现有对象定义了一个新接口， **适配器**则会试图运用已有的接口。 适配器通常只封装一个对象， 外观通常会作用于整个对象子系统上。
* **桥接**、 **状态模式**和**策略模式** （在某种程度上包括**适配器**） 模式的接口非常相似。 实际上， 它们都基于**组合模式**——即将工作委派给其他对象， 不过也各自解决了不同的问题。 模式并不只是以特定方式组织代码的配方， 你还可以使用它们来和其他开发者讨论模式所解决的问题。
