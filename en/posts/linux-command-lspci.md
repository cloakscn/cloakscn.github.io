---
title: linux-command-lspci
date: 2022-12-09 18:28:32
update: 2022-12-14 22:28:32
category:
	- Linux
 	- Command
---

## Basic Usage

Due to access permissions, when running `lspci` as a regular user, the displayed information may be limited. Therefore, you can use `sudo` to run the command, and the system will provide complete information.

Running the `lspci` command directly will list the PCI bus and the connected devices. The following is a demonstration example on my virtual machine:

```
root@DESKTOP-PFKS7U0:/mnt/c/workspace/hexo# lspci
3acd:00:00.0 SCSI storage controller: Red Hat, Inc. Virtio filesystem (rev 01)
3d66:00:00.0 SCSI storage controller: Red Hat, Inc. Virtio  (rev 01)
88c1:00:00.0 SCSI storage controller: Red Hat, Inc. Virtio filesystem (rev 01)
e57a:00:00.0 3D controller: Microsoft Corporation Device 008e
f584:00:00.0 SCSI storage controller: Red Hat, Inc. Virtio filesystem (rev 01)
```

<!-- more -->

## Detailed Explanation

Execute `man lspci` to view usage instructions.

```
NAME
       lspci - list all PCI devices

SYNOPSIS
       lspci [options]

DESCRIPTION
       lspci is a utility for displaying information about PCI buses in the system and devices connected to them.

       By  default, it shows a brief list of devices. Use the options described below to request either a more verbose output or output intended for parsing by other programs.

       If you are going to report bugs in PCI device drivers or in lspci itself, please include output of "lspci -vvx" or even better "lspci -vvxxx" (however, see below for possible caveats).

       Some  parts of the output, especially in the highly verbose modes, are probably intelligible only to experienced PCI hackers. For exact definitions of the fields, please consult either the PCI specifications or the header.h and /usr/include/linux/pci.h include files.

       Access to some parts of the PCI configuration space is restricted to root on many operating systems, so the features of lspci available  to normal  users  are  limited. However, lspci tries its best to display as much as available and mark all other information with <access denied> text.

OPTIONS
```

### Basic Display Modes

```
   Basic display modes
       -m     Dump PCI device data in a backward-compatible machine-readable form.  See below for details.

       -mm    Dump PCI device data in a machine-readable form for easy parsing by scripts.  See below for details.

       -t     Show a tree-like diagram containing all buses, bridges, devices and connections between them.

```

### Display Options

```
   Display options
       -v     Be verbose and display detailed information about all devices.

       -vv    Be very verbose and display more details. This level includes everything deemed useful.

       -vvv   Be even more verbose and display everything we are able to parse, even if it doesn't look interesting at all (e.g.,  undefined  memory regions).

       -k     Show kernel drivers handling each device and also kernel modules capable of handling it.  Turned on by default when -v is given in the normal mode of output.  (Currently works only on Linux with kernel 2.6 or newer.)

       -x     Show hexadecimal dump of the standard part of the configuration space (the first 64 bytes or 128 bytes for CardBus bridges).

       -xxx   Show hexadecimal dump of the whole PCI configuration space. It is available only to root as several PCI devices crash when you try  to read some parts of the config space (this behavior probably doesn't violate the PCI standard, but it's at least very stupid). However, such devices are rare, so you needn't worry much.

       -xxxx  Show hexadecimal dump of the extended (4096-byte) PCI configuration space available on PCI-X 2.0 and PCI Express buses.

       -b     Bus-centric view. Show all IRQ numbers and addresses as seen by the cards on the PCI bus instead of as seen by the kernel.

       -D     Always show PCI domain numbers. By default, lspci suppresses them on machines which have only domain 0.

       -P     Identify PCI devices by path through each bridge, instead of by bus number.

       -PP    Identify PCI devices by path through each bridge, showing the bus number as well as the device number.
```

### Options for Controlling ID Resolution to Names

```
   Options to control resolving ID's to names
       -n

     Show numeric ID's (vendor and device).

       -nn    Show numeric ID's and don't translate them to names.

       -q     Be quiet during the processing. By default, lspci checks names of available PCI ID databases and display the result on standard error output.

       -qq    Don't check names at all.

   Options  controlling  name  list  output
       -G     Show the path for PCI devices specified by the PCI ID.

       -m     Use a more machine-friendly names list format.

       -M     Use a more verbose names list format.

       -g     Enable PCI domain number display.

       -s [[[<domain>]:]<bus>]:<slot>[:<func>]
              Restrict the listing of devices to the given bus (and possibly domain), slot, and/or function.  If any of these are omitted, then that field will match anything.

```

### Options for Controlling Access

```
   Options for controlling access
       -k     Show kernel drivers handling each device and also kernel modules capable of handling it.  Turned on by default when -v is given in the normal mode of output.  (Currently works only on Linux with kernel 2.6 or newer.)

       -i <file>
              Read PCI vendor and device names from file.  This file should contain lines like "1002 3a20 X", where 1002 is the PCI vendor  id,  3a20  is  the  PCI device id and X is the name.

       -q     Be quiet during the processing. By default, lspci checks names of available PCI ID databases and display the result on standard error output.

       -s [[[<domain>]:]<bus>]:<slot>[:<func>]
              Restrict the listing of devices to the given bus (and possibly domain), slot, and/or function.  If any of these are omitted, then that field will match anything.

       -D <class>[:<subclass>[:<progif>]]
              Restrict the listing of devices to those with <class> (and optionally <subclass> and/or <progif>) matching.  If any of these are omitted, then that field will match anything.

       -p <file>
              Write to file PCI devices information in the usual format (see below) for later processing.  The file could then be used as an argument for the lspci -F option.

       -H <list>
              Assume PCI bridge list of devices.  This affects address decoding on Alpha, leading to an attempt to mmap(2) and read the PCI ROM image (which is an equivalent of reading the configuration space) from the specified list of PCI bridge addresses.  By default, list of all possible addresses is assumed.
```

### Output Formats

```
   Output formats
       -F <file>
              Read  PCI  devices information from file.  This file should be in the format created by the -p option or by the setpci program.

       -json  Produce a JSON summary of all devices found.

       -html  Produce an HTML summary of all devices found.

       -t     Show a tree-like diagram containing all buses, bridges, devices and connections between them.

       -xxxx  Show hexadecimal dump of the extended (4096-byte) PCI configuration space available on PCI-X 2.0 and PCI Express buses.

       -y     Be  brief.  Do  not  show any headers, nor any statistics at the end.  This makes the program useful for embedding in other programs, though there are few uses in normal shell scripts for this feature.

   Machine-readable output formats
       -n     Show numeric ID's (vendor and device).

       -nn    Show numeric ID's and don't translate them to names.

       -q     Be quiet during the processing. By default, lspci checks names of available PCI ID databases and display the result on standard error output.

       -qq    Don't check names at all.

       -M     Use a more verbose names list format.

       -m     Use a more machine-friendly names list format.
```

## Conclusion

`lspci` is a powerful command-line utility that provides detailed information about PCI buses and the devices connected to them. Whether you need a brief overview or an in-depth analysis, `lspci` offers various options to meet your requirements. Use this guide as a reference to explore the capabilities of `lspci` and make the most out of this versatile tool in your Linux system.

Remember to check the manual (`man lspci`) for the most up-to-date information and additional options available.