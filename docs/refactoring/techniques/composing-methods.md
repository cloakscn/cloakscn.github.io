---
title: Composing Methods
date: 2023-02-18 14:24:12
---

## Extract Method

**问题：**您有一个可以组合在一起的代码片段。

**解决方法：**将此代码移动到单独的新方法（或函数），并将旧代码替换为对该方法的调用。

```java
void printOwing() {
    printBanner();

    // Print details.
    System.out.println("name: " + name);
    System.out.println("amount: " + getOutstanding());
}
```

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

**为什么要重构？**

在一个方法中有太多的行，就很难弄清楚该方法到达在做什么。

**有什么好处？**

* 提高代码可读性。保证新的方法能够见名知意，比如：`createOrder(), renderCustomerInfo()` 。
* 重复代码更少。通常在代码中出现可以被重用的代码片段，应该考虑把该片段提取为一个新的方法。
* 隔离代码的独立部分，这意味着错误的可能性较小（例如修改了错误的变量）。

**如何重构？**

1. 创建一个方法，保证该方法见名知意。
2. 将相关代码片段复制到您的新方法中。从它的旧位置删除片段，并在那里调用新方法。

   查找此代码片段中使用的所有变量。如果它们在片段内声明而不在片段外使用，只需保持它们不变——它们将成为新方法的局部变量。
