---
title: 装饰模式
date: 2023-02-25 17:18:47
sticky: 4
toc: 3
---

装饰模式是一种结构型设计模式， 允许你通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为。

## 模式结构

<div style="display: flex; flex-direction: row; justify-content: center; zoom: 100%; float: right">
<div>

![](https://refactoringguru.cn/images/patterns/diagrams/decorator/structure.png)
</div>
</div>

1. **部件 （Component）** 声明封装器和被封装对象的公用接口。
2. **具体部件 （Concrete Component）** 类是被封装对象所属的类。 它定义了基础行为， 但装饰类可以改变这些行为。
3. **基础装饰 （Base Decorator）** 类拥有一个指向被封装对象的引用成员变量。 该变量的类型应当被声明为通用部件接口， 这样它就可以引用具体的部件和装饰。 装饰基类会将所有操作委派给被封装的对象。
4. **具体装饰类 （Concrete Decorators）** 定义了可动态添加到部件的额外行为。 具体装饰类会重写装饰基类的方法， 并在调用父类方法之前或之后进行额外的行为。
5. **客户端 （Client）** 可以使用多层装饰来封装部件， 只要它能使用通用接口与所有对象互动即可。

## 应用场景

* **如果你希望在无需修改代码的情况下即可使用对象， 且希望在运行时为对象新增额外的行为， 可以使用装饰模式。**

    装饰能将业务逻辑组织为层次结构， 你可为各层创建一个装饰， 在运行时将各种不同逻辑组合成对象。 由于这些对象都遵循通用接口， 客户端代码能以相同的方式使用这些对象。

* **如果用继承来扩展对象行为的方案难以实现或者根本不可行， 你可以使用该模式。**

    许多编程语言使用 `final` 最终关键字来限制对某个类的进一步扩展。 复用最终类已有行为的唯一方法是使用装饰模式： 用封装器对其进行封装。

## 实现方式

1. 确保业务逻辑可用一个基本组件及多个额外可选层次表示。
2. 找出基本组件和可选层次的通用方法。 创建一个组件接口并在其中声明这些方法。

    ```go pizza.go: 零件接口
    package main

    type IPizza interface {
        getPrice() int
    }
    ```

3. 创建一个具体组件类， 并定义其基础行为。

    ```go veggieMania.go: 具体零件
    package main

    type VeggeMania struct {
    }

    func (p *VeggeMania) getPrice() int {
        return 15
    }
    ```

4. 创建装饰基类， 使用一个成员变量存储指向被封装对象的引用。 该成员变量必须被声明为组件接口类型， 从而能在运行时连接具体组件和装饰。 装饰基类必须将所有工作委派给被封装的对象。

    ```go tomatoTopping.go: 具体装饰
    package main

    type TomatoTopping struct {
        pizza IPizza
    }

    func (c *TomatoTopping) getPrice() int {
        pizzaPrice := c.pizza.getPrice()
        return pizzaPrice + 7
    }
    ```

    ```go cheeseTopping.go: 具体装饰
    package main

    type CheeseTopping struct {
        pizza IPizza
    }

    func (c *CheeseTopping) getPrice() int {
        pizzaPrice := c.pizza.getPrice()
        return pizzaPrice + 10
    }
    ```

5. 确保所有类实现组件接口。
6. 将装饰基类扩展为具体装饰。 具体装饰必须在调用父类方法 （总是委派给被封装对象） 之前或之后执行自身的行为。
7. 客户端代码负责创建装饰并将其组合成客户端所需的形式。

```go main.go: 客户端代码
package main

import "fmt"

func main() {

    pizza := &VeggeMania{}

    //Add cheese topping
    pizzaWithCheese := &CheeseTopping{
        pizza: pizza,
    }

    //Add tomato topping
    pizzaWithCheeseAndTomato := &TomatoTopping{
        pizza: pizzaWithCheese,
    }

    fmt.Printf("Price of veggeMania with tomato and cheese topping is %d\n", pizzaWithCheeseAndTomato.getPrice())
}
```

```go output.txt: 执行结果
Price of veggeMania with tomato and cheese topping is 32
```

## 优缺点

| 优点                                                                    | 缺点                                       |
| ----------------------------------------------------------------------- | ------------------------------------------ |
| 你无需创建新子类即可扩展对象的行为。                                    | 在封装器栈中删除特定封装器比较困难。       |
| 你可以在运行时添加或删除对象的功能。                                    | 实现行为不受装饰栈顺序影响的装饰比较困难。 |
| 你可以用多个装饰封装对象来组合几种行为。                                | 各层的初始化配置代码看上去可能会很糟糕。   |
| 单一职责原则。 你可以将实现了许多不同行为的一个大类拆分为多个较小的类。 |                                            |

## 与其他模式的关系

* **适配器模式**可以对已有对象的接口进行修改， **装饰模式**则能在不改变对象接口的前提下强化对象功能。 此外， 装饰还支持递归组合， 适配器则无法实现。

* **适配器**能为被封装对象提供不同的接口， **代理模式**能为对象提供相同的接口， **装饰**则能为对象提供加强的接口。

* **责任链模式**和**装饰模式**的类结构非常相似。 两者都依赖递归组合将需要执行的操作传递给一系列对象。 但是， 两者有几点重要的不同之处。

    *责任链* 的管理者可以相互独立地执行一切操作， 还可以随时停止传递请求。 另一方面， 各种 *装饰* 可以在遵循基本接口的情况下扩展对象的行为。 此外， *装饰* 无法中断请求的传递。

* **组合模式**和**装饰**的结构图很相似， 因为两者都依赖递归组合来组织无限数量的对象。

    *装饰* 类似于组合， 但其只有一个子组件。 此外还有一个明显不同： *装饰* 为被封装对象添加了额外的职责， *组合* 仅对其子节点的结果进行了 “求和”。

    但是， 模式也可以相互合作： 你可以使用 *装饰* 来扩展 *组合* 树中特定对象的行为。

* 大量使用**组合**和**装饰**的设计通常可从对于**原型模式**的使用中获益。 你可以通过该模式来复制复杂结构， 而非从零开始重新构造。

* **装饰**可让你更改对象的外表， **策略模式**则让你能够改变其本质。

* **装饰**和**代理**有着相似的结构， 但是其意图却非常不同。 这两个模式的构建都基于**组合**原则， 也就是说一个对象应该将部分工作委派给另一个对象。 两者之间的不同之处在于 *代理* 通常自行管理其服务对象的生命周期， 而 *装饰* 的生成则总是由客户端进行控制。
