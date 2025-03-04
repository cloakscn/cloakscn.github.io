# 删除设置方法

<div class="grid cards" markdown>

- 问题

    ---

    字段的值应仅在创建时设置，并且此后的任何时间都不得更改。

- 解决方法

    ---

    因此，删除设置字段值的方法。

</div>

## 为什么重构？

您希望阻止对字段值进行任何更改。

## 如何重构？

1. 字段的值只能在构造函数中更改。如果构造函数不包含用于设置值的参数，请添加一个。
2. 查找所有 setter 调用。

      1. 如果 setter 调用位于当前类的构造函数调用之后，请将其参数移至构造函数调用并删除 setter。
      2. 将构造函数中的 setter 调用替换为直接访问该字段。

3. 删除设置器。
