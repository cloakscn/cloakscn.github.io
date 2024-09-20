---
title: Decentralized Applications
date: 2023-02-28 10:48:32
tags: Blockchain
---

> Profitability is the foundation of all applications.

<!-- more -->

## History of Decentralization

In the early days of the Web, there weren't as many applications and services; the Web started in a highly decentralized manner. In the guidelines of the HTTP protocol, there is a set of trusted servers that convert the web address you enter into a server address. HTTPS added another layer with trusted servers and certificate authorities. People could host personal servers for others to connect to, and everyone had their own data.

However, due to the ease of implementing a centralized model of data ownership, both conceptually and programmatically, it took over. Individuals or groups took care of the maintenance cost of servers and profited from users of server software.

As the HTTP network continued to grow, a developer named Bram Cohen introduced a new protocol called BitTorrent. The goal was to solve the issue of excessively long download times for large media files via the HTTP protocol, providing an improvement over previous P2P protocols. The problem was that the time required to download large files was too long, and as the Web grew, the file sizes available also grew. Simultaneously, hard drive storage space increased, and more people connected. BitTorrent turned downloaders into uploaders, solving the problem.

BitTorrent's speed, resilience, and incentive mechanism proved to be superior to HTTP for large datasets.

However, currently, there are still no DApps that meet all **four conditions[^1]**. Some applications partially meet them and have achieved remarkable results:

[^1]: No central failure point, issuing their own "internal currency," having a decentralized formula, and being open source.

* PopcornTime: Real-time video streaming using the BitTorrent protocol, similar to a seeded Netflix.
* OpenBazaar: Aiming to be a decentralized version of eBay.
* Lighthouse: A Bitcoin wallet embedded with a series of smart contracts helping fund projects similar to Kickstarter.
* Gems: A social messaging app attempting to create a fairer business model than WhatsApp.

## Decentralized Ecosystem

### Decentralized Data

For me, this is the most important concept. Currently, we willingly give our data to the "service stack," trading our data for the free services they provide or even paying fees for data storage. However, as long as users provide their data for free, these services can make money with that data.

We may trust providers not to misuse our data or sell it to those we don't want it revealed to. Still, the reality is that trust might be betrayed as soon as we entrust the data to a centralized entity.

How can this problem be addressed? How can data be stored in a decentralized way, allowing you to genuinely own your data? The ideal solution should provide a decentralized data storage method that is robust enough and requires as little trust as possible to protect the data.

#### Option One: Store data directly on the Bitcoin blockchain

This approach is somewhat naive. It does decentralize the data since everyone has a copy of the blockchain containing the data, but nobody can modify the data. Similarly, after you upload data to the blockchain, Bitcoin miners can only store your data for free, and the rewards they receive are not enough to cover the costs, removing the incentive to continue maintaining the Bitcoin network.

#### Option Two: Store data in a Distributed Hash Table (DHT)

Distributed Hash Tables (DHT) have been widely adopted in the past 10 years. It not only distributes data copies but also includes an index function to look up data, ensuring resilience.

### Decentralized Wealth

### Decentralized Identity

### Decentralized Computing

### Decentralized Bandwidth

Mesh networks are a decentralized version of the standard centralized internet. In a mesh network, users don't need to access sites through a central gateway. They can connect directly to the nearest router, typically a nearby computer.

---

As all labor-based things are slowly consumed by automation, the data market is likely to become the most significant market.

### Decentralized Market for Decentralized Assets

---

As developers, we should occasionally break out of inherent thought patterns. Sometimes we may focus too much on the complex technical aspects, but for users, they don't care about the implementation details, whether it's centralized or decentralized. Most people don't care; they just want something that smoothly helps them solve their problems.

When necessary, we can choose decentralization and hope users realize the value of their data, hoping the world gradually understands the importance of securely managing their keys.

## Building a Decentralized Application

### Centralized Architecture

When building standard web applications based on server-client architecture, three common paradigms are used:

1. REST

   The server-client model is quite simple and has become the main way to exchange data on the Web. REST stands for Representational State Transfer, a set of guidelines and best practices for creating scalable web applications based on the server-client model. REST is not a technology itself; like AJAX, it is a practice. This practice encourages the use of various capabilities already present in the HTTP protocol but rarely used. Users simply point their browser to a URL (Uniform Resource Locator) to send an HTTP request. Each HTTP request contains some parameters, and the server can decide what response to give to the client making the request based on this information.

2. CRUD

   CRUD stands for Create, Read, Update, and Delete. These are basic operations on a data store, used to directly manipulate records or data objects. Without these actions, records are just passive entities. Typically, they are database tables and records. REST interacts with running systems, while CRUD deals with data within the system. Developers usually use databases like MongoDB or MySQL to perform CRUD actions on their data.

3. MVC

   MVC stands for Model-View-Controller, the most popular software programming paradigm today. The model manages the core behavior and data of the application. The view renders the user interface of the application, and the controller receives user input, calling model objects and views as needed to perform specific actions.

### Decentralized Structure: Introduction to IPFS

In a decentralized architecture, CRUD and REST are combined. In terms of REST, data is scattered across the decentralized network instead of controlled by someone on a specific computer. Operations are executed locally or handle requests locally, just like on a remote server. You are both the server and the client.

IPFS, as a decentralized data storage, goes far beyond all its competitors in the field, with excellent ideas accumulated over many years and verified practical experience.

DApps do not run on servers but on each user's computer.

Let's look at two key commands in IPFS:

* ADD: Adds data to IPFS.
* CAT: Reads data from IPFS.

Since IPFS is decentralized data storage, once you add data to the network, you can't delete it unless you are the only one storing the data. This is because other nodes that have accessed the data immediately have a copy. Additionally, when updating data in IPFS, the file itself is not deleted; it is versioned using Git.

Adding data to IPFS is essentially broadcasting on the network, telling everyone you have this data. In reality, you are not sending data to any single computer, and the data is only sent when requested. Furthermore, since data is on the network, the processing results of commands also occur on the network.

MVC still applies to decentralized applications

; the only difference is that the controller doesn't communicate with a server but with a blockchain and DTH.

Translated to English.