---
icon: page
# 这是文章的标题
title: 排序算法
date: 2022-01-19
category: 力扣
tag:
  - 数据结构
  - 算法
---

> 题号：[463](https://www.lintcode.com/problem/463/)\
> 描述：给一组整数，按照升序排序，使用选择排序，冒泡排序，插入排序或者任何 O(n2) 的排序算法。

<!-- more -->

## 选择排序

python

```python
class Solution:
    """
    @param A: an integer array
    @return: nothing
    """
    def sortIntegers(self, A):
        # write your code here
        for i in range(0, len(A)):
            for j in range(i + 1, len(A)):
                if A[i] > A[j]:
                    A[i], A[j] = A[j], A[i]
```

java

```java
public class Solution {
    /**
     * @param A: an integer array
     * @return: nothing
     */
    public void sortIntegers(int[] A) {
        // write your code here
        for (int i = 0; i < A.length; i++) {
            for (int j = i + 1; j < A.length; j++) {
                if (A[i] > A[j]) {
                    A[i] = A[i] + A[j];
                    A[j] = A[i] - A[j];
                    A[i] = A[i] - A[j];
                }
            }
        }
    }
}
```

## 冒泡排序

python

```python
class Solution:
    """
    @param A: an integer array
    @return: nothing
    """
    def sortIntegers(self, A):
        # write your code here
        for i in range(0, len(A) - 1):
            for j in range(0, len(A) - 1):
                if A[j] > A[j + 1]:
                    A[j], A[j + 1] = A[j + 1], A[j]
```

java

```java
public class Solution {
    /**
     * @param A: an integer array
     * @return: nothing
     */
    public void sortIntegers(int[] A) {
        // write your code here
        for (int i = 0; i < A.length - 1; i++) {
            for (int j = 0; j < A.length - 1; j++) {
                if (A[j] > A[j + 1]) {
                    A[j] = A[j] + A[j + 1];
                    A[j + 1] = A[j] - A[j + 1];
                    A[j] = A[j] - A[j + 1];
                }
            }
        }
    }
}
```

## 插入排序

python

```java

```

java

```java

```

## 归并排序

python

```java

```

java

```java

```

## 快速排序

python

```java

```

java

```java

```