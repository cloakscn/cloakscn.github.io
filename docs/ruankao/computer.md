# 计算机系统基础知识（编制中）

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=298 height=52 src="//music.163.com/outchain/player?type=2&id=2032222526&auto=0&height=32"></iframe>

## 计算机系统概述

## 计算机硬件基础知识

1. 冯·诺依曼计算机结构
2. 典型的处理器系统

    ![典型的处理器体系结构示意图](./images/typical-processor-system.png)

3. 专用处理器

    除了通用的处理器，用于专用目的的专用处理器芯片不断涌现，常见的有图形处理器（Graphics Processing Unit，GPU）、信号处理器（Digital Signal Processor，DSP）以及现场可编程逻辑门阵列（Field Programmable Gate Array，FPGA）等。GPU 常有数百个或数千个内核，经过优化可并行运行大量计算；DSP 专用于实时的数字信号处理，常采用哈佛体系结构。

4. 指令集系统

    典型的处理器根据指令集的复杂程度可分为<u>复杂指令集（Complex Instruction Set Computers，CISC）</u>与<u>精简指令集（Reduced Instruction Set Computers，RISC）</u>两类。
    
    CISC 以 Intel、AMD 的x86 CPU 为代表，RISC 以 ARM 和 Power 为代表。
    
    国产处理器目前有龙芯、飞腾、申威等品牌，常采用 RISC-V、MIPS、ARM 等精简指令集架构。

5. 存储器

    存储器是利用半导体、磁、光等介质制成用于存储数据的电子设备。
    
    根据<u>存储器的硬件结构</u>可分为 SRAM、DRAM、NVRAM、Flash、EPROM、Disk 等。
    
    按照<u>与处理器的物理距离</u>可分为 4 个层次：片上缓存、片外缓存、主存（内存）、外存。其访问速度依次降低，而容量依次提高。

6. 总线

    总线（Bus）是指计算机部件间遵循某一特定协议实现数据交换的形式，即以一种特定格式按照规定的控制逻辑实现部件间的数据传输。
    
    按照总线在计算机中所处的位置划分为<u>内总线、系统总线和外部总线。</u>
    
    目前，计算机总线存在许多种类，常见的有 **并行总线** 和 **串行总线**。

7. 接口
8. 外部设备

## 计算机语言

计算机语言（Computer Language）是指人与计算机之间用于交流的一种语言，主要由一套指令组成，而这套指令一般包括表达式、流程控制和集合三大部分内容。

计算机语言分类有：

* 机器语言
* 汇编语言
* 高级语言
* 建模语言