---
title: 生成器模式
date: 2023-02-25 17:18:47
sticky: 3
toc: 3
---

生成器模式是一种创建型设计模式， 使你能够分步骤创建复杂对象。 该模式允许你使用相同的创建代码生成不同类型和形式的对象。

## 模式结构

<div style="display: flex; flex-direction: row; justify-content: center; zoom: 100%; float: right">
<div>

![](https://refactoringguru.cn/images/patterns/diagrams/builder/structure.png)
</div>
</div>

1. 生成器 （Builder） 接口声明在所有类型生成器中通用的产品构造步骤。
2. 具体生成器 （Concrete Builders） 提供构造过程的不同实现。 具体生成器也可以构造不遵循通用接口的产品。
3. 产品 （Products） 是最终生成的对象。 由不同生成器构造的产品无需属于同一类层次结构或接口。
4. 主管 （Director） 类定义调用构造步骤的顺序， 这样你就可以创建和复用特定的产品配置。
5. 客户端 （Client） 必须将某个生成器对象与主管类关联。 一般情况下， 你只需通过主管类构造函数的参数进行一次性关联即可。 此后主管类就能使用生成器对象完成后续所有的构造任务。 但在客户端将生成器对象传递给主管类制造方法时还有另一种方式。 在这种情况下， 你在使用主管类生产产品时每次都可以使用不同的生成器。

## 应用场景

* **使用生成器模式可避免“重叠构造函数（telescoping constructor）”的出现。**

    假设你的构造函数中有十个可选参数， 那么调用该函数会非常不方便； 因此， 你需要重载这个构造函数， 新建几个只有较少参数的简化版。但这些构造函数仍需调用主构造函数， 传递一些默认数值来替代省略掉的参数。

    生成器模式让你可以分步骤生成对象， 而且允许你仅使用必须的步骤。 应用该模式后， 你再也不需要将几十个参数塞进构造函数里了。

```java
class Pizza {
Pizza(int size) { …… }
Pizza(int size, boolean cheese) { …… }
Pizza(int size, boolean cheese, boolean pepperoni) { …… }
// ……
```

* **当你希望使用代码创建不同形式的产品（例如石头或木头房屋）时，可使用生成器模式。**

    如果你需要创建的各种形式的产品， 它们的制造过程相似且仅有细节上的差异， 此时可使用生成器模式。

    基本生成器接口中定义了所有可能的制造步骤， 具体生成器将实现这些步骤来制造特定形式的产品。 同时， 主管类将负责管理制造步骤的顺序。

* **使用生成器构造组合树或其他复杂对象。**

    生成器模式让你能分步骤构造产品。 你可以延迟执行某些步骤而不会影响最终产品。 你甚至可以递归调用这些步骤， 这在创建对象树时非常方便。

    生成器在执行制造步骤时， 不能对外发布未完成的产品。 这可以避免客户端代码获取到不完整结果对象的情况。

## 实现方法

1. 清晰地定义通用步骤， 确保它们可以制造所有形式的产品。 否则你将无法进一步实施该模式。
2. 在基本生成器接口中声明这些步骤。

    ```go iBuilder.go: 生成器接口
    package main

    type IBuilder interface {
        setWindowType()
        setDoorType()
        setNumFloor()
        getHouse() House
    }

    func getBuilder(builderType string) IBuilder {
        if builderType == "normal" {
            return newNormalBuilder()
        }

        if builderType == "igloo" {
            return newIglooBuilder()
        }
        return nil
    }
    ```

3. 为每个形式的产品创建具体生成器类， 并实现其构造步骤。

    不要忘记实现获取构造结果对象的方法。 你不能在生成器接口中声明该方法， 因为不同生成器构造的产品可能没有公共接口， 因此你就不知道该方法返回的对象类型。 但是， 如果所有产品都位于单一类层次中， 你就可以安全地在基本接口中添加获取生成对象的方法。

    ```go normalBuilder.go: 具体生成器
    package main

    type NormalBuilder struct {
        windowType string
        doorType   string
        floor      int
    }

    func newNormalBuilder() *NormalBuilder {
        return &NormalBuilder{}
    }

    func (b *NormalBuilder) setWindowType() {
        b.windowType = "Wooden Window"
    }

    func (b *NormalBuilder) setDoorType() {
        b.doorType = "Wooden Door"
    }

    func (b *NormalBuilder) setNumFloor() {
        b.floor = 2
    }

    func (b *NormalBuilder) getHouse() House {
        return House{
            doorType:   b.doorType,
            windowType: b.windowType,
            floor:      b.floor,
        }
    }
    ```

    ```go iglooBuilder.go: 具体生成器
    package main

    type IglooBuilder struct {
        windowType string
        doorType   string
        floor      int
    }

    func newIglooBuilder() *IglooBuilder {
        return &IglooBuilder{}
    }

    func (b *IglooBuilder) setWindowType() {
        b.windowType = "Snow Window"
    }

    func (b *IglooBuilder) setDoorType() {
        b.doorType = "Snow Door"
    }

    func (b *IglooBuilder) setNumFloor() {
        b.floor = 1
    }

    func (b *IglooBuilder) getHouse() House {
        return House{
            doorType:   b.doorType,
            windowType: b.windowType,
            floor:      b.floor,
        }
    }
    ```

    ```go house.go: 产品
    package main

    type House struct {
        windowType string
        doorType   string
        floor      int
    }
    ```

4. 考虑创建主管类。 它可以使用同一生成器对象来封装多种构造产品的方式。

    ```go director.go: 主管
    package main

    type Director struct {
        builder IBuilder
    }

    func newDirector(b IBuilder) *Director {
        return &Director{
            builder: b,
        }
    }

    func (d *Director) setBuilder(b IBuilder) {
        d.builder = b
    }

    func (d *Director) buildHouse() House {
        d.builder.setDoorType()
        d.builder.setWindowType()
        d.builder.setNumFloor()
        return d.builder.getHouse()
    }
    ```

5. 客户端代码会同时创建生成器和主管对象。 构造开始前， 客户端必须将生成器对象传递给主管对象。 通常情况下， 客户端只需调用主管类构造函数一次即可。 主管类使用生成器对象完成后续所有制造任务。 还有另一种方式， 那就是客户端可以将生成器对象直接传递给主管类的制造方法。

    ```go main.go: 客户端代码
    package main

    import "fmt"

    func main() {
        normalBuilder := getBuilder("normal")
        iglooBuilder := getBuilder("igloo")

        director := newDirector(normalBuilder)
        normalHouse := director.buildHouse()

        fmt.Printf("Normal House Door Type: %s\n", normalHouse.doorType)
        fmt.Printf("Normal House Window Type: %s\n", normalHouse.windowType)
        fmt.Printf("Normal House Num Floor: %d\n", normalHouse.floor)

        director.setBuilder(iglooBuilder)
        iglooHouse := director.buildHouse()

        fmt.Printf("\nIgloo House Door Type: %s\n", iglooHouse.doorType)
        fmt.Printf("Igloo House Window Type: %s\n", iglooHouse.windowType)
        fmt.Printf("Igloo House Num Floor: %d\n", iglooHouse.floor)

    }
    ```

    ```go output.txt: 执行结果
    Normal House Door Type: Wooden Door
    Normal House Window Type: Wooden Window
    Normal House Num Floor: 2

    Igloo House Door Type: Snow Door
    Igloo House Window Type: Snow Window
    Igloo House Num Floor: 1
    ```

6. 只有在所有产品都遵循相同接口的情况下， 构造结果可以直接通过主管类获取。 否则， 客户端应当通过生成器获取构造结果。

## 优缺点

| 优点                                                            | 缺点                                                        |
| --------------------------------------------------------------- | ----------------------------------------------------------- |
| 你可以分步创建对象， 暂缓创建步骤或递归运行创建步骤。           | 由于该模式需要新增多个类， 因此代码整体复杂程度会有所增加。 |
| 生成不同形式的产品时， 你可以复用相同的制造代码。               |                                                             |
| 单一职责原则。 你可以将复杂构造代码从产品的业务逻辑中分离出来。 |                                                             |

## 与其他模式的关系

* 在许多设计工作的初期都会使用**工厂方法模式** （较为简单， 而且可以更方便地通过子类进行定制）， 随后演化为使用**抽象工厂模式**、 **原型模式**或**生成器模式** （更灵活但更加复杂）。
* **生成器**重点关注如何分步生成复杂对象。 **抽象工厂**专门用于生产一系列相关对象。 抽象工厂会马上返回产品， 生成器则允许你在获取产品前执行一些额外构造步骤。
* 你可以在创建复杂**组合模式**树时使用**生成器**， 因为这可使其构造步骤以递归的方式运行。
* 你可以结合使用**生成器**和**桥接模式**： 主管类负责抽象工作， 各种不同的生成器负责实现工作。
* **抽象工厂**、 **生成器**和**原型**都可以用**单例模式**来实现。
