---
title: 中介者模式
date: 2023-02-25 17:18:47
category:
  - 设计模式
tag:
  - 行为模式
---

中介者模式是一种行为设计模式， 能让你减少对象之间混乱无序的依赖关系。 该模式会限制对象之间的直接交互， 迫使它们通过一个中介者对象进行合作。

## 模式结构

![](https://refactoringguru.cn/images/patterns/diagrams/mediator/structure.png)

1. **组件 （Component）** 是各种包含业务逻辑的类。 每个组件都有一个指向中介者的引用， 该引用被声明为中介者接口类型。 组件不知道中介者实际所属的类， 因此你可通过将其连接到不同的中介者以使其能在其他程序中复用。
2. **中介者 （Mediator）** 接口声明了与组件交流的方法， 但通常仅包括一个通知方法。 组件可将任意上下文 （包括自己的对象） 作为该方法的参数， 只有这样接收组件和发送者类之间才不会耦合。
3. **具体中介者 （Concrete Mediator）** 封装了多种组件间的关系。 具体中介者通常会保存所有组件的引用并对其进行管理， 甚至有时会对其生命周期进行管理。
4. 组件并不知道其他组件的情况。 如果组件内发生了重要事件， 它只能通知中介者。 中介者收到通知后能轻易地确定发送者， 这或许已足以判断接下来需要触发的组件了。

    对于组件来说， 中介者看上去完全就是一个黑箱。 发送者不知道最终会由谁来处理自己的请求， 接收者也不知道最初是谁发出了请求。

## 应用场景

* **当一些对象和其他对象紧密耦合以致难以对其进行修改时， 可使用中介者模式。**

    该模式让你将对象间的所有关系抽取成为一个单独的类， 以使对于特定组件的修改工作独立于其他组件。

* **当组件因过于依赖其他组件而无法在不同应用中复用时， 可使用中介者模式。**

    应用中介者模式后， 每个组件不再知晓其他组件的情况。 尽管这些组件无法直接交流， 但它们仍可通过中介者对象进行间接交流。 如果你希望在不同应用中复用一个组件， 则需要为其提供一个新的中介者类。

* **如果为了能在不同情景下复用一些基本行为， 导致你需要被迫创建大量组件子类时，可使用中介者模式。**

    由于所有组件间关系都被包含在中介者中， 因此你无需修改组件就能方便地新建中介者类以定义新的组件合作方式。

## 实现方式

中介者模式的一个绝佳例子就是火车站交通系统。 两列火车互相之间从来不会就站台的空闲状态进行通信。 ​ `station­Manager` **车站经理**可充当中介者， 让平台仅可由一列入场火车使用， 而将其他火车放入队列中等待。 离场火车会向车站发送通知， 便于队列中的下一列火车进站。

1. 找到一组当前紧密耦合， 且提供其独立性能带来更大好处的类 （例如更易于维护或更方便复用）。
2. 声明中介者接口并描述中介者和各种组件之间所需的交流接口。 在绝大多数情况下， 一个接收组件通知的方法就足够了。

    如果你希望在不同情景下复用组件类， 那么该接口将非常重要。 只要组件使用通用接口与其中介者合作， 你就能将该组件与不同实现中的中介者进行连接。

    === "mediator.go: 中介者接口"

        ```go 
        package main

        type Mediator interface {
            canArrive(Train) bool
            notifyAboutDeparture()
        }
        ```

3. 实现具体中介者类。 该类可从自行保存其下所有组件的引用中受益。

    === "stationManager.go: 具体中介者"

        ```go 
        package main

        type StationManager struct {
            isPlatformFree bool
            trainQueue     []Train
        }

        func newStationManger() *StationManager {
            return &StationManager{
                isPlatformFree: true,
            }
        }

        func (s *StationManager) canArrive(t Train) bool {
            if s.isPlatformFree {
                s.isPlatformFree = false
                return true
            }
            s.trainQueue = append(s.trainQueue, t)
            return false
        }

        func (s *StationManager) notifyAboutDeparture() {
            if !s.isPlatformFree {
                s.isPlatformFree = true
            }
            if len(s.trainQueue) > 0 {
                firstTrainInQueue := s.trainQueue[0]
                s.trainQueue = s.trainQueue[1:]
                firstTrainInQueue.permitArrival()
            }
        }
        ```

4. 你可以更进一步， 让中介者负责组件对象的创建和销毁。 此后， 中介者可能会与工厂或外观类似。
5. 组件必须保存对于中介者对象的引用。 该连接通常在组件的构造函数中建立， 该函数会将中介者对象作为参数传递。

    === "train.go: 组件"

        ```go 
        package main

        type Train interface {
            arrive()
            depart()
            permitArrival()
        }
        ```

    === "passengerTrain.go: 具体组件"

        ```go 
        package main

        import "fmt"

        type PassengerTrain struct {
            mediator Mediator
        }

        func (g *PassengerTrain) arrive() {
            if !g.mediator.canArrive(g) {
                fmt.Println("PassengerTrain: Arrival blocked, waiting")
                return
            }
            fmt.Println("PassengerTrain: Arrived")
        }

        func (g *PassengerTrain) depart() {
            fmt.Println("PassengerTrain: Leaving")
            g.mediator.notifyAboutDeparture()
        }

        func (g *PassengerTrain) permitArrival() {
            fmt.Println("PassengerTrain: Arrival permitted, arriving")
            g.arrive()
        }
        ```

    === "freightTrain.go: 具体组件"

        ```go 
        package main

        import "fmt"

        type FreightTrain struct {
            mediator Mediator
        }

        func (g *FreightTrain) arrive() {
            if !g.mediator.canArrive(g) {
                fmt.Println("FreightTrain: Arrival blocked, waiting")
                return
            }
            fmt.Println("FreightTrain: Arrived")
        }

        func (g *FreightTrain) depart() {
            fmt.Println("FreightTrain: Leaving")
            g.mediator.notifyAboutDeparture()
        }

        func (g *FreightTrain) permitArrival() {
            fmt.Println("FreightTrain: Arrival permitted")
            g.arrive()
        }
        ```

6. 修改组件代码， 使其可调用中介者的通知方法， 而非其他组件的方法。 然后将调用其他组件的代码抽取到中介者类中， 并在中介者接收到该组件通知时执行这些代码。

    === "main.go: 客户端代码"

        ```go 
        package main

        func main() {
            stationManager := newStationManger()

            passengerTrain := &PassengerTrain{
                mediator: stationManager,
            }
            freightTrain := &FreightTrain{
                mediator: stationManager,
            }

            passengerTrain.arrive()
            freightTrain.arrive()
            passengerTrain.depart()
        }
        ```

    === "output.txt: 执行结果"

        ```go 
        PassengerTrain: Arrived
        FreightTrain: Arrival blocked, waiting
        PassengerTrain: Leaving
        FreightTrain: Arrival permitted
        FreightTrain: Arrived
        ```

## 优缺点

| 优点                                                                           | 缺点                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------- |
| 单一职责原则。 你可以将多个组件间的交流抽取到同一位置， 使其更易于理解和维护。 | 一段时间后， 中介者可能会演化成为[上帝对象](https://baike.baidu.com/item/%E4%B8%8A%E5%B8%9D%E5%AF%B9%E8%B1%A1)。 |
| 开闭原则。 你无需修改实际组件就能增加新的中介者。                              |                                             |
| 你可以减轻应用中多个组件间的耦合情况。                                         |                                             |
| 你可以更方便地复用各个组件。                                                   |                                             |

## 与其他模式的关系

* **责任链模式**、 **命令模式**、 **中介者模式** 和 **观察者模式** 用于处理请求发送者和接收者之间的不同连接方式：

    * 责任链按照顺序将请求动态传递给一系列的潜在接收者， 直至其中一名接收者对请求进行处理。
    * 命令在发送者和请求者之间建立单向连接。
    * 中介者清除了发送者和请求者之间的直接连接， 强制它们通过一个中介对象进行间接沟通。
    * 观察者允许接收者动态地订阅或取消接收请求。

* **外观模式** 和 **中介者** 的职责类似： 它们都尝试在大量紧密耦合的类中组织起合作。

    * 外观为子系统中的所有对象定义了一个简单接口， 但是它不提供任何新功能。 子系统本身不会意识到外观的存在。 子系统中的对象可以直接进行交流。
    * 中介者将系统中组件的沟通行为中心化。 各组件只知道中介者对象， 无法直接相互交流。

* **中介者** 和 **观察者** 之间的区别往往很难记住。 在大部分情况下， 你可以使用其中一种模式， 而有时可以同时使用。 让我们来看看如何做到这一点。

    中介者的主要目标是消除一系列系统组件之间的相互依赖。 这些组件将依赖于同一个中介者对象。 观察者的目标是在对象之间建立动态的单向连接， 使得部分对象可作为其他对象的附属发挥作用。

    有一种流行的中介者模式实现方式依赖于观察者。 中介者对象担当发布者的角色， 其他组件则作为订阅者， 可以订阅中介者的事件或取消订阅。 当中介者以这种方式实现时， 它可能看上去与观察者非常相似。

    当你感到疑惑时， 记住可以采用其他方式来实现中介者。 例如， 你可永久性地将所有组件链接到同一个中介者对象。 这种实现方式和观察者并不相同， 但这仍是一种中介者模式。

    假设有一个程序， 其所有的组件都变成了发布者， 它们之间可以相互建立动态连接。 这样程序中就没有中心化的中介者对象， 而只有一些分布式的观察者。
