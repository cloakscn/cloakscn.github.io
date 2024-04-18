---
title: data-acquisition-hardware
date: 2022-12-10 19:16:23
category:
  - Linux
tags: 数据采集
---

## Windows

* 温度采集

管理员模式启动 `PowerShell` 执行命令获取 CPU 温度

```
$(((Get-CimInstance -Namespace root/WMI -ClassName MSAcpi_ThermalZoneTemperature)[0].CurrentTemperature - 2731.5) / 10)
```

<!-- more -->

## Linux

### CentOS

* 温度采集