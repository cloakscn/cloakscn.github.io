---
title: 🍀 我对 Context 包的理解
date: 2024-04-03 11:17:00
categories:
 - Golang
---

## 引言

讲真的，我一直不明白 go 的 context 怎么用，之前在用 Java 开发时就不清楚，所以这次专门花时间把 go 的 context 弄清楚。

我记得第一次接触 context 时，文档上说这个是用来做并发控制的，可以设置超时时间，超时就会快快速返回，可以携带一些信息，在生命周期中共享。生命周期这个概念很重要，我们在开发时需要掌控程序的生命周期。

我们不能简单的认为只要函数中带着 context 参数往下传递就可以做到超时取消，快速返回，其实这是一个错误的思想，其取消机制采用的也是通知机制，但出的透传并不会起作用，比如你这么写代码：

```go
func main()  {
    ctx,cancel := context.WithTimeout(context.Background(),10 * time.Second)
    defer cancel()
    go Monitor(ctx)

    time.Sleep(20 * time.Second)
}

func Monitor(ctx context.Context)  {
    for {
        fmt.Print("monitor")
    }
}
```

我们需要学会正确的使用 context。

<!-- more -->

## 方法介绍

context 有两种创建方式 `context.Background()` 和 `context.TODO()`。这两个函数没有本质的区别，分析它们的源码可以发现都衍生自 `emptyCtx`：

```go
// An emptyCtx is never canceled, has no values, and has no deadline.
// It is the common base of backgroundCtx and todoCtx.
type emptyCtx struct{}

func (emptyCtx) Deadline() (deadline time.Time, ok bool) {
	return
}

func (emptyCtx) Done() <-chan struct{} {
	return nil
}

func (emptyCtx) Err() error {
	return nil
}

func (emptyCtx) Value(key any) any {
	return nil
}

type backgroundCtx struct{ emptyCtx }

func (backgroundCtx) String() string {
	return "context.Background"
}

type todoCtx struct{ emptyCtx }

func (todoCtx) String() string {
	return "context.TODO"
}

// Background returns a non-nil, empty [Context]. It is never canceled, has no
// values, and has no deadline. It is typically used by the main function,
// initialization, and tests, and as the top-level Context for incoming
// requests.
func Background() Context {
	return backgroundCtx{}
}

// TODO returns a non-nil, empty [Context]. Code should use context.TODO when
// it's unclear which Context to use or it is not yet available (because the
// surrounding function has not yet been extended to accept a Context
// parameter).
func TODO() Context {
	return todoCtx{}
}
```

从源码中可以很清晰的看到 `Background` 建议在上下文最开始使用，所有其他上下文都应该从它衍生出来，`TODO` 建议在不确定使用什么类型上下文或在开发阶段（即使用的方法还没有被正式纳入生命周期管理时）使用。

使用上出初始化方法创建的上下文并没有任何功能，具体需要使用 context 包提供的 `WithX` 系列方法派生功能：

```go
func WithCancel(parent Context) (ctx Context, cancel CancelFunc)
func WithDeadline(parent Context, deadline time.Time) (Context, CancelFunc)
func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)
func WithValue(parent Context, key, val interface{}) Context
```

其数据结构均为组合了父 context 的对象：

```go
type xCtx struct {
    Context

    // ...
    // 业务相关的属性
}
```

基于一个父 Context 可以随意衍生，其实这就是一个 Context 树，树的每个节点都可以有任意多个子节点，节点层级可以有任意多个，每个子节点都依赖于其父节点。

### WithValue 携带数据

### 超时控制

### WithCancel 取消控制