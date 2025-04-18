---
title: 单例模式
date: 2023-02-25 17:18:47
category:
  - 设计模式
tag:
  - 创建型模式
---

> 引自·[REFACTORING·GURU](https://refactoringguru.cn/)

单例模式是一种创建型设计模式， 让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。

单例模式同时解决了两个问题， 所以违反了单一职责原则：

1. 保证一个类只有一个实例。 为什么会有人想要控制一个类所拥有的实例数量？ 最常见的原因是控制某些共享资源 （例如数据库或文件） 的访问权限。

    它的运作方式是这样的： 如果你创建了一个对象， 同时过一会儿后你决定再创建一个新对象， 此时你会获得之前已创建的对象， 而不是一个新对象。

    注意， 普通构造函数无法实现上述行为， 因为构造函数的设计决定了它必须总是返回一个新对象。

2. 为该实例提供一个全局访问节点。 还记得你 （好吧， 其实是我自己） 用过的那些存储重要对象的全局变量吗？ 它们在使用上十分方便， 但同时也非常不安全， 因为任何代码都有可能覆盖掉那些变量的内容， 从而引发程序崩溃。

    和全局变量一样， 单例模式也允许在程序的任何地方访问特定对象。 但是它可以保护该实例不被其他代码覆盖。

    还有一点： 你不会希望解决同一个问题的代码分散在程序各处的。 因此更好的方式是将其放在同一个类中， 特别是当其他代码已经依赖这个类时更应该如此。

如今， 单例模式已经变得非常流行， 以至于人们会将只解决上文描述中任意一个问题的东西称为单例。

---

所有单例的实现都包含以下两个相同的步骤：

* 将默认构造函数设为私有， 防止其他对象使用单例类的 new运算符。
* 新建一个静态构建方法作为构造函数。 该函数会 “偷偷” 调用私有构造函数来创建对象， 并将其保存在一个静态成员变量中。 此后所有对于该函数的调用都将返回这一缓存对象。

如果你的代码能够访问单例类， 那它就能调用单例类的静态方法。 无论何时调用该方法， 它总是会返回相同的对象。

## 逻辑结构

![](https://refactoringguru.cn/images/patterns/diagrams/singleton/structure-zh-2x.png)

## 伪代码

在本例中， 数据库连接类即是一个单例。 该类不提供公有构造函数， 因此获取该对象的唯一方式是调用 获取实例方法。 该方法将缓存首次生成的对象， 并为所有后续调用返回该对象。

```java
// 数据库类会对`getInstance（获取实例）`方法进行定义以让客户端在程序各处
// 都能访问相同的数据库连接实例。
class Database is
    // 保存单例实例的成员变量必须被声明为静态类型。
    private static field instance: Database

    // 单例的构造函数必须永远是私有类型，以防止使用`new`运算符直接调用构
    // 造方法。
    private constructor Database() is
        // 部分初始化代码（例如到数据库服务器的实际连接）。
        // ……

    // 用于控制对单例实例的访问权限的静态方法。
    public static method getInstance() is
        if (Database.instance == null) then
            acquireThreadLock() and then
                // 确保在该线程等待解锁时，其他线程没有初始化该实例。
                if (Database.instance == null) then
                    Database.instance = new Database()
        return Database.instance

    // 最后，任何单例都必须定义一些可在其实例上执行的业务逻辑。
    public method query(sql) is
        // 比如应用的所有数据库查询请求都需要通过该方法进行。因此，你可以
        // 在这里添加限流或缓冲逻辑。
        // ……

class Application is
    method main() is
        Database foo = Database.getInstance()
        foo.query("SELECT ……")
        // ……
        Database bar = Database.getInstance()
        bar.query("SELECT ……")
        // 变量 `bar` 和 `foo` 中将包含同一个对象。
```

## 应用场景

* 如果程序中的某个类对于所有客户端只有一个可用的实例， 可以使用单例模式。

单例模式禁止通过除特殊构建方法以外的任何方式来创建自身类的对象。 该方法可以创建一个新对象， 但如果该对象已经被创建， 则返回已有的对象。

* 如果你需要更加严格地控制全局变量， 可以使用单例模式。

单例模式与全局变量不同， 它保证类只存在一个实例。 除了单例类自己以外， 无法通过任何方式替换缓存的实例。

`请注意，你可以随时调整限制并设定生成单例实例的数量，只需修改 获取实例方法，即 getInstance 中的代码即可实现。`

## 实现方式

1. 在类中添加一个私有静态成员变量用于保存单例实例。
2. 声明一个公有静态构建方法用于获取单例实例。
3. 在静态方法中实现"延迟初始化"。 该方法会在首次被调用时创建一个新对象， 并将其存储在静态成员变量中。 此后该方法每次被调用时都返回该实例。
4. 将类的构造函数设为私有。 类的静态方法仍能调用构造函数， 但是其他对象不能调用。
5. 检查客户端代码， 将对单例的构造函数的调用替换为对其静态构建方法的调用。

## 优缺点

**优点**

* 你可以保证一个类只有一个实例。
* 你获得了一个指向该实例的全局访问节点。
* 仅在首次请求单例对象时对其进行初始化。

**缺点**

* 违反了单一职责原则。 该模式同时解决了两个问题。
* 单例模式可能掩盖不良设计， 比如程序各组件之间相互了解过多等。
* 该模式在多线程环境下需要进行特殊处理， 避免多个线程多次创建单例对象。
* 单例的客户端代码单元测试可能会比较困难， 因为许多测试框架以基于继承的方式创建模拟对象。 由于单例类的构造函数是私有的， 而且绝大部分语言无法重写静态方法， 所以你需要想出仔细考虑模拟单例的方法。 要么干脆不编写测试代码， 或者不使用单例模式。

## 与其他模式的关系

* 外观模式类通常可以转换为单例模式类， 因为在大部分情况下一个外观对象就足够了。

* 如果你能将对象的所有共享状态简化为一个享元对象， 那么享元模式就和单例类似了。 但这两个模式有两个根本性的不同。

  1. 只会有一个单例实体， 但是享元类可以有多个实体， 各实体的内在状态也可以不同。
  2. 单例对象可以是可变的。 享元对象是不可变的。

* 抽象工厂模式、 生成器模式和原型模式都可以用单例来实现。

## 代码示例

### Java

#### 基础单例（单线程）

实现一个粗糙的单例非常简单。 你仅需隐藏构造函数并实现一个静态的构建方法即可。

=== "📄Singleton.java: 单例"

    ```java
    package refactoring_guru.singleton.example.non_thread_safe;

    public final class Singleton {
        private static Singleton instance;
        public String value;

        private Singleton(String value) {
            // The following code emulates slow initialization.
            try {
                Thread.sleep(1000);
            } catch (InterruptedException ex) {
                ex.printStackTrace();
            }
            this.value = value;
        }

        public static Singleton getInstance(String value) {
            if (instance == null) {
                instance = new Singleton(value);
            }
            return instance;
        }
    }
    ```

=== "📄DemoSingleThread.java: 客户端代码"

    ```java
    package refactoring_guru.singleton.example.non_thread_safe;

    public class DemoSingleThread {
        public static void main(String[] args) {
            System.out.println("If you see the same value, then singleton was reused (yay!)" + "\n" +
                    "If you see different values, then 2 singletons were created (booo!!)" + "\n\n" +
                    "RESULT:" + "\n");
            Singleton singleton = Singleton.getInstance("FOO");
            Singleton anotherSingleton = Singleton.getInstance("BAR");
            System.out.println(singleton.value);
            System.out.println(anotherSingleton.value);
        }
    }
    ```

=== "📄OutputDemoSingleThread.txt: 执行结果"

    ```java
    If you see the same value, then singleton was reused (yay!)
    If you see different values, then 2 singletons were created (booo!!)

    RESULT:

    FOO
    FOO
    ```

#### 基础单例（多线程）

相同的类在多线程环境中会出错。 多线程可能会同时调用构建方法并获取多个单例类的实例。

=== "📄Singleton.java: 单例"

    ```java
    package refactoring_guru.singleton.example.non_thread_safe;

    public final class Singleton {
        private static Singleton instance;
        public String value;

        private Singleton(String value) {
            // The following code emulates slow initialization.
            try {
                Thread.sleep(1000);
            } catch (InterruptedException ex) {
                ex.printStackTrace();
            }
            this.value = value;
        }

        public static Singleton getInstance(String value) {
            if (instance == null) {
                instance = new Singleton(value);
            }
            return instance;
        }
    }
    ```

=== "📄DemoMultiThread.java: 客户端代码"

    ```java
    package refactoring_guru.singleton.example.non_thread_safe;

    public class DemoMultiThread {
        public static void main(String[] args) {
            System.out.println("If you see the same value, then singleton was reused (yay!)" + "\n" +
                    "If you see different values, then 2 singletons were created (booo!!)" + "\n\n" +
                    "RESULT:" + "\n");
            Thread threadFoo = new Thread(new ThreadFoo());
            Thread threadBar = new Thread(new ThreadBar());
            threadFoo.start();
            threadBar.start();
        }

        static class ThreadFoo implements Runnable {
            @Override
            public void run() {
                Singleton singleton = Singleton.getInstance("FOO");
                System.out.println(singleton.value);
            }
        }

        static class ThreadBar implements Runnable {
            @Override
            public void run() {
                Singleton singleton = Singleton.getInstance("BAR");
                System.out.println(singleton.value);
            }
        }
    }
    ```

=== "📄OutputDemoSingleThread.txt: 执行结果"

    ```java
    If you see the same value, then singleton was reused (yay!)
    If you see different values, then 2 singletons were created (booo!!)

    RESULT:

    FOO
    BAR
    ```

#### 采用延迟加载的线程安全单例

为了解决这个问题， 你必须在创建首个单例对象时对线程进行同步。

=== "📄Singleton.java: 单例"

    ```java
    package refactoring_guru.singleton.example.thread_safe;

    public final class Singleton {
        // The field must be declared volatile so that double check lock would work
        // correctly.
        private static volatile Singleton instance;

        public String value;

        private Singleton(String value) {
            this.value = value;
        }

        public static Singleton getInstance(String value) {
            // The approach taken here is called double-checked locking (DCL). It
            // exists to prevent race condition between multiple threads that may
            // attempt to get singleton instance at the same time, creating separate
            // instances as a result.
            //
            // It may seem that having the `result` variable here is completely
            // pointless. There is, however, a very important caveat when
            // implementing double-checked locking in Java, which is solved by
            // introducing this local variable.
            //
            // You can read more info DCL issues in Java here:
            // https://refactoring.guru/java-dcl-issue
            Singleton result = instance;
            if (result != null) {
                return result;
            }
            synchronized(Singleton.class) {
                if (instance == null) {
                    instance = new Singleton(value);
                }
                return instance;
            }
        }
    }
    ```

=== "📄DemoMultiThread.java: 客户端代码"

    ```java
    package refactoring_guru.singleton.example.thread_safe;

    public class DemoMultiThread {
        public static void main(String[] args) {
            System.out.println("If you see the same value, then singleton was reused (yay!)" + "\n" +
                    "If you see different values, then 2 singletons were created (booo!!)" + "\n\n" +
                    "RESULT:" + "\n");
            Thread threadFoo = new Thread(new ThreadFoo());
            Thread threadBar = new Thread(new ThreadBar());
            threadFoo.start();
            threadBar.start();
        }

        static class ThreadFoo implements Runnable {
            @Override
            public void run() {
                Singleton singleton = Singleton.getInstance("FOO");
                System.out.println(singleton.value);
            }
        }

        static class ThreadBar implements Runnable {
            @Override
            public void run() {
                Singleton singleton = Singleton.getInstance("BAR");
                System.out.println(singleton.value);
            }
        }
    }
    ```

=== "📄OutputDemoSingleThread.txt: 执行结果"

    ```java
    If you see the same value, then singleton was reused (yay!)
    If you see different values, then 2 singletons were created (booo!!)

    RESULT:

    BAR
    BAR
    ```

### Go

=== "📄single.go: 单例"

    ```go
    package main

    import (
        "fmt"
        "sync"
    )

    var lock = &sync.Mutex{}

    type single struct {
    }

    var singleInstance *single

    func getInstance() *single {
        if singleInstance == nil {
            lock.Lock()
            defer lock.Unlock()
            if singleInstance == nil {
                fmt.Println("Creating single instance now.")
                singleInstance = &single{}
            } else {
                fmt.Println("Single instance already created.")
            }
        } else {
            fmt.Println("Single instance already created.")
        }

        return singleInstance
    }
    ```

=== "📄main.go: 客户端代码"

    ```go
    package main

    import (
        "fmt"
    )

    func main() {

        for i := 0; i < 30; i++ {
            go getInstance()
        }

        // Scanln is similar to Scan, but stops scanning at a newline and
        // after the final item there must be a newline or EOF.
        fmt.Scanln()
    }
    ```

=== "📄output.txt: 执行结果"

    ```go
    Creating single instance now.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    Single instance already created.
    ```
