---
title: Considerations for Cloud Data
tags:
  - Original
  - Cloud Computing
date: 2023-06-21 11:03:46
---

The establishment of cloud services requires careful consideration of various data characteristics. We'll enumerate some key factors:

* Physical Characteristics
* Performance Requirements
* Variability
* Capacity
* Regulatory Requirements
* Transaction Boundaries
* Retention Period

All these data requirements influence decisions on how to store underlying data. Two critical decisions must be made:

1. Single-tenant or multi-tenant
2. Choice of data storage format: SQL, NoSQL, file, etc.

<!-- more -->

## Data Characteristics

Here, we'll discuss factors to consider for each data characteristic during the design phase.

### Physical Characteristics

Collecting numerous data points is essential for analyzing physical characteristics. The location of data is a crucial piece of information. Is the data pre-existing, or is it an entirely new dataset? Is the data highly sensitive? Legal responsibilities for analyzing data, ownership (company or user), and compliance with different countries' data entry and exit regulations play a significant role.

For companies building SaaS, PaaS, IaaS solutions, decisions regarding data ownership and data-sharing methods have a decisive impact on design choices. Determining whether to isolate databases for individual customers or employ design decisions like isolating database servers for each client can be critical.

### Performance Requirements

Performance can be categorized as real-time, near-real-time, and delayed. The classification of response times determines major design decisions. Shorter required response times may lead architects to use memory rather than disk. Common design patterns for large-scale, high-performance datasets include:

* Utilizing a caching layer
* Reducing the size of the dataset (storing hash values or binary representations of attributes)
* Separating the database into read-only and write-only nodes
* Slicing data into specific customer, time, or region segments
* Archiving stale data to reduce table size
* Denormalizing datasets

Understanding performance requirements is crucial for making design decisions.

### Variability

Variability refers to the rate of data change. Data sets can be categorized into static data sets and dynamic data sets.

**Static data sets are typically event-driven data occurring in chronological order.** Examples include log data and transaction data, characterized by "write once, read many" usage. These datasets happen at a specific point in time but are repeatedly read for analysis to detect patterns and observe behavior. They are often stored for extended periods, occupying terabytes of data space. Large static datasets of this nature often require non-standardized database operations to maximize performance. Common operations for mining these datasets involve denormalizing data, using a star or snowflake schema, using NoSQL databases, and, more recently, applying big data technologies.

**Dynamic data requires a different design.** If data changes frequently, a normalized relational data management system (RDMS) is a common solution. RDMS is well-suited for handling ACID (Atomicity, Consistency, Isolation, Durability) transactions to ensure data reliability. Normalized relational databases protect data integrity by ensuring no duplicate data or orphaned records.

Another crucial feature of variability is the frequency of data changes. It is easier to design when generating a million data points in a month compared to generating a million data points in a minute. The speed of data flow (inserts, updates, deletes) is a significant influencing factor in the overall architecture of the data layer. Therefore, understanding data variability is essential to select the most appropriate disk storage system for a specific problem.

### Capacity

Capacity refers to the amount of data a system must store and process. While relational databases offer many advantages, they become slow and challenging to maintain when data volume reaches a certain scale. Architects must also clarify how much data needs to be maintained and accessed online, and how much data should be archived or stored on slower and more cost-effective disks. Capacity also influences the design of backup strategies. Backing up databases and file systems is crucial for ensuring business continuity and disaster recovery, meeting SSAE 16 and other regulatory requirements. Without proper design, backups can consume significant CPU resources and impact the overall system performance. Full backups typically occur daily, while incremental backups may occur multiple times a day. A common strategy is to perform backups from a standby database, so the application's performance is not affected.

### Regulatory Requirements

Regulations play a crucial role in making decisions related to data. Data categorized as Personally Identifiable Information (PII) must be encrypted during runtime and storage, incurring a certain performance cost, especially when fields with such content change frequently and the data is large. PII data is a significant reason why companies opt for private or hybrid clouds, as many companies refuse to place sensitive and private data in a public, multi-tenant environment. Understanding the limitations and risks of regulations can drive deployment decisions.

### Transaction Boundaries

Transaction boundaries can be understood as work units. Clarifying transaction boundaries is essential for determining which data points require state storage and which ones do not. RESTful services need to be designed as stateless, so architects need to define the best approach for maintaining transactional state. This might involve caching, writing to queues, writing to temporary tables or disks, etc. If complex transaction scenarios are frequent, writing data to tables or disks might create performance bottlenecks, and caching data in memory could be a better solution.

### Retention Period

Retention period refers to the duration for which data must be retained. For example, financial data typically needs to be kept for 7 years to meet audit requirements. However, this does not mean it must be kept online and accessible for 7 years; it simply means it should not be destroyed within the 7-year period.

