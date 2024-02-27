---
title: 享元模式
date: 2023-02-25 17:18:47
sticky: 6
toc: 3
---

享元模式是一种结构型设计模式， 它摒弃了在每个对象中保存所有数据的方式， 通过共享多个对象所共有的相同状态， 让你能在有限的内存容量中载入更多对象。

**享元与不可变性**

由于享元对象可在不同的情景中使用， 你必须确保其状态不能被修改。 享元类的状态只能由构造函数的参数进行一次性初始化， 它不能对其他对象公开其设置器或公有成员变量。

**享元工厂**

为了能更方便地访问各种享元， 你可以创建一个工厂方法来管理已有享元对象的缓存池。 工厂方法从客户端处接收目标享元对象的内在状态作为参数， 如果它能在缓存池中找到所需享元， 则将其返回给客户端； 如果没有找到， 它就会新建一个享元， 并将其添加到缓存池中。

你可以选择在程序的不同地方放入该函数。 最简单的选择就是将其放置在享元容器中。 除此之外， 你还可以新建一个工厂类， 或者创建一个静态的工厂方法并将其放入实际的享元类中。

## 模式结构

<div style="display: flex; flex-direction: row; justify-content: center; zoom: 100%; float: right">
<div>

![](https://refactoringguru.cn/images/patterns/diagrams/flyweight/structure.png?id=c1e7e1748f957a4792822f902bc1d420)
</div>
</div>

1. 享元模式只是一种优化。 在应用该模式之前， 你要确定程序中存在与大量类似对象同时占用内存相关的内存消耗问题， 并且确保该问题无法使用其他更好的方式来解决。
2. **享元 （Flyweight）** 类包含原始对象中部分能在多个对象中共享的状态。 同一享元对象可在许多不同情景中使用。 享元中存储的状态被称为 “内在状态”。 传递给享元方法的状态被称为 “外在状态”。
3. **情景 （Context）** 类包含原始对象中各不相同的外在状态。 情景与享元对象组合在一起就能表示原始对象的全部状态。
4. 通常情况下， 原始对象的行为会保留在享元类中。 因此调用享元方法必须提供部分外在状态作为参数。 但你也可将行为移动到情景类中， 然后将连入的享元作为单纯的数据对象。
5. **客户端 （Client）** 负责计算或存储享元的外在状态。 在客户端看来， 享元是一种可在运行时进行配置的模板对象， 具体的配置方式为向其方法中传入一些情景数据参数。
6. **享元工厂 （Flyweight Factory）** 会对已有享元的缓存池进行管理。 有了工厂后， 客户端就无需直接创建享元， 它们只需调用工厂并向其传递目标享元的一些内在状态即可。 工厂会根据参数在之前已创建的享元中进行查找， 如果找到满足条件的享元就将其返回； 如果没有找到就根据参数新建享元。

## 应用场景

* **仅在程序必须支持大量对象且没有足够的内存容量时使用享元模式。**

    应用该模式所获的收益大小取决于使用它的方式和情景。 它在下列情况中最有效：

    * 程序需要生成数量巨大的相似对象
    * 这将耗尽目标设备的所有内存
    * 对象中包含可抽取且能在多个对象间共享的重复状态。

## 实现方式

在游戏 《反恐精英》 中， 恐怖分子和反恐精英身着不同类型的衣物。 为了简便起见， 我们就假设双方都各有一种服装类型。 服装对象嵌入在玩家对象之中， 如下所示。

下面是玩家的结构体。 我们可以看到， 服装对象是嵌入在玩家结构体之中的：

```go
type player struct {
    dress      dress
    playerType string // 可为 T 或 CT
    lat        int
    long       int
}
```

假设目前有 5 名恐怖分子和 5 名反恐精英， 一共是 10 名玩家。 那么关于服装， 我们就有两个选项了。

1. 10 个玩家对象各自创建不同的服装对象， 并将其嵌入。 总共会创建 10 个服装对象。
2. 我们创建两个服装对象：
    * 单一恐怖分子服装对象： 其将在 5 名恐怖分子之间共享。
    * 单一反恐精英服装对象： 其将在 5 名反恐精英之间共享。
你可以看到， 方法 1 中我们总共创建了 10 个服装对象； 方法 2 中则只有 2 个服装对象。 第二种方法， 就是我们所遵循的享元设计模式。 我们所创建的 2 个服装对象被称为是享元对象。

享元模式会从对象中提取出公共部分并创建享元对象。 这些享元对象 （服装） 随后可在多个对象 （玩家） 中分享。 这极大地减少了服装对象的数量， 更棒的是即便你创建了更多玩家， 也只需这么两个服装对象就足够了。

在享元模式中， 我们会将享元对象存储在 map 容器中。 每当创建共享享元对象的其他对象时， 都会从 map 容器中获取享元对象。

下面让我们来看看此类安排的内部状态和外部状态：

* 内部状态： 内部状态的服装可在多个恐怖分子和反恐精英对象间共享。
* 外部状态： 玩家位置和玩家所使用的武器就是外部状态， 因为其在每个对象中都是不同的。

---

1. 将需要改写为享元的类成员变量拆分为两个部分：
    * 内在状态： 包含不变的、 可在许多对象中重复使用的数据的成员变量。
    * 外在状态： 包含每个对象各自不同的情景数据的成员变量

    ```go player.go: 背景
    package main

    type Player struct {
        dress      Dress
        playerType string
        lat        int
        long       int
    }

    func newPlayer(playerType, dressType string) *Player {
        dress, _ := getDressFactorySingleInstance().getDressByType(dressType)
        return &Player{
            playerType: playerType,
            dress:      dress,
        }
    }

    func (p *Player) newLocation(lat, long int) {
        p.lat = lat
        p.long = long
    }
    ```

2. 保留类中表示内在状态的成员变量， 并将其属性设置为不可修改。 这些变量仅可在构造函数中获得初始数值。

    ```go dress.go: 享元接口
    package main

    type Dress interface {
        getColor() string
    }
    ```

    ```go terroristDress.go: 具体享元对象
    package main

    type TerroristDress struct {
        color string
    }

    func (t *TerroristDress) getColor() string {
        return t.color
    }

    func newTerroristDress() *TerroristDress {
        return &TerroristDress{color: "red"}
    }
    ```

    ```go counterTerroristDress.go: 具体享元对象
    package main

    type CounterTerroristDress struct {
        color string
    }

    func (c *CounterTerroristDress) getColor() string {
        return c.color
    }

    func newCounterTerroristDress() *CounterTerroristDress {
        return &CounterTerroristDress{color: "green"}
    }
    ```

3. 找到所有使用外在状态成员变量的方法， 为在方法中所用的每个成员变量新建一个参数， 并使用该参数代替成员变量。
4. 你可以有选择地创建工厂类来管理享元缓存池， 它负责在新建享元时检查已有的享元。 如果选择使用工厂， 客户端就只能通过工厂来请求享元， 它们需要将享元的内在状态作为参数传递给工厂。

    ```go dressFactory.go: 享元工厂
    package main

    import "fmt"

    const (
        //TerroristDressType terrorist dress type
        TerroristDressType = "tDress"
        //CounterTerrroristDressType terrorist dress type
        CounterTerrroristDressType = "ctDress"
    )

    var (
        dressFactorySingleInstance = &DressFactory{
            dressMap: make(map[string]Dress),
        }
    )

    type DressFactory struct {
        dressMap map[string]Dress
    }

    func (d *DressFactory) getDressByType(dressType string) (Dress, error) {
        if d.dressMap[dressType] != nil {
            return d.dressMap[dressType], nil
        }

        if dressType == TerroristDressType {
            d.dressMap[dressType] = newTerroristDress()
            return d.dressMap[dressType], nil
        }
        if dressType == CounterTerrroristDressType {
            d.dressMap[dressType] = newCounterTerroristDress()
            return d.dressMap[dressType], nil
        }

        return nil, fmt.Errorf("Wrong dress type passed")
    }

    func getDressFactorySingleInstance() *DressFactory {
        return dressFactorySingleInstance
    }
    ```

5. 客户端必须存储和计算外在状态 （情景） 的数值， 因为只有这样才能调用享元对象的方法。 为了使用方便， 外在状态和引用享元的成员变量可以移动到单独的情景类中。

```go main.go: 客户端代码
package main

import "fmt"

func main() {
    game := newGame()

    //Add Terrorist
    game.addTerrorist(TerroristDressType)
    game.addTerrorist(TerroristDressType)
    game.addTerrorist(TerroristDressType)
    game.addTerrorist(TerroristDressType)

    //Add CounterTerrorist
    game.addCounterTerrorist(CounterTerrroristDressType)
    game.addCounterTerrorist(CounterTerrroristDressType)
    game.addCounterTerrorist(CounterTerrroristDressType)

    dressFactoryInstance := getDressFactorySingleInstance()

    for dressType, dress := range dressFactoryInstance.dressMap {
        fmt.Printf("DressColorType: %s\nDressColor: %s\n", dressType, dress.getColor())
    }
}
```

```go output.txt: 执行结果
DressColorType: ctDress
DressColor: green
DressColorType: tDress
DressColor: red
```

## 优缺点

| 优点                                                  | 缺点                                                                                      |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 如果程序中有很多相似对象， 那么你将可以节省大量内存。 | 你可能需要牺牲执行速度来换取内存， 因为他人每次调用享元方法时都需要重新计算部分情景数据。 |
|                                                       | 代码会变得更加复杂。 团队中的新成员总是会问： ​ “为什么要像这样拆分一个实体的状态？”。    |

## 与其他模式的关系

* 你可以使用**享元模式**实现**组合模式**树的共享叶节点以节省内存。
* **享元**展示了如何生成大量的小型对象， **外观模式**则展示了如何用一个对象来代表整个子系统。
* 如果你能将对象的所有共享状态简化为一个享元对象， 那么**享元**就和**单例模式**类似了。 但这两个模式有两个根本性的不同。
    1. 只会有一个单例实体， 但是享元类可以有多个实体， 各实体的内在状态也可以不同。
    2. 单例对象可以是可变的。 享元对象是不可变的。
