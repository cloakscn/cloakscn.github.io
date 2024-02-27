---
title: 广度优先搜索
date: 2023-02-13 21:26:47
categories: 算法
tags:
cover: https://pic.leetcode-cn.com/1618546629-CFzVFM-BFS.gif
---

广度优先搜索算法（Breadth-First Search，缩写为 BFS），又称为宽度优先搜索，是一种图形搜索算法。简单的说，BFS 是从根结点开始，沿着树的宽度遍历树的结点。如果所有结点均被访问，则算法中止。

<!-- more -->

## 例题

### 102 二叉树的层序遍历

<p>给你二叉树的根节点 <code>root</code> ，返回其节点值的 <strong>层序遍历</strong> 。 （即逐层地，从左到右访问所有节点）。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg" style="width: 277px; height: 302px;" />
<pre>
<strong>输入：</strong>root = [3,9,20,null,null,15,7]
<strong>输出：</strong>[[3],[9,20],[15,7]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>root = [1]
<strong>输出：</strong>[[1]]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>root = []
<strong>输出：</strong>[]
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li>树中节点数目在范围 <code>[0, 2000]</code> 内</li>
	<li><code>-1000 &lt;= Node.val &lt;= 1000</code></li>
</ul>

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func levelOrder(root *TreeNode) [][]int {
    result := [][]int{}

    if root == nil {
        return result
    }
    // 队列
    queue := []*TreeNode{root}
    for len(queue) != 0 {
        row := []int{}
        for n := len(queue); n > 0; n-- {
            temp := queue[0]
            row = append(row, temp.Val)
            // 出队
            queue = queue[1:]
            // 子节点入队
            if temp.Left != nil {
                queue = append(queue, temp.Left)
            }
            if temp.Right != nil {
                queue = append(queue, temp.Right)
            }
        }
        result = append(result, row)
    }
    return result
}
```

### 733 图像渲染

<p>有一幅以&nbsp;<code>m x n</code>&nbsp;的二维整数数组表示的图画&nbsp;<code>image</code>&nbsp;，其中&nbsp;<code>image[i][j]</code>&nbsp;表示该图画的像素值大小。</p>

<p>你也被给予三个整数 <code>sr</code> ,&nbsp; <code>sc</code> 和 <code>newColor</code> 。你应该从像素&nbsp;<code>image[sr][sc]</code>&nbsp;开始对图像进行 上色<strong>填充</strong> 。</p>

<p>为了完成<strong> 上色工作</strong> ，从初始像素开始，记录初始坐标的 <strong>上下左右四个方向上</strong> 像素值与初始坐标相同的相连像素点，接着再记录这四个方向上符合条件的像素点与他们对应 <strong>四个方向上</strong> 像素值与初始坐标相同的相连像素点，……，重复该过程。将所有有记录的像素点的颜色值改为&nbsp;<code>newColor</code>&nbsp;。</p>

<p>最后返回 <em>经过上色渲染后的图像&nbsp;</em>。</p>

<p>&nbsp;</p>

<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/01/flood1-grid.jpg" /></p>

<pre>
<strong>输入:</strong> image = [[1,1,1],[1,1,0],[1,0,1]]，sr = 1, sc = 1, newColor = 2
<strong>输出:</strong> [[2,2,2],[2,2,0],[2,0,1]]
<strong>解析:</strong> 在图像的正中间，(坐标(sr,sc)=(1,1)),在路径上所有符合条件的像素点的颜色都被更改成2。
注意，右下角的像素没有更改为2，因为它不是在上下左右四个方向上与初始点相连的像素点。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2
<strong>输出:</strong> [[2,2,2],[2,2,2]]
</pre>

<p>&nbsp;</p>

<p><strong>提示:</strong></p>

<ul>
	<li><code>m == image.length</code></li>
	<li><code>n == image[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 50</code></li>
	<li><code>0 &lt;= image[i][j], newColor &lt; 2<sup>16</sup></code></li>
	<li><code>0 &lt;= sr &lt;&nbsp;m</code></li>
	<li><code>0 &lt;= sc &lt;&nbsp;n</code></li>
</ul>

```go
func floodFill(image [][]int, sr int, sc int, color int) [][]int {
    dir := [][]int{
        {-1, 0},
        {1, 0},
        {0, -1},
        {0, 1},
    }
    origin := image[sr][sc]
    if origin == color {
        return image
    }
    // 初始化队列
    queue := [][]int{{sr, sc}}
    for len(queue) > 0 {
        pos := queue[0]
        currX := pos[0]
        currY := pos[1]

        for _, v := range dir {
            // 如果四个方向像素相连，入队
            nextX := pos[0] + v[0]
            nextY := pos[1] + v[1]
            if isPos(image, nextX, nextY) && image[nextX][nextY] != -1 && image[nextX][nextY] == origin {
                image[nextX][nextY] = -1
                queue = append(queue, []int{nextX, nextY})
            }
        }
        // 填色，出队
        image[currX][currY] = color
        queue = queue[1:]
    }
    return image
}

func isPos(image [][]int, x int, y int) bool {
    if x >= 0 && x < len(image) && y >= 0 && y < len(image[0]) {
        return true
    }
    return false
}
```

### 695 岛屿大小

<p>给你一个大小为 <code>m x n</code> 的二进制矩阵 <code>grid</code> 。</p>

<p><strong>岛屿</strong>&nbsp;是由一些相邻的&nbsp;<code>1</code>&nbsp;(代表土地) 构成的组合，这里的「相邻」要求两个 <code>1</code> 必须在 <strong>水平或者竖直的四个方向上 </strong>相邻。你可以假设&nbsp;<code>grid</code> 的四个边缘都被 <code>0</code>（代表水）包围着。</p>

<p>岛屿的面积是岛上值为 <code>1</code> 的单元格的数目。</p>

<p>计算并返回 <code>grid</code> 中最大的岛屿面积。如果没有岛屿，则返回面积为 <code>0</code> 。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/01/maxarea1-grid.jpg" style="width: 500px; height: 310px;" />
<pre>
<strong>输入：</strong>grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
<strong>输出：</strong>6
<strong>解释：</strong>答案不应该是 <code>11</code> ，因为岛屿只能包含水平或垂直这四个方向上的 <code>1</code> 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [[0,0,0,0,0,0,0,0]]
<strong>输出：</strong>0
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 50</code></li>
	<li><code>grid[i][j]</code> 为 <code>0</code> 或 <code>1</code></li>
</ul>

```go
func maxAreaOfIsland(grid [][]int) int {
    result := 0

    for i, row := range grid {
        for j, v := range row {
            if v == 1 {
                temp := search(grid, i, j)
                if result < temp {
                    result = temp
                }
            }
        }
    }
    return result
}

func search(grid [][]int, x int, y int) int {
    result := 0
    dir := [][]int{
        {-1, 0},
        {1, 0},
        {0, -1},
        {0, 1},
    }

    // 初始化队列
    queue := [][]int{{x, y}}
    for len(queue) > 0 {
        pos := queue[0]
        currX := pos[0]
        currY := pos[1]

        for _, v := range dir {
            // 如果四个方向像素相连，入队
            nextX := currX + v[0]
            nextY := currY + v[1]
            grid[currX][currY] = -1
            if isPos(grid, nextX, nextY) && grid[nextX][nextY] == 1 {
                grid[nextX][nextY] = -1
                queue = append(queue, []int{nextX, nextY})
            }
        }

        result++
        queue = queue[1:]
    }
    return result
}

func isPos(image [][]int, x int, y int) bool {
    if x >= 0 && x < len(image) && y >= 0 && y < len(image[0]) {
        return true
    }
    return false
}
```

### 116 填充每个节点的下一个右侧节点指针

<p>给定一个&nbsp;<strong>完美二叉树&nbsp;</strong>，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：</p>

<pre>
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}</pre>

<p>填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 <code>NULL</code>。</p>

<p>初始状态下，所有&nbsp;next 指针都被设置为 <code>NULL</code>。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2019/02/14/116_sample.png" style="height: 171px; width: 500px;" /></p>

<pre>
<b>输入：</b>root = [1,2,3,4,5,6,7]
<b>输出：</b>[1,#,2,3,#,4,5,6,7,#]
<b>解释：</b>给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
</pre>

<p><meta charset="UTF-8" /></p>

<p><strong>示例 2:</strong></p>

<pre>
<b>输入：</b>root = []
<b>输出：</b>[]
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li>树中节点的数量在<meta charset="UTF-8" />&nbsp;<code>[0, 2<sup>12</sup>&nbsp;- 1]</code>&nbsp;范围内</li>
	<li><code>-1000 &lt;= node.val &lt;= 1000</code></li>
</ul>

<p>&nbsp;</p>

<p><strong>进阶：</strong></p>

<ul>
	<li>你只能使用常量级额外空间。</li>
	<li>使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。</li>
</ul>

```go
/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Left *Node
 *     Right *Node
 *     Next *Node
 * }
 */

