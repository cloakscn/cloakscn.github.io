---
title: data-acquisition-hardware
date: 2022-12-10 19:16:23
categories:
tags: Data Acquisition
---

## Windows

* Temperature Acquisition

Launch `PowerShell` in administrator mode and execute the command to retrieve CPU temperature.

```
$(((Get-CimInstance -Namespace root/WMI -ClassName MSAcpi_ThermalZoneTemperature)[0].CurrentTemperature - 2731.5) / 10)
```

<!-- more -->

## Linux

### CentOS

* Temperature Acquisition