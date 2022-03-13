icon: page
# 这是文章的标题
title: 爬台阶递归算法
date: 2022-03-13
category: 力扣
author: Cloaks
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在首页的文章收藏板块中
star: true
tag:
  - 数据结构
  - 算法
---

&nbsp
<!-- more -->

### 算法设计

很长时间没有接触递归了，昨天突然遇到思维一下没有转过来😭

1. n=0 和 n=1 的时候 并没有其他可选择的，所以可以得出f(0)=0;f(1)=1;

2. n>=2时情况就变复杂起来，但是这个时候可以操作的步骤也就2种，也就是走1步(n-1)与走2步(n-2)。所以可以得到f(n)=f(n-1)+f(n-2);从当前状态转为下一状态的通用算法既可。

3. 验证，使用2以上的数字验证几次。

### 算法实现

使用递归的方法，本质上是穷举所有可以实现的

```java
public static int f(int n){
    if(n<=2) return n;
    int x = f(n-1)+f(n-2);
    return x;
}
```

针对这个问题我使用循环的方法实现了这个过程，这种方法相较于递归效率更高没有冗余计算

```java
public static int f(int n){
    if(n<=2) return n;
    int first=1,second=2;
    int third=0;
    for(int i=3;i<=n;i++){
        third = first+second;
        first = second;
        second = third;
    }
    return third;
}
```
