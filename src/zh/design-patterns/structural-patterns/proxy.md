---
title: 代理模式
date: 2023-02-25 17:18:47
sticky: 10
toc: 3
---

**代理模式**是一种结构型设计模式， 让你能够提供对象的替代品或其占位符。 代理控制着对于原对象的访问， 并允许在将请求提交给对象前后进行一些处理。

## 逻辑结构

<div style="display: flex; flex-direction: row; justify-content: center; zoom: 60%; float: right">
<div>

![](https://refactoringguru.cn/images/patterns/diagrams/proxy/structure-indexed-2x.png)
</div>
</div>

1. **服务接口** （Service Interface） 声明了服务接口。 代理必须遵循该接口才能伪装成服务对象。
2. **服务** （Service） 类提供了一些实用的业务逻辑。
3. **代理** （Proxy） 类包含一个指向服务对象的引用成员变量。 代理完成其任务 （例如延迟初始化、 记录日志、 访问控制和缓存等） 后会将请求传递给服务对象。通常情况下， 代理会对其服务对象的整个生命周期进行管理。
4. **客户端** （Client） 能通过同一接口与服务或代理进行交互， 所以你可在一切需要服务对象的代码中使用代理。

## 应用场景

* **延迟初始化** （虚拟代理）。 如果你有一个偶尔使用的重量级服务对象， 一直保持该对象运行会消耗系统资源时， 可使用代理模式。

    你无需在程序启动时就创建该对象， 可将对象的初始化延迟到真正有需要的时候。

* **访问控制** （保护代理）。 如果你只希望特定客户端使用服务对象， 这里的对象可以是操作系统中非常重要的部分， 而客户端则是各种已启动的程序 （包括恶意程序）， 此时可使用代理模式。

    代理可仅在客户端凭据满足要求时将请求传递给服务对象。

* **本地执行远程服务** （远程代理）。 适用于服务对象位于远程服务器上的情形。

    在这种情形中， 代理通过网络传递客户端请求， 负责处理所有与网络相关的复杂细节。

* **记录日志请求** （日志记录代理）。 适用于当你需要保存对于服务对象的请求历史记录时。

    代理可以在向服务传递请求前进行记录。

* **缓存请求结果** （缓存代理）。 适用于需要缓存客户请求结果并对缓存生命周期进行管理时， 特别是当返回结果的体积非常大时。

    代理可对重复请求所需的相同结果进行缓存， 还可使用请求参数作为索引缓存的键值。

* **智能引用**。 可在没有客户端使用某个重量级对象时立即销毁该对象。

代理会将所有获取了指向服务对象或其结果的客户端记录在案。 代理会时不时地遍历各个客户端， 检查它们是否仍在运行。 如果相应的客户端列表为空， 代理就会销毁该服务对象， 释放底层系统资源。

代理还可以记录客户端是否修改了服务对象。 其他客户端还可以复用未修改的对象。

## 实现方式

Nginx 这样的 Web 服务器可充当应用程序服务器的代理：

* 提供了对应用程序服务器的受控访问权限。
* 可限制速度。
* 可缓存请求。

1. 如果没有现成的服务接口， 你就需要创建一个接口来实现代理和服务对象的可交换性。 从服务类中抽取接口并非总是可行的， 因为你需要对服务的所有客户端进行修改， 让它们使用接口。 备选计划是将代理作为服务类的子类， 这样代理就能继承服务的所有接口了。
2. 创建代理类， 其中必须包含一个存储指向服务的引用的成员变量。 通常情况下， 代理负责创建服务并对其整个生命周期进行管理。 在一些特殊情况下， 客户端会通过构造函数将服务传递给代理。

    ```go 📄nginx.go: 代理
    package main

    type Nginx struct {
        application       *Application
        maxAllowedRequest int
        rateLimiter       map[string]int
    }

    func newNginxServer() *Nginx {
        return &Nginx{
            application:       &Application{},
            maxAllowedRequest: 2,
            rateLimiter:       make(map[string]int),
        }
    }

    func (n *Nginx) handleRequest(url, method string) (int, string) {
        allowed := n.checkRateLimiting(url)
        if !allowed {
            return 403, "Not Allowed"
        }
        return n.application.handleRequest(url, method)
    }

    func (n *Nginx) checkRateLimiting(url string) bool {
        if n.rateLimiter[url] == 0 {
            n.rateLimiter[url] = 1
        }
        if n.rateLimiter[url] > n.maxAllowedRequest {
            return false
        }
        n.rateLimiter[url] = n.rateLimiter[url] + 1
        return true
    }
    ```

3. 根据需求实现代理方法。 在大部分情况下， 代理在完成一些任务后应将工作委派给服务对象。

    ```go 📄server.go: 主体
    package main

    type server interface {
        handleRequest(string, string) (int, string)
    }
    ```

    ```go 📄application.go: 真实主体
    package main

    type Application struct {
    }

    func (a *Application) handleRequest(url, method string) (int, string) {
        if url == "/app/status" && method == "GET" {
            return 200, "Ok"
        }

        if url == "/create/user" && method == "POST" {
            return 201, "User Created"
        }
        return 404, "Not Ok"
    }
    ```

4. 可以考虑新建一个构建方法来判断客户端可获取的是代理还是实际服务。 你可以在代理类中创建一个简单的静态方法， 也可以创建一个完整的工厂方法。
5. 可以考虑为服务对象实现延迟初始化。

```go 📄main.go: 客户端代码
package main

import "fmt"

func main() {

    nginxServer := newNginxServer()
    appStatusURL := "/app/status"
    createuserURL := "/create/user"

    httpCode, body := nginxServer.handleRequest(appStatusURL, "GET")
    fmt.Printf("\nUrl: %s\nHttpCode: %d\nBody: %s\n", appStatusURL, httpCode, body)

    httpCode, body = nginxServer.handleRequest(appStatusURL, "GET")
    fmt.Printf("\nUrl: %s\nHttpCode: %d\nBody: %s\n", appStatusURL, httpCode, body)

    httpCode, body = nginxServer.handleRequest(appStatusURL, "GET")
    fmt.Printf("\nUrl: %s\nHttpCode: %d\nBody: %s\n", appStatusURL, httpCode, body)

    httpCode, body = nginxServer.handleRequest(createuserURL, "POST")
    fmt.Printf("\nUrl: %s\nHttpCode: %d\nBody: %s\n", appStatusURL, httpCode, body)

    httpCode, body = nginxServer.handleRequest(createuserURL, "GET")
    fmt.Printf("\nUrl: %s\nHttpCode: %d\nBody: %s\n", appStatusURL, httpCode, body)
}
```

```go 📄output.txt: 执行结果
Url: /app/status
HttpCode: 200
Body: Ok

Url: /app/status
HttpCode: 200
Body: Ok

Url: /app/status
HttpCode: 403
Body: Not Allowed

Url: /app/status
HttpCode: 201
Body: User Created

Url: /app/status
HttpCode: 404
Body: Not Ok
```

## 优缺点

| 优点                                                                    | 缺点                                      |
| ----------------------------------------------------------------------- | ----------------------------------------- |
| 你可以在客户端毫无察觉的情况下控制服务对象。                            | 代码可能会变得复杂， 因为需要新建许多类。 |
| 如果客户端对服务对象的生命周期没有特殊要求， 你可以对生命周期进行管理。 | 服务响应可能会延迟。                      |
| 即使服务对象还未准备好或不存在， 代理也可以正常工作。                   |                                           |
| 开闭原则。 你可以在不对服务或客户端做出修改的情况下创建新代理。         |                                           |

## 与其他模式的关系

* **适配器模式**能为被封装对象提供不同的接口， **代理模式**能为对象提供相同的接口， **装饰模式**则能为对象提供加强的接口。
* **外观模式**与**代理**的相似之处在于它们都缓存了一个复杂实体并自行对其进行初始化。 *代理*与其服务对象遵循同一接口， 使得自己和服务对象可以互换， 在这一点上它与*外观*不同。
* **装饰**和**代理**有着相似的结构， 但是其意图却非常不同。 这两个模式的构建都基于组合原则， 也就是说一个对象应该将部分工作委派给另一个对象。 两者之间的不同之处在于代理通常自行管理其服务对象的生命周期， 而装饰的生成则总是由客户端进行控制。
