# 提取方法

<div class="grid cards" markdown>

- 问题

    ---

    你有一个可以组合在一起的代码片段。

    ```java
    void printOwing() {
      printBanner();

      // Print details.
      System.out.println("name: " + name);
      System.out.println("amount: " + getOutstanding());
    }
    ```

- 解决方法

    ---

    将此代码移至单独的新方法（或函数），并用对该方法的调用替换旧代码。

    ```java
    void printOwing() {
      printBanner();
      printDetails(getOutstanding());
    }

    void printDetails(double outstanding) {
      System.out.println("name: " + name);
      System.out.println("amount: " + outstanding);
    }
    ```

</div>

## 为什么重构？

方法中找到的行越多，就越难弄清楚该方法的作用。这是这次重构的主要原因。

除了消除代码中的粗糙边缘之外，提取方法也是许多其他重构方法中的一个步骤。

=== "好处"

  - 更具可读性的代码！请务必为新方法指定一个描述该方法用途的名称：createOrder()、renderCustomerInfo() 等。
  - 减少代码重复。通常，在方法中找到的代码可以在程序的其他地方重用。因此，您可以通过调用新方法来替换重复项。
  - 隔离代码的独立部分，这意味着出现错误的可能性较小（例如修改了错误的变量）。

## 如何重构？

1. 创建一个新方法并以使其目的不言而喻的方式命名。
2. 将相关代码片段复制到您的新方法中。从旧位置删除片段并在那里调用新方法。
   
    查找此代码片段中使用的所有变量。如果它们在片段内部声明并且不在片段外部使用，则只需保持它们不变即可 - 它们将成为新方法的局部变量。

3. 如果在您要提取的代码之前声明变量，则需要将这些变量传递给新方法的参数，以便使用先前包含在其中的值。有时，通过使用 [使用查询替换临时变量](replace-temp-with-query.md) 更容易消除这些变量。

4. 如果您发现提取的代码中的局部变量以某种方式发生更改，这可能意味着稍后在您的 main 方法中将需要此更改的值。再检查一遍！如果确实如此，请将此变量的值返回给 main 方法以保持一切正常运行。