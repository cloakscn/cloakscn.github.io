# 使用查询替换临时变量*

<div class="grid cards" markdown>

- 问题

    ---

    您可以将表达式的结果放入局部变量中，以便稍后在代码中使用。

    ```java
    double calculateTotal() {
      double basePrice = quantity * itemPrice;
      if (basePrice > 1000) {
        return basePrice * 0.95;
      }
      else {
        return basePrice * 0.98;
      }
    }
    ```

- 解决方法

    ---

    将整个表达式移至单独的方法并从中返回结果。查询方法而不是使用变量。如有必要，将新方法合并到其他方法中。

    ```java
    double calculateTotal() {
      if (basePrice() > 1000) {
        return basePrice() * 0.95;
      }
      else {
        return basePrice() * 0.98;
      }
    }
    double basePrice() {
      return quantity * itemPrice;
    }
    ```

</div>

## 为什么重构？

这种重构技巧对于在很复杂的方法中应用 [提取方法](extract-method.md) 很有帮助。

有时也可以在其他方法中找到相同的表达式，这是考虑创建通用方法的原因之一。

=== "好处"

    - 代码可读性。理解 getTax() 方法的用途比 orderPrice() * 0.2 行要容易得多。
    - 如果被替换的行用于多种方法，则通过重复数据删除来精简代码。

=== "缺点"

    这种重构可能会引发这样的问题：这种方法是否容易导致性能下降。诚实的答案是：是的，确实如此，因为查询新方法可能会加重生成的代码的负担。但凭借当今快速的 CPU 和出色的编译器，负担几乎总是很小。相比之下，由于这种重构方法，可读代码以及在程序代码中的其他位置重用此方法的能力是非常明显的好处。

    尽管如此，如果您的临时变量用于缓存真正耗时的表达式的结果，您可能希望在将表达式提取到新方法后停止此重构。

## 如何重构？

1. 确保在方法内为变量赋值一次且仅一次。如果没有，请使用 [拆分临时变量](./split-temporary-variable.md) 以确保该变量仅用于存储表达式的结果。
2. 使用 [提取方法](./extract-method.md) 将表达放入新方法中。确保此方法仅返回一个值，并且不会更改对象的状态。如果该方法影响对象的可见状态，请使用 [将查询与修饰符分开]()。
3. 将变量替换为对新方法的查询。