func connect(root *Node) *Node {
    if root == nil {
        return root
    }

    // 以 nil 作为每一层的分割点，如果检测到 nil 重置队列
    queue := []*Node{root, nil}
    for {
        for i, v := range queue {
            if v == nil {
                // 链接
                queue[i-1].Next = nil
                // 出队
                queue = queue[i+1:]
                queue = append(queue, nil)
                break
            } else {
                // 链接
                v.Next = queue[i+1]
            }

            // 入队
            if v.Left != nil && v.Right != nil {
                queue = append(queue, v.Left)
                queue = append(queue, v.Right)
            }
        }

        // 中止
        if queue[0] == nil {
            break
        }
    }
    return root
}
```

### 💣 542 01 矩阵

<p>给定一个由 <code>0</code> 和 <code>1</code> 组成的矩阵 <code>mat</code> ，请输出一个大小相同的矩阵，其中每一个格子是 <code>mat</code> 中对应位置元素到最近的 <code>0</code> 的距离。</p>

<p>两个相邻元素间的距离为 <code>1</code> 。</p>

<p> </p>

<p><b>示例 1：</b></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626667201-NCWmuP-image.png" style="width: 150px; " /></p>

<pre>
<strong>输入：</strong>mat =<strong> </strong>[[0,0,0],[0,1,0],[0,0,0]]
<strong>输出：</strong>[[0,0,0],[0,1,0],[0,0,0]]
</pre>

<p><b>示例 2：</b></p>

<p><img alt="" src="https://pic.leetcode-cn.com/1626667205-xFxIeK-image.png" style="width: 150px; " /></p>

<pre>
<b>输入：</b>mat =<b> </b>[[0,0,0],[0,1,0],[1,1,1]]
<strong>输出：</strong>[[0,0,0],[0,1,0],[1,2,1]]
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>m == mat.length</code></li>
	<li><code>n == mat[i].length</code></li>
	<li><code>1 <= m, n <= 10<sup>4</sup></code></li>
	<li><code>1 <= m * n <= 10<sup>4</sup></code></li>
	<li><code>mat[i][j] is either 0 or 1.</code></li>
	<li><code>mat</code> 中至少有一个 <code>0 </code></li>
</ul>

```go
func updateMatrix(matrix [][]int) [][]int {

    n, m := len(matrix), len(matrix[0])
    queue := make([][]int, 0)
    for i := 0; i < n; i++ {    // 把0全部存进队列，后面从队列中取出来，判断每个访问过的节点的上下左右，直到所有的节点都被访问过为止。
        for j := 0; j < m; j++ {
            if matrix[i][j] == 0 {
                point := []int{i, j}
                queue = append(queue, point)
            } else {
                matrix[i][j] = -1
            }
        }
    }
    direction := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

    for len(queue) > 0 {  // 这里就是 BFS 模板操作了。
        point := queue[0]
        queue = queue[1:]
        for _, v := range direction {
            x := point[0] + v[0]
            y := point[1] + v[1]
            if x >= 0 && x < n && y >= 0 && y < m && matrix[x][y] == -1 {
                matrix[x][y] = matrix[point[0]][point[1]] + 1
                queue = append(queue, []int{x, y})
            }
        }
    }
    
    return matrix
}
```

### 994 腐烂的橘子

<p>在给定的&nbsp;<code>m x n</code>&nbsp;网格<meta charset="UTF-8" />&nbsp;<code>grid</code>&nbsp;中，每个单元格可以有以下三个值之一：</p>

<ul>
	<li>值&nbsp;<code>0</code>&nbsp;代表空单元格；</li>
	<li>值&nbsp;<code>1</code>&nbsp;代表新鲜橘子；</li>
	<li>值&nbsp;<code>2</code>&nbsp;代表腐烂的橘子。</li>
</ul>

<p>每分钟，腐烂的橘子&nbsp;<strong>周围&nbsp;4 个方向上相邻</strong> 的新鲜橘子都会腐烂。</p>

<p>返回 <em>直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回&nbsp;<code>-1</code></em>&nbsp;。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/16/oranges.png" style="height: 137px; width: 650px;" /></strong></p>

<pre>
<strong>输入：</strong>grid = [[2,1,1],[1,1,0],[0,1,1]]
<strong>输出：</strong>4
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [[2,1,1],[0,1,1],[1,0,1]]
<strong>输出：</strong>-1
<strong>解释：</strong>左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个正向上。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>grid = [[0,2]]
<strong>输出：</strong>0
<strong>解释：</strong>因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>m == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= m, n &lt;= 10</code></li>
	<li><code>grid[i][j]</code> 仅为&nbsp;<code>0</code>、<code>1</code>&nbsp;或&nbsp;<code>2</code></li>
</ul>

```go
func orangesRotting(grid [][]int) int {
    queue := [][]int{}
    for i, row := range grid {
        for j, v := range row {
            if v == 2 {
                queue = append(queue, []int{i,j})
            }
        }
    }

    result := search(grid, queue)

    for _, row := range grid {
        for _, v := range row {
            if v == 1 {
                return -1
            }
        }
    }
    return result
}

var dirs = [][]int{
    {-1, 0},
    {1, 0},
    {0, -1},
    {0, 1},
}

func search(grid [][]int, queue [][]int) int {
    result := 0

    for len(queue) > 0 {
        tempQueue := [][]int{}
        n := len(queue)
        for i := 0; i < n; i++ {
            currX := queue[i][0]
            currY := queue[i][1]

            for _, v := range dirs {
                nextX := currX + v[0]
                nextY := currY + v[1]

                if isPos(grid, nextX, nextY) && grid[nextX][nextY] == 1 {
                    grid[nextX][nextY] = 2
                    tempQueue = append(tempQueue, []int{nextX, nextY})
                }
            }

            if i == len(queue) - 1 {
                queue = tempQueue
            }
        }

        if len(queue) > 0 {
            result++
        }
    }
    return result
}

func isPos(image [][]int, x int, y int) bool {
    if x >= 0 && x < len(image) && y >= 0 && y < len(image[0]) {
        return true
    }
    return false
}
```