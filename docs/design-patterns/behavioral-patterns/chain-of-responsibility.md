---
title: 责任链模式
date: 2023-02-25 17:18:47
category:
  - 设计模式
tag:
  - 行为模式
---

责任链模式是一种行为设计模式， 允许你将请求沿着处理者链进行发送。 收到请求后， 每个处理者均可对请求进行处理， 或将其传递给链上的下个处理者。

## 模式结构

![责任链模式结构](https://refactoringguru.cn/images/patterns/diagrams/chain-of-responsibility/structure.png)

1. **处理者 （Handler）** 声明了所有具体处理者的通用接口。 该接口通常仅包含单个方法用于请求处理， 但有时其还会包含一个设置链上下个处理者的方法。
2. **基础处理者 （Base Handler）** 是一个可选的类， 你可以将所有处理者共用的样本代码放置在其中。

    通常情况下， 该类中定义了一个保存对于下个处理者引用的成员变量。 客户端可通过将处理者传递给上个处理者的构造函数或设定方法来创建链。 该类还可以实现默认的处理行为： 确定下个处理者存在后再将请求传递给它。
3. **具体处理者 （Concrete Handlers）** 包含处理请求的实际代码。 每个处理者接收到请求后， 都必须决定是否进行处理， 以及是否沿着链传递请求。

    处理者通常是独立且不可变的， 需要通过构造函数一次性地获得所有必要地数据。
4. **客户端 （Client）** 可根据程序逻辑一次性或者动态地生成链。 值得注意的是， 请求可发送给链上的任意一个处理者， 而非必须是第一个处理者。

## 应用场景

* 当程序需要使用不同方式处理不同种类请求， 而且请求类型和顺序预先未知时， 可以使用责任链模式。

    该模式能将多个处理者连接成一条链。 接收到请求后， 它会 “询问” 每个处理者是否能够对其进行处理。 这样所有处理者都有机会来处理请求。
* 当必须按顺序执行多个处理者时， 可以使用该模式。

    无论你以何种顺序将处理者连接成一条链， 所有请求都会严格按照顺序通过链上的处理者。
* 如果所需处理者及其顺序必须在运行时进行改变， 可以使用责任链模式。

    如果在处理者类中有对引用成员变量的设定方法， 你将能动态地插入和移除处理者， 或者改变其顺序。

## 实现方式

让我们来看看一个医院应用的责任链模式例子。 医院中会有多个部门， 如：

* 前台
* 医生
* 药房
* 收银

病人来访时， 他们首先都会去前台， 然后是看医生、 取药， 最后结账。 也就是说， 病人需要通过一条部门链， 每个部门都在完成其职能后将病人进一步沿着链条输送。

此模式适用于有多个候选选项处理相同请求的情形， 适用于不希望客户端选择接收者 （因为多个对象都可处理请求） 的情形， 还适用于想将客户端同接收者解耦时。 客户端只需要链中的首个元素即可。

正如示例中的医院， 患者在到达后首先去的就是前台。 然后根据患者的当前状态， 前台会将其指向链上的下一个处理者。

1. 声明处理者接口并描述请求处理方法的签名。

    确定客户端如何将请求数据传递给方法。 最灵活的方式是将请求转换为对象， 然后将其以参数的形式传递给处理函数。

    === "📄department.go: 处理者接口"

        ```go 
        package main

        type Department interface {
            execute(*Patient)
            setNext(Department)
        }
        ```

2. 为了在具体处理者中消除重复的样本代码， 你可以根据处理者接口创建抽象处理者基类。

    该类需要有一个成员变量来存储指向链上下个处理者的引用。 你可以将其设置为不可变类。 但如果你打算在运行时对链进行改变， 则需要定义一个设定方法来修改引用成员变量的值。

    为了使用方便， 你还可以实现处理方法的默认行为。 如果还有剩余对象， 该方法会将请求传递给下个对象。 具体处理者还能够通过调用父对象的方法来使用这一行为。

3. 依次创建具体处理者子类并实现其处理方法。 每个处理者在接收到请求后都必须做出两个决定：
    * 是否自行处理这个请求。
    * 是否将该请求沿着链进行传递。

    === "📄reception.go: 具体处理者"

        ```go 
        package main

        import "fmt"

        type Reception struct {
            next Department
        }

        func (r *Reception) execute(p *Patient) {
            if p.registrationDone {
                fmt.Println("Patient registration already done")
                r.next.execute(p)
                return
            }
            fmt.Println("Reception registering patient")
            p.registrationDone = true
            r.next.execute(p)
        }

        func (r *Reception) setNext(next Department) {
            r.next = next
        }
        ```
    
    === "📄doctor.go: 具体处理者"

        ```go 
        package main

        import "fmt"

        type Doctor struct {
            next Department
        }

        func (d *Doctor) execute(p *Patient) {
            if p.doctorCheckUpDone {
                fmt.Println("Doctor checkup already done")
                d.next.execute(p)
                return
            }
            fmt.Println("Doctor checking patient")
            p.doctorCheckUpDone = true
            d.next.execute(p)
        }

        func (d *Doctor) setNext(next Department) {
            d.next = next
        }
        ```

    === "📄medical.go: 具体处理者"

        ```go 
        package main

        import "fmt"

        type Medical struct {
            next Department
        }

        func (m *Medical) execute(p *Patient) {
            if p.medicineDone {
                fmt.Println("Medicine already given to patient")
                m.next.execute(p)
                return
            }
            fmt.Println("Medical giving medicine to patient")
            p.medicineDone = true
            m.next.execute(p)
        }

        func (m *Medical) setNext(next Department) {
            m.next = next
        }
        ```

    === "📄cashier.go: 具体处理者"

        ```go 
        package main

        import "fmt"

        type Cashier struct {
            next Department
        }

        func (c *Cashier) execute(p *Patient) {
            if p.paymentDone {
                fmt.Println("Payment Done")
            }
            fmt.Println("Cashier getting money from patient patient")
        }

        func (c *Cashier) setNext(next Department) {
            c.next = next
        }
        ```

4. 客户端可以自行组装链， 或者从其他对象处获得预先组装好的链。 在后一种情况下， 你必须实现工厂类以根据配置或环境设置来创建链。
5. 客户端可以触发链中的任意处理者， 而不仅仅是第一个。 请求将通过链进行传递， 直至某个处理者拒绝继续传递， 或者请求到达链尾。
6. 由于链的动态性， 客户端需要准备好处理以下情况：
    * 链中可能只有单个链接。
    * 部分请求可能无法到达链尾。
    * 其他请求可能直到链尾都未被处理。

    === "📄patient.go"

        ```go 
        package main

        type Patient struct {
            name              string
            registrationDone  bool
            doctorCheckUpDone bool
            medicineDone      bool
            paymentDone       bool
        }
        ```

    === "📄main.go: 客户端代码"

        ```go 
        package main

        func main() {

            cashier := &Cashier{}

            //Set next for medical department
            medical := &Medical{}
            medical.setNext(cashier)

            //Set next for doctor department
            doctor := &Doctor{}
            doctor.setNext(medical)

            //Set next for reception department
            reception := &Reception{}
            reception.setNext(doctor)

            patient := &Patient{name: "abc"}
            //Patient visiting
            reception.execute(patient)
        }
        ```

    === "📄output.txt: 执行结果"

        ```go 
        Reception registering patient
        Doctor checking patient
        Medical giving medicine to patient
        Cashier getting money from patient patient
        ```

## 优缺点

| 优点                                                          | 缺点                   |
| ------------------------------------------------------------- | ---------------------- |
| 你可以控制请求处理的顺序。                                    | 部分请求可能未被处理。 |
| 单一职责原则。 你可对发起操作和执行操作的类进行解耦。         |                        |
| 开闭原则。 你可以在不更改现有代码的情况下在程序中新增处理者。 |                        |

## 与其他模式的关系

* **责任链模式**、 **命令模式**、 **中介者模式** 和 **观察者模式** 用于处理请求发送者和接收者之间的不同连接方式：

    * 责任链按照顺序将请求动态传递给一系列的潜在接收者， 直至其中一名接收者对请求进行处理。
    * 命令在发送者和请求者之间建立单向连接。
    * 中介者清除了发送者和请求者之间的直接连接， 强制它们通过一个中介对象进行间接沟通。
    * 观察者允许接收者动态地订阅或取消接收请求。

* **责任链** 通常和 **组合模式** 结合使用。 在这种情况下， 叶组件接收到请求后， 可以将请求沿包含全体父组件的链一直传递至对象树的底部。
* **责任链** 的管理者可使用 **命令模式** 实现。 在这种情况下， 你可以对由请求代表的同一个上下文对象执行许多不同的操作。

    还有另外一种实现方式， 那就是请求自身就是一个命令对象。 在这种情况下， 你可以对由一系列不同上下文连接而成的链执行相同的操作。

* **责任链** 和 **装饰模式** 的类结构非常相似。 两者都依赖递归组合将需要执行的操作传递给一系列对象。 但是， 两者有几点重要的不同之处。

    责任链的管理者可以相互独立地执行一切操作， 还可以随时停止传递请求。 另一方面， 各种装饰可以在遵循基本接口的情况下扩展对象的行为。 此外，装饰无法中断请求的传递。
