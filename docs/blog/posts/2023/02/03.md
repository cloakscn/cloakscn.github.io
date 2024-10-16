---
title: 滑动窗口
date: 2023-02-03 23:39:48
categories: 
  - 算法
tags:
---

滑动窗口指的是这样一类问题的求解方法，在数组上通过双指针同向移动而解决的一类问题。其实这样的问题我们可以不必为它们专门命名一个名字，它们的解法其实是很自然的。

使用滑动窗口解决的问题通常是暴力解法的优化，掌握这一类问题最好的办法就是练习，然后思考清楚为什么可以使用滑动窗口。

<!-- more -->

## 应用场景：字符串/数组/子序列

## 滑动窗口使用思路（寻找最长）

* 核心：左右双指针（L，R）在起始点，R 向右逐位滑动循环

每次滑动过程中如果窗内元素满足条件，R 向右扩大窗口，并更新最优结果；如果不满足条件，L 向右缩小窗口，直到 R 到达结尾

## 滑动窗口使用思路（寻找最短）

* 核心：左右双指针（L，R）在起始点，R 向右逐位滑动循环

每次滑动过程中如果窗内元素满足条件，L 向右扩大窗口，并更新最优结果；如果不满足条件，R 向右缩小窗口，直到 R 到达结尾

## 模板代码

```c
// 最长模板：
初始化 left, right, result, bestResult
while (右指针没有到结尾) {
    窗口扩大，加入 right 对应元素，更新当前 result
    while (result 不满足要求) {
        窗口缩小，移除 left 对应元素， left 右移
    }
    更新最优结果 bestResult
    right++;
}
return bestResult;
```

```c
// 最短模板：
初始化 left, right, result, bestResult
while (右指针没有到结尾) {
    窗口扩大，加入 right 对应元素，更新当前 result
    while (result 满足要求) {
        更新最优结果 bestResult
        窗口缩小，移除 left 对应元素， left 右移
    }
    right++;
}
return bestResult;
```

## 例题（leetcode）

### 209 长度最小的子数组

<p>给定一个含有 <code>n</code><strong> </strong>个正整数的数组和一个正整数 <code>target</code><strong> 。</strong></p>

<p>找出该数组中满足其和<strong> </strong><code>≥ target</code><strong> </strong>的长度最小的 <strong>连续子数组</strong> <code>[nums<sub>l</sub>, nums<sub>l+1</sub>, ..., nums<sub>r-1</sub>, nums<sub>r</sub>]</code> ，并返回其长度<strong>。</strong>如果不存在符合条件的子数组，返回 <code>0</code> 。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>target = 7, nums = [2,3,1,2,4,3]
<strong>输出：</strong>2
<strong>解释：</strong>子数组 <code>[4,3]</code> 是该条件下的长度最小的子数组。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>target = 4, nums = [1,4,4]
<strong>输出：</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>target = 11, nums = [1,1,1,1,1,1,1,1]
<strong>输出：</strong>0
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= target <= 10<sup>9</sup></code></li>
	<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
	<li><code>1 <= nums[i] <= 10<sup>5</sup></code></li>
</ul>

<p> </p>

<p><strong>进阶：</strong></p>

<ul>
	<li>如果你已经实现<em> </em><code>O(n)</code> 时间复杂度的解法, 请尝试设计一个 <code>O(n log(n))</code> 时间复杂度的解法。</li>
</ul>

```go
func minSubArrayLen(target int, nums []int) int {
    var left, right, sum, minLength int
    for right < len(nums) {
    	sum += nums[right]
    	for sum >= target {
    	    if right - left + 1 < minLength || minLength == 0 {
                minLength = right - left + 1
            }
            sum -= nums[left]
            left++
    	}
    	right++
    }
    return minLength
}
```

### 219 存在重复元素 Ⅱ

<p>给你一个整数数组 <code>nums</code> 和一个整数 <code>k</code> ，判断数组中是否存在两个 <strong>不同的索引</strong><em> </em><code>i</code> 和<em> </em><code>j</code> ，满足 <code>nums[i] == nums[j]</code> 且 <code>abs(i - j) <= k</code> 。如果存在，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,1], k<em> </em>= 3
<strong>输出：</strong>true</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,0,1,1], k<em> </em>=<em> </em>1
<strong>输出：</strong>true</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,2,3,1,2,3], k<em> </em>=<em> </em>2
<strong>输出：</strong>false</pre>