3. 如果变量在您提取的代码之前声明，您将需要将这些变量传递给新方法的参数，以便使用它们之前包含的值。有时，使用 [Replace Temp with Query](#replace-temp-with-query) 更容易摆脱这些变量。
4. 如果您发现提取的代码中的局部变量以某种方式发生了变化，这可能意味着稍后在您的 main 方法中将需要此更改的值。再检查一遍！如果确实如此，则将此变量的值返回给主方法以保持一切正常运行。

---

## Inline Method

**问题：**当方法体比方法本身更明显时，使用此技术。

**解决方法：**将对方法的调用替换为方法的内容，并删除方法本身。

```java
class PizzaDelivery {
  // ...
  int getRating() {
    return moreThanFiveLateDeliveries() ? 2 : 1;
  }
  boolean moreThanFiveLateDeliveries() {
    return numberOfLateDeliveries > 5;
  }
}
```

```java
class PizzaDelivery {
  // ...
  int getRating() {
    return numberOfLateDeliveries > 5 ? 2 : 1;
  }
}
```

**为什么要重构？**

一个方法只是委托给另一个方法。这个委托本身是没有问题的。但是当有很多这样的方法时，它们变得难以理清。

通常方法最初并不太短，但随着对程序的更改而变得那样。

**有什么好处？**

通过最小化不需要的方法的数量，您可以使代码更直接。

**如何重构？**

1. 确保该方法未在子类中重新定义。如果重新定义该方法，请避免使用此技术。
2. 查找对该方法的所有调用。用方法的内容替换这些调用。
3. 删除方法。

---

## Extract Variable

**问题：**你有一个难以理解的表达。

**解决方法：**将表达式的结果或其部分放在不言自明的独立变量中。

```java
void renderBanner() {
  if ((platform.toUpperCase().indexOf("MAC") > -1) &&
       (browser.toUpperCase().indexOf("IE") > -1) &&
        wasInitialized() && resize > 0 )
  {
    // do something
  }
}
```

```java
void renderBanner() {
  final boolean isMacOs = platform.toUpperCase().indexOf("MAC") > -1;
  final boolean isIE = browser.toUpperCase().indexOf("IE") > -1;
  final boolean wasResized = resize > 0;

  if (isMacOs && isIE && wasInitialized() && wasResized) {
    // do something
  }
}
```

**为什么要重构？**

提取变量的主要原因是通过将复杂的表达式分成中间部分，使它更易于理解。这些可能是：

* 基于 C 语言的 `if()` 运算符或 `?:` 运算符的一部分的条件。
* 没有中间结果的长算术表达式。
* 多行代码。

如果您发现提取的表达式在代码的其他地方使用，则提取变量可能是执行 [Extract Method](#extract-method) 的第一步。

**有什么好处？**

更具可读性的代码！尝试为提取的变量起好名字，以大声清楚地宣告变量的目的。更多的可读性，更少冗长的评论。寻找诸如 `customerTaxValue、cityUnemploymentRate、clientSalutationString` 等名称。

**缺点?**

* 您的代码中存在更多变量。但这与阅读代码的便利性相抵消。
* 重构条件表达式时，请记住，编译器很可能会对其进行优化，以最大限度地减少建立结果值所需的计算量。假设您有以下表达式 `if (a() || b()) ...`。如果方法 `a` 返回真，程序将不会调用方法 `b`，因为无论返回什么值 `b`，结果值仍然为 `true`。

    但是，如果将此表达式的一部分提取到变量中，将始终调用这两个方法，这可能会损害程序的性能，尤其是当这些方法执行一些重量级工作时。

**如何重构？**

1. 在相关表达式之前插入一个新行并在那里声明一个新变量。将复杂表达式的一部分分配给此变量。
2. 用新变量替换表达式的那部分。
3. 对表达式的所有复杂部分重复该过程。

---

## Inline Temp

**问题：**您有一个临时变量，它分配了简单表达式的结果，仅此而已。

**解决方法：**将对变量的引用替换为表达式本身。

```java
boolean hasDiscount(Order order) {
  double basePrice = order.basePrice();
  return basePrice > 1000;
}
```

```java
boolean hasDiscount(Order order) {
  return order.basePrice() > 1000;
}
```

**为什么要重构？**

内联局部变量几乎总是用作 [Replace Temp with Query](#replace-temp-with-query) 的一部分或为 [Extract Method](#extract-method) 铺平道路。

**有什么好处？**

这种重构技术本身几乎没有任何好处。但是，如果变量被赋值为方法的结果，则可以通过删除不必要的变量来略微提高程序的可读性。

**缺点?**

有时看似无用的临时文件用于缓存多次重用的昂贵操作的结果。因此，在使用这种重构技术之前，请确保简单性不会以牺牲性能为代价。

**如何重构？**

1. 查找所有使用该变量的地方。而不是变量，使用已分配给它的表达式。
2. 删除变量的声明及其赋值行。

---

## Replace Temp with Query

**问题：**将表达式的结果放在局部变量中，以便以后在代码中使用。

**解决方法：**将整个表达式移动到单独的方法，并从中返回结果。查询方法，而不是使用变量。如有必要，将新方法合并到其他方法中。

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

**为什么要重构？**

当 Extract Method 应用于超长方法时，这种重构方法可以为其打下基础。

有时在其他方法中也可能会发现相同的表达式，这是考虑创建通用方法的原因之一。

**有什么好处？**

* 提高代码可读性。与 `orderPrice() * 0.2` 行相比，理解方法 `getTax()` 的目的要容易得多。
* 如果被替换的行用于多种方法，则通过重复数据删除更智能的代码。

> 这种重构可能会引发这样的问题：这种方法是否容易导致性能下降。
>
> 是的，因为生成的代码可能因查询新方法而负担重。但是有了今天快速的 CPU 和优秀的编译器，负担几乎总是最小的。
> 相比之下，可读代码和在程序代码的其他地方重用此方法的能力（由于这种重构方法）是非常明显的好处。

**如何重构？**

1. 确保该变量在方法中仅被声明一次并且仅被使用一次。如果不是，请使用 [Split Temporary Variable](#split-temporary-variable) 以确保该变量仅用于存储表达式的结果。
2. 使用 [Extract Method](#extract-method) 将感兴趣的表达式放入新方法中。确保此方法仅返回一个值并且不会更改对象的状态。如果该方法影响对象的可见状态，请使用 [Separate Query from Modifier](./simplifying-method-calls/separate-query-from-modifier.md)。
3. 将变量替换为对新方法的查询。

---

## Split Temporary Variable

**问题：**您有一个局部变量，用于在方法中存储各种中间值（循环变量除外）。

**解决方法：**对不同的值使用不同的变量。每个变量应该只负责一件特定的事情。

```java
double temp = 2 * (height + width);
System.out.println(temp);
temp = height * width;
System.out.println(temp);
```

```java
final double perimeter = 2 * (height + width);
System.out.println(perimeter);
final double area = height * width;
System.out.println(area);
```

**为什么要重构？**

如果您减少函数内的变量数量并将它们重新用于各种不相关的目的，那么一旦您需要更改包含变量的代码，您肯定会遇到问题。您将必须重新检查每个变量使用情况，以确保使用了正确的值。

**有什么好处？**

* 单一原则：程序代码的每个组成部分应该只负责一件事。这使得维护代码变得更加容易，因为您可以轻松地替换任何特定的东西而不用担心意外的影响。
* 提高代码可读性。如果一个变量是很久以前匆忙创建的，它可能有一个无法解释任何内容的名称：`k、a2、value` 等。但是您可以通过以易于理解、不言自明的方式命名新变量来解决这种情况。此类名称可能类似于 `customerTaxValue、cityUnemploymentRate、clientSalutationString` 等。
* 如果您预计稍后会使用 [Extract Method](#extract-method)，则此重构技术很有用。

**如何重构？**

1. 找到代码中第一个给变量赋值的地方。在这里，您应该使用与分配的值相对应的名称重命名变量。
2. 在使用该变量值的地方使用新名称而不是旧名称。
3. 根据需要重复为变量分配不同值的地方。

   Repeat as needed for places where the variable is assigned a different value.

---

## Remove Assignments to Parameters

**问题：**将某个值分配给方法主体中的参数。

**解决方法：**使用局部变量而不是参数。

```java
int discount(int inputVal, int quantity) {
  if (quantity > 50) {
    inputVal -= 2;
  }
  // ...
}
```

```java
int discount(int inputVal, int quantity) {
  int result = inputVal;
  if (quantity > 50) {
    result -= 2;
  }
  // ...
}
```

---

**为什么要重构？**

这种重构的原因与 [Split Temporary Variable](#split-temporary-variable) 相同，但在这种情况下，我们处理的是参数，而不是局部变量。

首先，如果参数是通过引用传递的，那么在方法内部更改参数值后，会将此值传递给请求调用此方法的参数。很多时候，这会意外发生并导致不幸的后果。即使在您的编程语言中参数通常按值（而不是按引用）传递，这种编码怪癖也可能会疏远那些不习惯它的人。

其次，对单个参数多次分配不同的值会使您难以知道在任何特定时间点参数中应包含哪些数据。如果您的参数及其内容已记录但实际值可能与方法内部的预期值不同，则问题会变得更糟。

**有什么好处？**

* 程序的每个元素应该只负责一件事。这使得代码维护变得更加容易，因为您可以安全地替换代码而没有任何副作用。
* 这种重构有助于提取 [repetitive code to separate methods](#extract-method)。

**如何重构？**

1. 有时看似无用的临时文件用于缓存多次重用的昂贵操作的结果。因此，在使用这种重构技术之前，请确保简单性不会以牺牲性能为代价。
2. 在此行之后的所有方法代码中，将参数替换为新的局部变量。

---

## Replace Method with Method Object

**问题：**您有一个长方法，其中局部变量交织在一起，以至于您无法应用 [Extract Method](#extract-method)。

**解决方法：**将方法转换为单独的类，以便局部变量成为类的字段。然后，可以将该方法拆分为同一类中的多个方法。

```java
class Order {
  // ...
  public double price() {
    double primaryBasePrice;
    double secondaryBasePrice;
    double tertiaryBasePrice;
    // Perform long computation.
  }
}
```

```java
class Order {
  // ...
  public double price() {
    return new PriceCalculator(this).compute();
  }
}

class PriceCalculator {
  private double primaryBasePrice;
  private double secondaryBasePrice;
  private double tertiaryBasePrice;
  
  public PriceCalculator(Order order) {
    // Copy relevant information from the
    // order object.
  }
  
  public double compute() {
    // Perform long computation.
  }
}
```

---

**为什么要重构？**

一个方法太长，你无法将它分开，因为大量的局部变量很难相互隔离。

第一步是将整个方法隔离到一个单独的类中，并将其局部变量变成类的字段。

首先，这允许在类级别隔离问题。其次，它为将一个庞大而笨拙的方法拆分成更小的方法铺平了道路，这些方法无论如何都不符合原始类的目的。

**有什么好处？**

将长方法隔离在它自己的类中可以阻止方法的大小膨胀。这也允许将它拆分为类中的子方法，而不会用实用方法（`utility methods`）污染原始类。

**缺点?**

添加了另一个类，增加了程序的整体复杂性。

**如何重构？**

1. 创建一个新类。根据您要重构的方法的目的来命名它。
2. 在新类中，创建一个私有字段，用于存储对该方法先前所在类的实例的引用。如果需要，它可用于从原始类中获取一些必需的数据。
3. 为方法的每个局部变量创建一个单独的私有字段。
4. 创建一个构造函数，它接受方法的所有局部变量的值作为参数，并初始化相应的私有字段。
5. 声明 `main` 方法，将原方法的代码复制到其中，将局部变量替换为私有字段。
6. 通过创建一个方法对象并调用其 `main` 方法来替换原类中原方法的主体。

---

## Substitute Algorithm

**问题：**所以你想用一个新的算法替换现有的算法吗？

**解决方法：**将实现算法的方法的主体替换为新算法。

```java
String foundPerson(String[] people){
  for (int i = 0; i < people.length; i++) {
    if (people[i].equals("Don")){
      return "Don";
    }
    if (people[i].equals("John")){
      return "John";
    }
    if (people[i].equals("Kent")){
      return "Kent";
    }
  }
  return "";
}
```

```java
String foundPerson(String[] people){
  List candidates =
    Arrays.asList(new String[] {"Don", "John", "Kent"});
  for (int i=0; i < people.length; i++) {
    if (candidates.contains(people[i])) {
      return people[i];
    }
  }
  return "";
}
```

---

**为什么要重构？**

1. 逐步重构并不是改进程序的唯一方法。有时，一个方法因问题而变得如此混乱，以至于更容易拆除该方法并重新开始。也许您已经找到了一种更简单、更高效的算法。如果是这种情况，您应该简单地用新算法替换旧算法。
2. 随着时间的推移，你的算法可能会被纳入一个著名的库或框架，你想摆脱你的独立实现，以简化维护。
3. 您的程序的要求可能会发生很大变化，以至于您现有的算法无法用于该任务。

**如何重构？**

1. 确保您已尽可能简化现有算法。使用 [Extract Method](#extract-method) 将不重要的代码移动到其他方法。算法中的移动部分越少，更换起来就越容易。
2. 用新方法创建新算法。用新算法替换旧算法并开始测试程序。
3. 如果结果不匹配，返回到旧的实现并比较结果。确定差异的原因。虽然原因通常是旧算法中的错误，但更有可能是由于某些东西在新算法中不起作用。
4. 成功完成所有测试后，永久删除旧算法！
