---
title: 关于 var CommandLine = func() func {} 的遐想
categories: 
  - 札记
tags:
  - Go
date: 2023-04-14 17:00:47
---

这篇文章介绍了我对函数式编程的发散式构想。

<!-- more -->

`var CommandLine = func() func {}` 这个语句定义了一个名为 CommandLine 的变量，其类型为一个没有参数，返回一个无类型函数的函数类型。具体来说， CommandLine 是一个函数类型的变量，其返回值是另一个函数，该返回函数没有参数，并且没有指定具体的返回类型。

这样的函数类型可以用于实现类似于装饰器或工厂函数等编程模式，也可以通过返回不同的函数实现多态性。在这个特定的语句中，由于其返回的函数没有指定具体类型，所以可以在返回时选择返回不同类型的函数，具体实现方式取决于具体的场景和需求。

## 装饰器模式

```go
func LoggingMiddleware(h http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        h.ServeHTTP(w, r)
    })
}

func main() {
    // 创建一个路由器
    router := http.NewServeMux()

    // 注册一个处理函数
    router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, World!")
    })

    // 使用 LoggingMiddleware 装饰处理函数
    loggedRouter := LoggingMiddleware(router)

    // 启动服务器
    log.Fatal(http.ListenAndServe(":8080", loggedRouter))
}
```

在这个示例中，我们定义了一个 LoggingMiddleware 函数，它接受一个 http.Handler 参数并返回一个新的 http.Handler 处理器函数。在返回的新处理器函数中，我们首先记录了请求的 HTTP 方法和 URL 路径，然后调用原本的处理函数 h。在这个函数中，我们将请求转发给下一个处理器，并在响应之后将日志记录到控制台中。

在主函数中，我们首先创建了一个 HTTP 路由器，并使用 router.HandleFunc 注册了根路径处理函数。然后使用 LoggingMiddleware 将这个处理函数装饰起来，创建了一个新的处理器，并将其命名为 loggedRouter。我们最后启动了服务器并将 loggedRouter 作为服务器的处理函数。

在这个示例中，我们通过使用装饰器模式，将日志记录功能与原本的处理函数解耦，方便地进行模块化和组合操作。同时，这个模式也可以用于添加认证、限流、缓存等处理，从而动态修改处理逻辑、增强系统的功能和扩展性。

## 工厂函数

```go
type Person struct {
    Name string
    Age  int
}

func NewPerson(name string, age int) *Person {
    return &Person{
        Name: name,
        Age:  age,
    }
}

func main() {
    // 使用 NewPerson 函数创建 Person 对象
    p1 := NewPerson("Alice", 20)
    p2 := NewPerson("Bob", 25)

    // 输出 Person 对象信息
    fmt.Printf("%+v\n", p1)
    fmt.Printf("%+v\n", p2)
}

```

在这个示例中，我们定义了一个 Person 结构体，并实现了一个 NewPerson 工厂函数，其返回一个新创建的 Person 对象。这个函数接收 Name 和 Age 两个参数，并在内部使用 &Person{} 创建并初始化一个新的 Person 对象。这个工厂函数的好处是可以避免在其他代码中重复使用 Person{} 并提高代码的可读性和可维护性。

在主函数中，我们使用 NewPerson() 函数创建了两个 Person 对象，并输出其信息。通过使用工厂函数，我们可以更加清晰地了解如何创建 Person 对象，而不必深入查看其实现。同时，这个方式也可以方便地进行扩展和修改，例如在工厂函数中添加参数验证、类型转换、默认值等逻辑。
