---
title: 组合模式
date: 2023-02-25 17:18:47
category:
  - 设计模式
tag:
  - 建造者模式
---

组合模式是一种结构型设计模式， 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。

???+ info "2011 综合知识 33,34"

    组合（Composite）模式又称为整体-部分（Part whole）模式，属于对象的结构模式。在组合模式中，通过组合多个对象形成树形结构以表示整体部分的结构层次。组合模式对单个对象（即叶子对象）和组合对象（即容器对象）的使用具有一致性。
    
    * 类 Component 为组合中的对象声明接口，在适当的情况下，实现所有类共有接口的缺省行为，声明一个接口用于访问和管理 Component 的子部件；
    * 类 Leaf 在组合中表示叶结点对象，叶结点没有子结点；
    * 类 Composite 定义有子部件的那些部件的行为，存储子部件，并在 Component 接口中实现与子部件有关的操作；
    * 类 Client 通过 Component 接口操纵组合部件的对象。

## 模式结构

![](https://refactoringguru.cn/images/patterns/diagrams/composite/structure-zh.png)

1. **组件 （Component）** 接口描述了树中简单项目和复杂项目所共有的操作。
2. **叶节点 （Leaf）** 是树的基本结构， 它不包含子项目。

    一般情况下， 叶节点最终会完成大部分的实际工作， 因为它们无法将工作指派给其他部分。

3. **容器 （Container）**——又名 “组合 （Composite）”——是包含叶节点或其他容器等子项目的单位。 容器不知道其子项目所属的具体类， 它只通过通用的组件接口与其子项目交互。

    容器接收到请求后会将工作分配给自己的子项目， 处理中间结果， 然后将最终结果返回给客户端。

4. **客户端 （Client）** 通过组件接口与所有项目交互。 因此， 客户端能以相同方式与树状结构中的简单或复杂项目交互。

## 应用场景

* **如果你需要实现树状对象结构， 可以使用组合模式。**

    组合模式为你提供了两种共享公共接口的基本元素类型： 简单叶节点和复杂容器。 容器中可以包含叶节点和其他容器。 这使得你可以构建树状嵌套递归对象结构。

* **如果你希望客户端代码以相同方式处理简单和复杂元素， 可以使用该模式。**

    组合模式中定义的所有元素共用同一个接口。 在这一接口的帮助下， 客户端不必在意其所使用的对象的具体类。

## 实现方式

让我们试着用一个操作系统文件系统的例子来理解组合模式。 文件系统中有两种类型的对象： 文件和文件夹。 在某些情形中， 文件和文件夹应被视为相同的对象。 这就是组合模式发挥作用的时候了。

想象一下， 你需要在文件系统中搜索特定的关键词。 这一搜索操作需要同时作用于文件和文件夹上。 对于文件而言， 其只会查看文件的内容； 对于文件夹则会在其内部的所有文件中查找关键词。

1. 确保应用的核心模型能够以树状结构表示。 尝试将其分解为简单元素和容器。 记住， 容器必须能够同时包含简单元素和其他容器。
2. 声明组件接口及其一系列方法， 这些方法对简单和复杂元素都有意义。

    === "file.go: 组件接口"

        ```go 
        package main

        import "fmt"

        type File struct {
            name string
        }

        func (f *File) search(keyword string) {
            fmt.Printf("Searching for keyword %s in file %s\n", keyword, f.name)
        }

        func (f *File) getName() string {
            return f.name
        }
        ```

3. 创建一个叶节点类表示简单元素。 程序中可以有多个不同的叶节点类。

    === "component.go: 叶子"

        ```go 
        package main

        type Component interface {
            search(string)
        }
        ```

4. 创建一个容器类表示复杂元素。 在该类中， 创建一个数组成员变量来存储对于其子元素的引用。 该数组必须能够同时保存叶节点和容器， 因此请确保将其声明为组合接口类型。

    实现组件接口方法时， 记住容器应该将大部分工作交给其子元素来完成。

    === "folder.go: 组合"

        ```go 
        package main

        import "fmt"

        type Folder struct {
            components []Component
            name       string
        }

        func (f *Folder) search(keyword string) {
            fmt.Printf("Serching recursively for keyword %s in folder %s\n", keyword, f.name)
            for _, composite := range f.components {
                composite.search(keyword)
            }
        }

        func (f *Folder) add(c Component) {
            f.components = append(f.components, c)
        }
        ```

5. 最后， 在容器中定义添加和删除子元素的方法。

    记住， 这些操作可在组件接口中声明。 这将会违反接口隔离原则， 因为叶节点类中的这些方法为空。 但是， 这可以让客户端无差别地访问所有元素， 即使是组成树状结构的元素。

    === "main.go: 客户端代码"

        ```go 
        package main

        func main() {
            file1 := &File{name: "File1"}
            file2 := &File{name: "File2"}
            file3 := &File{name: "File3"}

            folder1 := &Folder{
                name: "Folder1",
            }

            folder1.add(file1)

            folder2 := &Folder{
                name: "Folder2",
            }
            folder2.add(file2)
            folder2.add(file3)
            folder2.add(folder1)

            folder2.search("rose")
        }
        ```

    === "output.txt: 执行结果"

        ```go 
        Serching recursively for keyword rose in folder Folder2
        Searching for keyword rose in file File2
        Searching for keyword rose in file File3
        Serching recursively for keyword rose in folder Folder1
        Searching for keyword rose in file File1
        ```

## 优缺点

| 优点                                                                                | 缺点                                                                                                               |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 你可以利用多态和递归机制更方便地使用复杂树结构。                                    | 对于功能差异较大的类， 提供公共接口或许会有困难。 在特定情况下， 你需要过度一般化组件接口， 使其变得令人难以理解。 |
| 开闭原则。 无需更改现有代码， 你就可以在应用中添加新元素， 使其成为对象树的一部分。 |                                                                                                                    |

## 与其他模式的关系

* **桥接模式**、 **状态模式** 和 **策略模式** （在某种程度上包括 **适配器模式**） 模式的接口非常相似。 实际上， 它们都基于 **组合模式** ——即将工作委派给其他对象， 不过也各自解决了不同的问题。 模式并不只是以特定方式组织代码的配方， 你还可以使用它们来和其他开发者讨论模式所解决的问题。
* 你可以在创建复杂 **组合** 树时使用 **生成器模式**， 因为这可使其构造步骤以递归的方式运行。
* **责任链模式** 通常和 **组合模式** 结合使用。 在这种情况下， 叶组件接收到请求后， 可以将请求沿包含全体父组件的链一直传递至对象树的底部。
* 你可以使用 **迭代器模式** 来遍历 **组合** 树。
* 你可以使用 **访问者模式** 对整个 **组合** 树执行操作。
* 你可以使用 **享元模式** 实现 **组合** 树的共享叶节点以节省内存。
* **组合** 和 **装饰模式** 的结构图很相似， 因为两者都依赖递归组合来组织无限数量的对象。

    装饰类似于组合， 但其只有一个子组件。 此外还有一个明显不同： 装饰为被封装对象添加了额外的职责， 组合仅对其子节点的结果进行了 “求和”。

    但是， 模式也可以相互合作： 你可以使用装饰来扩展组合树中特定对象的行为。

* 大量使用 **组合** 和 **装饰** 的设计通常可从对于 **原型模式** 的使用中获益。 你可以通过该模式来复制复杂结构， 而非从零开始重新构造。
