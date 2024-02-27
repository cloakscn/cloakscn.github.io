---
title: 桥接模式
date: 2023-02-25 17:18:47
sticky: 2
toc: 3
---

桥接模式是一种结构型设计模式， 可将一个大类或一系列紧密相关的类拆分为抽象和实现两个独立的层次结构， 从而能在开发时分别使用。

## 模式结构

<div style="display: flex; flex-direction: row; justify-content: center; zoom: 100%; float: right">
<div>

![](https://refactoringguru.cn/images/patterns/diagrams/bridge/structure-zh.png?id=8f6df21bea5074e798d6a4330c1ffcf9)
</div>
</div>

1. **抽象部分 （Abstraction）** 提供高层控制逻辑， 依赖于完成底层实际工作的实现对象。
2. **实现部分 （Implementation）** 为所有具体实现声明通用接口。 抽象部分仅能通过在这里声明的方法与实现对象交互。

    抽象部分可以列出和实现部分一样的方法， 但是抽象部分通常声明一些复杂行为， 这些行为依赖于多种由实现部分声明的原语操作。
3. **具体实现 （Concrete Implementations）** 中包括特定于平台的代码。
4. **精确抽象 （Refined Abstraction）** 提供控制逻辑的变体。 与其父类一样， 它们通过通用实现接口与不同的实现进行交互。
5. 通常情况下，**客户端 （Client）** 仅关心如何与抽象部分合作。 但是， 客户端需要将抽象对象与一个实现对象连接起来。

## 应用场景

* **如果你想要拆分或重组一个具有多重功能的庞杂类 （例如能与多个数据库服务器进行交互的类）， 可以使用桥接模式。**

    类的代码行数越多， 弄清其运作方式就越困难， 对其进行修改所花费的时间就越长。 一个功能上的变化可能需要在整个类范围内进行修改， 而且常常会产生错误， 甚至还会有一些严重的副作用。

    桥接模式可以将庞杂类拆分为几个类层次结构。 此后， 你可以修改任意一个类层次结构而不会影响到其他类层次结构。 这种方法可以简化代码的维护工作， 并将修改已有代码的风险降到最低。

* **如果你希望在几个独立维度上扩展一个类， 可使用该模式。**

    桥接建议将每个维度抽取为独立的类层次。 初始类将相关工作委派给属于对应类层次的对象， 无需自己完成所有工作。

    *顺便提一句， 最后一点是很多人混淆桥接模式和策略模式的主要原因。 记住， 设计模式并不仅是一种对类进行组织的方式， 它还能用于沟通意图和解决问题。*

## 实现方式

假设你有两台电脑： 一台 Mac 和一台 Windows。 还有两台打印机： 爱普生和惠普。 这两台电脑和打印机可能会任意组合使用。 客户端不应去担心如何将打印机连接至计算机的细节问题。


1. 明确类中独立的维度。 独立的概念可能是： 抽象/平台， 域/基础设施， 前端/后端或接口/实现。

    如果引入新的打印机， 我们也不会希望代码量成倍增长。 所以， 我们创建了两个层次结构， 而不是 2x2 组合的四个结构体：

    * 抽象层： 代表计算机
    * 实施层： 代表打印机

    这两个层次可通过桥接进行沟通， 其中抽象层 （计算机） 包含对于实施层 （打印机） 的引用。 抽象层和实施层均可独立开发， 不会相互影响。

2. 了解客户端的业务需求， 并在抽象基类中定义它们。

    ```go computer.go: 抽象
    package main

    type Computer interface {
        Print()
        SetPrinter(Printer)
    }
    ```

3. 确定在所有平台上都可执行的业务。 并在通用实现接口中声明抽象部分所需的业务。

    ```go printer.go: 实施
    package main

    type Printer interface {
        PrintFile()
    }
    ```

    ```go epson.go: 具体实施
    package main

    import "fmt"

    type Epson struct {
    }

    func (p *Epson) PrintFile() {
        fmt.Println("Printing by a EPSON Printer")
    }
    ```

    ```go hp.go: 具体实施
    package main

    import "fmt"

    type Hp struct {
    }

    func (p *Hp) PrintFile() {
        fmt.Println("Printing by a HP Printer")
    }
    ```

4. 为你域内的所有平台创建实现类， 但需确保它们遵循实现部分的接口。
5. 在抽象类中添加指向实现类型的引用成员变量。 抽象部分会将大部分工作委派给该成员变量所指向的实现对象。

    ```go mac.go: 精确抽象
    package main

    import "fmt"

    type Mac struct {
        printer Printer
    }

    func (m *Mac) Print() {
        fmt.Println("Print request for mac")
        m.printer.PrintFile()
    }

    func (m *Mac) SetPrinter(p Printer) {
        m.printer = p
    }
    ```

    ```go windows.go: 精确抽象
    package main

    import "fmt"

    type Windows struct {
        printer Printer
    }

    func (w *Windows) Print() {
        fmt.Println("Print request for windows")
        w.printer.PrintFile()
    }

    func (w *Windows) SetPrinter(p Printer) {
        w.printer = p
    }
    ```

6. 如果你的高层逻辑有多个变体， 则可通过扩展抽象基类为每个变体创建一个精确抽象。
7. 客户端代码必须将实现对象传递给抽象部分的构造函数才能使其能够相互关联。 此后， 客户端只需与抽象对象进行交互， 无需和实现对象打交道。

```go main.go: 客户端代码
package main

import "fmt"

func main() {

    hpPrinter := &Hp{}
    epsonPrinter := &Epson{}

    macComputer := &Mac{}

    macComputer.SetPrinter(hpPrinter)
    macComputer.Print()
    fmt.Println()

    macComputer.SetPrinter(epsonPrinter)
    macComputer.Print()
    fmt.Println()

    winComputer := &Windows{}

    winComputer.SetPrinter(hpPrinter)
    winComputer.Print()
    fmt.Println()

    winComputer.SetPrinter(epsonPrinter)
    winComputer.Print()
    fmt.Println()
}
```

```go output.txt: 执行结果
Print request for mac
Printing by a HP Printer

Print request for mac
Printing by a EPSON Printer

Print request for windows
Printing by a HP Printer

Print request for windows
```

## 优缺点

| 优点                                                               | 缺点                                         |
| ------------------------------------------------------------------ | -------------------------------------------- |
| 你可以创建与平台无关的类和程序。                                   | 对高内聚的类使用该模式可能会让代码更加复杂。 |
| 客户端代码仅与高层抽象部分进行互动， 不会接触到平台的详细信息。    |                                              |
| 开闭原则。 你可以新增抽象部分和实现部分， 且它们之间不会相互影响。 |                                              |
| 单一职责原则。 抽象部分专注于处理高层逻辑， 实现部分处理平台细节。 |                                              |

## 与其他模式的关系

* **桥接模式**通常会于**开发前期**进行设计， 使你能够将程序的各个部分独立开来以便开发。 另一方面， **适配器模式**通常在**已有程序中使用**， 让相互不兼容的类能很好地合作。
* **桥接**、 **状态模式**和**策略模式** （在某种程度上包括适配器） 模式的接口非常相似。 实际上， 它们都基于**组合模式**——即将工作委派给其他对象， 不过也各自解决了不同的问题。 模式并不只是以特定方式组织代码的配方， 你还可以使用它们来和其他开发者讨论模式所解决的问题。
* 你可以将**抽象工厂模式**和**桥接**搭配使用。 如果由桥接定义的抽象只能与特定实现合作， 这一模式搭配就非常有用。 在这种情况下， 抽象工厂可以对这些关系进行封装， 并且对客户端代码隐藏其复杂性。
* 你可以结合使用**生成器模式**和**桥接模式**： 主管类负责抽象工作， 各种不同的生成器负责实现工作。