Understanding the retention period is crucial for choosing the appropriate storage solution. Data that needs to be retained but does not require real-time or near-real-time network access can be stored on very inexpensive offline disks or tapes. Usually, these archived data are stored offsite at a disaster recovery site. Data that requires immediate retrieval needs to be stored on high-performance disks with redundant backups and quick recovery from failures.

## Multi-Tenant or Single-Tenant

The decision about whether a system should be multi-tenant or single-tenant should be based on the aforementioned data characteristics. When referring to the data layer of an architecture, multi-tenancy means multiple organizations or clients (tenants) share a set of servers. Most definitions state it is one server, but in practice, multiple servers (master-slave servers) are often required to support one tenant. Single-tenancy means each set of servers supports only one tenant.

* Complete Isolation
* Data Isolation
* Data Separation

## Choosing Data Storage Type

Selecting the right data storage type is another crucial decision. Many IT departments are very familiar with relational databases and might instinctively choose them to solve all data problems. However, just as you can build a house with a hammer, sometimes a nail gun might be more convenient.

To store data in a database, relational databases must ensure that transactions are successfully processed, making them well-suited for Online Transaction Processing (OLTP) behavior. Additionally, relational databases have excellent security features and robust query engines. However, NoSQL databases are becoming increasingly popular for two main reasons: more data storage and access occur in elastic cloud computing resources, and disk solutions are becoming cheaper while their speed is continuously increasing. Companies now store petabytes of data, and this is no longer a rarity. Such large

 datasets are mainly used for analysis, data mining, pattern recognition, machine learning, and other tasks. Enterprises can leverage cloud-configured multi-server setups to distribute workloads across multiple nodes for faster analysis, then de-provision all servers after the analysis is complete.

When data becomes this large, the processing speed of relational databases becomes challenging to meet speed requirements. The construction of relational data emphasizes referential integrity. To achieve this, a significant amount of overhead is built into the database engine to ensure transaction processing and submission are completed before data is stored in tables. Relational data also requires indexes to expedite record retrieval. If the number of records is large enough, indexes can have the opposite effect, making database performance unacceptable.

The emergence of NoSQL databases aims to address these issues. There are currently four types of NoSQL databases.

### Key-Value Stores

Key-Value store databases use a hash table, where each unique key with a pointer points to a specific data item. This is the simplest of the four NoSQL database types, offering speed and high scalability, particularly useful for handling massive write operations like tweets. It also performs well when reading large, static, structured data such as historical orders, time, and transactions. The downside is that this technology lacks a description (schema) of the database, making it unsuitable for dealing with complex data and relationships. Representative products of key-value stores include Redis, Voldemort (LinkedIn), and DynamoDB (Amazon).

### Column Stores

Column stores were introduced to store and scale large-scale distributed data across multiple machines. A hash key points to multiple columns organized into a column family. The strength of this database lies in the ability to add columns during runtime and allow missing values in row values. Column stores are incredibly fast, scalable, and easier to make changes during runtime. They excel in integrating data from multiple heterogeneous sources but are less practical for highly connected data sources. Representative column store databases are Hadoop and Cassandra.

### Document Stores

Document store databases are used to store unstructured data in document form. Data is usually encapsulated in common document types like XML, JSON, PDF, Word, Excel, etc. Most log solutions use document stores to integrate logs from different data sources, such as database logs, web server logs, application server logs, and application logs. These databases perform well in expanding large-scale data with different formats but are less suitable for highly connected data processing. Representative document store databases are CouchDB and MongoDB.

### Graph Databases

Graph databases are used to store and manage interrelated relationships. These databases are often used to visualize relationships' graphical representation, especially in social media analytics. Graph databases excel in visualization but may perform poorly in other aspects due to the need to traverse the entire relationship tree to produce results. Representative graph databases are Neo4j and InfoGrid.

### Choosing Other Storage Methods

We discussed the choice between SQL and NoSQL, but sometimes data is also stored as files. Large files such as photos, videos, and MP3 files may be several megabytes or larger. Using a database on a web server to store and retrieve such large fields may make it challenging to provide a high-performance user experience. A better approach is to use Content Delivery Networks (CDN), a distributed computing network located in multiple data centers connected via the internet. CDNs provide high availability and performance, making them one of the choices for bandwidth-intensive data such as streaming media.

Data comes with various characteristics, and understanding these characteristics and the different requirements of each is crucial for selecting the right cloud service model, cloud deployment model, database design, and data storage system. Nobody builds a house without understanding the requirements and analyzing architectural floor plans, but some companies start building software without fully understanding their data needs. Whether building a new system or migrating an existing one, architects should spend time with the product team to assess various data characteristics described in this chapter. Only with a complete understanding of these data characteristics can you build the best system that meets business requirements.