---
title: 访问者模式
comments: true
---

访问者模式是一种行为设计模式， 它能将算法与其所作用的对象隔离开来。

## 模式结构

![](https://refactoringguru.cn/images/patterns/diagrams/visitor/structure-zh.png)

1. **访问者 （Visitor）** 接口声明了一系列以对象结构的具体元素为参数的访问者方法。 如果编程语言支持重载， 这些方法的名称可以是相同的， 但是其参数一定是不同的。
2. **具体访问者 （Concrete Visitor）** 会为不同的具体元素类实现相同行为的几个不同版本。
3. **元素 （Element）** 接口声明了一个方法来 “接收” 访问者。 该方法必须有一个参数被声明为访问者接口类型。
4. **具体元素 （Concrete Element）** 必须实现接收方法。 该方法的目的是根据当前元素类将其调用重定向到相应访问者的方法。 请注意， 即使元素基类实现了该方法， 所有子类都必须对其进行重写并调用访问者对象中的合适方法。
5. **客户端 （Client）** 通常会作为集合或其他复杂对象 （例如一个组合树） 的代表。 客户端通常不知晓所有的具体元素类， 因为它们会通过抽象接口与集合中的对象进行交互。

## 应用场景

* **如果你需要对一个复杂对象结构 （例如对象树） 中的所有元素执行某些操作， 可使用访问者模式。**

    访问者模式通过在访问者对象中为多个目标类提供相同操作的变体， 让你能在属于不同类的一组对象上执行同一操作。

* **可使用访问者模式来清理辅助行为的业务逻辑。**

    该模式会将所有非主要的行为抽取到一组访问者类中， 使得程序的主要类能更专注于主要的工作。

* **当某个行为仅在类层次结构中的一些类中有意义， 而在其他类中没有意义时， 可使用该模式。**

    你可将该行为抽取到单独的访问者类中， 只需实现接收相关类的对象作为参数的访问者方法并将其他方法留空即可。

## 实现方式

访问者模式允许你在结构体中添加行为， 而又不会对结构体造成实际变更。 假设你是一个代码库的维护者， 代码库中包含不同的形状结构体， 如：

* 方形
* 圆形
* 三角形

上述每个形状结构体都实现了通用形状接口。在公司员工开始使用你维护的代码库时，你就会被各种功能请求给淹没。让我们来看看其中比较简单的请求：有个团队请求你在形状结构体中添加 `get­Area` 获取面积行为。解决这一问题的办法有很多。

第一个选项便是将 `get­Area` 方法直接添加至形状接口，然后在各个形状结构体中进行实现。这似乎是比较好的解决方案，但其代价也比较高。作为代码库的管理员，相信你也不想在每次有人要求添加另外一种行为时就去冒着风险改动自己的宝贝代码。不过，你也一定想让其他团队的人还是用一用自己的代码库。

第二个选项是请求功能的团队自行实现行为。然而这并不总是可行，因为行为可能会依赖于私有代码。

第三个方法就是使用访问者模式来解决上述问题。首先定义一个如下访问者接口：

1. 在访问者接口中声明一组 “访问” 方法， 分别对应程序中的每个具体元素类。

    ```go
    type visitor interface {
        visitForSquare(square)
        visitForCircle(circle)
        visitForTriangle(triangle)
    }
    ```

    我们可以使用 `visit­For­Square­(square)` 、 ​ `visit­For­Circle­(circle)` 以及 `visit­For­Triangle­(triangle)` 函数来为方形、 圆形以及三角形添加相应的功能。

    !!! Tip

        你可能在想， 为什么我们不再访问者接口里面使用单一的 visit­(shape)方法呢？ 这是因为 Go 语言不支持方法重载， 所以你无法以相同名称、 不同参数的方式来使用方法。

2. 声明元素接口。 如果程序中已有元素类层次接口， 可在层次结构基类中添加抽象的 “接收” 方法。 该方法必须接受访问者对象作为参数。

    好了， 第二项重要的工作是将 accept 接受方法添加至形状接口中。

    ```go
    func accept(v visitor)
    ```

    所有形状结构体都需要定义此方法， 类似于：

    ```go
    func (obj *square) accept(v visitor){
        v.visitForSquare(obj)
    }
    ```

    等等， 我刚才是不是提到过， 我们并不想修改现有的形状结构体？ 很不幸， 在使用访问者模式时， 我们必须要修改形状结构体。 但这样的修改只需要进行一次。

    如果添加任何其他行为， 比如 `get­Num­Sides` 获取边数和 `get­Middle­Coordinates` 获取中点坐标 ， 我们将使用相同的 `accept­(v visitor)` 函数， 而无需对形状结构体进行进一步的修改。

    最后， 形状结构体只需要修改一次， 并且所有未来针对不同行为的请求都可以使用相同的 `accept` 函数来进行处理。 如果团队成员请求 `get­Area` 行为， 我们只需简单地定义访问者接口的具体实现， 并在其中编写面积的计算逻辑即可。

3. 在所有具体元素类中实现接收方法。 这些方法必须将调用重定向到当前元素对应的访问者对象中的访问者方法上。

    === "shape.go: 元件"

        ```go
        package main

        type Shape interface {
            getType() string
            accept(Visitor)
        }
        ```

    === "square.go: 具体元件"
        
        ```go 
        package main

        type Square struct {
            side int
        }

        func (s *Square) accept(v Visitor) {
            v.visitForSquare(s)
        }

        func (s *Square) getType() string {
            return "Square"
        }
        ```

    === "circle.go: 具体元件"

        ```go
        package main

        type Circle struct {
            radius int
        }

        func (c *Circle) accept(v Visitor) {
            v.visitForCircle(c)
        }

        func (c *Circle) getType() string {
            return "Circle"
        }
        ```

    === "rectangle.go: 具体元件"

        ```go 
        package main

        type Rectangle struct {
            l int
            b int
        }

        func (t *Rectangle) accept(v Visitor) {
            v.visitForrectangle(t)
        }

        func (t *Rectangle) getType() string {
            return "rectangle"
        }
        ```

4. 元素类只能通过访问者接口与访问者进行交互。 不过访问者必须知晓所有的具体元素类， 因为这些类在访问者方法中都被作为参数类型引用。
5. 为每个无法在元素层次结构中实现的行为创建一个具体访问者类并实现所有的访问者方法。

    你可能会遇到访问者需要访问元素类的部分私有成员变量的情况。 在这种情况下， 你要么将这些变量或方法设为公有， 这将破坏元素的封装； 要么将访问者类嵌入到元素类中。 后一种方式只有在支持嵌套类的编程语言中才可能实现。

    === "areaCalculator.go: 具体访问者"

        ```go 
        package main

        import (
            "fmt"
        )

        type AreaCalculator struct {
            area int
        }

        func (a *AreaCalculator) visitForSquare(s *Square) {
            // Calculate area for square.
            // Then assign in to the area instance variable.
            fmt.Println("Calculating area for square")
        }

        func (a *AreaCalculator) visitForCircle(s *Circle) {
            fmt.Println("Calculating area for circle")
        }
        func (a *AreaCalculator) visitForrectangle(s *Rectangle) {
            fmt.Println("Calculating area for rectangle")
        }
        ```

    === "middleCoordinates.go: 具体访问者"

        ```go 
        package main

        import "fmt"

        type MiddleCoordinates struct {
            x int
            y int
        }

        func (a *MiddleCoordinates) visitForSquare(s *Square) {
            // Calculate middle point coordinates for square.
            // Then assign in to the x and y instance variable.
            fmt.Println("Calculating middle point coordinates for square")
        }

        func (a *MiddleCoordinates) visitForCircle(c *Circle) {
            fmt.Println("Calculating middle point coordinates for circle")
        }
        func (a *MiddleCoordinates) visitForrectangle(t *Rectangle) {
            fmt.Println("Calculating middle point coordinates for rectangle")
        }
        ```

6. 客户端必须创建访问者对象并通过 “接收” 方法将其传递给元素。

    === "main.go: 客户端代码" 

        ```go 
        package main

        import "fmt"

        func main() {
            square := &Square{side: 2}
            circle := &Circle{radius: 3}
            rectangle := &Rectangle{l: 2, b: 3}

            areaCalculator := &AreaCalculator{}

            square.accept(areaCalculator)
            circle.accept(areaCalculator)
            rectangle.accept(areaCalculator)

            fmt.Println()
            middleCoordinates := &MiddleCoordinates{}
            square.accept(middleCoordinates)
            circle.accept(middleCoordinates)
            rectangle.accept(middleCoordinates)
        }
        ```

    === "output.txt: 执行结果"

        ```go 
        Calculating area for square
        Calculating area for circle
        Calculating area for rectangle

        Calculating middle point coordinates for square
        Calculating middle point coordinates for circle
        Calculating middle point coordinates for rectangle
        ```

## 优缺点

=== "优点"

    * 开闭原则。 你可以引入在不同类对象上执行的新行为， 且无需对这些类做出修改。
    * 单一职责原则。 可将同一行为的不同版本移到同一个类
    * 访问者对象可以在与各种对象交互时收集一些有用的信息。 当你想要遍历一些复杂的对象结构 （例如对象树）， 并在结构中的每个对象上应用访问者时， 这些信息可能会有所帮助。

=== "缺点"

    * 每次在元素层次结构中添加或移除一个类时， 你都要更新所有的访问者。
    * 在访问者同某个元素进行交互时， 它们可能没有访问元素私有成员变量和方法的必要权限。

## 与其他模式的关系

* 你可以将 **访问者模式** 视为 **[命令模式](./command.md)** 的加强版本， 其对象可对不同类的多种对象执行操作。
* 你可以使用 **访问者** 对整个 **[组合模式](../structural-patterns/composite.md)** 树执行操作。
* 可以同时使用 **访问者** 和 **[迭代器模式](./iterator.md)** 来遍历复杂数据结构， 并对其中的元素执行所需操作， 即使这些元素所属的类完全不同。
