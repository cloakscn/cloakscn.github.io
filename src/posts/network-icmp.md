---
title: ICMP Protocol
date: 2022-12-30 17:29:31
tags:
---

> Article sourced from Zhihu, by [BurningZhang](https://zhuanlan.zhihu.com/p/369623317)

## Introduction

ICMP stands for Internet Control Message Protocol, one of the core protocols in the Internet Protocol suite. It is used to send control messages in TCP/IP networks, providing feedback on various issues that may occur in the communication environment. Through these messages, network administrators can diagnose problems and take appropriate measures to resolve them.

<!-- more -->

Although ICMP is a network layer protocol, it does not pass directly to the data link layer like IP and ARP protocols. Instead, it is encapsulated into an IP packet before being passed to the data link layer. Therefore, in an IP packet, if the value of the protocol type field is 1, it indicates that the IP data is an ICMP message. This protocol type field is crucial for distinguishing different types of packets, as shown in the WireShark packet capture below:

![WireShark Packet Capture](/assets/images/network-icmp/wireshark-icmp.jpg)

In IP communication, if a packet does not reach its destination for unknown reasons, ICMP is responsible for informing about the specific reason. The ICMP protocol types clearly describe the meaning of various messages.

## ICMP Protocol Types

ICMP is divided into **query messages** and **error messages**.

| Category | Type | Code | Message Meaning |
| - | - | - | - |
| Query Messages | 0 | 0 | Echo Reply |
| Query Messages | 8 | 0 | Echo Request |
| Error Messages | 3 | 0 | Network Unreachable  |
| Error Messages | 3 | 1 | Host Unreachable |
| Error Messages | 3 | 2 | Protocol Unreachable |
| Error Messages | 3 | 3 | Port Unreachable |
| Error Messages | 3 | 4 | Fragmentation Needed and Don't Fragment was Set |
| Error Messages | 3 | 5 | Source Route Failed |
| Error Messages | 3 | 6 | Destination Network Unknown |
| Error Messages | 3 | 7 | Destination Host Unknown |
| Error Messages | 3 | 8 | Source Host Isolated |
| Error Messages | 3 | 9 | Destination Network Prohibited |
| Error Messages | 3 | 10 | Destination Host Prohibited |
| Error Messages | 3 | 11 | Network Unreachable for TOS |
| Error Messages | 3 | 12 | Host Unreachable for TOS |
| Error Messages | 3 | 13 | Communication Administratively Prohibited |
| Error Messages | 3 | 14 | Host Precedence Violation |
| Error Messages | 3 | 15 | Precedence Cutoff in Effect |
| Error Messages | 4 | 0 | Source Quench |
| Error Messages | 5 | 0 | Redirect Datagram for the Network |
| Error Messages | 5 | 1 | Redirect Datagram for the Host |
| Error Messages | 5 | 2 | Redirect Datagram for the TOS and Network |
| Error Messages | 5 | 3 | Redirect Datagram for the TOS and Host |
| Error Messages | 9 | 0 | Router Advertisement |
| Error Messages | 10 | 0 | Router Solicitation |
| Error Messages | 11 | 0 | TTL Expired in Transit |
| Error Messages | 11 | 1 | TTL Expired in Reassembly |
| Error Messages | 12 | 0 | IP Header Bad |
| Error Messages | 12 | 1 | Required Option Missing |

## ICMP Message Format

In terms of the ICMP message format, ICMP is an upper-layer protocol of IP. However, ICMP shares some functions with IP. Therefore, it is considered a protocol at the same layer as IP.

![ICMP Message Format](/assets/images/network-icmp/icmp-protocol.jpg)

## ICMP Protocol Implementation - Ping Command

1. Sending an Echo Request to the Destination Server

    Firstly, when executing the ping command on the destination server, the host constructs an ICMP Echo Request message packet (type 8, code 0). In this Echo Request packet, besides the type and code fields, identifier and sequence number fields are appended. The identifier field is filled with the process ID when sending the Echo Request packet. For the sequence number, it increases by 1 for each outgoing packet. The options data part of the Echo Request is used to carry arbitrary data, adjusting the size of ping's interactive packets.

2. Destination Server Responds with an Echo Reply

    Upon receiving the Echo Request packet, the destination server responds with an Echo Reply (type 0, code 0). From the perspective of the IP layer, this ICMP Echo Reply packet is essentially the same as the incoming Echo Request packet. The only difference is that the source and destination IP address fields are swapped, and the Type field is filled with 0, indicating an Echo Reply.

3. Source Server Displays Relevant Data

    If the source server receives the Echo Reply packet, we consider the destination server to be functioning normally. Furthermore, by noting the time when the Echo Request packet was sent and the time difference when receiving the Echo Reply packet, it is possible to calculate the time required for the round trip of the packet. At this point, the ping command will print the destination server's IP address, data size, and round-trip time to the screen.

## ICMP Protocol Implementation - Traceroute Command

The traceroute command is an application that fully utilizes ICMP error message types. Its primary use is to trace route information. Let's examine its working principle step by step.

Firstly, traceroute sets the IP packet's TTL to 1 and sends a UDP packet, including a port number as the UDP destination port (default is: 33434-33534).

When the destination host receives the UDP packet, it returns an ICMP error message (type 3, code 3). Referring to the table above, this error message type is Port Unreachable, indicating that the UDP packet sent by the sender has reached the destination host.

In this way, traceroute can obtain all router IP addresses, allowing it to see all the routing information during the journey from the source host to the destination host.

Of course, in reality, some routers may disable ICMP, and thus they will not return this ICMP error message, making it impossible to see the intermediate routing IP addresses.

> Tips: Traceroute in Unix/Linux systems typically uses UDP protocol by default but can be modified to use ICMP protocol through parameters. In Windows operating systems, only ICMP protocol is used.

![](/assets/images/network-icmp/icmp-trace-route.jpg)