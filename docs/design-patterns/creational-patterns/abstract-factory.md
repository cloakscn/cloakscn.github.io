---
title: 抽象工厂模式
date: 2023-5-6 18:47:11
category:
  - 设计模式
tag:
  - 创建型模式
---

抽象工厂模式是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。

## 模式结构

![](images/image.png)

1. 抽象产品 （Abstract Product） 为构成系列产品的一组不同但相关的产品声明接口。
2. 具体产品 （Concrete Product） 是抽象产品的多种不同类型实现。 所有变体 （维多利亚/现代） 都必须实现相应的抽象产品 （椅子/沙发）。
3. 抽象工厂 （Abstract Factory） 接口声明了一组创建各种抽象产品的方法。
4. 具体工厂 （Concrete Factory） 实现抽象工厂的构建方法。 每个具体工厂都对应特定产品变体， 且仅创建此种产品变体。
5. 尽管具体工厂会对具体产品进行初始化， 其构建方法签名必须返回相应的抽象产品。 这样， 使用工厂类的客户端代码就不会与工厂创建的特定产品变体耦合。 客户端 （Client） 只需通过抽象接口调用工厂和产品对象， 就能与任何具体工厂/产品变体交互。

## 适用场景

* **如果代码需要与多个不同系列的相关产品交互， 但是由于无法提前获取相关信息， 或者出于对未来扩展性的考虑， 你不希望代码基于产品的具体类进行构建， 在这种情况下， 你可以使用抽象工厂。**

    抽象工厂为你提供了一个接口， 可用于创建每个系列产品的对象。 只要代码通过该接口创建对象， 那么你就不会生成与应用程序已生成的产品类型不一致的产品。

* **如果你有一个基于一组抽象方法的类， 且其主要功能因此变得不明确， 那么在这种情况下可以考虑使用抽象工厂模式。**

    在设计良好的程序中， 每个类仅负责一件事。 如果一个类与多种类型产品交互， 就可以考虑将工厂方法抽取到独立的工厂类或具备完整功能的抽象工厂类中。

## 实现方式

1. 以不同的产品类型与产品变体为维度绘制矩阵。

    ||Shoe|Shirt|
    |-|-|-|
    |**Nike**|NikeShoe|NikeShirt|
    |**Adidas**|AdidasShoe|adidasShirt|

    抽象出以下接口：

    * 产品接口：(Model 层)
        * IShoe 接口
            * Shoe 实现构建方法
                * NikeShoe 继承 Shoe
                * AdidasShoe 继承 Shoe
        * IShirt 接口
            * Shirt 实现构建方法
                * NikeShirt 继承 Shirt
                * AdidasShirt 继承 Shirt
    * 抽象工厂接口，声明制造两种产品的能力（Service 层）
        * Nike 实现抽象工厂的构建方法
        * Adidas 实现抽象工厂的构建方法

1. 为所有产品声明抽象产品接口。 然后让所有具体产品类实现这些接口。

    === "iShoe.go: 抽象产品"

        ```go 
        package main

        type IShoe interface {
            setLogo(logo string)
            setSize(size int)
            getLogo() string
            getSize() int
        }

        type Shoe struct {
            logo string
            size int
        }

        func (s *Shoe) setLogo(logo string) {
            s.logo = logo
        }

        func (s *Shoe) getLogo() string {
            return s.logo
        }

        func (s *Shoe) setSize(size int) {
            s.size = size
        }

        func (s *Shoe) getSize() int {
            return s.size
        }
        ```


    === "adidasShoe.go: 具体产品 继承 Shoe"

        ```go 
        package main

        type AdidasShoe struct {
            Shoe
        }
        ```

    === "nikeShoe.go: 具体产品 继承 Shoe"

        ```go 
        package main

        type NikeShoe struct {
            Shoe
        }
        ```

    === "iShirt.go: 抽象产品"

        ```go 
        package main

        type IShirt interface {
            setLogo(logo string)
            setSize(size int)
            getLogo() string
            getSize() int
        }

        type Shirt struct {
            logo string
            size int
        }

        func (s *Shirt) setLogo(logo string) {
            s.logo = logo
        }

        func (s *Shirt) getLogo() string {
            return s.logo
        }

        func (s *Shirt) setSize(size int) {
            s.size = size
        }

        func (s *Shirt) getSize() int {
            return s.size
        }
        ```

    === "adidasShirt.go: 具体产品 继承 Shirt"

        ```go 
        package main

        type AdidasShirt struct {
            Shirt
        }
        ```

    === "nikeShirt.go: 具体产品 继承 Shirt"

        ```go 
        package main

        type NikeShirt struct {
            Shirt
        }
        ```

