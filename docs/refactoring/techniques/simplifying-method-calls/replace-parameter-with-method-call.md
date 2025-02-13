# 调用方法代替参数

<div class="grid cards" markdown>

- 问题

    ---

    调用查询方法并将其结果作为另一种方法的参数传递，而该方法可以直接调用查询。

    ```java
    int basePrice = quantity * itemPrice;
    double seasonDiscount = this.getSeasonalDiscount();
    double fees = this.getFees();
    double finalPrice = discountedPrice(basePrice, seasonDiscount, fees);
    ```

- 解决方案

    ---

    不是通过参数传递值，而是尝试将查询调用放在方法主体内。

    ```java
    int basePrice = quantity * itemPrice;
    double finalPrice = discountedPrice(basePrice);
    ```

</div>

## 为什么重构？

一长串参数很难理解。此外，对这种方法的调用通常类似于一系列级联，具有绕组和令人振奋的价值计算，这些计算很难导航，但必须传递给该方法。因此，如果可以在方法的帮助下计算参数值，请在方法本身内部进行此操作并摆脱参数。

=== "效果"

    我们摆脱了不需要的参数并简化方法调用。这样的参数通常不是为现在的项目而创建的，而是要关注可能永远不会到来的未来需求。

=== "缺陷"

    明天您可能还需要该参数来满足其他需求……从而让您重写该方法。

## 如何重构？

1. 确保获取参数不使用当前方法中的参数，因为它们在另一种方法内部不可用。如果是这样，就无法移动代码。
2. 如果相关代码比单个方法或函数调用更为复杂，请使用[提取方法](../composing-methods/extract-method.md)以新方法隔离此代码并使调用简单。
3. 在主方法的代码中，替换所有引用的参数被用来替换为获得值的方法的参数。
4. 使用[删除参数](./remove-parameter.md)消除现有的参数。