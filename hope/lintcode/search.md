---
icon: page
# 这是文章的标题
title: 查询
date: 2022-01-19
category: 力扣
tag:
  - 数据结构
  - 算法
---
&nbsp;
<!-- more -->
## 二分查找

> 时间复杂度 `O(log^n)`

### 经典二分查找问题

> 题号：[457](https://www.lintcode.com/problem/457/)\
> 描述：在一个排序数组中找一个数，返回该数出现的任意位置，如果不存在，返回 -1。

#### 递归

时间复杂度：log(n)

python

```python
class Solution:
    """
    @param nums: An integer array sorted in ascending order
    @param target: An integer
    @return: An integer
    """
    def findPosition(self, nums, target):
        # write your code here
        if not nums or target == None:
            return -1 
            
        return self.binarySearch(nums, 0, len(nums) - 1, target)

    def binarySearch(self, nums, start, end, target):
        if start > end:
            return -1

        mid = (start + end) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] > target:
            return self.binarySearch(nums, start, mid - 1, target)

        return self.binarySearch(nums, mid + 1, end, target)
```

java

```java
public class Solution {
    /**
     * @param nums: An integer array sorted in ascending order
     * @param target: An integer
     * @return: An integer
     */
    public int findPosition(int[] nums, int target) {
        // write your code here
        return binarySearch(nums, 0, nums.length - 1, target);
    }

    public int binarySearch(int[] nums, int start, int end, int target) {
        if (start > end) {
            return -1;
        }

        int mid = (start + end) / 2;
        if (nums[mid] == target) {
            return mid;
        }
        if (nums[mid] < target) {
            return binarySearch(nums, mid + 1, end, target);
        } 
        if (nums[mid] > target) {
            return binarySearch(nums, start, mid - 1, target);
        }
        return -1;
    }
}
```

**双指针**

python

```python
class Solution:
    """
    @param nums: An integer array sorted in ascending order
    @param target: An integer
    @return: An integer
    """
    def findPosition(self, nums, target):
        # write your code here
        if not nums or target == None:
            return -1

        left, right = 0, len(nums) - 1

        while left < right:
            mid = (left + right) / 2

            if nums[mid] == target:
                return mid
            elif nums[mid] > target:
                right = mid - 1
            else:
                left = mid + 1

        if nums[left] == target:
            return left

        return -1
```

java

```java
public class Solution {
    /**
     * @param nums: An integer array sorted in ascending order
     * @param target: An integer
     * @return: An integer
     */
    public int findPosition(int[] nums, int target) {
        // write your code here
        if (nums == null || nums.length == 0) {
            return -1;
        }

        int left = 0, right = nums.length - 1;
        while(left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        if (nums[left] == target) {
            return left;
        }

        return -1;
    }
}
```

### 目标最后位置

> 题号：[458](https://www.lintcode.com/problem/458/)二分法变形\
> 描述：给一个升序数组，找到 `target` 最后一次出现的位置，如果没出现过返回 `-1`

python

```python
class Solution:
    """
    @param nums: An integer array sorted in ascending order
    @param target: An integer
    @return: An integer
    """
    def lastPosition(self, nums, target):
        # write your code here
        if not nums or target == None:
            return -1

        left, right = 0, len(nums) - 1

        while left + 1 < right:
            mid = (left + right) / 2

            if nums[mid] == target:
                left = mid
            elif nums[mid] > target:
                right = mid - 1
            else:
                left = mid + 1

        if nums[right] == target:
            return right
        
        if nums[left] == target:
            return left

        return -1
```

java

```java
public class Solution {
    /**
     * @param nums: An integer array sorted in ascending order
     * @param target: An integer
     * @return: An integer
     */
    public int lastPosition(int[] nums, int target) {
        // write your code here
        if (nums == null || nums.length == 0) {
            return -1;
        }

        int left = 0, right = nums.length - 1;
        while(left + 1 < right) {
            int mid = (left + right) / 2;
            if(nums[mid] == target) {
                left = mid;
            } else if(nums[mid] > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        if (nums[right] == target) {
            return right;
        }

        if ( nums[left] == target) {
            return left;
        }

        return -1;
    }
}
```

### 目标最前位置

> 题号：[14](https://www.lintcode.com/problem/14/)二分法变形\
> 描述：给定一个排序的整数数组（升序）和一个要查找的整数 `target`，用`O(logn)`的时间查找到`target`第一次出现的下标（从0开始），如果`target`不存在于数组中，返回`-1`。

```python
class Solution:
    """
    @param nums: The integer array.
    @param target: Target to find.
    @return: The first position of target. Position starts from 0.
    """
    def binarySearch(self, nums, target):
        # write your code here
        if not nums or target == None:
            return -1

        left, right = 0, len(nums) - 1

        while left + 1 < right:
            mid = (left + right) / 2

            if nums[mid] == target:
                right = mid
            elif nums[mid] > target:
                right = mid - 1
            else:
                left = mid + 1

        if nums[left] == target:
            return left
        if nums[right] == target:
            return right
        
        return -1
```

```java
public class Solution {
    /**
     * @param nums: The integer array.
     * @param target: Target to find.
     * @return: The first position of target. Position starts from 0.
     */
    public int binarySearch(int[] nums, int target) {
        // write your code here
        if (nums == null || nums.length == 0) {
            return -1;
        }

        int left = 0, right = nums.length - 1;
        while(left + 1 < right) {
            int mid = (left + right) / 2;
            if(nums[mid] == target) {
                right = mid;
            } else if(nums[mid] > target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        if ( nums[left] == target) {
            return left;
        }
        if (nums[right] == target) {
            return right;
        }

        return -1;
    }
}
```

## 宽度优先搜索

**适用范围**：分层遍历、连通块问题、拓扑排序

1. 分层遍历

    * 一层一层的遍历一个图、树、矩阵

    * 简单图最短路径

    > 简单图的定义：图中所有的边长都是一样的

2. 连通块问题

    * 通过图中一个点找到其他所有连通的点

    * 找到所有方案问题的一种非递归实现方式

3. 拓扑排序

    * 实现难度远低于 `DFS`

**实现方式**：单队列、双队列、`Dummy Node`

### 二叉树的层次遍历

> 题号：[69](https://www.lintcode.com/problem/69/)\
> 描述：给出一棵二叉树，返回其节点值的层次遍历（逐层从左往右访问）

#### 单队列实现

```python
"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None
"""

class Solution:
    """
    @param root: A Tree
    @return: Level order a list of lists of integer
    """
    def levelOrder(self, root):
        # write your code here
        if not root:
            return []

        # 把第一层几点放到队列中
        queue = collections.deque([root])
        results = []

        # 判断队列非空
        while queue:
            results.append([node.val for node in queue])

            # 把上一层几点拓展出下一层节点
            for _ in range(len(queue)):
                node = queue.popleft()
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return results
```

```java {31}
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */

public class Solution {
    /**
     * @param root: A Tree
     * @return: Level order a list of lists of integer
     */
    public List<List<Integer>> levelOrder(TreeNode root) {
        // write your code here
        List result = new ArrayList();

        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<TreeNode>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            ArrayList<Integer> level = new ArrayList<Integer>();
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode head = queue.poll();
                level.add(head.val);
                if (head.left != null) {
                    queue.offer(head.left);
                }
                if (head.right != null) {
                    queue.offer(head.right);
                }
            }
            result.add(level);
        }
        return result;
    }
}
```

#### 双队列实现

```python
"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None
"""

class Solution:
    """
    @param root: A Tree
    @return: Level order a list of lists of integer
    """
    def levelOrder(self, root):
        # write your code here
        if not root:
            return []

        queue = [root]
        results = []
        while queue:
            next_queue = []
            results.append([node.val for node in queue])
            for node in queue:
                if node.left:
                    next_queue.append(node.left)
                if node.right:
                    next_queue.append(node.right)
            queue = next_queue
        return results
```

```java
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */

public class Solution {
    /**
     * @param root: A Tree
     * @return: Level order a list of lists of integer
     */
    public List<List<Integer>> levelOrder(TreeNode root) {
        // write your code here
        List<List<Integer>> results = new ArrayList<List<Integer>>();
        if (root == null) {
            return results;
        }

        List<TreeNode> queue = new ArrayList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            List<TreeNode> next_queue = new ArrayList<>();
            results.add(toIntegerList(queue));

            for (TreeNode node : queue) {
                if (node.left != null) {
                    next_queue.add(node.left);
                }
                if (node.right != null) {
                    next_queue.add(node.right);
                }
            }
            queue = next_queue;
        }
        return results;
    }
    private List<Integer> toIntegerList(List<TreeNode> queue) {
        List<Integer> level = new ArrayList<Integer>();
        for (TreeNode node : queue) {
            level.add(node.val);
        }
        return level;
    }   
}
```

#### DummyNode 实现 BFS

```python
"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None
"""

class Solution:
    """
    @param root: A Tree
    @return: Level order a list of lists of integer
    """
    def levelOrder(self, root):
        # write your code here
        if not root:
            return []

        queue = collections.deque([root, None])
        results, level = [], []
        while queue:
            node = queue.popleft()
            if node is None:
                results.append(level)
                level = []
                if queue:
                    queue.append(None)
                continue
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        return results
```

```java
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */

public class Solution {
    /**
     * @param root: A Tree
     * @return: Level order a list of lists of integer
     */
    public List<List<Integer>> levelOrder(TreeNode root) {
        // write your code here
        List<List<Integer>> result = new ArrayList<List<Integer>>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> Q = new LinkedList<TreeNode>();
        Q.offer(root);
        Q.offer(null);

        List<Integer> level = new ArrayList<Integer>();
        while(!Q.isEmpty()) {
            TreeNode node = Q.poll();
            if (node == null) {
                if (level.size() == 0) {
                    break;
                }
                result.add(level);
                level = new ArrayList<Integer>();
                Q.offer(null);
                continue;
            }

            level.add(node.val);
            if (node.left != null) {
                Q.offer(node.left);
            }
            if (node.right != null) {
                Q.offer(node.right);
            }
        }
        return result;
    }
}
```

## 深度优先搜索

**算法思想**：遍历法、分治法

1. 遍历法：一个人拿着记事本走遍所有结点

    通常会用到一个全局变量或共享参数

2. 分治法：多个人做子任务，最终进行结果汇总

    通常会用到 `return value` 记录子问题结果

### 分治法

> 题号：[93](https://www.lintcode.com/problem/93/)\
> 描述：给定一个二叉树,确定它是高度平衡的。对于这个问题,一棵高度平衡的二叉树的定义是：一棵二叉树中每个节点的两个子树的深度相差不会超过1。

```python
"""
Definition of TreeNode:
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left, self.right = None, None
"""

class Solution:
    """
    @param root: The root of binary tree.
    @return: True if this Binary tree is Balanced, or false.
    """
    def isBalanced(self, root):
        # write your code here
        is_balanced, _ = self.divideConquer(root)
        return is_balanced

    def divideConquer(self, root):
        if not root:
            return True, 0

        is_left_balanced, left_height = self.divideConquer(root.left)
        is_right_balanced, right_height = self.divideConquer(root.right)
        root_height = max(left_height, right_height) + 1

        if not is_left_balanced or not is_right_balanced:
            return False, root_height
        if abs(left_height - right_height) > 1:
            return False, root_height
        return True, root_height
```

```java
/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */

public class Solution {
    class Pair {
        boolean isBalanced;
        int height;

        public Pair(boolean isBalanced, int height) {
            this.isBalanced = isBalanced;
            this.height = height;
        }
    }
    /**
     * @param root: The root of binary tree.
     * @return: True if this Binary tree is Balanced, or false.
     */
    public boolean isBalanced(TreeNode root) {
        // write your code here
        return divideConquer(root).isBalanced;
    }

    private Pair divideConquer(TreeNode root) {
        if (root == null) {
            return new Pair(true, 0);
        }

        Pair pairLeft = divideConquer(root.left);
        if (!pairLeft.isBalanced) {
            return new Pair(false, pairLeft.height);
        }
        Pair pairRight = divideConquer(root.right);
        if (!pairRight.isBalanced) {
            return new Pair(false, pairRight.height);
        }
        return new Pair(Math.abs(pairLeft.height - pairRight.height) <= 1, Math.max(pairLeft.height, pairRight.height) + 1);
    }
}
```
