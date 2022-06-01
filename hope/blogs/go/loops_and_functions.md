---
icon: page
title: 循环与函数：牛顿法求平均值
date: 2022-05-07
category: Golang
author: Cloaks
sticky: false
star: false
tag:
  - 算法
---

为了练习函数与循环，我们来实现一个平方根函数：用牛顿法实现平方根函数。

<!-- more -->

计算机通常使用循环来计算 x 的平方根。从某个猜测的值 z 开始，我们可以根据 z² 与 x 的近似度来调整 z，产生一个更好的猜测：

$z -= (z*z - x) / (2*z)$

重复调整的过程，猜测的结果会越来越精确，得到的答案也会尽可能接近实际的平方根。

在提供的 `func Sqrt` 中实现它。无论输入是什么，对 z 的一个恰当的猜测为 1。 要开始，请重复计算 10 次并随之打印每次的 z 值。观察对于不同的值 x（1、2、3 ...）， 你得到的答案是如何逼近结果的，猜测提升的速度有多快。

提示：用类型转换或浮点数语法来声明并初始化一个浮点数值：

``` go
z := 1.0
z := float64(1)
```

然后，修改循环条件，使得当值停止改变（或改变非常小）的时候退出循环。观察迭代次数大于还是小于 10。 尝试改变 z 的初始猜测，如 x 或 x/2。你的函数结果与标准库中的 [`math.Sqrt`](https://go-zh.org/pkg/math/#Sqrt) 接近吗？

（*注：* 如果你对该算法的细节感兴趣，上面的 z² − x 是 z² 到它所要到达的值（即 x）的距离， 除以的 2z 为 z² 的导数，我们通过 z² 的变化速度来改变 z 的调整量。 这种通用方法叫做[牛顿法](https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E6%B3%95)。 它对很多函数，特别是平方根而言非常有效。）

**参考代码**

``` go {11}
package main

import (
	"fmt"
	"math"
)

func Sqrt(x float64) float64 {
	z := 1.0
	for i := 0; i < 10; i++ {
		z -= (z*z - x) / (2 * z)
		fmt.Println("num is ", i, z)
	}
	return z
}

func main() {
	fmt.Println("Sqrt(2) result is:", Sqrt(2))
	fmt.Println("math.Sqrt(2) result is:", math.Sqrt(2))
	fmt.Println("Sqrt(4) result is:", Sqrt(4))
	fmt.Println("math.Sqrt(4) result is:", math.Sqrt(4))
	fmt.Println("Sqrt(6) result is:", Sqrt(6))
	fmt.Println("math.Sqrt(6) result is:", math.Sqrt(6))
	fmt.Println("Sqrt(8) result is:", Sqrt(8))
	fmt.Println("math.Sqrt(8) result is:", math.Sqrt(8))
}
```

**结果**

``` go
num is  0 1.5
num is  1 1.4166666666666667
num is  2 1.4142156862745099
num is  3 1.4142135623746899
num is  4 1.4142135623730951
num is  5 1.414213562373095
num is  6 1.4142135623730951
num is  7 1.414213562373095
num is  8 1.4142135623730951
num is  9 1.414213562373095
Sqrt(2) result is: 1.414213562373095
math.Sqrt(2) result is: 1.4142135623730951
num is  0 2.5
num is  1 2.05
num is  2 2.000609756097561
num is  3 2.0000000929222947
num is  4 2.000000000000002
num is  5 2
num is  6 2
num is  7 2
num is  8 2
num is  9 2
Sqrt(4) result is: 2
math.Sqrt(4) result is: 2
num is  0 3.5
num is  1 2.607142857142857
num is  2 2.454256360078278
num is  3 2.4494943716069653
num is  4 2.4494897427875517
num is  5 2.449489742783178
num is  6 2.449489742783178
num is  7 2.449489742783178
num is  8 2.449489742783178
num is  9 2.449489742783178
Sqrt(6) result is: 2.449489742783178
math.Sqrt(6) result is: 2.449489742783178
num is  0 4.5
num is  1 3.138888888888889
num is  2 2.843780727630285
num is  3 2.8284685718801468
num is  4 2.8284271250498643
num is  5 2.8284271247461903
num is  6 2.82842712474619
num is  7 2.8284271247461903
num is  8 2.82842712474619
num is  9 2.8284271247461903
Sqrt(8) result is: 2.8284271247461903
math.Sqrt(8) result is: 2.8284271247461903
```