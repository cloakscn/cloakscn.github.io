---
icon: page
# 这是文章的标题
title: 双指针算法
date: 2022-01-19
category: 力扣
tag:
  - 数据结构
  - 算法
---
&nbsp;
<!-- more -->

## Valid Palindrome

> 题号：[415](https://www.lintcode.com/problem/415/)\
> 描述：给定一个字符串，判断其是否为一个回文串。只考虑字母和数字，忽略大小写。\
> 挑战：O(n) 时间复杂度，且不占用额外空间。

相向双指针实现

python

```python
class Solution:
    """
    @param s: A string
    @return: Whether the string is a valid palindrome
    """
    def isPalindrome(self, s):
        # 创建两个指针
        left, right = 0, len(s) - 1
        # 循环使两个指针项目比较
        while left < right:
            # 判断left是否为a-z字符
            while left < right and not self.is_valid(s[left]):
                left += 1
            # 判断right是否为a-z字符
            while left < right and not self.is_valid(s[right]):
                right -= 1
            # 判断!(left == right)返回false
            if left < right and s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True
        
    def is_valid(self, char):
        return char.isdigit() or char.isalpha()
```

java

```java
public class Solution {
    /**
     * @param s: A string
     * @return: Whether the string is a valid palindrome
     */
    public boolean isPalindrome(String s) {
        // write your code here
        if (s == null) {
            return false;
        }
        // 定义 两个指针分别指向头和尾
        int left = 0, right = s.length() - 1;

        while (left < right) {
            while (left < right && !isValid(s.charAt(left))) {
                left++;
            }
            while (left < right && !isValid(s.charAt(right))) {
                right--;
            }
            if (left < right && !isEqual(s.charAt(left), s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    private boolean isValid(char c) {
        return Character.isDigit(c) || Character.isLetter(c);
    }
    private boolean isEqual(char a, char b) {
        return Character.toLowerCase(a) == Character.toLowerCase(b);
    }
```

## Valid Palindrome II

> 题号：[491](https://www.lintcode.com/problem/891/)\
> 描述：给一个非空字符串 s，你最多可以删除一个字符。判断是否可以把它变成回文串。

相向双指针实现

python

```python
class Solution:
    """
    @param s: a string
    @return: whether you can make s a palindrome by deleting at most one character
    """
    def validPalindrome(self, s):
        # Write your code here
        if s is None:
            return False
        
        left, right = self.findDifference(s, 0, len(s) - 1)
        if left >= right:
            return True

        return self.isPalindrome(s, left + 1, right) or self.isPalindrome(s, left, right - 1)

    def findDifference(self, s, left, right):
        while left < right:
            if s[left] != s[right]:
                return left, right
            left += 1
            right -= 1
        return left, right

    def isPalindrome(self, s, left, right):
        left, right = self.findDifference(s, left, right)
        return left >= right
```

java

```java
public class Solution {
    /**
     * @param s: a string
     * @return: whether you can make s a palindrome by deleting at most one character
     */
    public boolean validPalindrome(String s) {
        // Write your code here
        if (s == null) {
            return false;
        }

        Pair pair = findDifference(s, 0, s.length() - 1);
        if (pair.left >= pair.right) {
            return true;
        }

        return isPalindrome(s, pair.left + 1, pair.right) || isPalindrome(s, pair.left, pair.right - 1);

    }

    private Pair findDifference(String s, int left, int right) {
        while(left < right && s.charAt(left) == s.charAt(right)) {
            left++;
            right--;
        }
        return new Pair(left, right);
    }

    private boolean isPalindrome(String s, int left, int right) {
        Pair pair = findDifference(s, left, right);
        return pair.left >= pair.right;
    }

    class Pair {
        int left, right;
        public Pair(int left, int right) {
            this.left = left;
            this.right = right;
        }
    }
}
```

## Two Sum

> 题号：[56](https://www.lintcode.com/problem/56/)\
> 描述：给一个整数数组，找到两个数使得他们的和等于一个给定的数 target。你需要实现的函数twoSum需要返回这两个数的下标, 并且第一个下标小于第二个下标。注意这里下标的范围是 0 到 n-1。\
> 挑战：
>
> * O(n) 空间复杂度，O(nlogn)时间复杂度
> * O(n)空间复杂度，O(n)时间复杂度。

**相向双指针实现**

python

```python
class Solution:
    """
    @param numbers: An array of Integer
    @param target: target = numbers[index1] + numbers[index2]
    @return: [index1, index2] (index1 < index2)
    """
    def twoSum(self, numbers, target):
        # write your code here
        if not numbers:
            return [-1, -1]

        nums = [
            (number, index)
            for index, number in enumerate(numbers)
        ]

        nums.sort()

        left, right = 0, len(nums) - 1
        while left < right:
            if nums[left][0] + nums[right][0] > target:
                right -= 1
            elif nums[left][0] + nums[right][0] < target:
                left += 1
            else:
                return sorted([nums[left][1], nums[right][1]])
        return [-1, -1]
```

java

```java
public class Solution {
    /**
     * @param numbers: An array of Integer
     * @param target: target = numbers[index1] + numbers[index2]
     * @return: [index1, index2] (index1 < index2)
     */

    // 自定义类
    class Pair implements Comparable<Pair> {
        int number, index;

        public Pair(int number, int index) {
            this.number = number;
            this.index = index;
        }

        // 实现比较方法
        public int compareTo(Pair other) {
            return number - other.number;
        }
    }
    
    public int[] twoSum(int[] numbers, int target) {
        // write your code here
        int[] result = {-1, -1};
        if (numbers == null) {
            return result;
        }

        // 获取二元组并排序
        Pair[] pairs = getSortedPairs(numbers);

        int left = 0, right = pairs.length - 1;
        while (left < right) {
            if (pairs[left].number + pairs[right].number < target) {
                left++;
            } else if (pairs[left].number + pairs[right].number > target) {
                right--;
            } else {
                result[0] = Math.min(pairs[left].index, pairs[right].index);
                result[1] = Math.max(pairs[left].index, pairs[right].index);
                return result;
            }
        }

        return result;
    }

    private Pair[] getSortedPairs(int[] numbers) {
        Pair[] pairs = new Pair[numbers.length];
        for (int i = 0; i < numbers.length; i++) {
            pairs[i] = new Pair(numbers[i], i);
        }
        Arrays.sort(pairs);
        return pairs;
    }
}
```

**hash表实现**

python

```python
class Solution:
    """
    @param numbers: An array of Integer
    @param target: target = numbers[index1] + numbers[index2]
    @return: [index1, index2] (index1 < index2)
    """
    def twoSum(self, numbers, target):
        # write your code here
        # hash 用于简历数值到下标的映射
        hash = {}
        for i in range(len(numbers)):
            if target - numbers[i] in hash:
                return [hash[target - numbers[i]], i]
            hash[numbers[i]] = i
        
        # 无解情况
        return [-1, -1]
```

java

```java
public class Solution {
    /**
     * @param numbers: An array of Integer
     * @param target: target = numbers[index1] + numbers[index2]
     * @return: [index1, index2] (index1 < index2)
     */
    public int[] twoSum(int[] numbers, int target) {
        // write your code here
        HashMap<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < numbers.length; i++) {
            if (map.get(numbers[i]) != null) {
                int[] result = {map.get(numbers[i]), i};
                return result;
            }
            map.put(target - numbers[i], i);
        }

        int[] result = {};
        return result;
    }
}
```
