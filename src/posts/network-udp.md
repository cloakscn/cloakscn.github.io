---
title: UDP Protocol
tags: Networking
date: 2022-12-30 16:21:26
---

> Article sourced from Zhihu, by [微光倾城](https://zhuanlan.zhihu.com/p/357080855)

## Introduction

UDP (User Datagram Protocol) is a simple message-oriented transport layer protocol. While UDP provides integrity validation for the `header` and payload through a checksum, it does `not guarantee message delivery to the upper-layer protocol`, and the UDP layer does not retain the state of UDP messages after sending. Therefore, UDP is sometimes referred to as an unreliable datagram protocol. **If reliability is required, it must be implemented in the user application.**

UDP uses a simple connectionless communication model with minimal protocol mechanisms. UDP provides a checksum for data integrity, along with port numbers for addressing different functions between the source and destination of the datagram. It lacks a handshake dialogue, exposing the user's program to any unreliable aspects of the underlying network. If error-correction functionality is needed at the network interface level, the application can use the Transmission Control Protocol (TCP) designed for this purpose.
<!-- more -->

## UDP Protocol

UDP is a simple protocol based on IP. It is recommended to first look at the IP protocol in [《IP Protocol Explained》](https://mp.weixin.qq.com/s?__biz=MzIxNTg1NzQwMQ==&mid=2247485204&idx=1&sn=f451dae4f4ada4b6ec2f55075df72c27&chksm=9790a682a0e72f9497c13001c215883298c9e7137d160c58c5e417939962e1abb96c0972be17&scene=21#wechat_redirect).

![UDP Protocol Specification](/assets/images/network-udp/udp_protocol.png)

* **Source Port and Destination Port:** Port numbers theoretically can be as many as `2^16` because their length is 16 bits.

* **Length:** Occupying 2 bytes, it indicates the length of the UDP header, including the header length and data length. It can be as long as 65535 bytes. However, networks generally transmit data in chunks that are not as long (involving the issue of Maximum Transmission Unit, MTU), so data needs to be fragmented.

* **Checksum:** The checksum includes the UDP header and data section. This is an optional feature, not all systems apply a checksum to UDP packets (unlike TCP, where it is mandatory). However, RFC standards require that the sender should calculate the checksum.

UDP checksum covers both the UDP header and data, different from the IP checksum, which only covers the IP header and not all data. Both UDP and TCP include a pseudo-header designed for checksum calculation.

![](/assets/images/network-udp/udp.jpg)

The pseudo-header even includes information such as IP addresses, common to IP protocols, to make UDP double-check whether the data has reached its destination correctly. **If the sender has not enabled the checksum option and the receiver calculates the checksum, but there is an error, the UDP data will be quietly dropped (without guarantee of delivery) without generating any error message.**

## Ports

A port number is a 16-bit non-negative integer, ranging from `0 to 65535`. This range is divided into three different segments of port numbers, assigned by the Internet Assigned Numbers Authority (IANA).

* **Well-Known/Standard Port Numbers:** The range is `0 to 1023`. On Unix operating systems, using one of these ports requires superuser privileges.

* **Registered Port Numbers:** The range is `1024 to 49151`. These ports are used for IANA-registered services.

* **Dynamic/Private Port Numbers:** The range is `49152 to 65535`. They are not officially designated for any specific service and can be used for any purpose. These ports can also be used as temporary ports, and software running on the host can dynamically create communication endpoints as needed.

The purpose of ports is to differentiate between different applications. When a computer receives a datagram, it delivers the data to different applications based on different ports. Thus, the above-mentioned differentiation uses source IP address, destination IP address, source port number, and destination port number. If any of these differs, it is considered a different segment of the message. These are the foundations of multiplexing and demultiplexing, which won't be elaborated on in detail in this article.

> This part of the content also applies to the port section in the TCP protocol.

## Interaction between UDP and ARP

This is a detail not often noticed and depends on how the system is implemented. When the ARP cache is empty, UDP must send an ARP request to obtain the MAC address of the destination host before being sent. If the UDP packet is large enough, so much so that IP layer needs to fragment it, imagine that the first fragment of this UDP packet sends an ARP query request. All fragments will wait until this query is complete before sending. Is this really the case?

The result is that some systems allow each fragment to send an ARP query. While all fragments are waiting, when the first response is received, the host only sends the last data segment and discards the others. This behavior is somewhat perplexing. Because fragmented data cannot be assembled in a timely manner, the receiving host will silently discard IP packets that can never be assembled and will not generate any error messages to ensure that its own receiving end buffer is not filled with those fragments that will never be assembled.

## Scenarios Suitable for UDP

UDP is generally used as a transport layer protocol for applications such as **streaming media, voice communication, and video conferencing**. Many Voice over IP (VoIP) services based on IP also run on UDP. Real-time video and audio streaming protocols are designed to handle occasionally lost packets, so if a lost packet is retransmitted, there will be a slight decrease in quality rather than significant delay.

As widely known, the DNS protocol underlying also uses the UDP protocol. These applications or protocols choose UDP mainly for the following reasons:

1. **Speed:** When using the UDP protocol, as soon as the application process hands the data to UDP, UDP packages this data into a UDP segment and immediately delivers it to the network layer. TCP, on the other hand, has congestion control functionality, and it will assess the congestion situation on the Internet before sending. If the Internet is extremely congested, TCP's sender will be suppressed. The purpose of using UDP is to achieve **real-time performance**.

2. **No Connection Establishment:** TCP requires a three-way handshake operation before data transfer, while UDP can perform data transfer without any preparation. Therefore, UDP has no connection establishment delay.

3. **Connectionless:** TCP needs to maintain connection state in the end system, which includes sending and receiving buffers, congestion control parameters, and sequence and acknowledgment number parameters. In UDP, there are no such parameters or sending/receiving buffers. Therefore, specialized servers designed for specific applications running on UDP generally support more active users.

4. **Small Header Overhead:** Each TCP segment has a header overhead of 20 bytes, while UDP has only 8 bytes of overhead.

## UDP Flooding

**UDP flooding** is a type of denial-of

-service attack where an attacker sends a large volume of User Datagram Protocol (UDP) data packets to a target server, intending to overwhelm the device's processing and response capabilities. Due to UDP flooding attacks, the firewall protecting the target server may also become overwhelmed, resulting in denial of service for normal traffic.

**How UDP Flooding Attacks Work** mainly relies on the steps taken when a server receives UDP data packets sent to one of its ports. Under normal circumstances, when the server receives a UDP data packet on a specific port, it responds through the following two steps:

1. The server first checks if there is any running program listening to the specified port request.

    If there is no program listening on that port, the server responds with an ICMP (ping) packet to inform the sender that the destination is unreachable.

UDP flooding is like the situation where a hotel receptionist transfers a call. First, the receptionist receives a call, and the caller requests to be connected to a specific room. Then, the receptionist needs to check the list of all rooms to ensure the guest is in their room and willing to take the call. If the receptionist finds out the guest has not answered the call, they have to pick up the call again and tell the caller that the guest will not answer. If all phone lines suddenly receive similar requests at the same time, they will quickly become overwhelmed.

2. Since the target server utilizes resources to check and respond to each received UDP data packet, when a large number of UDP data packets are received, the target's resources will quickly be depleted, leading to denial of service for normal traffic.

### How to Defend Against UDP Flooding Attacks?

Most operating systems limit the response rate of ICMP packets, partly to interrupt DDoS attacks requiring ICMP responses. One drawback of this protection measure is that, during an attack, legitimate packets may also be filtered in this process. If the size of UDP flooding is sufficient to saturate the status table of the target server's firewall, any protection at the server level will be insufficient because the bottleneck will occur upstream of the target device.

Translated into English