---
title: 动态规划
date: 2023-02-19 22:51:05
categories: 
  - 算法
tags:
---

动态规划（英语：Dynamic programming，简称 DP）是一种在数学、管理科学、计算机科学、经济学和生物信息学中使用的，通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。

动态规划常常适用于有重叠子问题和最优子结构性质的问题，并且记录所有子问题的结果，因此动态规划方法所耗时间往往远少于朴素解法。

动态规划有自底向上和自顶向下两种解决问题的方式。**自顶向下即记忆化递归，自底向上就是递推。**

使用动态规划解决的问题有个明显的特点，一旦一个子问题的求解得到结果，以后的计算过程就不会修改它，这样的特点叫做无后效性，求解问题的过程形成了一张有向无环图。动态规划只解决每个子问题一次，具有天然剪枝的功能，从而减少计算量。

<!-- more -->

## 状态压缩

状态压缩是使用某种方法，简明扼要地以最小代价来表示某种状态，通常是用一串 01 数字（二进制数）来表示各个点的状态。**这就是要求使用状态压缩的对象的点的状态必须只有两种**，0 或 1；当然如果有三种状态用**三进制**也是可以的，注意灵活变通。

### 使用条件

1. **解法需要保存一定的状态数据**（表示一种状态的一个数据值），每个状态数据通常情况下是可以通过 2 进制来表示的。这就要求状态数据的每个单元只有两种状态，比如说棋盘上的各自，放或不放；硬币的正反两面。这样用 0/1 来表示状态数据的每一个单元，而**整个状态数据就是一个一串 0 和 1 组成的二进制数**。
2. 解法需要将状态数据实现为一个基本的数据类型，比如 `int,long, etc.` 即所谓的状态压缩。状态压缩的目的一方面是**缩小了数据的存储空间**，另一方面是**在状态对比和状态整体处理时能够提高效率**。这样就要求状态数据中的单元个数不能太大，比如 int 表示一个状态时，状态单元的个数不能超过 32 位（32 位机器）。

一般基础的状态压缩就是将一行的状态压缩成一个数，这个数的二进制形式反映了这一行的情况。由于使用二进制数来保存被压缩的状态，所以要用到二进制**[位运算](./algorithm-bit-manipulation.md)**操作，将一个十进制数转换二进制进行位运算操作再转回十进制。

## 例题

### 70 爬楼梯

<p>假设你正在爬楼梯。需要 <code>n</code>&nbsp;阶你才能到达楼顶。</p>

<p>每次你可以爬 <code>1</code> 或 <code>2</code> 个台阶。你有多少种不同的方法可以爬到楼顶呢？</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>2
<strong>解释：</strong>有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>3
<strong>解释：</strong>有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 45</code></li>
</ul>

```go
func climbStairs(n int) int {
    p, q, r := 0, 0, 1
    for i := 1; i <= n; i++ {
        p = q
        q = r
        r = p + q
    }
    return r
}
```

### 198 打家劫舍

<p>你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，<strong>如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警</strong>。</p>

<p>给定一个代表每个房屋存放金额的非负整数数组，计算你<strong> 不触动警报装置的情况下 </strong>，一夜之内能够偷窃到的最高金额。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>[1,2,3,1]
<strong>输出：</strong>4
<strong>解释：</strong>偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>[2,7,9,3,1]
<strong>输出：</strong>12
<strong>解释：</strong>偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= nums.length <= 100</code></li>
	<li><code>0 <= nums[i] <= 400</code></li>
</ul>

```go
func rob(nums []int) int {
    if len(nums) == 0 {
        return 0
    }
    if len(nums) == 1 {
        return nums[0]
    }
    first := nums[0]
    second := max(nums[0], nums[1])
    for i := 2; i < len(nums); i++ {
        first, second = second, max(first + nums[i], second)
    }
    return second
}

func max(x, y int) int {
    if x > y {
        return x
    }
    return y
}
```

### 120 三角形最小路径和

<p>给定一个三角形 <code>triangle</code> ，找出自顶向下的最小路径和。</p>

<p>每一步只能移动到下一行中相邻的结点上。<strong>相邻的结点 </strong>在这里指的是 <strong>下标</strong> 与 <strong>上一层结点下标</strong> 相同或者等于 <strong>上一层结点下标 + 1</strong> 的两个结点。也就是说，如果正位于当前行的下标 <code>i</code> ，那么下一步可以移动到下一行的下标 <code>i</code> 或 <code>i + 1</code> 。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
<strong>输出：</strong>11
<strong>解释：</strong>如下面简图所示：
   <strong>2</strong>
  <strong>3</strong> 4
 6 <strong>5</strong> 7
4 <strong>1</strong> 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>triangle = [[-10]]
<strong>输出：</strong>-10
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= triangle.length <= 200</code></li>
	<li><code>triangle[0].length == 1</code></li>
	<li><code>triangle[i].length == triangle[i - 1].length + 1</code></li>
	<li><code>-10<sup>4</sup> <= triangle[i][j] <= 10<sup>4</sup></code></li>
</ul>

<p> </p>

<p><strong>进阶：</strong></p>

<ul>
	<li>你可以只使用 <code>O(n)</code> 的额外空间（<code>n</code> 为三角形的总行数）来解决这个问题吗？</li>
</ul>

#### 思路与算法

