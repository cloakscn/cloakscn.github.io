---
title: 二分查找
date: 2023-02-04 20:34:54
mathjax: true
categories: 
  - 算法
tags:
---

二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法，可以在数据规模的对数时间复杂度内完成查找。

二分查找可以应用于数组，是因为数组具有有随机访问的特点，并且数组是有序的。

二分查找体现的数学思想是「减而治之」，可以通过当前看到的中间元素的特点推测它两侧元素的性质，以达到缩减问题规模的效果。

二分查找问题也是面试中经常考到的问题，虽然它的思想很简单，但写好二分查找算法并不是一件容易的事情。

<!-- more -->

## 原理

在升序数组 $nums$ 中寻找目标值 $target$，对于特定下标 $i$，比较 $nums[i]$ 和 $target$ 的大小：

如果 $nums[i] = target$，则下标 $i$ 即为要寻找的下标；

如果 $nums[i] > target$，则 $target$ 只可能在下标 $i$ 的左侧；

如果 $nums[i] < target$，则 $target$ 只可能在下标 $i$ 的右侧。

基于上述事实，可以在有序数组中使用二分查找寻找目标值。

二分查找的做法是，定义查找的范围 $[left,right]$，初始查找范围是整个数组。每次取查找范围的中点 $mid$，比较 $nums[mid]$ 和 $target$ 的大小，如果相等则 $mid$ 即为要寻找的下标，如果不相等则根据 $nums[mid]$ 和 $target$ 的大小关系将查找范围缩小一半。

由于每次查找都会将查找范围缩小一半，因此二分查找的时间复杂度是 $O(\log_n)$，其中 $n$ 是数组的长度。

二分查找的条件是查找范围不为空，即 $left \leq right$。如果 $target$ 在数组中，二分查找可以保证找到 $target$，返回 $target$ 在数组中的下标。如果 $target$ 不在数组中，则当 $left > right$ 时结束查找，返回 $− 1$。

```go
func search(nums []int, target int) int {
    left, right := 0, len(nums)-1
    for left <= right {
        mid := (right-left)/2 + left
        num := nums[mid]
        if num == target {
            return mid
        } else if num > target {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return -1
}
```

## 例题

### 278 第一个错误的版本

<p>你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。</p>

<p>假设你有 <code>n</code> 个版本 <code>[1, 2, ..., n]</code>，你想找出导致之后所有版本出错的第一个错误的版本。</p>

<p>你可以通过调用 <code>bool isBadVersion(version)</code> 接口来判断版本号 <code>version</code> 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。</p>
 

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 5, bad = 4
<strong>输出：</strong>4
<strong>解释：</strong>
<code>调用 isBadVersion(3) -> false 
调用 isBadVersion(5) -> true 
调用 isBadVersion(4) -> true</code>
<code>所以，4 是第一个错误的版本。</code>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1, bad = 1
<strong>输出：</strong>1
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= bad <= n <= 2<sup>31</sup> - 1</code></li>
</ul>

```go
/** 
 * Forward declaration of isBadVersion API.
 * @param   version   your guess about first bad version
 * @return 	 	      true if current version is bad 
 *			          false if current version is good
 * func isBadVersion(version int) bool;
 */

func firstBadVersion(n int) int {
    var low, high, version, result int
    high  = n
    low = 1

    for low <= high {
        version = low + (high - low) / 2

        if isBadVersion(version) {
            high = version - 1
            result = version
        } else {
            low = version + 1
        }
    }

    if isBadVersion(version) {
        return version
    }

    return result
}
```

### 35 搜索插入位置

<p>给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。</p>

<p>请必须使用时间复杂度为 <code>O(log n)</code> 的算法。</p>

<p>&nbsp;</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,3,5,6], target = 5
<strong>输出:</strong> 2
</pre>

