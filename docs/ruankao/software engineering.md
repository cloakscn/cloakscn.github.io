# 软件工程基础知识（编制中）

## 软件工程

## 需求工程

## 系统分析与设计

## 软件测试

测试是确保软件的质量，确认软件以正确的方式做了用户所期望的事情。软件测试通常在规定的时间和成本内完成，以尽量多地发现漏洞，但不能保证发现所有的漏洞。

| 分类方式                       | 分类                                                                |
| ------------------------------ | ------------------------------------------------------------------- |
| 根据软件执行状态               | 静态测试（Static Testing, ST）和动态测试（Dynamic Testing, DT）     |
| 根据是否关注具体实现和内部结构 | 黑盒测试、白盒测试、灰盒测试                                        |
| 根据程序执行的方式来分类       | 人工测试（Manual Testing, MT）和自动化测试（Automatic Testing, AT） |
| 从阶段上来分                   | 单元测试、集成测试、系统测试、验收测试 |

* **单元测试** 主要是对该软件的模块进行测试，往往由程序员自己完成。常采用 **白盒的静态测试** 如静态分析、代码审查等，也可以采用 **自动化的动态测试**。
* **集成测试** 对通过单元测试的模块进行组装测试，以验证组装的正确性，一般采用 **白盒测试和黑盒测试结合** 的方法。
* **系统测试** 检查组装完成的系统是否符合 SRS 的要求。主要测试内容包括 **功能测试、性能测试、健壮性测试、安全性测试等**，__结束标志是测试工作已满足测试目标所规定的需求覆盖率，并且测试所发现的缺陷都已全部归零。__
* **验收测试** 是确认系统满足用户需求或者协议的要求，确保系统能支撑业务运行。

## 净室软件工程

## 基于构建的软件工程

## 软件项目管理