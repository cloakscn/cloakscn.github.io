---
title: 备忘录模式
date: 2023-02-25 17:18:47
category:
  - 设计模式
tag:
  - 行为模式
---

备忘录模式是一种行为设计模式， 允许在不暴露对象实现细节的情况下保存和恢复对象之前的状态。

## 模式结构

### 基于嵌套类的实现

![](https://refactoringguru.cn/images/patterns/diagrams/memento/structure1.png)

> 该模式的经典实现方式依赖于许多流行编程语言 （例如 C++、 C# 和 Java） 所支持的嵌套类。

1. **原发器 （Originator）** 类可以生成自身状态的快照， 也可以在需要时通过快照恢复自身状态。
2. **备忘录 （Memento）** 是原发器状态快照的值对象 （value object）。 通常做法是将备忘录设为不可变的， 并通过构造函数一次性传递数据。
3. **负责人 （Caretaker）** 仅知道 “何时” 和 “为何” 捕捉原发器的状态， 以及何时恢复状态。

    负责人通过保存备忘录栈来记录原发器的历史状态。 当原发器需要回溯历史状态时， 负责人将从栈中获取最顶部的备忘录， 并将其传递给原发器的恢复 （restoration） 方法。
4. 在该实现方法中， 备忘录类将被嵌套在原发器中。 这样原发器就可访问备忘录的成员变量和方法， 即使这些方法被声明为私有。 另一方面， 负责人对于备忘录的成员变量和方法的访问权限非常有限： 它们只能在栈中保存备忘录， 而不能修改其状态。

---

### 基于中间接口的实现

<div style="display: flex; flex-direction: row; justify-content: center; zoom: 100%; float: left">
<div>![](https://refactoringguru.cn/images/patterns/diagrams/memento/structure2.png)</div>
</div>

> 另外一种实现方法适用于不支持嵌套类的编程语言 （没错， 我说的就是 PHP）。

1. 在没有嵌套类的情况下， 你可以规定负责人仅可通过明确声明的中间接口与备忘录互动， 该接口仅声明与备忘录元数据相关的方法， 限制其对备忘录成员变量的直接访问权限。
2. 另一方面， 原发器可以直接与备忘录对象进行交互， 访问备忘录类中声明的成员变量和方法。 这种方式的缺点在于你需要将备忘录的所有成员变量声明为公有。

---

### 封装更加严格的实现

<div style="display: flex; flex-direction: row; justify-content: center; zoom: 100%; float: right">
<div>![](https://refactoringguru.cn/images/patterns/diagrams/memento/structure3.png)</div>
</div>

> 如果你不想让其他类有任何机会通过备忘录来访问原发器的状态， 那么还有另一种可用的实现方式。

1. 这种实现方式允许存在多种不同类型的原发器和备忘录。 每种原发器都和其相应的备忘录类进行交互。 原发器和备忘录都不会将其状态暴露给其他类。
2. 负责人此时被明确禁止修改存储在备忘录中的状态。 但负责人类将独立于原发器， 因为此时恢复方法被定义在了备忘录类中。
3. 每个备忘录将与创建了自身的原发器连接。 原发器会将自己及状态传递给备忘录的构造函数。 由于这些类之间的紧密联系， 只要原发器定义了合适的设置器 （setter）， 备忘录就能恢复其状态。

## 应用场景

* **当你需要创建对象状态快照来恢复其之前的状态时， 可以使用备忘录模式。**

    备忘录模式允许你复制对象中的全部状态 （包括私有成员变量）， 并将其独立于对象进行保存。 尽管大部分人因为 “撤销” 这个用例才记得该模式， 但其实它在处理事务 （比如需要在出现错误时回滚一个操作） 的过程中也必不可少。
* **当直接访问对象的成员变量、 获取器或设置器将导致封装被突破时， 可以使用该模式。**

    备忘录让对象自行负责创建其状态的快照。 任何其他对象都不能读取快照， 这有效地保障了数据的安全性。

## 实现方式

1. 确定担任原发器角色的类。 重要的是明确程序使用的一个原发器中心对象， 还是多个较小的对象。

    ```go originator.go: 原发器
    package main

    type Originator struct {
        state string
    }

    func (e *Originator) createMemento() *Memento {
        return &Memento{state: e.state}
    }

    func (e *Originator) restoreMemento(m *Memento) {
        e.state = m.getSavedState()
    }

    func (e *Originator) setState(state string) {
        e.state = state
    }

    func (e *Originator) getState() string {
        return e.state
    }
    ```

2. 创建备忘录类。 逐一声明对应每个原发器成员变量的备忘录成员变量。
3. 将备忘录类设为不可变。 备忘录只能通过构造函数一次性接收数据。 该类中不能包含设置器。

    ```go memento.go: 备忘录
    package main

    type Memento struct {
        state string
    }

    func (m *Memento) getSavedState() string {
        return m.state
    }
    ```

4. 如果你所使用的编程语言支持嵌套类， 则可将备忘录嵌套在原发器中； 如果不支持， 那么你可从备忘录类中抽取一个空接口， 然后让其他所有对象通过接口来引用备忘录。 你可在该接口中添加一些元数据操作， 但不能暴露原发器的状态。
5. 在原发器中添加一个创建备忘录的方法。 原发器必须通过备忘录构造函数的一个或多个实际参数来将自身状态传递给备忘录。

    该方法返回结果的类型必须是你在上一步中抽取的接口 （如果你已经抽取了）。 实际上， 创建备忘录的方法必须直接与备忘录类进行交互。
6. 在原发器类中添加一个用于恢复自身状态的方法。 该方法接受备忘录对象作为参数。 如果你在之前的步骤中抽取了接口， 那么可将接口作为参数的类型。 在这种情况下， 你需要将输入对象强制转换为备忘录， 因为原发器需要拥有对该对象的完全访问权限。
7. 无论负责人是命令对象、 历史记录或其他完全不同的东西， 它都必须要知道何时向原发器请求新的备忘录、 如何存储备忘录以及何时使用特定备忘录来对原发器进行恢复。

    ```go caretaker.go: 负责人
    package main

    type Caretaker struct {
        mementoArray []*Memento
    }

    func (c *Caretaker) addMemento(m *Memento) {
        c.mementoArray = append(c.mementoArray, m)
    }

    func (c *Caretaker) getMemento(index int) *Memento {
        return c.mementoArray[index]
    }
    ```

8. 负责人与原发器之间的连接可以移动到备忘录类中。 在本例中， 每个备忘录都必须与创建自己的原发器相连接。 恢复方法也可以移动到备忘录类中， 但只有当备忘录类嵌套在原发器中， 或者原发器类提供了足够多的设置器并可对其状态进行重写时， 这种方式才能实现。

```go main.go: 客户端代码
package main

import "fmt"

func main() {

    caretaker := &Caretaker{
        mementoArray: make([]*Memento, 0),
    }

    originator := &Originator{
        state: "A",
    }

    fmt.Printf("Originator Current State: %s\n", originator.getState())
    caretaker.addMemento(originator.createMemento())

    originator.setState("B")
    fmt.Printf("Originator Current State: %s\n", originator.getState())
    caretaker.addMemento(originator.createMemento())

    originator.setState("C")
    fmt.Printf("Originator Current State: %s\n", originator.getState())
    caretaker.addMemento(originator.createMemento())

    originator.restoreMemento(caretaker.getMemento(1))
    fmt.Printf("Restored to State: %s\n", originator.getState())

    originator.restoreMemento(caretaker.getMemento(0))
    fmt.Printf("Restored to State: %s\n", originator.getState())

}
```

```go output.txt: 执行结果
originator Current State: A
originator Current State: B
originator Current State: C
Restored to State: B
Restored to State: A
```

## 优缺点

| 优点                                                       | 缺点                                                                                      |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 你可以在不破坏对象封装情况的前提下创建对象状态快照。       | 如果客户端过于频繁地创建备忘录， 程序将消耗大量内存。                                     |
| 你可以通过让负责人维护原发器状态历史记录来简化原发器代码。 | 负责人必须完整跟踪原发器的生命周期， 这样才能销毁弃用的备忘录。                           |
|                                                            | 绝大部分动态编程语言 （例如 PHP、 Python 和 JavaScript） 不能确保备忘录中的状态不被修改。 |

## 与其他模式的关系

* 你可以同时使用**命令模式**和**备忘录模式**来实现 “撤销”。 在这种情况下， 命令用于对目标对象执行各种不同的操作， 备忘录用来保存一条命令执行前该对象的状态。
* 你可以同时使用**备忘录**和**迭代器模式**来获取当前迭代器的状态， 并且在需要的时候进行回滚。
* 有时候**原型模式**可以作为**备忘录**的一个简化版本， 其条件是你需要在历史记录中存储的对象的状态比较简单， 不需要链接其他外部资源， 或者链接可以方便地重建。
