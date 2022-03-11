---
icon: page
title: 正则表达式
date: 2022-03-11
category: Java 基础
author: Cloaks
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在首页的文章收藏板块中
star: true
tag:
  - Java
  - Regex
---

Java 正则表达式知识点梳理。

<!-- more -->

## 源码包

Java 提供了支持正则表达式的工具包：`java.util.regex`

![java.util.regex.](https://gitee.com/biliit/pic-go/raw/master/202203102210633.png)

* **Pattern 类**

pattern 对象是一个正则表达式的编译表示。Pattern 类没有公共构造方法。要创建一个 Pattern 对象，你必须首先调用其公共静态编译方法，它返回一个 Pattern 对象。该方法接受一个正则表达式作为它的第一个参数。

* **Matcher 类**

Matcher 对象是对输入字符串进行解释和匹配操作的引擎。与Pattern 类一样，Matcher 也没有公共构造方法。你需要调用 Pattern 对象的 matcher 方法来获得一个 Matcher 对象。

* **PatternSyntaxException**

PatternSyntaxException 是一个非强制异常类，它表示一个正则表达式模式中的语法错误。

### Matcher 类的方法

**start 和 end 方法**

Start 方法返回在以前的匹配操作期间，由给定组所捕获的子序列的初始索引，end 方法最后一个匹配字符的索引加 1。

**matches 和 lookingAt 方法**

matches 和 lookingAt 方法都用来尝试匹配一个输入序列模式。它们的不同是 matches 要求整个序列都匹配，而lookingAt 不要求。

lookingAt 方法虽然不需要整句都匹配，但是需要从第一个字符开始匹配。

这两个方法经常在输入字符串的开始使用。

**replaceFirst 和 replaceAll 方法**

replaceFirst 和 replaceAll 方法用来替换匹配正则表达式的文本。不同的是，replaceFirst 替换首次匹配，replaceAll 替换所有匹配。

## 捕获组

捕获组是把多个字符当一个单独单元进行处理的方法，它通过对括号内的字符分组来创建。

例如，正则表达式 (dog) 创建了单一分组，组里包含"d"，"o"，和"g"。

捕获组是通过从左至右计算其开括号来编号。例如，在表达式（（A）（B（C））），有四个这样的组：

* ((A)(B(C)))

* (A)

* (B(C))

* (C)

可以通过调用 matcher 对象的 groupCount 方法来查看表达式有多少个分组。groupCount 方法返回一个 int 值，表示matcher对象当前有多个捕获组。

还有一个特殊的组（group(0)），它总是代表整个表达式。该组不包括在 groupCount 的返回值中。

根据捕获组的介绍，我们可以知道 `(\\D*)(\\d+)(.*)` 可以分为以下三组：

```yml
(\\D*): 匹配非数字字符串
(\\d+): 匹配多个数字字符串
(.*): 这个我目前也没看懂
```

这个解释应该是有些问题，还需要继续打磨。

## [正则表达式语法](https://www.runoob.com/java/java-regular-expressions.html)

在其他语言中，`\\` 表示：我想要在正则表达式中插入一个普通的（字面上的）反斜杠，请不要给它任何特殊的意义。

在 Java 中，`\\` 表示：我要插入一个正则表达式的反斜线，所以其后的字符具有特殊的意义。

所以，在其他的语言中（如 Perl），一个反斜杠 \ 就足以具有转义的作用，而在 Java 中正则表达式中则需要有两个反斜杠才能被解析为其他语言中的转义作用。也可以简单的理解在 Java 的正则表达式中，两个 `\\` 代表其他语言中的一个 \，这也就是为什么表示一位数字的正则表达式是 `\\d`，而表示一个普通的反斜杠是 `\\`。

```java
System.out.print("\\");    // 输出为 \
System.out.print("\\\\");  // 输出为 \\
```

`根据 Java Language Specification 的要求，Java 源代码的字符串中的反斜线被解释为 Unicode 转义或其他字符转义。因此必须在字符串字面值中使用两个反斜线，表示正则表达式受到保护，不被 Java 字节码编译器解释。例如，当解释为正则表达式时，字符串字面值 "\b" 与单个退格字符匹配，而 "\\b" 与单词边界匹配。字符串字面值 "\(hello\)" 是非法的，将导致编译时错误；要与字符串 (hello) 匹配，必须使用字符串字面值 "\\(hello\\)"。`

根据我对 regex 表达式的了解，我简单将 regex 字符进行简单划分，但不见的很准确。

### 基础工具类

![](https://gitee.com/biliit/pic-go/raw/master/202203111559074.png)

**`* + ?` 与 `{n} {n,} {n,m}` 的区别**

后者是前者的加强。

| 字符   | 说明                                                                                         |
|------|--------------------------------------------------------------------------------------------|
| *    | 零次或多次匹配前面的字符或子表达式。例如，zo* 匹配"z"和"zoo"。* 等效于 {0,}。                                           |
| +    | 一次或多次匹配前面的字符或子表达式。例如，"zo+"与"zo"和"zoo"匹配，但与"z"不匹配。+ 等效于 {1,}。                               |
| {n,} | n 是非负整数。至少匹配 n 次。例如，"o{2,}"不匹配"Bob"中的"o"，而匹配"foooood"中的所有 o。"o{1,}"等效于"o+"。"o{0,}"等效于"o*"。 |

| 字符    | 说明                                                                                                         |
|-------|------------------------------------------------------------------------------------------------------------|
| ?     | 零次或一次匹配前面的字符或子表达式。例如，"do(es)?"匹配"do"或"does"中的"do"。? 等效于 {0,1}。                                             |
| {n,m} | m 和 n 是非负整数，其中 n <= m。匹配至少 n 次，至多 m 次。例如，"o{1,3}"匹配"fooooood"中的头三个 o。'o{0,1}' 等效于 'o?'。注意：您不能将空格插入逗号和数字之间。 |

| 字符  | 说明                                                          |
|-----|-------------------------------------------------------------|
| {n} | n 是非负整数。正好匹配 n 次。例如，"o{2}"与"Bob"中的"o"不匹配，但与"food"中的两个"o"匹配。 |

### 灵活匹配

![](https://gitee.com/biliit/pic-go/raw/master/202203111600378.png)

### \ 类

![](https://gitee.com/biliit/pic-go/raw/master/202203111601726.png)

![](https://gitee.com/biliit/pic-go/raw/master/202203111602725.png)

## 实例

> 首先需要明确一个共识，java.util.regex 工具类并不能直接返回正则匹配结果，它只能返回正则匹配的偏移量。

下面的例子说明如何从一个给定的字符串中找到数字串：

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;
 
public class RegexMatches
{
    public static void main( String[] args ){
 
      // 按指定模式在字符串查找
      String line = "Windows 10 Version 1607 for x64-based Systems";
      String pattern = "Windows (?:10|7|8|9|11|Server|RT)";
 
      // 创建 Pattern 对象
      Pattern compile = Pattern.compile(pattern);
 
      // 现在创建 matcher 对象
      Matcher matcher = compile.matcher(line);
      while (matcher.find( )) {
         System.out.println("Found value: " + line.substring(matcher.start(), matcher.end()) );
      }
   }
}
```

> 参考文章
>
> [https://www.runoob.com/java/java-regular-expressions.html](https://www.runoob.com/java/java-regular-expressions.html)
> 