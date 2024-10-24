---
title: 模版方法模式
date: 2023-5-22 16:40:17
category:
  - 设计模式
tag:
  - 行为模式
---

模板方法模式是一种行为设计模式， 它在超类中定义了一个算法的框架， 允许子类在不修改结构的情况下重写算法的特定步骤。

## 模式结构

![](https://refactoringguru.cn/images/patterns/diagrams/template-method/structure.png)

1. **抽象类 （Abstract­Class）** 会声明作为算法步骤的方法， 以及依次调用它们的实际模板方法。 算法步骤可以被声明为 抽象类型， 也可以提供一些默认实现。
2. **具体类 （Concrete­Class）** 可以重写所有步骤， 但不能重写模板方法自身。

## 应用场景

* **当你只希望客户端扩展某个特定算法步骤， 而不是整个算法或其结构时， 可使用模板方法模式。**

    模板方法将整个算法转换为一系列独立的步骤， 以便子类能对其进行扩展， 同时还可让超类中所定义的结构保持完整。
    
* **当多个类的算法除一些细微不同之外几乎完全一样时， 你可使用该模式。 但其后果就是， 只要算法发生变化， 你就可能需要修改所有的类。**

    在将算法转换为模板方法时， 你可将相似的实现步骤提取到超类中以去除重复代码。 子类间各不同的代码可继续保留在子类中。

## 实现方式

让我们来考虑一个一次性密码功能 （OTP） 的例子。 将 OTP 传递给用户的方式多种多样 （短信、 邮件等）。 但无论是短信还是邮件， 整个 OTP 流程都是相同的：

1. 生成随机的 n 位数字。
2. 在缓存中保存这组数字以便进行后续验证。
3. 准备内容。
4. 发送通知。

后续引入的任何新 OTP 类型都很有可能需要进行相同的上述步骤。

因此， 我们会有这样的一个场景， 其中某个特定操作的步骤是相同的， 但实现方式却可能有所不同。 这正是适合考虑使用模板方法模式的情况。

首先， 我们定义一个由固定数量的方法组成的基础模板算法。 这就是我们的模板方法。 然后我们将实现每一个步骤方法， 但不会改变模板方法。

1. 分析目标算法， 确定能否将其分解为多个步骤。 从所有子类的角度出发， 考虑哪些步骤能够通用， 哪些步骤各不相同。
2. 创建抽象基类并声明一个模板方法和代表算法步骤的一系列抽象方法。 在模板方法中根据算法结构依次调用相应步骤。 可用 `final` 最终修饰模板方法以防止子类对其进行重写。

    === "otp.go: 模板方法"

        ```go 
        package main

        type IOtp interface {
            genRandomOTP(int) string
            saveOTPCache(string)
            getMessage(string) string
            sendNotification(string) error
        }

        // type otp struct {
        // }

        // func (o *otp) genAndSendOTP(iOtp iOtp, otpLength int) error {
        //  otp := iOtp.genRandomOTP(otpLength)
        //  iOtp.saveOTPCache(otp)
        //  message := iOtp.getMessage(otp)
        //  err := iOtp.sendNotification(message)
        //  if err != nil {
        //      return err
        //  }
        //  return nil
        // }

        type Otp struct {
            iOtp IOtp
        }

        func (o *Otp) genAndSendOTP(otpLength int) error {
            otp := o.iOtp.genRandomOTP(otpLength)
            o.iOtp.saveOTPCache(otp)
            message := o.iOtp.getMessage(otp)
            err := o.iOtp.sendNotification(message)
            if err != nil {
                return err
            }
            return nil
        }
        ```

    === "sms.go: 具体实施"

        ```go 
        package main

        import "fmt"

        type Sms struct {
            Otp
        }

        func (s *Sms) genRandomOTP(len int) string {
            randomOTP := "1234"
            fmt.Printf("SMS: generating random otp %s\n", randomOTP)
            return randomOTP
        }

        func (s *Sms) saveOTPCache(otp string) {
            fmt.Printf("SMS: saving otp: %s to cache\n", otp)
        }

        func (s *Sms) getMessage(otp string) string {
            return "SMS OTP for login is " + otp
        }

        func (s *Sms) sendNotification(message string) error {
            fmt.Printf("SMS: sending sms: %s\n", message)
            return nil
        }
        ```

    === "email.go: 具体实施"

        ```go 
        package main

        import "fmt"

        type Email struct {
            Otp
        }

        func (s *Email) genRandomOTP(len int) string {
            randomOTP := "1234"
            fmt.Printf("EMAIL: generating random otp %s\n", randomOTP)
            return randomOTP
        }

        func (s *Email) saveOTPCache(otp string) {
            fmt.Printf("EMAIL: saving otp: %s to cache\n", otp)
        }

        func (s *Email) getMessage(otp string) string {
            return "EMAIL OTP for login is " + otp
        }

        func (s *Email) sendNotification(message string) error {
            fmt.Printf("EMAIL: sending email: %s\n", message)
            return nil
        }
        ```

3. 虽然可将所有步骤全都设为抽象类型， 但默认实现可能会给部分步骤带来好处， 因为子类无需实现那些方法。
4. 可考虑在算法的关键步骤之间添加钩子。
5. 为每个算法变体新建一个具体子类， 它必须实现所有的抽象步骤， 也可以重写部分可选步骤。

    === "main.go: 客户端代码"

        ```go 
        package main

        import "fmt"

        func main() {
            // otp := otp{}

            // smsOTP := &sms{
            //  otp: otp,
            // }

            // smsOTP.genAndSendOTP(smsOTP, 4)

            // emailOTP := &email{
            //  otp: otp,
            // }
            // emailOTP.genAndSendOTP(emailOTP, 4)
            // fmt.Scanln()
            smsOTP := &Sms{}
            o := Otp{
                iOtp: smsOTP,
            }
            o.genAndSendOTP(4)

            fmt.Println("")
            emailOTP := &Email{}
            o = Otp{
                iOtp: emailOTP,
            }
            o.genAndSendOTP(4)
        }
        ```

    === "output.txt: 执行结果"

        ```go 
        SMS: generating random otp 1234
        SMS: saving otp: 1234 to cache
        SMS: sending sms: SMS OTP for login is 1234

        EMAIL: generating random otp 1234
        EMAIL: saving otp: 1234 to cache
        EMAIL: sending email: EMAIL OTP for login is 1234
        ```

## 优缺点

| 优点                                                                                      | 缺点                                                 |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 你可仅允许客户端重写一个大型算法中的特定部分， 使得算法其他部分修改对其所造成的影响减小。 | 部分客户端可能会受到算法框架的限制。f                |
| 你可将重复代码提取到一个超类中。                                                          | 通过子类抑制默认步骤实现可能会导致违反里氏替换原则。 |
|                                                                                           | 模板方法中的步骤越多， 其维护工作就可能会越困难。    |

## 与其他模式的关系

* **工厂方法模式** 是 **模板方法模式** 的一种特殊形式。 同时， 工厂方法可以作为一个大型模板方法中的一个步骤。
* **模板方法** 基于继承机制： 它允许你通过扩展子类中的部分内容来改变部分算法。 **策略模式** 基于组合机制： 你可以通过对相应行为提供不同的策略来改变对象的部分行为。 模板方法在类层次上运作， 因此它是静态的。 策略在对象层次上运作， 因此允许在运行时切换行为。
