---
title: linux_command_lshw
categories:
  - Linux
tags:
  - 硬件采集
date: 2022-12-12 17:12:40
---


## 内容提要

`lshw` 命令是用来获取 Linux 硬件信息的命令，全称 `list hardware`

可获取内存配置、固件版本、主板配置、（CPU 版本、速率、缓存配置）、总线速度等

支持 DMI 的 x86 或 IA-64 系统以及某些 PowerPC 机器上（已知 PowerMac G4 可以工作）

<!-- more -->

执行 `man lshw` 查看详细使用说明

```shell
NAME
       lshw - list hardware
SYNOPSIS
       lshw [ -version ]
       lshw [ -help ]
       lshw [ -X ]
       lshw  [   [  -html ]  [ -short ]  [ -xml ]  [ -json ]  [ -businfo ]  ]  [ -dump filename ]  [ -class class... ]  [ -disable test... ]  [ -enable test... ]  [ -sanitize ]  [ -numeric ]  [ -quiet ]
DESCRIPTION
       lshw is a small tool to extract detailed information on the hardware configuration of the machine. It can report exact memory  configuration,  firmware  version,  mainboard configuration, CPU version and speed, cache configuration, bus speed, etc. on DMI-capable x86 or IA-64 systems and on some PowerPC machines (PowerMac G4 is known to work).
       It currently supports DMI (x86 and IA-64 only), OpenFirmware device tree (PowerPC only), PCI/AGP, CPUID (x86), IDE/ATA/ATAPI, PCMCIA (only tested on x86), SCSI and USB.
       -version
              Displays the version of lshw and exits.
       -help  Displays the available command line options and quits.
       -X     Launch the X11 GUI (if available).
       -html  Outputs the device tree as an HTML page.
       -xml   Outputs the device tree as an XML tree.
       -json  Outputs the device tree as a JSON object (JavaScript Object Notation).
       -short Outputs the device tree showing hardware paths, very much like the output of HP-UX'sioscan.
       -businfo
              Outputs the device list showing bus information, detailing SCSI, USB, IDE and PCI addresses.
       -dump filename
              Dump collected information into a file (SQLite database).
       -class class
              Only show the given class of hardware. class can be found using lshw -short or lshw -businfo.
       -C class
              Alias for -class class.
       -enable test
       -disable test
              Enables  or disables a test. test can be dmi (for DMI/SMBIOS extensions), device-tree (for OpenFirmware device tree), spd (for memory Serial Presence Detect), memory
              (for memory-size guessing heuristics), cpuinfo (for kernel-reported CPU detection), cpuid (for CPU detection), pci (for PCI/AGP access), isapnp (for ISA  PnP  exten‐
              sions), pcmcia (for PCMCIA/PCCARD), ide (for IDE/ATAPI), usb (for USB devices),scsi (for SCSI) or network (for network interfaces detection).
       -quiet Don't display status.
       -sanitize
              Remove potentially sensitive information(潜在敏感信息) from output (IP addresses, serial numbers, etc.).
       -numeric
              Also display numeric IDs (for PCI and USB devices).
BUGS
       lshw currently does not detect Firewire(IEEE1394) devices.
       Not all architectures supported by GNU/Linux are fully supported (e.g.  CPU detection).
       "Virtual" SCSI interfaces used for SCSI emulation over IDE are not reported correctly yet.
NOTES
       lshw must be run as super user or it will only report partial(部分) information.
FILES
       /usr/local/share/pci.ids
       /usr/share/pci.ids
       /etc/pci.ids
       /usr/share/hwdata/pci.ids
              A list of all known PCI ID's (vendors, devices, classes and subclasses).  If compiled with zlib support, lshw will look for pci.ids.gz first, then for pci.ids.
       /proc/bus/pci/*
              Used to access the configuration of installed PCI buses and devices.
       /proc/ide/*
              Used to access the configuration of installed IDE buses and devices.
       /proc/scsi/*, /dev/sg*
              Used to access the configuration of installed SCSI devices.
       /dev/cpu/*/cpuid
              Used on x86 platforms to access CPU-specific configuration.
       /proc/device-tree/*
              Used on PowerPC platforms to access OpenFirmware configuration.
       /proc/bus/usb/*
              Used to access the configuration of installed USB buses and devices.
       /sys/* Used on 2.6 kernels to access hardware/driver configuration information.
EXAMPLES
       lshw -short
              Lists hardware in a compact(紧凑) format(g).
       lshw -class disk -class storage
              Lists all disks and storage controllers in the system.
       lshw -html -class network
              Lists all network interfaces in HTML.
       lshw -disable dmi
              Don't use DMI to detect hardware.
SEE ALSO
       /proc/*, linuxinfo(1), lspci(8), lsusb(8)
COPYING
       lshw is distributed under the GNU GENERAL PUBLIC LICENSE (GPL) version 2.
AUTHOR
       lshw is maintained by Lyonel Vincent <lyonel@ezix.org>.
OTHER INFO
       The webpage for lshw is at
        <URL:http://lshw.ezix.org/>
```

## 关键命令

### 设备树信息展示

1. `lshw -html >> device_tree.html` 执行命令将内容重定向到 html 文件中
2. `lshw -xml >> device_tree.xml` 执行命令将内容重定向到 xml 文件中
3. `lshw -json>> device_tree.json` 执行命令将内容重定向到 json 文件中
