# 重命名方法

<div class="grid cards" markdown>

- 问题

    ---

    方法的名称并不能解释该方法的作用。

    ![](https://refactoringguru.cn/images/refactoring/diagrams/Rename%20Method%20-%20Before.png)

- 解决方法

    ---

    重命名该方法。

    ![](https://refactoringguru.cn/images/refactoring/diagrams/Rename%20Method%20-%20After.png)

</div>

## 为什么重构？

也许一个方法从一开始就被命名得不好——例如，有人匆忙创建了该方法，并且没有给予适当的照顾来命名它。

或者，也许该方法一开始命名得很好，但随着其功能的增长，方法名称不再是一个好的描述符。

=== "好处"

    代码可读性。尝试为新方法指定一个能够反映其功能的名称。像 createOrder()、renderCustomerInfo() 等。

## 如何重构？

1. 查看该方法是在超类还是子类中定义。如果是这样，您也必须重复这些课程中的所有步骤。
2. 下一个方法对于在重构过程中维护程序的功能很重要。使用新名称创建一个新方法。将旧方法的代码复制到其中。删除旧方法中的所有代码，并插入对新方法的调用。
3. 找到对旧方法的所有引用，并将它们替换为对新方法的引用。
4. 删除旧方法。如果旧方法是公共接口的一部分，则不要执行此步骤。相反，将旧方法标记为已弃用。