<p> </p>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= nums.length <= 10<sup>5</sup></code></li>
	<li><code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code></li>
	<li><code>0 <= k <= 10<sup>5</sup></code></li>
</ul>

```go
func containsNearbyDuplicate(nums []int, k int) bool {
    var set map[int]bool
    set = make(map[int]bool)
    for i, num := range nums {
        if i > k {
            delete(set, nums[i - k - 1])
        }

        if set[num] {
            return true
        }
        set[num] = true
    }
    return false
}
```

### 643 子数组最大平均数 Ⅰ

<p>给你一个由 <code>n</code> 个元素组成的整数数组 <code>nums</code> 和一个整数 <code>k</code> 。</p>

<p>请你找出平均数最大且 <strong>长度为 <code>k</code></strong> 的连续子数组，并输出该最大平均数。</p>

<p>任何误差小于 <code>10<sup>-5</sup></code> 的答案都将被视为正确答案。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [1,12,-5,-6,50,3], k = 4
<strong>输出：</strong>12.75
<strong>解释：</strong>最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [5], k = 1
<strong>输出：</strong>5.00000
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>n == nums.length</code></li>
	<li><code>1 <= k <= n <= 10<sup>5</sup></code></li>
	<li><code>-10<sup>4</sup> <= nums[i] <= 10<sup>4</sup></code></li>
</ul>

```go
func findMaxAverage(nums []int, k int) float64 {
    left := 0
    right := 0
    sum := 0
    var result float64
  
    for right < len(nums) {
        sum += nums[right]
        // 窗口大小超过 k 移除 left 元素并左移 left
        for right - left + 1 > k {
            sum -= nums[left]
            left++
        }
        // 更新最优结果
        if right - left + 1 == k {
            if result == 0 {
                result = float64(sum) / float64(right - left + 1)
            }
            if float64(sum) / float64(right - left + 1) > result {
                result = float64(sum) / float64(right - left + 1)
            }
        }
        right++
    }
    return result
}
```

### 1876 长度为三且个字符不同的子字符串

<p>如果一个字符串不含有任何重复字符，我们称这个字符串为 <strong>好</strong> 字符串。</p>

<p>给你一个字符串 <code>s</code> ，请你返回 <code>s</code> 中长度为 <strong>3</strong> 的 <strong>好子字符串</strong> 的数量。</p>

<p>注意，如果相同的好子字符串出现多次，每一次都应该被记入答案之中。</p>

<p><strong>子字符串</strong> 是一个字符串中连续的字符序列。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>s = "xyzzaz"
<b>输出：</b>1
<b>解释：</b>总共有 4 个长度为 3 的子字符串："xyz"，"yzz"，"zza" 和 "zaz" 。
唯一的长度为 3 的好子字符串是 "xyz" 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>s = "aababcabc"
<b>输出：</b>4
<b>解释：</b>总共有 7 个长度为 3 的子字符串："aab"，"aba"，"bab"，"abc"，"bca"，"cab" 和 "abc" 。
好子字符串包括 "abc"，"bca"，"cab" 和 "abc" 。
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= s.length <= 100</code></li>
	<li><code>s</code> 只包含小写英文字母。</li>
</ul>

```go
func countGoodSubstrings(s string) int {
    var (
        left int = 0
        right int = 2
        result int = 0
    )

    if len(s) < 3 {
        return result
    }

    for right < len(s) {
        if isNice(s[left:right + 1]) {
            result++
        }
        left++
        right++
    }
    return result
}

func isNice(s string) bool {
    set := map[rune]bool{}
    for _, value := range s[:] {
        if set[value] {
            return false
        }
        set[value] = true
    }
    return true
}
```

### 1984 学生分数的最小差值

<p>给你一个 <strong>下标从 0 开始</strong> 的整数数组 <code>nums</code> ，其中 <code>nums[i]</code> 表示第 <code>i</code> 名学生的分数。另给你一个整数 <code>k</code> 。</p>

<p>从数组中选出任意 <code>k</code> 名学生的分数，使这 <code>k</code> 个分数间 <strong>最高分</strong> 和 <strong>最低分</strong> 的 <strong>差值</strong> 达到<strong> 最小化</strong> 。</p>