<p><strong>示例&nbsp;2:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,3,5,6], target = 2
<strong>输出:</strong> 1
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> nums = [1,3,5,6], target = 7
<strong>输出:</strong> 4
</pre>

<p>&nbsp;</p>

<p><strong>提示:</strong></p>

<ul>
	<li><code>1 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
	<li><code>nums</code> 为&nbsp;<strong>无重复元素&nbsp;</strong>的&nbsp;<strong>升序&nbsp;</strong>排列数组</li>
	<li><code>-10<sup>4</sup> &lt;= target &lt;= 10<sup>4</sup></code></li>
</ul>

```go
func searchInsert(nums []int, target int) int {
    var left, right, pos int
    right = len(nums) - 1

    for left <= right {
        pos = left + (right - left) / 2
        if nums[pos] == target {
            return pos
        } else if nums[pos] > target {
            right = pos - 1
        } else {
            left = pos + 1
        }
    }


    if nums[pos] > target{
        return pos
    } else {
        return pos + 1
    }
}
```

### 167 两数之和 II - 输入有序数组

<p>给你一个下标从 <strong>1</strong> 开始的整数数组&nbsp;<code>numbers</code> ，该数组已按<strong><em> </em>非递减顺序排列&nbsp; </strong>，请你从数组中找出满足相加之和等于目标数&nbsp;<code>target</code> 的两个数。如果设这两个数分别是 <code>numbers[index<sub>1</sub>]</code> 和 <code>numbers[index<sub>2</sub>]</code> ，则 <code>1 &lt;= index<sub>1</sub> &lt; index<sub>2</sub> &lt;= numbers.length</code> 。</p>

<p>以长度为 2 的整数数组 <code>[index<sub>1</sub>, index<sub>2</sub>]</code> 的形式返回这两个整数的下标 <code>index<sub>1</sub></code><em> </em>和<em> </em><code>index<sub>2</sub></code>。</p>

<p>你可以假设每个输入 <strong>只对应唯一的答案</strong> ，而且你 <strong>不可以</strong> 重复使用相同的元素。</p>

<p>你所设计的解决方案必须只使用常量级的额外空间。</p>
&nbsp;

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>numbers = [<strong><em>2</em></strong>,<strong><em>7</em></strong>,11,15], target = 9
<strong>输出：</strong>[1,2]
<strong>解释：</strong>2 与 7 之和等于目标数 9 。因此 index<sub>1</sub> = 1, index<sub>2</sub> = 2 。返回 [1, 2] 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>numbers = [<strong><em>2</em></strong>,3,<strong><em>4</em></strong>], target = 6
<strong>输出：</strong>[1,3]
<strong>解释：</strong>2 与 4 之和等于目标数 6 。因此 index<sub>1</sub> = 1, index<sub>2</sub> = 3 。返回 [1, 3] 。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>numbers = [<strong><em>-1</em></strong>,<strong><em>0</em></strong>], target = -1
<strong>输出：</strong>[1,2]
<strong>解释：</strong>-1 与 0 之和等于目标数 -1 。因此 index<sub>1</sub> = 1, index<sub>2</sub> = 2 。返回 [1, 2] 。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>2 &lt;= numbers.length &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>-1000 &lt;= numbers[i] &lt;= 1000</code></li>
	<li><code>numbers</code> 按 <strong>非递减顺序</strong> 排列</li>
	<li><code>-1000 &lt;= target &lt;= 1000</code></li>
	<li><strong>仅存在一个有效答案</strong></li>
</ul>

```go
func twoSum(numbers []int, target int) []int {
    for i := 0; i < len(numbers); i++ {
        low, high := i + 1, len(numbers) - 1
        for low <= high {
            mid := (high - low) / 2 + low
            if numbers[mid] == target - numbers[i] {
                return []int{i + 1, mid + 1}
            } else if numbers[mid] > target - numbers[i] {
                high = mid - 1
            } else {
                low = mid + 1
            }
        }
    }
    return []int{-1, -1}
}
```