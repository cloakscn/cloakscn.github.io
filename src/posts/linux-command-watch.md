---
title: linux-command-watch
date: 2022-12-10 17:47:44
category:
	- Linux
 	- Command
---

The `watch` command in `Linux` provides a way to handle repetitive tasks. By default, `watch` repeats the execution of a command every 2 seconds.

<!-- more -->

Execute `watch --help` to view the usage instructions.

```shell
Usage:
 watch [options] command

Options:
  -b, --beep             beep if command has a non-zero exit
  -c, --color            interpret ANSI color and style sequences
  -d, --differences[=<permanent>]
                         highlight changes between updates
  -e, --errexit          exit if command has a non-zero exit
  -g, --chgexit          exit when output from command changes
  -n, --interval <secs>  seconds to wait between updates
  -p, --precise          attempt run command in precise intervals
  -t, --no-title         turn off header
  -x, --exec             pass command to exec instead of "sh -c"

 -h, --help     display this help and exit
 -v, --version  output version information and exit

For more details, see watch(1).
```

`watch` is a great tool for observing log files.

```shell
# To stop the execution of the command, use the standard kill process, [Ctrl]+C
watch tail /var/log/nginx/access.log
```

![watch tail /var/log/nginx/access.log](/assets/images/linux-command-watch/watch_tail_log.png)

You can use the `-n` switch to change and specify the time interval. To check the log file every 10 seconds, try this.

```shell
watch -n 10 tail /var/log/your_log_file
```

## Watch Command with Pipes

`watch` is not limited to browsing log files; it can be used to repeat any command given to it.

If you want to monitor the temperature of the `CPU`, you can use `watch` followed by the `sensord` command to view it.

```shell
watch -n 1 sensors
```

![watch_sensors](/assets/images/linux-command-watch/watch_sensors.png)

You can use pipeline commands combined with `grep` to retrieve specific information, such as: `sensors | grep temp | awk '{ print $2 }'`

The `watch` command repeats the first command after it, so be mindful of commands followed by a pipeline. You can enclose your command in quotes to manage it.

```shell
watch -n1 "sensors | grep temp | awk '{ print $2 }'"
```

![pipe_sensors](/assets/images/linux-command-watch/pipe_sensors.png)