<p>返回可能的 <strong>最小差值</strong> 。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>nums = [90], k = 1
<strong>输出：</strong>0
<strong>解释：</strong>选出 1 名学生的分数，仅有 1 种方法：
- [<em><strong>90</strong></em>] 最高分和最低分之间的差值是 90 - 90 = 0
可能的最小差值是 0
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>nums = [9,4,1,7], k = 2
<strong>输出：</strong>2
<strong>解释：</strong>选出 2 名学生的分数，有 6 种方法：
- [<em><strong>9</strong></em>,<em><strong>4</strong></em>,1,7] 最高分和最低分之间的差值是 9 - 4 = 5
- [<em><strong>9</strong></em>,4,<em><strong>1</strong></em>,7] 最高分和最低分之间的差值是 9 - 1 = 8
- [<em><strong>9</strong></em>,4,1,<em><strong>7</strong></em>] 最高分和最低分之间的差值是 9 - 7 = 2
- [9,<em><strong>4</strong></em>,<em><strong>1</strong></em>,7] 最高分和最低分之间的差值是 4 - 1 = 3
- [9,<em><strong>4</strong></em>,1,<em><strong>7</strong></em>] 最高分和最低分之间的差值是 7 - 4 = 3
- [9,4,<em><strong>1</strong></em>,<em><strong>7</strong></em>] 最高分和最低分之间的差值是 7 - 1 = 6
可能的最小差值是 2</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= k <= nums.length <= 1000</code></li>
	<li><code>0 <= nums[i] <= 10<sup>5</sup></code></li>
</ul>

```go
func minimumDifference(nums []int, k int) int {
    min := 0
    temp := 0
    sort.Ints(nums)
    for i := k - 1; i < len(nums); i++ {
        temp = nums[i] - nums[i - k + 1]
        if min == 0 ||  temp < min {
            min = temp
        }
    }
    return min
}
```

### 2269 找到一个数字的 K 美丽值

<p>一个整数 <code>num</code> 的 <strong>k </strong>美丽值定义为 <code>num</code> 中符合以下条件的 <strong>子字符串</strong> 数目：</p>

<ul>
	<li>子字符串长度为 <code>k</code> 。</li>
	<li>子字符串能整除 <code>num</code> 。</li>
</ul>

<p>给你整数 <code>num</code> 和 <code>k</code> ，请你返回<em> </em><code>num</code> 的 k 美丽值。</p>

<p>注意：</p>

<ul>
	<li>允许有 <strong>前缀</strong> <strong>0</strong> 。</li>
	<li><code>0</code> 不能整除任何值。</li>
</ul>

<p>一个 <strong>子字符串</strong> 是一个字符串里的连续一段字符序列。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>num = 240, k = 2
<b>输出：</b>2
<b>解释：</b>以下是 num 里长度为 k 的子字符串：
- "<em><strong>24</strong></em>0" 中的 "24" ：24 能整除 240 。
- "2<em><strong>40</strong></em>" 中的 "40" ：40 能整除 240 。
所以，k 美丽值为 2 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>num = 430043, k = 2
<b>输出：</b>2
<b>解释：</b>以下是 num 里长度为 k 的子字符串：
- "<em><strong>43</strong></em>0043" 中的 "43" ：43 能整除 430043 。
- "4<em><strong>30</strong></em>043" 中的 "30" ：30 不能整除 430043 。
- "43<em><strong>00</strong></em>43" 中的 "00" ：0 不能整除 430043 。
- "430<em><strong>04</strong></em>3" 中的 "04" ：4 不能整除 430043 。
- "4300<em><strong>43</strong></em>" 中的 "43" ：43 能整除 430043 。
所以，k 美丽值为 2 。
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= num <= 10<sup>9</sup></code></li>
	<li><code>1 <= k <= num.length</code> （将 <code>num</code> 视为字符串）</li>
</ul>

```go
func divisorSubstrings(num int, k int) int {
    result := 0
    s := strconv.Itoa(num)
    for i := k - 1; i < len(s); i++ {
        i2, _ := strconv.Atoi(s[i-k+1 : i+1])
        if i2 != 0 && num % i2 == 0 {
            result++
        }
    }
    return result
}
```

### 22379 得到 k 个黑块的最少涂色次数

