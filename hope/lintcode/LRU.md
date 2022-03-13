---
icon: page
# 这是文章的标题
title: LRU 算法
date: 2022-01-19
category: 力扣
tag:
  - 数据结构
  - 算法
---
&nbsp
<!-- more -->
> 题号：[134](https://www.lintcode.com/problem/134/)\
> 描述：为最近最少使用（LRU）缓存策略设计一个数据结构，它应该支持以下操作：获取数据和写入数据。
>
> * get(key) 获取数据：如果缓存中存在key，则获取其数据值（通常是正数），否则返回-1。
> * set(key, value) 写入数据：如果key还没有在缓存中，则设置或插入其数据值。当缓存达到上限，它应该在写入新数据之前删除最近最少使用的数据用来腾出空闲位置。
>
> 最终, 你需要返回每次 get 的数据

## 算法描述

```java
/* 缓存容量为 2 */
LRUCache cache = new LRUCache(2);
// 你可以把 cache 理解成一个队列
// 假设左边是队头，右边是队尾
// 最近使用的排在队头，久未使用的排在队尾
// 圆括号表示键值对 (key, val)

cache.set(1, 1);
// cache = [(1, 1)]
cache.set(2, 2);
// cache = [(2, 2), (1, 1)]
cache.get(1);       // 返回 1
// cache = [(1, 1), (2, 2)]
// 解释：因为最近访问了键 1，所以提前至队头
// 返回键 1 对应的值 1
cache.set(3, 3);
// cache = [(3, 3), (1, 1)]
// 解释：缓存容量已满，需要删除内容空出位置
// 优先删除久未使用的数据，也就是队尾的数据
// 然后把新的数据插入队头
cache.get(2);       // 返回 -1 (未找到)
// cache = [(3, 3), (1, 1)]
// 解释：cache 中不存在键为 2 的数据
cache.set(1, 4);    
// cache = [(1, 4), (3, 3)]
// 解释：键 1 已存在，把原始值 1 覆盖为 4
// 不要忘了也要将键值对提前到队头
```

## 算法设计

分析上面的操作过程，要让 set 和 get 方法的时间复杂度为 O(1)，我们可以总结出 cache 这个数据结构必要的条件：查找快，插入快，删除快，有顺序之分。

因为显然 cache 必须有顺序之分，以区分最近使用的和久未使用的数据；而且我们要在 cache 中查找键是否已存在；如果容量满了要删除最后一个数据；每次访问还要把数据插入到队头。

那么，什么数据结构同时符合上述条件呢？哈希表查找快，但是数据无固定顺序；链表有顺序之分，插入删除快，但是查找慢。所以结合一下，形成一种新的数据结构：哈希链表。

LRU 缓存算法的核心数据结构就是哈希链表，双向链表和哈希表的结合体。这个数据结构长这样：

![](https://gitee.com/biliit/pic-go/raw/master/202201131455479.png)

> 双链表可以保证对链表操作的时间复杂度为 `O(1)`

## 算法实现

双链表结点类型

```java
class Node {
    public int key, val;
    public Node next, prev;
    public Node(int k, int v) {
        this.key = k;
        this.val = v;
    }
}
```

双链表的基本 `API`

```java
class DoubleList {  
    // 在链表头部添加节点 x
    public void addFirst(Node x);

    // 删除链表中的 x 节点（x 一定存在）
    public void remove(Node x);

    // 删除链表中最后一个节点，并返回该节点
    public Node removeLast();

    // 返回链表长度
    public int size();
}
```

在 `LRU` 算法中把双链表和 `HashMap` 结合起来

**伪代码**

```java
HashMap<Interger, Node> map;

DoubleList cache;

int get(int key) {
    if (key 不存在) {
        return -1;
    } else {
        // 将数据 (key, val) 提到表头；
        return val;
    }
}

void put(int key, int val) {
    Node x = new Node(key, val);
    if (key 已存在) {
        // 把旧的数据删除
        // 将新的结点 x 插入到开头
    } else {
        if (cache 已满) {
            // 删除链表的最后一个数据腾位置
            // 删除 map 中映射到该数据的键
        }
        // 将新节点 x 插入到表头
        // map 中新建 key 对新节点 x 的映射
    }
}
```

**将上述的逻辑，翻译成代码**

```java
class LRUCache {
    // key -> Node(key, val)
    private HashMap<Integer, Node> map;
    // Node(k1, v1) <-> Node(k2, v2)
    private DoubleList cache;
    // 缓存容量
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new HashMap<>();
        cache = new DoubleList();
    }

    public int get(int key) {
        if (!map.containsKey(key))
            return -1;
        int val = map.get(key).val;
        set(key, val);
        return val;
    }

    public int set(int key, int val) {
        // 先初始化节点
        Node x = new Node(key, val);

        if (map.containsKey(key)) {
            // 删除旧节点， 新节点插到头部
            cache.remove(map.get(key));
            cache.addFirst(x);
            // 更新 map 中对应的数据
            map.set(key, x);
        } else {
            if (cap == cache.size()) {
                // 删除链表最后的一个数据
                Node last = cache.removeLast();
                map.remove(last.key);
            }
            // 直接添加到头部
            chache.addFirst(x);
            map.put(key, x);
        }
    }
}
```