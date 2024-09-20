---
title: Best Practices for Cloud Office with Code Server
tags:
  - Original
date: 2024-02-27
---

This is a VSCode solution that can run on any device, and I believe it should be one of the best among all existing products.

I remember last year, there was only the official VSCode for the web, and deploying it was a bit complex. Unexpectedly, within a year, someone has further encapsulated it.

It works well for personal use. For example, the blog you are currently browsing is migrated using code server on a tablet. It's quite exciting, as the idle tablet can be put to use again. No need to carry a laptop when going out in the future, haha! Without further ado, let's get to the point.

<!-- more -->

## Prerequisites

In short, the minimum requirements are: enable WebSockets, have a Linux computer with 1 GB RAM and 2 vCPUs (you need to buy a server yourself).

## Getting Started

There are four ways to get started:

1. Use the installation script, which can automatically perform most of the process. If possible, the script uses the system package manager.
2. Manually install the code server.
3. Deploy the code server to your team using coder/coder.
4. Deploy the code server to a server using our one-click button and guide.

If you use the script for installation, you can execute the following command to see what the script does during installation.

```shell
curl -fsSL https://code-server.dev/install.sh | sh -s -- --dry-run
```

Execute the command to start the installation:

```shell
curl -fsSL https://code-server.dev/install.sh | sh
```

Once done, the installation script will print instructions on how to run and start the code server.

## Configuration

Execute `sudo systemctl enable code-server@$USER` to register it for automatic startup.

Create a configuration file, or modify it if it already exists:

Edit the configuration file as follows:

```shell
bind-addr: 127.0.0.1:8080
auth: password
password: change_to_your_password
cert: false
```

After editing, restart the service with `sudo systemctl restart code-server@$USER`.

> For more information, visit the [official website](https://coder.com/docs/code-server/latest).