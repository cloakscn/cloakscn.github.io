---
title: 观察者模式
date: 2023-02-25 17:18:47
category:
  - 设计模式
tag:
  - 行为模式
---

观察者模式是一种行为设计模式， 允许你定义一种订阅机制， 可在对象事件发生时通知多个 “观察” 该对象的其他对象。

## 模式结构

![观察者模式结构](https://refactoringguru.cn/images/patterns/diagrams/observer/structure.png)

1. **发布者 （Publisher）** 会向其他对象发送值得关注的事件。 事件会在发布者自身状态改变或执行特定行为后发生。 发布者中包含一个允许新订阅者加入和当前订阅者离开列表的订阅构架。
2. 当新事件发生时， 发送者会遍历订阅列表并调用每个订阅者对象的通知方法。 该方法是在订阅者接口中声明的。
3. **订阅者 （Subscriber）** 接口声明了通知接口。 在绝大多数情况下， 该接口仅包含一个 update更新方法。 该方法可以拥有多个参数， 使发布者能在更新时传递事件的详细信息。
4. **具体订阅者 （Concrete Subscribers）** 可以执行一些操作来回应发布者的通知。 所有具体订阅者类都实现了同样的接口， 因此发布者不需要与具体类相耦合。
5. 订阅者通常需要一些上下文信息来正确地处理更新。 因此， 发布者通常会将一些上下文数据作为通知方法的参数进行传递。 发布者也可将自身作为参数进行传递， 使订阅者直接获取所需的数据。
6. **客户端 （Client）**会分别创建发布者和订阅者对象， 然后为订阅者注册发布者更新。

## 应用场景

* **当一个对象状态的改变需要改变其他对象， 或实际对象是事先未知的或动态变化的时，可使用观察者模式。**
  
    当你使用图形用户界面类时通常会遇到一个问题。 比如， 你创建了自定义按钮类并允许客户端在按钮中注入自定义代码， 这样当用户按下按钮时就会触发这些代码。

    观察者模式允许任何实现了订阅者接口的对象订阅发布者对象的事件通知。 你可在按钮中添加订阅机制， 允许客户端通过自定义订阅类注入自定义代码。
* **当应用中的一些对象必须观察其他对象时， 可使用该模式。 但仅能在有限时间内或特定情况下使用。**
  
    订阅列表是动态的， 因此订阅者可随时加入或离开该列表。

## 实现方式

在电商网站中， 商品时不时地会出现缺货情况。 可能会有客户对于缺货的特定商品表现出兴趣。 这一问题有三种解决方案：

1. 客户以一定的频率查看商品的可用性。
2. 电商网站向客户发送有库存的所有新商品。
3. 客户只订阅其感兴趣的特定商品， 商品可用时便会收到通知。 同时， 多名客户也可订阅同一款产品。

选项 3 是最具可行性的， 这其实就是观察者模式的思想。 观察者模式的主要组成部分有：

* 会在有任何事发生时发布事件的主体。
* 订阅了主体事件并会在事件发生时收到通知的观察者。

1. 仔细检查你的业务逻辑， 试着将其拆分为两个部分： 独立于其他代码的核心功能将作为发布者； 其他代码则将转化为一组订阅类。
2. 声明订阅者接口。 该接口至少应声明一个 update方法。

    ```go 📄subject.go: 主体
    package main

    type Subject interface {
        register(observer Observer)
        deregister(observer Observer)
        notifyAll()
    }
    ```

    ```go 📄 observer.go: 观察者
    package main

    type Observer interface {
        update(string)
        getID() string
    }
    ```

    ```go 📄customer.go: 具体观察者
    package main

    import "fmt"

    type Customer struct {
        id string
    }

    func (c *Customer) update(itemName string) {
        fmt.Printf("Sending email to customer %s for item %s\n", c.id, itemName)
    }

    func (c *Customer) getID() string {
        return c.id
    }
    ```

3. 声明发布者接口并定义一些接口来在列表中添加和删除订阅对象。 记住发布者必须仅通过订阅者接口与它们进行交互。
4. 确定存放实际订阅列表的位置并实现订阅方法。 通常所有类型的发布者代码看上去都一样， 因此将列表放置在直接扩展自发布者接口的抽象类中是显而易见的。 具体发布者会扩展该类从而继承所有的订阅行为。

   但是， 如果你需要在现有的类层次结构中应用该模式， 则可以考虑使用组合的方式： 将订阅逻辑放入一个独立的对象， 然后让所有实际订阅者使用该对象。
5. 创建具体发布者类。 每次发布者发生了重要事件时都必须通知所有的订阅者。

    ```go 📄item.go: 具体主体
    package main

    import "fmt"

    type Item struct {
        observerList []Observer
        name         string
        inStock      bool
    }

    func newItem(name string) *Item {
        return &Item{
            name: name,
        }
    }
    func (i *Item) updateAvailability() {
        fmt.Printf("Item %s is now in stock\n", i.name)
        i.inStock = true
        i.notifyAll()
    }
    func (i *Item) register(o Observer) {
        i.observerList = append(i.observerList, o)
    }

    func (i *Item) deregister(o Observer) {
        i.observerList = removeFromslice(i.observerList, o)
    }

    func (i *Item) notifyAll() {
        for _, observer := range i.observerList {
            observer.update(i.name)
        }
    }

    func removeFromslice(observerList []Observer, observerToRemove Observer) []Observer {
        observerListLength := len(observerList)
        for i, observer := range observerList {
            if observerToRemove.getID() == observer.getID() {
                observerList[observerListLength-1], observerList[i] = observerList[i], observerList[observerListLength-1]
                return observerList[:observerListLength-1]
            }
        }
        return observerList
    }
    ```

6. 在具体订阅者类中实现通知更新的方法。 绝大部分订阅者需要一些与事件相关的上下文数据。 这些数据可作为通知方法的参数来传递。

   但还有另一种选择。 订阅者接收到通知后直接从通知中获取所有数据。 在这种情况下， 发布者必须通过更新方法将自身传递出去。 另一种不太灵活的方式是通过构造函数将发布者与订阅者永久性地连接起来。
7. 客户端必须生成所需的全部订阅者， 并在相应的发布者处完成注册工作。

```go 📄main.go: 客户端代码
package main

func main() {

    shirtItem := newItem("Nike Shirt")

    observerFirst := &Customer{id: "abc@gmail.com"}
    observerSecond := &Customer{id: "xyz@gmail.com"}

    shirtItem.register(observerFirst)
    shirtItem.register(observerSecond)

    shirtItem.updateAvailability()
}
```

```go 📄output.txt: 执行结果
Item Nike Shirt is now in stock
Sending email to customer abc@gmail.com for item Nike Shirt
Sending email to customer xyz@gmail.com for item Nike Shirt
```

## 优缺点

| 优点                                                                                           | 缺点                       |
| ---------------------------------------------------------------------------------------------- | -------------------------- |
| 开闭原则。 你无需修改发布者代码就能引入新的订阅者类 （如果是发布者接口则可轻松引入发布者类）。 | 订阅者的通知顺序是随机的。 |
| 你可以在运行时建立对象之间的联系。                                                             |                            |

## 与其他模式的关系

* **责任链模式**、 **命令模式**、 **中介者模式**和**观察者模式**用于处理请求发送者和接收者之间的不同连接方式：
  * 责任链按照顺序将请求动态传递给一系列的潜在接收者， 直至其中一名接收者对请求进行处理。
  * 命令在发送者和请求者之间建立单向连接。
  * 中介者清除了发送者和请求者之间的直接连接， 强制它们通过一个中介对象进行间接沟通。
  * 观察者允许接收者动态地订阅或取消接收请求。
* **中介者**和**观察者**之间的区别往往很难记住。 在大部分情况下， 你可以使用其中一种模式， 而有时可以同时使用。 让我们来看看如何做到这一点。
  * 中介者的主要目标是消除一系列系统组件之间的相互依赖。 这些组件将依赖于同一个中介者对象。 观察者的目标是在对象之间建立动态的单向连接， 使得部分对象可作为其他对象的附属发挥作用。
  * 有一种流行的中介者模式实现方式依赖于观察者。 中介者对象担当发布者的角色， 其他组件则作为订阅者， 可以订阅中介者的事件或取消订阅。 当中介者以这种方式实现时， 它可能看上去与观察者非常相似。
  * 当你感到疑惑时， 记住可以采用其他方式来实现中介者。 例如， 你可永久性地将所有组件链接到同一个中介者对象。 这种实现方式和观察者并不相同， 但这仍是一种中介者模式。
  * 假设有一个程序， 其所有的组件都变成了发布者， 它们之间可以相互建立动态连接。 这样程序中就没有中心化的中介者对象， 而只有一些分布式的观察者。