我们用 $f[i][j]$ 表示从三角形顶部走到位置 $(i,j)$ 的最小路径和。这里的位置 $(i,j)$ 指的是三角形中第 $i$ 行第 $j$ 列（均从 $0$ 开始编号）的位置。

由于每一步只能移动到下一行「相邻的节点」上，因此要想走到位置 $(i,j)$，上一步就只能在位置 $(i−1,j−1)$ 或者位置 $(i−1,j)$。我们在这两个位置中选择一个路径和较小的来进行转移，状态转移方程为：

$$
f[i][j]=min(f[i−1][j−1],f[i−1][j])+c[i][j]
$$

其中 $c[i][j]$ 表示位置 $(i,j)$ 对应的元素值。

注意第 $i$ 行有 $i+1$ 个元素，它们对应的 $j$ 的范围为 $[0,i]$。当 $j=0$ 或 $j=i$ 时，上述状态转移方程中有一些项是没有意义的。例如当 $j=0$ 时，$f[i−1][j−1]$ 没有意义，因此状态转移方程为：

$$
f[i][0]=f[i−1][0]+c[i][0]
$$

即当我们在第 $i$ 行的最左侧时，我们只能从第 $i-1$ 行的最左侧移动过来。当 $j=i$ 时，$f[i−1][j]$ 没有意义，因此状态转移方程为：

$$
f[i][i]=f[i−1][i−1]+c[i][i]
$$

即当我们在第 $i$ 行的最右侧时，我们只能从第 $i−1$ 行的最右侧移动过来。

最终的答案即为 $f[n−1][0]$ 到 $f[n−1][n−1]$ 中的最小值，其中 $n$ 是三角形的行数。

```go
func minimumTotal(triangle [][]int) int {
    n := len(triangle)
    f := make([]int, n)
    f[0] = triangle[0][0]
    for i := 1; i < n; i++ {
        f[i] = f[i - 1] + triangle[i][i]
        for j := i - 1; j > 0; j-- {
            f[j] = min(f[j - 1], f[j]) + triangle[i][j]
        }
        f[0] += triangle[i][0]
    }
    ans := math.MaxInt32
    for i := 0; i < n; i++ {
        ans = min(ans, f[i])
    }
    return ans
}

func min(x, y int) int {
    if x < y {
        return x
    }
    return y
}
```

### 392 判断子序列

<p>给定字符串 <strong>s</strong> 和 <strong>t</strong> ，判断 <strong>s</strong> 是否为 <strong>t</strong> 的子序列。</p>

<p>字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，<code>"ace"</code>是<code>"abcde"</code>的一个子序列，而<code>"aec"</code>不是）。</p>

<p><strong>进阶：</strong></p>

<p>如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？</p>

<p><strong>致谢：</strong></p>

<p>特别感谢<strong> </strong><a href="https://leetcode.com/pbrother/">@pbrother </a>添加此问题并且创建所有测试用例。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abc", t = "ahbgdc"
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "axc", t = "ahbgdc"
<strong>输出：</strong>false
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>0 <= s.length <= 100</code></li>
	<li><code>0 <= t.length <= 10^4</code></li>
	<li>两个字符串都只由小写字符组成。</li>
</ul>

#### 思路及解法

我们可以使用动态规划的方法实现预处理，令 $f[i][j]$ 表示字符串 $t$ 中从位置 $i$ 开始往后字符 $j$ 第一次出现的位置。在进行状态转移时，如果 $t$ 中位置 $i$ 的字符就是 $j$，那么 $f[i][j]=i$，否则 $j$ 出现在位置 $i+1$ 开始往后，即 $f[i][j]=f[i+1][j]$，因此我们要倒过来进行动态规划，从后往前枚举 $i$。

这样我们可以写出状态转移方程：

$$
f[i][j]=
\begin{cases}
i, &t[i] = j\\
f[i + 1][j], &t[i] \ne j\\
\end{cases}
$$

假定下标从 $0$ 开始，那么 $f[i][j]$ 中有 $-10 \leq i \leq m$ ，对于边界状态 $f[m-1][..]$，我们置 $f[m][..]$ 为 $m$，让 $f[m-1][..]$ 正常进行转移。这样如果 $f[i][j]=m$，则表示从位置 $i$ 开始往后不存在字符 $j$。

这样，我们可以利用 $f$ 数组，每次 $O(1)$ 地跳转到下一个位置，直到位置变为 $m$ 或 $s$ 中的每一个字符都匹配成功。

> 同时我们注意到，该解法中对 $t$ 的处理与 $s$ 无关，且预处理完成后，可以利用预处理数组的信息，线性地算出任意一个字符串 $s$ 是否为 $t$ 的子串。这样我们就可以解决「后续挑战」啦。

```go
func isSubsequence(s string, t string) bool {
    n, m := len(s), len(t)
    f := make([][26]int, m + 1)
    for i := 0; i < 26; i++ {
        f[m][i] = m
    }
    for i := m - 1; i >= 0; i-- {
        for j := 0; j < 26; j++ {
            if t[i] == byte(j + 'a') {
                f[i][j] = i
            } else {
                f[i][j] = f[i + 1][j]
            }
        }
    }
    add := 0
    for i := 0; i < n; i++ {
        if f[add][int(s[i] - 'a')] == m {
            return false
        }
        add = f[add][int(s[i] - 'a')] + 1
    }
    return true
}
```