---
icon: page
# 这是文章的标题
title: 斐波那契数列
date: 2022-01-19
category: 力扣
tag:
  - 数据结构
  - 算法
---

> 题号：[366](https://www.lintcode.com/problem/366/)\
> 描述：查找斐波纳契数列中第 N 个数。
<!-- more -->
> 所谓的斐波纳契数列是指：\
> 前2个数是 0 和 1 。\
> 第 i 个数是第 i-1 个数和第i-2 个数的和。\
> 斐波纳契数列的前10个数字是：\
> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ...


python

```python
class Solution:
    """
    @param n: an integer
    @return: an ineger f(n)
    """
    def fibonacci(self, n):
        # write your code here
        if n <= 2:
            return n - 1
        
        return self.fibonacci(n - 1) + self.fibonacci(n - 2)
```

java

```java
// 循环
public class Solution {
    /**
     * @param n: an integer
     * @return: an ineger f(n)
     */
    public int fibonacci(int n) {
        int a = 0;
        int b = 1;
        for (int i = 0; i < n - 1; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return a;
    }
}
// 递归
public class Solution {
    /**
     * @param n: an integer
     * @return: an ineger f(n)
     */
    public int fibonacci(int n) {
        if (n <= 2) {
            return n - 1;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
```

