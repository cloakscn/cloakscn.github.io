---
icon: page
title: IDEA 注释模板
date: 2022-05-09
category: Reference
author: Cloaks
sticky: false
star: false
tag:
  - IDEA
---

IDEA 设置类注释和方法注释模板

<!-- more -->

## 1. 设置类注释模板

点击 `File`>`Settings`>>`File and Code Template`，如图所示：

![](/assets/images/2022-05-09_145849.png)

将 `YourName` 替换为自己的姓名

```java
/**
 * 版本声明: Copyright (c) 2022 FengTaiSEC Corporation.
 * @brief 
 * @author YourName <YourName@fengtaisec.com>
 * @date ${DATE} ${TIME}
 * @history
 */
```

## 2. 设置方法注释模板

### 2.1 新建模板组

1. 点击 `File`>`Settings`>`Live Template`，新建模板组，名字为 `UserDefine`。

![](/assets/images/2022-05-09_151410.png)

### 2.2 新建模板

![](/assets/images/2022-05-09_152154.png)

1. 添加 Live Template。
2. 【强制】设置 Live Template Abbreviation 为 `*`。
3. 编辑模板描述。
4. 编辑模板内容。
```java
*
$content$
 */
```
5. 设置模板生效范围，Java 全选。

![](/assets/images/2022-05-09_152634.png)

6. 选择 `Enter` 触发方式。

![](/assets/images/2022-05-09_152818.png)

7. 设置变量内容。

```java
groovyScript("C:\\MethodTemplate.groovy", methodName(), methodParameters(), methodParameterTypes(), methodReturnType(), date("yyyy-MM-dd"), time("HH:mm:ss"))
```

![](/assets/images/2022-05-09_153047.png)

8. `Apply` 并保存。

## 3. 配置 `Groovy` 脚本

下载 Groovy 脚本 [`MethodTemplate.groovy`](https://itycu.lanzouu.com/ir7h404jkdfc)

将该文件解压至 `C盘` 根目录

> 如果想要自定义位置，请求修改 `Live Template` 中变量 Groovy 的位置。

编辑 `MethodTemplate.groovy` 中的作者信息，替换 `YourName` 为自己的名字。

## 4. 使用

1. 类注释模板的使用

新建 Java 类时会自动创建类注释。

![](/assets/images/2022-05-09_155258.png)

2. 方法注释模板的使用

在 Java 方法上一行输入 `/**` 按 `Enter` 触发方法注释模板。

无参方法注释

![无参构造](/assets/images/2022-05-09_155426.png)

有参方法注释

![有参构造](/assets/images/2022-05-09_155628.png)

多参无返回方法注释

![多参构造](/assets/images/2022-05-09_155830.png)