2. 声明抽象工厂接口， 并且在接口中为所有抽象产品提供一组构建方法。

    === "iSportsFactory.go: 抽象工厂接口"

        ```go  
        package main

        import "fmt"

        type ISportsFactory interface {
            makeShoe() IShoe
            makeShirt() IShirt
        }

        func GetSportsFactory(brand string) (ISportsFactory, error) {
            if brand == "adidas" {
                return &Adidas{}, nil
            }

            if brand == "nike" {
                return &Nike{}, nil
            }

            return nil, fmt.Errorf("Wrong brand type passed")
        }
        ```

3. 为每种产品变体实现一个具体工厂类。

    === "adidas.go: 具体工厂"

        ```go 
        package main

        type Adidas struct {
        }

        func (a *Adidas) makeShoe() IShoe {
            return &AdidasShoe{
                Shoe: Shoe{
                    logo: "adidas",
                    size: 14,
                },
            }
        }

        func (a *Adidas) makeShirt() IShirt {
            return &AdidasShirt{
                Shirt: Shirt{
                    logo: "adidas",
                    size: 14,
                },
            }
        }
        ```

    === "nike.go: 具体工厂"

        ```go 
        package main

        type Nike struct {
        }

        func (n *Nike) makeShoe() IShoe {
            return &NikeShoe{
                Shoe: Shoe{
                    logo: "nike",
                    size: 14,
                },
            }
        }

        func (n *Nike) makeShirt() IShirt {
            return &NikeShirt{
                Shirt: Shirt{
                    logo: "nike",
                    size: 14,
                },
            }
        }
        ```

4. 在应用程序中开发初始化代码。 该代码根据应用程序配置或当前环境， 对特定具体工厂类进行初始化。 然后将该工厂对象传递给所有需要创建产品的类。

    === "main.go: 客户端代码"

        ```go 
        package main

        import "fmt"

        func main() {
            adidasFactory, _ := GetSportsFactory("adidas")
            nikeFactory, _ := GetSportsFactory("nike")

            nikeShoe := nikeFactory.makeShoe()
            nikeShirt := nikeFactory.makeShirt()

            adidasShoe := adidasFactory.makeShoe()
            adidasShirt := adidasFactory.makeShirt()

            printShoeDetails(nikeShoe)
            printShirtDetails(nikeShirt)

            printShoeDetails(adidasShoe)
            printShirtDetails(adidasShirt)
        }

        func printShoeDetails(s IShoe) {
            fmt.Printf("Logo: %s", s.getLogo())
            fmt.Println()
            fmt.Printf("Size: %d", s.getSize())
            fmt.Println()
        }

        func printShirtDetails(s IShirt) {
            fmt.Printf("Logo: %s", s.getLogo())
            fmt.Println()
            fmt.Printf("Size: %d", s.getSize())
            fmt.Println()
        }
        ```

    === "执行结果"

        ```plain 
        Logo: nike
        Size: 14
        Logo: nike
        Size: 14
        Logo: adidas
        Size: 14
        Logo: adidas
        Size: 14
        ```

5. 找出代码中所有对产品构造函数的直接调用， 将其替换为对工厂对象中相应构建方法的调用。

## 优缺点

| 优点                                                                   | 缺点                                                                    |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 你可以确保同一工厂生成的产品相互匹配。                                 | 由于采用该模式需要向应用中引入众多接口和类， 代码可能会比之前更加复杂。 |
| 你可以避免客户端和具体产品代码的耦合。                                 |                                                                         |
| 单一职责原则。 你可以将产品生成代码抽取到同一位置， 使得代码易于维护。 |                                                                         |
| 开闭原则。 向应用程序中引入新产品变体时， 你无需修改客户端代码。       |                                                                         |

## 与其他模式的关系

* 在许多设计工作的初期都会使用 **工厂方法模式** （较为简单， 而且可以更方便地通过子类进行定制）， 随后演化为使用 **抽象工厂模式**、 **原型模式** 或 **生成器模式** （更灵活但更加复杂）。
* 生成器重点关注如何分步生成复杂对象。 抽象工厂专门用于生产一系列相关对象。 抽象工厂会马上返回产品， 生成器则允许你在获取产品前执行一些额外构造步骤。
* 抽象工厂模式通常基于一组工厂方法， 但你也可以使用原型模式来生成这些类的方法。
* 当只需对客户端代码隐藏子系统创建对象的方式时， 你可以使用抽象工厂来代替外观模式。
* 你可以将 **抽象工厂** 和 **桥接模式** 搭配使用。 如果由桥接定义的抽象只能与特定实现合作， 这一模式搭配就非常有用。 在这种情况下， 抽象工厂可以对这些关系进行封装， 并且对客户端代码隐藏其复杂性。
* 抽象工厂、 生成器和原型都可以用单例模式来实现。
