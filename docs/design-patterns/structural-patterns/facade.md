---
title: 外观模式
date: 2023-02-25 17:18:47
category:
  - 设计模式
tag:
  - 建造者模式
---

外观模式是一种结构型设计模式， 能为程序库、 框架或其他复杂类提供一个简单的接口。

## 模式结构

![](https://refactoringguru.cn/images/patterns/diagrams/facade/structure.png)

1. **外观 （Facade）** 提供了一种访问特定子系统功能的便捷方式， 其了解如何重定向客户端请求， 知晓如何操作一切活动部件。
2. **创建附加外观 （Additional Facade）** 类可以避免多种不相关的功能污染单一外观， 使其变成又一个复杂结构。 客户端和其他外观都可使用附加外观。
3. **复杂子系统 （Complex Subsystem）** 由数十个不同对象构成。 如果要用这些对象完成有意义的工作， 你必须深入了解子系统的实现细节， 比如按照正确顺序初始化对象和为其提供正确格式的数据。

    子系统类不会意识到外观的存在， 它们在系统内运作并且相互之间可直接进行交互。
4. **客户端 （Client）** 使用外观代替对子系统对象的直接调用。

## 应用场景

* **如果你需要一个指向复杂子系统的直接接口， 且该接口的功能有限， 则可以使用外观模式。**

    子系统通常会随着时间的推进变得越来越复杂。 即便是应用了设计模式， 通常你也会创建更多的类。 尽管在多种情形中子系统可能是更灵活或易于复用的， 但其所需的配置和样板代码数量将会增长得更快。 为了解决这个问题， 外观将会提供指向子系统中最常用功能的快捷方式， 能够满足客户端的大部分需求。

* **如果需要将子系统组织为多层结构， 可以使用外观。**

    创建外观来定义子系统中各层次的入口。 你可以要求子系统仅使用外观来进行交互， 以减少子系统之间的耦合。

    让我们回到视频转换框架的例子。 该框架可以拆分为两个层次： 音频相关和视频相关。 你可以为每个层次创建一个外观， 然后要求各层的类必须通过这些外观进行交互。 这种方式看上去与[中介者](../behavioral-patterns/mediator.md)模式非常相似。

## 实现方式

人们很容易低估使用信用卡订购披萨时幕后工作的复杂程度。 在整个过程中会有不少的子系统发挥作用。 下面是其中的一部分：

* 检查账户
* 检查安全码
* 借记/贷记余额
* 账簿录入
* 发送消息通知

在如此复杂的系统中， 可以说是一步错步步错， 很容易就会引发大的问题。 这就是为什么我们需要外观模式， 让客户端可以使用一个简单的接口来处理众多组件。 客户端只需要输入卡片详情、 安全码、 支付金额以及操作类型即可。 外观模式会与多种组件进一步地进行沟通， 而又不会向客户端暴露其内部的复杂性。

1. 考虑能否在现有子系统的基础上提供一个更简单的接口。 如果该接口能让客户端代码独立于众多子系统类， 那么你的方向就是正确的。
2. 在一个新的外观类中声明并实现该接口。 外观应将客户端代码的调用重定向到子系统中的相应对象处。 如果客户端代码没有对子系统进行初始化， 也没有对其后续生命周期进行管理， 那么外观必须完成此类工作。

    ```go walletFacade.go: 外观
    package main

    import "fmt"

    type WalletFacade struct {
        account      *Account
        wallet       *Wallet
        securityCode *SecurityCode
        notification *Notification
        ledger       *Ledger
    }

    func newWalletFacade(accountID string, code int) *WalletFacade {
        fmt.Println("Starting create account")
        walletFacacde := &WalletFacade{
            account:      newAccount(accountID),
            securityCode: newSecurityCode(code),
            wallet:       newWallet(),
            notification: &Notification{},
            ledger:       &Ledger{},
        }
        fmt.Println("Account created")
        return walletFacacde
    }

    func (w *WalletFacade) addMoneyToWallet(accountID string, securityCode int, amount int) error {
        fmt.Println("Starting add money to wallet")
        err := w.account.checkAccount(accountID)
        if err != nil {
            return err
        }
        err = w.securityCode.checkCode(securityCode)
        if err != nil {
            return err
        }
        w.wallet.creditBalance(amount)
        w.notification.sendWalletCreditNotification()
        w.ledger.makeEntry(accountID, "credit", amount)
        return nil
    }

    func (w *WalletFacade) deductMoneyFromWallet(accountID string, securityCode int, amount int) error {
        fmt.Println("Starting debit money from wallet")
        err := w.account.checkAccount(accountID)
        if err != nil {
            return err
        }

        err = w.securityCode.checkCode(securityCode)
        if err != nil {
            return err
        }
        err = w.wallet.debitBalance(amount)
        if err != nil {
            return err
        }
        w.notification.sendWalletDebitNotification()
        w.ledger.makeEntry(accountID, "debit", amount)
        return nil
    }
    ```

3. 如果要充分发挥这一模式的优势， 你必须确保所有客户端代码仅通过外观来与子系统进行交互。 此后客户端代码将不会受到任何由子系统代码修改而造成的影响， 比如子系统升级后， 你只需修改外观中的代码即可。

    ```go account.go: 复杂子系统的组成部分
    package main

    import "fmt"

    type Account struct {
        name string
    }

    func newAccount(accountName string) *Account {
        return &Account{
            name: accountName,
        }
    }

    func (a *Account) checkAccount(accountName string) error {
        if a.name != accountName {
            return fmt.Errorf("Account Name is incorrect")
        }
        fmt.Println("Account Verified")
        return nil
    }
    ```

    ```go securityCode.go: 复杂子系统的组成部分
    package main

    import "fmt"

    type SecurityCode struct {
        code int
    }

    func newSecurityCode(code int) *SecurityCode {
        return &SecurityCode{
            code: code,
        }
    }

    func (s *SecurityCode) checkCode(incomingCode int) error {
        if s.code != incomingCode {
            return fmt.Errorf("Security Code is incorrect")
        }
        fmt.Println("SecurityCode Verified")
        return nil
    }
    ```

    ```go wallet.go: 复杂子系统的组成部分
    package main

    import "fmt"

    type Wallet struct {
        balance int
    }

    func newWallet() *Wallet {
        return &Wallet{
            balance: 0,
        }
    }

    func (w *Wallet) creditBalance(amount int) {
        w.balance += amount
        fmt.Println("Wallet balance added successfully")
        return
    }

    func (w *Wallet) debitBalance(amount int) error {
        if w.balance < amount {
            return fmt.Errorf("Balance is not sufficient")
        }
        fmt.Println("Wallet balance is Sufficient")
        w.balance = w.balance - amount
        return nil
    }
    ```

    ```go ledger.go: 复杂子系统的组成部分
    package main

    import "fmt"

    type Ledger struct {
    }

    func (s *Ledger) makeEntry(accountID, txnType string, amount int) {
        fmt.Printf("Make ledger entry for accountId %s with txnType %s for amount %d\n", accountID, txnType, amount)
        return
    }
    ```

    ```go notification.go: 复杂子系统的组成部分
    package main

    import "fmt"

    type Notification struct {
    }

    func (n *Notification) sendWalletCreditNotification() {
        fmt.Println("Sending wallet credit notification")
    }

    func (n *Notification) sendWalletDebitNotification() {
        fmt.Println("Sending wallet debit notification")
    }
    ```

4. 如果外观变得过于臃肿， 你可以考虑将其部分行为抽取为一个新的专用外观类。

```go main.go: 客户端代码
package main

import (
    "fmt"
    "log"
)

func main() {
    fmt.Println()
    walletFacade := newWalletFacade("abc", 1234)
    fmt.Println()

    err := walletFacade.addMoneyToWallet("abc", 1234, 10)
    if err != nil {
        log.Fatalf("Error: %s\n", err.Error())
    }

    fmt.Println()
    err = walletFacade.deductMoneyFromWallet("abc", 1234, 5)
    if err != nil {
        log.Fatalf("Error: %s\n", err.Error())
    }
}
```

```go output.txt: 执行结果
Starting create account
Account created

Starting add money to wallet
Account Verified
SecurityCode Verified
Wallet balance added successfully
Sending wallet credit notification
Make ledger entry for accountId abc with txnType credit for amount 10

Starting debit money from wallet
Account Verified
SecurityCode Verified
Wallet balance is Sufficient
Sending wallet debit notification
Make ledger entry for accountId abc with txnType debit for amount 5
```

## 优缺点

| 优点                                 | 缺点                                                                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| 你可以让自己的代码独立于复杂子系统。 | 外观可能成为与程序中所有类都耦合的[上帝对象](https://baike.baidu.com/item/%E4%B8%8A%E5%B8%9D%E5%AF%B9%E8%B1%A1)。 |

## 与其他模式的关系

* **外观模式**为现有对象定义了一个新接口， **适配器模式**则会试图运用已有的接口。 适配器通常只封装一个对象， 外观通常会作用于整个对象子系统上。
* 当只需对客户端代码隐藏子系统创建对象的方式时， 你可以使用**抽象工厂模式**来**代替外观**。
* **享元模式**展示了如何生成大量的小型对象， **外观**则展示了如何用一个对象来代表整个子系统。
* **外观**和**中介者模式**的职责类似： 它们都尝试在大量紧密耦合的类中组织起合作。
  * 外观为子系统中的所有对象定义了一个简单接口， 但是它不提供任何新功能。 子系统本身不会意识到外观的存在。 子系统中的对象可以直接进行交流。
  * 中介者将系统中组件的沟通行为中心化。 各组件只知道中介者对象， 无法直接相互交流。
* **外观**类通常可以转换为**单例模式**类， 因为在大部分情况下一个外观对象就足够了。
* **外观**与**代理模式**的相似之处在于它们都缓存了一个复杂实体并自行对其进行初始化。 代理与其服务对象遵循同一接口， 使得自己和服务对象可以互换， 在这一点上它与外观不同。
