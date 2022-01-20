# 最长回文子串

> 题号：[200](https://www.lintcode.com/problem/200/)\
> 描述：给出一个字符串（假设长度最长为1000），求出它的最长回文子串，你可以假定只有一个满足条件的最长回文串。\
> 挑战：时间复杂度可为O(n2)，你能将其优化为O(n)吗

## 使用时间复杂度为O(n^3)的算法

java 实现

```java
class Solution {
    public String longestPalindrome(String s) {
        if (s == null) {
            return null;
        }

        for (int length = s.length(); length > 0; length--) {
            for (int start = 0; start + length <= s.length(); start++) {
                if (isPalindrome(s, start, start + length - 1)) {
                    return s.substring(start, start + length);
                }
            }
        }

        return "";
    }

    private boolean isPalindrome(String s, int left, int right) {
        while (left < right && s.charAt(left) == s.charAt(right)) {
            left++; right--;
        }
        return left >= right;
    }
}
```

python 实现

```python
class Solution(object):
    def longestPalindrome(self, s):
        """
        :type s: str
        :rtype: str
        """
        if s is None:
            return None

        for length in range(len(s), 0, -1):
            for i in range(len(s) - length + 1):
                if self.is_palindrome(s, i, i + length - 1):
                    return s[i: i + length]

        return ""

    def is_palindrome(self, s, left, right):
        while left < right and s[left] == s[right]:
            left += 1
            right -= 1

        return left >= right
```

## 基于中心线枚举的算法

java 实现

```java
class Solution {
    public String longestPalindrome(String s) {
        if (s == null) {
            return null;
        }

        String longest = "";
        for (int i = 0; i < s.length(); i++) {
            String oddPalindrome = getPalindromeFrom(s, i, i);
            if (longest.length() < oddPalindrome.length()) {
                longest = oddPalindrome;
            }

            String evenPalindrome = getPalindromeFrom(s, i, i +1);
            if (longest.length() < evenPalindrome.length()) {
                longest = evenPalindrome;
            }
        }
        
        return longest;
    }

    private String getPalindromeFrom(String s, int left, int right) {
        while (left >= 0 && right < s.length()) {
            if (s.charAt(left) != s.charAt(right)) {
                break;
            }
            left--;
            right++;
        }

        return s.substring(left + 1, right);
    }
}
```

python 实现

```python
class Solution(object):
    def longestPalindrome(self, s):
        """
        :type s: str
        :rtype: str
        """
        if not s:
            return s
        
        answer = (0, 0)
        for mid in range(len(s)):
            answer = max(answer, self.get_palindrome_from(s, mid, mid))
            answer = max(answer, self.get_palindrome_from(s, mid, mid + 1))

        return s[answer[1]: answer[0] + answer[1]]

    def get_palindrome_from(self, s, left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1

        return right - left - 1, left + 1
```

## 基于动态规划的算法

java 实现

```java

```

python 实现

```python

```
