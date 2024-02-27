---
title: 异或运算
date: 2023-03-05 20:03:24
categories: 札记
tags: 逻辑运算
---

> 异或运算存在的意义是什么？

<!-- more -->

1. **一个数和自己做异或的结果是 0。** 如果需要一个常数 0，x86 平台的编译器可能会生成这样的指令：
   `xorl %eax, %eax` 不管 eax 寄存器里的值原来是多少，做异或运算都能得到 0，这条指令比同样效果 `movl $0, %eax` 指令快，直接对寄存器做位运算比生成一个立即数再传送到寄存器要快一些。

2. **从异或的真值表中可以看出，和 0 做异或保持原值不变，和1做异或得到原值的相反值。** 可以利用这个特性配合掩码实现某些位的翻转，例如：
   ```c
   unsigned int a, b, mask = 1U << 6;
   a = 0x12345678;  
   b = a ^ mask; /* flip the 6th bit */ 
   ```

3. **如果 `a1 ^ a2 ^ a3 ^ … ^ an` 的结果是 1，则表示 `a1、a2、a3…an` 之中 1 的个数为奇数个，否则为偶数个。** 这条性质可用于奇偶校验（Parity Check），比如在串口通信过程中，每个字节的数据都计算一个校验位，数据和校验位一起发送出去，这样接收方可以根据校验位粗略地判断接收到的数据是否有误。

4. **`x ^ x ^ y == y`，因为 `x ^ x == 0，0 ^ y == y`。** 这个性质有什么用呢？我们来看这样一个问题：交换两个变量的值，不得借助额外的存储空间，所以不能采用 `temp = a; a = b; b = temp;` 的办法。利用位运算可以这样做交换：
```c
a = a ^ b;
b = a ^ b;
a = a ^ b;
```

---

**加减法采用模2运算后其实就成了一种运算了，就是我们通常所说的异或运算。**