<p>给你一个长度为 <code>n</code>&nbsp;下标从 <strong>0</strong>&nbsp;开始的字符串&nbsp;<code>blocks</code>&nbsp;，<code>blocks[i]</code>&nbsp;要么是&nbsp;<code>'W'</code>&nbsp;要么是&nbsp;<code>'B'</code>&nbsp;，表示第&nbsp;<code>i</code>&nbsp;块的颜色。字符&nbsp;<code>'W'</code> 和&nbsp;<code>'B'</code>&nbsp;分别表示白色和黑色。</p>

<p>给你一个整数&nbsp;<code>k</code>&nbsp;，表示想要&nbsp;<strong>连续</strong>&nbsp;黑色块的数目。</p>

<p>每一次操作中，你可以选择一个白色块将它 <strong>涂成</strong>&nbsp;黑色块。</p>

<p>请你返回至少出现 <strong>一次</strong>&nbsp;连续 <code>k</code>&nbsp;个黑色块的 <strong>最少</strong>&nbsp;操作次数。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>blocks = "WBBWWBBWBW", k = 7
<b>输出：</b>3
<strong>解释：</strong>
一种得到 7 个连续黑色块的方法是把第 0 ，3 和 4 个块涂成黑色。
得到 blocks = "BBBBBBBWBW" 。
可以证明无法用少于 3 次操作得到 7 个连续的黑块。
所以我们返回 3 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>blocks = "WBWBBBW", k = 2
<b>输出：</b>0
<strong>解释：</strong>
不需要任何操作，因为已经有 2 个连续的黑块。
所以我们返回 0 。
</pre>

<p>&nbsp;</p>

<p><b>提示：</b></p>

<ul>
	<li><code>n == blocks.length</code></li>
	<li><code>1 &lt;= n &lt;= 100</code></li>
	<li><code>blocks[i]</code>&nbsp;要么是&nbsp;<code>'W'</code>&nbsp;，要么是&nbsp;<code>'B'</code> 。</li>
	<li><code>1 &lt;= k &lt;= n</code></li>
</ul>

```go
func minimumRecolors(blocks string, k int) int {
    var left, right, max, pl, pr, result int
    for right < len(blocks) {
        // 记录窗口中黑块数量
        if blocks[right] == 'B' {
            max++
        }
        if right - left + 1 == k {
            // 如果满足条件,记录窗口坐标
            if result == 0 || result < max {
                result = max
                pl = left
                pr = right
            }

            // 判断 left 移动前是否为 'B',因为下一次移动会减去窗口左边的黑块
            if blocks[left] == 'B' {
                max--
            }
            left++
        }

        // 窗口滑动
        right++
    }
    return pr - pl + 1 - result
}
```

### 3 无重复字符的最长子串

<p>给定一个字符串 <code>s</code> ，请你找出其中不含有重复字符的&nbsp;<strong>最长子串&nbsp;</strong>的长度。</p>

<p>&nbsp;</p>

<p><strong>示例&nbsp;1:</strong></p>

<pre>
<strong>输入: </strong>s = "abcabcbb"
<strong>输出: </strong>3 
<strong>解释:</strong> 因为无重复字符的最长子串是 <code>"abc"，所以其</code>长度为 3。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>s = "bbbbb"
<strong>输出: </strong>1
<strong>解释: </strong>因为无重复字符的最长子串是 <code>"b"</code>，所以其长度为 1。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入: </strong>s = "pwwkew"
<strong>输出: </strong>3
<strong>解释: </strong>因为无重复字符的最长子串是&nbsp;<code>"wke"</code>，所以其长度为 3。
&nbsp;    请注意，你的答案必须是 <strong>子串 </strong>的长度，<code>"pwke"</code>&nbsp;是一个<em>子序列，</em>不是子串。
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>
	<li><code>s</code>&nbsp;由英文字母、数字、符号和空格组成</li>
</ul>

```go
func lengthOfLongestSubstring(s string) int {
    if len(s) == 1 {
        return 1
    }

	var left, right, result int
	for right < len(s) {
		if left < right {
			// 判断是否满足条件
			for i := right - 1; i >= left; i-- {
				if s[right] == s[i] {
					left = i + 1
					break
				}
			}
			// 更新最新结果
			if right-left+1 > result {
				result = right - left + 1
			}
		}
		// 窗口扩大
		right++
	}
	return result
}
```