---
title: XOR Operation
date: 2023-03-05 20:03:24
category: Notes
tags: Logical Operations
---

> What is the significance of XOR operation?

<!-- more -->

1. **XORing a number with itself results in 0.** For generating a constant 0, an x86 platform compiler might generate an instruction like `xorl %eax, %eax`. Regardless of the original value in the eax register, XOR operation can produce 0. This instruction is faster than the equivalent `movl $0, %eax` as directly performing bitwise operations on registers is quicker than generating an immediate value and transferring it to the register.

2. **From the truth table of XOR, XORing with 0 preserves the original value, and XORing with 1 gives the complement of the original value.** This characteristic can be utilized with masks to implement bit flipping. For example:
   ```c
   unsigned int a, b, mask = 1U << 6;
   a = 0x12345678;  
   b = a ^ mask; /* flip the 6th bit */ 
   ```

3. **If `a1 ^ a2 ^ a3 ^ … ^ an` results in 1, it indicates that the count of 1s among `a1, a2, a3…an` is odd; otherwise, it is even.** This property is useful for parity checks, such as in serial communication, where each byte of data has a parity bit. The data and parity bit are sent together, allowing the receiving end to roughly check if the received data is erroneous.

4. **`x ^ x ^ y == y` because `x ^ x == 0, 0 ^ y == y`.** This property can be applied to a problem like swapping two variables without using additional storage. Using bitwise operations, swapping can be achieved as follows:
   ```c
   a = a ^ b;
   b = a ^ b;
   a = a ^ b;
   ```

---

**Performing addition and subtraction using modulo-2 arithmetic essentially becomes XOR operation, which is commonly referred to as XOR operation.**