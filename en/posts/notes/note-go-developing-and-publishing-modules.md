---
title: Developing and Publishing Modules
date: 2023-04-07 10:07:39
category: Notes
tags:
  - Go
---

You can gather relevant packages into your own module and push it to a remote repository for the convenience of other developers. This article explains how to develop and push modules.

<!-- more -->

## Design and Development

If the functionality within the module forms a coherent whole with packages, developers will find it easier to locate and use it. When developing a public API, it's advisable to follow these conventions:

* Keep the functionality of the module centralized and independent.
* Design for backward compatibility to facilitate low-cost updates for users.

Before pushing the module, you can use the `replace` command to test the module's availability locally.

### Keeping Your Modules Compatible

## Decentralized Publishing

In Go, you can directly publish the developed module to your repository, tag it, and provide it to other developers. There's no need to push it to a central repository because Go tools can download the module directly from your repository.

Therefore, when developing modules, we should follow official conventions so that Go tools can smoothly fetch and compile our modules.

### Managing Module Source

#### Organizing Code in the Repository

A simple Go project structure looks like this:

<image src="https://go.dev/doc/modules/images/source-hierarchy.png" style="zoom:50%" />

Execute Git commands to publish the module:

```shell
$ git init
$ git add --all
$ git commit -m "mycode: initial commit"
$ git push
```

#### Choosing Repository Scope

##### Sourcing One Module per Repository

For a single repository per module, place the `go.mod` file in the repository's root directory, and the source code in a subdirectory of the package. This is the simplest method, allowing you to easily manage the module and avoid adding directory paths before module version numbers.

<image src="https://go.dev/doc/modules/images/single-module.png" style="zoom:50%" />

##### Sourcing Multiple Modules in a Single Repository

Similarly, there is a method for managing multiple modules in a single repository.

Each module should contain a `go.mod` file.

Each module must be tagged with the `path/version` when changes are made.

If `module1` in the image publishes version `v1.2.3`, it should adhere to the following conventions:

* Module path: **example.com/mymodules/module1**
* Version tag: **module1/v1.2.3**
* Package import path: **example.com/mymodules/module1/package1**
* Module path given in the user's require directive: **example.com/mymodules/module1 module1/v1.2.3**

<image src="https://go.dev/doc/modules/images/multiple-modules.png" style="zoom:50%" />

### Publishing a Module

Use the following steps to push your own developed module:

1. Open a command prompt in the module's root directory.
2. Execute `go mod tidy` to remove unnecessary dependencies.
3. Run `go test ./...` to test that all functionalities work correctly.
   
   The command will execute all unit tests in the module.

   ```shell
   $ go test ./...
   ok      example.com/mymodule       0.015s
   ```

4. Use the `git tag` command to mark the project with a new version number.

   ```shell
   $ git commit -m "mymodule: changes for v0.1.0"
   $ git tag v0.1.0
   ```

5. Push the new tag to the remote repository.

   ```shell
   $ git push origin v0.1.0
   ```

6. Update the Go module index with information about your published module by running the `go list` command. This makes the module available.

   ```shell
   $ GOPROXY=proxy.golang.org go list -m example.com/mymodule@v0.1.0
   ```

Ultimately, developers can use the `go get` command to fetch the published module.

```shell
$ go get example.com/mymodule@v0.1.0
```

## Package Discovery

Once we publish a module and it is fetched by other users using Go tools, we can find related documentation for the module on the official Go website (the documentation follows the annotation style defined by the official Go specifications).

### Developing and Testing Against Unpublished Module Code

We can specify unreleased dependent modules in our code for local testing.

Instances when we need to do this:

* We want to make changes to forked/cloned code, perhaps fixing a bug, and then create a merge request for the module's developers.
* We have developed a module ourselves but haven't pushed it yet, so we cannot use the `go get` command to fetch the module.

#### Requiring Module Code in a Local Directory

#### Requiring External Module Code from Your Own Repository Fork

## Versioning

Following official conventions also allows us to implement version control for modules. This helps developers decide which version of the module to use and when to consider significant updates.

## Q&A

* **Q1: How can I use `go get` to fetch a module from a private repository?**

    Git can be configured to use SSH instead of HTTPS for matching the provided request prefix. Add the following configuration to `~/.gitconfig` or execute the command:

    ```shell
    [url "ssh://git@github.com/"]
        insteadOf = https://github.com/

    git config --global url."ssh://git@github.com/".insteadOf "https://github.com"
    ```