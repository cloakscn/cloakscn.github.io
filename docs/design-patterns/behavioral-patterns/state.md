---
title: 状态模式
date: 2023-02-25 17:18:47
category:
  - 设计模式
tag:
  - 行为模式
---

状态模式是一种行为设计模式， 让你能在一个对象的内部状态变化时改变其行为， 使其看上去就像改变了自身所属的类一样。

## 模式结构

![](https://refactoringguru.cn/images/patterns/diagrams/state/structure-zh.png?id=9d132abe67abef895172aad954f1daaf)

1. **上下文 （Context）** 保存了对于一个具体状态对象的引用， 并会将所有与该状态相关的工作委派给它。 上下文通过状态接口与状态对象交互， 且会提供一个设置器用于传递新的状态对象。
2. **状态 （State）** 接口会声明特定于状态的方法。 这些方法应能被其他所有具体状态所理解， 因为你不希望某些状态所拥有的方法永远不会被调用。
3. **具体状态 （Concrete States）** 会自行实现特定于状态的方法。 为了避免多个状态中包含相似代码， 你可以提供一个封装有部分通用行为的中间抽象类。

    状态对象可存储对于上下文对象的反向引用。 状态可以通过该引用从上下文处获取所需信息， 并且能触发状态转移。
4. 上下文和具体状态都可以设置上下文的下个状态， 并可通过替换连接到上下文的状态对象来完成实际的状态转换。

## 应用场景

* **如果对象需要根据自身当前状态进行不同行为， 同时状态的数量非常多且与状态相关的代码会频繁变更的话， 可使用状态模式。**

    模式建议你将所有特定于状态的代码抽取到一组独立的类中。 这样一来， 你可以在独立于其他状态的情况下添加新状态或修改已有状态， 从而减少维护成本。

* **如果某个类需要根据成员变量的当前值改变自身行为， 从而需要使用大量的条件语句时， 可使用该模式。**

    状态模式会将这些条件语句的分支抽取到相应状态类的方法中。 同时， 你还可以清除主要类中与特定状态相关的临时成员变量和帮手方法代码。

* **当相似状态和基于条件的状态机转换中存在许多重复代码时， 可使用状态模式。**

    状态模式让你能够生成状态类层次结构， 通过将公用代码抽取到抽象基类中来减少重复。

## 实现方式

让我们在一台自动售货机上使用状态设计模式。 为简单起见， 让我们假设自动售货机仅会销售一种类型的商品。 同时， 依然为了简单起见， 我们假设自动售货机可处于 4 种不同的状态中：

* 有商品 （has­Item）
* 无商品 （no­Item）
* 商品已请求 （item­Requested）
* 收到纸币 （has­Money）

同时， 自动售货机也会有不同的操作。 再一次的， 为了简单起见， 我们假设其只会执行 4 种操作：

* 选择商品
* 添加商品
* 插入纸币
* 提供商品

当对象可以处于许多不同的状态中时应使用状态设计模式， 同时根据传入请求的不同， 对象需要变更其当前状态。

在我们的例子中， 自动售货机可以有多种不同的状态， 同时会在这些状态之间持续不断地互相转换。 我们假设自动售货机处于 **商品已请求** 状态中。 在 “插入纸币” 的操作发生后， 机器将自动转换至 **收到纸币** 状态。

根据其当前状态， 机器可就相同请求采取不同的行为。 例如， 如果用户想要购买一件商品， 机器将在 **有商品状态** 时继续操作， 而在 **无商品状态** 时拒绝操作。

自动售货机的代码不会被这一逻辑污染； 所有依赖于状态的代码都存在于各自的状态实现中。

1. 确定哪些类是上下文。 它可能是包含依赖于状态的代码的已有类； 如果特定于状态的代码分散在多个类中， 那么它可能是一个新的类。
2. 声明状态接口。 虽然你可能会需要完全复制上下文中声明的所有方法， 但最好是仅把关注点放在那些可能包含特定于状态的行为的方法上。

    === "state.go: 状态接口"

        ```go 
        package main

        type State interface {
            addItem(int) error
            requestItem() error
            insertMoney(money int) error
            dispenseItem() error
        }
        ```

3. 为每个实际状态创建一个继承于状态接口的类。 然后检查上下文中的方法并将与特定状态相关的所有代码抽取到新建的类中。


    === "noItemState.go: 具体状态"

        ```go 
        package main

        import "fmt"

        type NoItemState struct {
            vendingMachine *VendingMachine
        }

        func (i *NoItemState) requestItem() error {
            return fmt.Errorf("Item out of stock")
        }

        func (i *NoItemState) addItem(count int) error {
            i.vendingMachine.incrementItemCount(count)
            i.vendingMachine.setState(i.vendingMachine.hasItem)
            return nil
        }

        func (i *NoItemState) insertMoney(money int) error {
            return fmt.Errorf("Item out of stock")
        }
        func (i *NoItemState) dispenseItem() error {
            return fmt.Errorf("Item out of stock")
        }
        ```

    === "hasItemState.go: 具体状态"

        ```go 
        package main

        import "fmt"

        type HasItemState struct {
            vendingMachine *VendingMachine
        }

        func (i *HasItemState) requestItem() error {
            if i.vendingMachine.itemCount == 0 {
                i.vendingMachine.setState(i.vendingMachine.noItem)
                return fmt.Errorf("No item present")
            }
            fmt.Printf("Item requestd\n")
            i.vendingMachine.setState(i.vendingMachine.itemRequested)
            return nil
        }

        func (i *HasItemState) addItem(count int) error {
            fmt.Printf("%d items added\n", count)
            i.vendingMachine.incrementItemCount(count)
            return nil
        }

        func (i *HasItemState) insertMoney(money int) error {
            return fmt.Errorf("Please select item first")
        }
        func (i *HasItemState) dispenseItem() error {
            return fmt.Errorf("Please select item first")
        }
        ```

    === "itemRequestedState.go: 具体状态"

        ```go 
        package main

        import "fmt"

        type ItemRequestedState struct {
            vendingMachine *VendingMachine
        }

        func (i *ItemRequestedState) requestItem() error {
            return fmt.Errorf("Item already requested")
        }

        func (i *ItemRequestedState) addItem(count int) error {
            return fmt.Errorf("Item Dispense in progress")
        }

        func (i *ItemRequestedState) insertMoney(money int) error {
            if money < i.vendingMachine.itemPrice {
                return fmt.Errorf("Inserted money is less. Please insert %d", i.vendingMachine.itemPrice)
            }
            fmt.Println("Money entered is ok")
            i.vendingMachine.setState(i.vendingMachine.hasMoney)
            return nil
        }
        func (i *ItemRequestedState) dispenseItem() error {
            return fmt.Errorf("Please insert money first")
        }
        ```

    === "hasMoneyState.go: 具体状态"

        ```go 
        package main

        import "fmt"

        type HasMoneyState struct {
            vendingMachine *VendingMachine
        }

        func (i *HasMoneyState) requestItem() error {
            return fmt.Errorf("Item dispense in progress")
        }

        func (i *HasMoneyState) addItem(count int) error {
            return fmt.Errorf("Item dispense in progress")
        }

        func (i *HasMoneyState) insertMoney(money int) error {
            return fmt.Errorf("Item out of stock")
        }
        func (i *HasMoneyState) dispenseItem() error {
            fmt.Println("Dispensing Item")
            i.vendingMachine.itemCount = i.vendingMachine.itemCount - 1
            if i.vendingMachine.itemCount == 0 {
                i.vendingMachine.setState(i.vendingMachine.noItem)
            } else {
                i.vendingMachine.setState(i.vendingMachine.hasItem)
            }
            return nil
        }
        ```

4. 在将代码移动到状态类的过程中， 你可能会发现它依赖于上下文中的一些私有成员。 你可以采用以下几种变通方式：
   * 将这些成员变量或方法设为公有。
   * 将需要抽取的上下文行为更改为上下文中的公有方法， 然后在状态类中调用。 这种方式简陋却便捷， 你可以稍后再对其进行修补。
   * 将状态类嵌套在上下文类中。 这种方式需要你所使用的编程语言支持嵌套类。
5. 在上下文类中添加一个状态接口类型的引用成员变量， 以及一个用于修改该成员变量值的公有设置器。

    === "vendingMachine.go: 背景"

        ```go 
        package main

        import "fmt"

        type VendingMachine struct {
            hasItem       State
            itemRequested State
            hasMoney      State
            noItem        State

            currentState State

            itemCount int
            itemPrice int
        }

        func newVendingMachine(itemCount, itemPrice int) *VendingMachine {
            v := &VendingMachine{
                itemCount: itemCount,
                itemPrice: itemPrice,
            }
            hasItemState := &HasItemState{
                vendingMachine: v,
            }
            itemRequestedState := &ItemRequestedState{
                vendingMachine: v,
            }
            hasMoneyState := &HasMoneyState{
                vendingMachine: v,
            }
            noItemState := &NoItemState{
                vendingMachine: v,
            }

            v.setState(hasItemState)
            v.hasItem = hasItemState
            v.itemRequested = itemRequestedState
            v.hasMoney = hasMoneyState
            v.noItem = noItemState
            return v
        }

        func (v *VendingMachine) requestItem() error {
            return v.currentState.requestItem()
        }

        func (v *VendingMachine) addItem(count int) error {
            return v.currentState.addItem(count)
        }

        func (v *VendingMachine) insertMoney(money int) error {
            return v.currentState.insertMoney(money)
        }

        func (v *VendingMachine) dispenseItem() error {
            return v.currentState.dispenseItem()
        }

        func (v *VendingMachine) setState(s State) {
            v.currentState = s
        }

        func (v *VendingMachine) incrementItemCount(count int) {
            fmt.Printf("Adding %d items\n", count)
            v.itemCount = v.itemCount + count
        }
        ```

6. 再次检查上下文中的方法， 将空的条件语句替换为相应的状态对象方法。
7. 为切换上下文状态， 你需要创建某个状态类实例并将其传递给上下文。 你可以在上下文、 各种状态或客户端中完成这项工作。 无论在何处完成这项工作， 该类都将依赖于其所实例化的具体类。

    === "main.go: 客户端代码"

        ```go 
        package main

        import (
            "fmt"
            "log"
        )

        func main() {
            vendingMachine := newVendingMachine(1, 10)

            err := vendingMachine.requestItem()
            if err != nil {
                log.Fatalf(err.Error())
            }

            err = vendingMachine.insertMoney(10)
            if err != nil {
                log.Fatalf(err.Error())
            }

            err = vendingMachine.dispenseItem()
            if err != nil {
                log.Fatalf(err.Error())
            }

            fmt.Println()

            err = vendingMachine.addItem(2)
            if err != nil {
                log.Fatalf(err.Error())
            }

            fmt.Println()

            err = vendingMachine.requestItem()
            if err != nil {
                log.Fatalf(err.Error())
            }

            err = vendingMachine.insertMoney(10)
            if err != nil {
                log.Fatalf(err.Error())
            }

            err = vendingMachine.dispenseItem()
            if err != nil {
                log.Fatalf(err.Error())
            }
        }
        ```

    === "output.txt: 执行结果"

        ```go 
        Item requestd
        Money entered is ok
        Dispensing Item

        Adding 2 items

        Item requestd
        Money entered is ok
        Dispensing Item
        ```

## 优缺点

| 优点                                                  | 缺点                                                                                 |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 单一职责原则。 将与特定状态相关的代码放在单独的类中。 | 如果状态机只有很少的几个状态， 或者很少发生改变， 那么应用该模式可能会显得小题大作。 |
| 开闭原则。 无需修改已有状态类和上下文就能引入新状态。 |                                                                                      |
| 通过消除臃肿的状态机条件语句简化上下文代码。          |                                                                                      |

## 与其他模式的关系

* **桥接模式**、 **状态模式** 和 **策略模式** （在某种程度上包括 **适配器模式** ） 模式的接口非常相似。 实际上， 它们都基于 **组合模式** ——即将工作委派给其他对象， 不过也各自解决了不同的问题。 模式并不只是以特定方式组织代码的配方， 你还可以使用它们来和其他开发者讨论模式所解决的问题。
* **状态** 可被视为 **策略** 的扩展。 两者都基于 **组合** 机制： 它们都通过将部分工作委派给 “帮手” 对象来改变其在不同情景下的行为。 策略使得这些对象相互之间完全独立， 它们不知道其他对象的存在。 但状态模式没有限制具体状态之间的依赖， 且允许它们自行改变在不同情景下的状态。
