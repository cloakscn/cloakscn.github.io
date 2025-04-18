---
title: 原型模式
date: 2023-02-25 17:18:47
category:
  - 设计模式
tag:
  - 创建型模式
---

原型模式是一种创建型设计模式， 使你能够复制已有对象， 而又无需使代码依赖它们所属的类。

## 模式结构

![](https://refactoringguru.cn/images/patterns/diagrams/prototype/structure.png?id=088102c5e9785ff45debbbce86f4df81)

1. 原型 （Prototype） 接口将对克隆方法进行声明。 在绝大多数情况下， 其中只会有一个名为 clone克隆的方法。
2. 具体原型 （Concrete Prototype） 类将实现克隆方法。 除了将原始对象的数据复制到克隆体中之外， 该方法有时还需处理克隆过程中的极端情况， 例如克隆关联对象和梳理递归依赖等等。
3. 客户端 （Client） 可以复制实现了原型接口的任何对象。

## 应用场景

* **如果你需要复制一些对象， 同时又希望代码独立于这些对象所属的具体类， 可以使用原型模式。**

    这一点考量通常出现在代码需要处理第三方代码通过接口传递过来的对象时。 即使不考虑代码耦合的情况， 你的代码也不能依赖这些对象所属的具体类， 因为你不知道它们的具体信息。

    原型模式为客户端代码提供一个通用接口， 客户端代码可通过这一接口与所有实现了克隆的对象进行交互， 它也使得客户端代码与其所克隆的对象具体类独立开来。

* **如果子类的区别仅在于其对象的初始化方式， 那么你可以使用该模式来减少子类的数量。 别人创建这些子类的目的可能是为了创建特定类型的对象。**

    在原型模式中， 你可以使用一系列预生成的、 各种类型的对象作为原型。

    客户端不必根据需求对子类进行实例化， 只需找到合适的原型并对其进行克隆即可。

## 实现方式

1. 创建原型接口， 并在其中声明克隆方法。 如果你已有类层次结构， 则只需在其所有类中添加该方法即可。

=== "inode.go: 原型接口"

    ```go 
    package main

    type Inode interface {
        print(string)
        clone() Inode
    }
    ```

2. 原型类必须另行定义一个以该类对象为参数的构造函数。 构造函数必须复制参数对象中的所有成员变量值到新建实体中。 如果你需要修改子类， 则必须调用父类构造函数， 让父类复制其私有成员变量值。

    如果编程语言不支持方法重载， 那么你可能需要定义一个特殊方法来复制对象数据。 在构造函数中进行此类处理比较方便， 因为它在调用 `new` 运算符后会马上返回结果对象。

3. 克隆方法通常只有一行代码： 使用 `new` 运算符调用原型版本的构造函数。 注意， 每个类都必须显式重写克隆方法并使用自身类名调用 `new` 运算符。 否则， 克隆方法可能会生成父类的对象。

=== "file.go: 具体原型"

    ```go 
    package main

    import "fmt"

    type File struct {
        name string
    }

    func (f *File) print(indentation string) {
        fmt.Println(indentation + f.name)
    }

    func (f *File) clone() Inode {
        return &File{name: f.name + "_clone"}
    }
    ```

=== "folder.go: 具体原型"

    ```go 
    package main

    import "fmt"

    type Folder struct {
        children []Inode
        name     string
    }

    func (f *Folder) print(indentation string) {
        fmt.Println(indentation + f.name)
        for _, i := range f.children {
            i.print(indentation + indentation)
        }
    }

    func (f *Folder) clone() Inode {
        cloneFolder := &Folder{name: f.name + "_clone"}
        var tempChildren []Inode
        for _, i := range f.children {
            copy := i.clone()
            tempChildren = append(tempChildren, copy)
        }
        cloneFolder.children = tempChildren
        return cloneFolder
    }
    ```

4. 你还可以创建一个中心化原型注册表， 用于存储常用原型。

    你可以新建一个工厂类来实现注册表， 或者在原型基类中添加一个获取原型的静态方法。 该方法必须能够根据客户端代码设定的条件进行搜索。 搜索条件可以是简单的字符串， 或者是一组复杂的搜索参数。 找到合适的原型后， 注册表应对原型进行克隆， 并将复制生成的对象返回给客户端。

    最后还要将对子类构造函数的直接调用替换为对原型注册表工厂方法的调用。

=== "main.go: 客户端代码"

    ```go 
    package main

    import "fmt"

    func main() {
        file1 := &File{name: "File1"}
        file2 := &File{name: "File2"}
        file3 := &File{name: "File3"}

        folder1 := &Folder{
            children: []Inode{file1},
            name:     "Folder1",
        }

        folder2 := &Folder{
            children: []Inode{folder1, file2, file3},
            name:     "Folder2",
        }
        fmt.Println("\nPrinting hierarchy for Folder2")
        folder2.print("  ")

        cloneFolder := folder2.clone()
        fmt.Println("\nPrinting hierarchy for clone Folder")
        cloneFolder.print("  ")
    }
    ```

=== "output.txt: 执行结果"

    ```go 
    Printing hierarchy for Folder2
    Folder2
        Folder1
            File1
        File2
        File3

    Printing hierarchy for clone Folder
    Folder2_clone
        Folder1_clone
            File1_clone
        File2_clone
        File3_clone
    ```

## 优缺点

| 优点                                              | 缺点                                       |
| ------------------------------------------------- | ------------------------------------------ |
| 你可以克隆对象， 而无需与它们所属的具体类相耦合。 | 克隆包含循环引用的复杂对象可能会非常麻烦。 |
| 你可以克隆预生成原型， 避免反复运行初始化代码。   |                                            |
| 你可以更方便地生成复杂对象。                      |                                            |
| 你可以用继承以外的方式来处理复杂对象的不同配置。  |                                            |

## 与其他模式的关系

* 在许多设计工作的初期都会使用 **工厂方法模式** （较为简单， 而且可以更方便地通过子类进行定制）， 随后演化为使用 **抽象工厂模式**、 **原型模式** 或 **生成器模式** （更灵活但更加复杂）。
* **抽象工厂模式** 通常基于一组工厂方法， 但你也可以使用 **原型模式** 来生成这些类的方法。
* **原型** 可用于保存 **命令模式** 的历史记录。
* 大量使用 **组合模式** 和 **装饰模式** 的设计通常可从对于 **原型** 的使用中获益。 你可以通过该模式来复制复杂结构， 而非从零开始重新构造。
* **原型** 并不基于继承， 因此没有继承的缺点。 另一方面， 原型需要对被复制对象进行复杂的初始化。 **工厂方法** 基于继承， 但是它不需要初始化步骤。
* 有时候 **原型** 可以作为 **备忘录模式** 的一个简化版本， 其条件是你需要在历史记录中存储的对象的状态比较简单， 不需要链接其他外部资源， 或者链接可以方便地重建。
* **抽象工厂**、 **生成器** 和 **原型** 都可以用 **单例模式** 来实现。
