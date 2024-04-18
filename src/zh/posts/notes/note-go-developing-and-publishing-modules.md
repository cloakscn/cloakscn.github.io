---
title: Developing and publishing modules
date: 2023-04-07 10:07:39
category: 札记
tags:
  - Go
---

你可以收集相关的包放到自己的模块中，推送到远程仓库方便其他开发者使用。这篇文章介绍了如何开发和推送模块。

<!-- more -->

## Design and development

如果模块中的功能和包形成一个连贯的整体，开发者将能够更加容易寻找并使用它。我们在开发公开 API 时应该遵循以下约定：

* 保持模块功能的集中和独立；
* 设计应该向后兼容，方便用户可以低成本的更新；

在我们推送模块前，可以使用 replace 命令在本地测试模块的可用性。

### Keeping your modules compatible

## Decentralized publishing

在 Go 中直接把开发的模块发布到自己的仓库中，用 tag 打好标签就可以提供给其他开发者使用了。不需要推送到中心仓库，因为 Go tools 会直接从你的仓库中下载模块。

因此，在开发模块时，我们应该遵循官方规约以便 Go tools 能够顺利的拉取并编译我们的模块。

### Managing module source

#### Organizing code in the repository

一个简单的 Go 项目结构如下：

<image src="https://go.dev/doc/modules/images/source-hierarchy.png" style="zoom:50%"/>

执行 git 命令发布模块

```shell
$ git init
$ git add --all
$ git commit -m "mycode: initial commit"
$ git push
```

#### Choosing repository scope

##### Sourcing one module per repository

单仓库单模块，只需要把 go.mod 文件放到仓库根目录下，源码放在包的子目录下。这是最简单的方法，让你能够简单的管理模块，避免在模块版本号前加目录路径。

<image src="https://go.dev/doc/modules/images/single-module.png" style="zoom:50%"/>

##### Sourcing multiple modules in a single repository

同样的也有单仓库多模块的管理办法。

每一个模块下都应该包含 go.mod 文件。

每一个模块在变更时都必须用`路径/版本的方式`打 tag 标记。

如果图片中的 module1 发布 v1.2.3 版本，应该遵循以下规约：

* 模块路径：**example.com/mymodules/module1**
* 版本 tag: **module1/v1.2.3**
* 包导入路径: **example.com/mymodules/module1/package1**
* 用户的 require 指令中给出的模块路径: **example.com/mymodules/module1 module1/v1.2.3**

<image src="https://go.dev/doc/modules/images/multiple-modules.png" style="zoom:50%"/>

### Publishing a module

使用以下步骤推送我们自己开发的模块：

1. 在模块根目录下打开命令行窗口；
2. 执行 `go mod tidy` 删除不在需要的依赖；
3. 执行 `go test ./...` 测试所有的功能都能正常工作；
   
    命令将会执行模块下所有的单元测试。

    ```shell
    $ go test ./...
    ok      example.com/mymodule       0.015s
    ```

4. 使用 `git tag` 命令用新版本号标记项目；

    ```shell
    $ git commit -m "mymodule: changes for v0.1.0"
    $ git tag v0.1.0
    ```

5. 推送新的 tag 到远程仓库。

    ```shell
    $ git push origin v0.1.0
    ```

6. 通过运行 `go list` 命令提示 Go 使用有关您发布的模块的信息更新其模块索引，使模块可用。

    ```shell
    $ GOPROXY=proxy.golang.org go list -m example.com/mymodule@v0.1.0
    ```

最终开发者可以使用 `go get` 命令获取发布的模块。

```shell
$ go get example.com/mymodule@v0.1.0
```

## Package discovery

当我们发布模块并且被其他用户通过 Go tools 拉取后，我们就可以在 Go 官方的网站中检索到模块的相关文档（文档是遵循官方定义的注释风格自动生成的）。

### Developing and testing against unpublished module code

我们可以在代码中指定未被发布的依赖模块用于本地进行测试。

什么情况下我们需要这样操作：

* 我们想对 fork/clone 的代码进行改变，可能是修复一个漏洞，然后新建合并请求给模块的开发者。
* 我们自己开发了一个模块，但是还没有推送，所以不能使用 `go get` 命令拉取模块。

#### Requiring module code in a local directory

#### Requiring external module code from your own repository fork

## Versioning

遵循官方的规约我们也是可以实现模块的版本控制的，这样可以帮助开发者决定使用哪个版本的模块以及觉得何时进行重大更新。

## Q&A

* **Q1: 如何使用 "go get" 拉取私有仓库?**

    Git 可以配置使用 SSH 替换 HTTPS 在匹配到提供的请求前缀。在 `~/.gitconfig` 中添加以下配置或执行命令：

    ```shell
    [url "ssh://git@github.com/"]
        insteadOf = https://github.com/

    git config --global url."ssh://git@github.com/".insteadOf "https://github.com"
    ```