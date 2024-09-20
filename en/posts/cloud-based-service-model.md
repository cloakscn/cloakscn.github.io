---
title: Cloud Service Models (SaaS, PaaS, IaaS)
tags:
  - Original
  - Cloud Computing
date: 2023-06-13 15:52:37
---

There are three cloud service models: Software as a Service (SaaS), Platform as a Service (PaaS), and Infrastructure as a Service (IaaS). Each cloud service model abstracts resources to some extent, reducing the complexity of building and deploying systems for consumers.

<!-- more -->

The 5 characteristics of cloud computing are network access, elasticity, resource pooling, measurable services, and on-demand self-service.

![Cloud Stack](/assets/images/cloud-based-service-model/cloud stack.png)

**Cloud Stack** at the bottom represents traditional data centers, possibly with some virtualization technologies applied but lacking any cloud computing features.

* **IaaS:** Delivers computer infrastructure (typically a platform virtualization environment) as a service. Customers don't buy servers, software, data center space, or network equipment; instead, they purchase these resources as a complete outsourced service.
* **PaaS:** Delivers computing platforms and solution stacks as a service. PaaS services eliminate the cost and complexity of purchasing, managing underlying hardware and software, making application deployment easier.
* **SaaS:** Consumers can use applications running on the cloud infrastructure and access them on various client devices through thin-client interfaces like web browsers. Consumers do not manage or control the underlying cloud infrastructure, including networks, servers, operating systems, storage, and even individual application features, except for some limited application-specific configuration settings.

![NIST Cloud Computing Definition](/assets/images/cloud-based-service-model/nist.png)

## Deployment Models

### Public Cloud

Public cloud is defined as follows: Cloud infrastructure is made available to the general public. The entities owning, managing, or operating these facilities could be commercial, academic, or government organizations, or their combinations. Additionally, these infrastructures are located at the cloud provider's premises.

Public cloud refers to a multi-tenant environment where end-users pay for the resources they use on a shared commercial resource network. End-users can choose the location of the data center but do not know on which physical machine their software is running. An abstraction layer above physical hardware is presented to end-users in the form of APIs, allowing them to create virtual computing resources running in a large shared pool. Advantages of public cloud include:

* **Utility pricing:** Users pay only for the resources they consume. This allows users to activate or shut down cloud services according to their expansion or reduction needs, avoiding potential waste of computing resources during usage cycles.
* **Elasticity:** The seemingly infinite resource pool allows end-users to dynamically adjust the number of computing resources needed for their software solutions to handle peak loads, responding in real-time to rare traffic spikes. In contrast, in private on-premises or non-cloud solutions, users may have to own or lease the required resources to deal with peaks.
* **Core competency:** In public cloud services, end-users essentially outsource their data centers and infrastructure management to companies specialized in managing infrastructure. The result is that end-users can significantly reduce the time spent managing infrastructure and focus more on their core competencies.

Public clouds naturally have pros and cons. Let's discuss some of the risks associated with adopting public clouds.

* **Control:** End-users must rely on public cloud providers to fulfill their service level agreements (SLAs) regarding performance and uptime. If a public cloud provider's service is interrupted and end-users do not have proper redundancy measures, they must patiently wait for the provider to restore service.
* **Regulatory issues:** Regulations such as PCI DSS (Payment Card Industry Data Security Standard) and HIPAA (Health Information Portability and Accountability Act), as well as data privacy concerns, can be obstacles to public cloud deployments. Although some companies are beginning to use only public clouds, solving these regulatory issues usually requires adopting hybrid cloud solutions.
* **Limited configurations:** Public cloud providers have a set of standard infrastructure configuration plans to meet the needs of the general public. However, specific hardware may be required for intensive computing problems. As providers do not supply the necessary infrastructure in these cases, end-users typically do not choose public clouds.

### Private Cloud

Private cloud is defined as follows: Cloud infrastructure is provisioned for exclusive use by a single organization comprising multiple consumers (e.g., business units). The entities owning, managing, or operating these facilities could be the organization itself, a third party, or a combination of them. The location of these infrastructures can be on-premises or off-premises.

The advantages of private clouds are that they address some of the drawbacks of public clouds (control, regulatory issues, and configuration capability). Private clouds can be deployed on-premises or hosted in a cloud service provider's data center. In either case, the end-users of private clouds deploy in a single-tenant environment, not sharing resources with other users. For on-premises private clouds, consumers have complete autonomy in all aspects since they still manage the data center and have flexibility in purchasing hardware configurations according to their wishes. Consumers relying on hosted private clouds still depend on their cloud service provider to provide infrastructure, but their resources are not shared with other consumers. This provides users with more control and security, but it generally comes at a higher cost than using computing resources in a multi-tenant public cloud.

Private clouds, however, sacrifice some of the core advantages of cloud computing, such as "rapid scalability, resource pooling, and on-demand usage pricing." While private clouds do allow end-users to scale or shrink on a shared resource, the total accessible resources in a private cloud depend on the amount of infrastructure they have purchased and managed internally. Someone must manage all the physical infrastructure and purchase and manage additional computing and storage capacity, which undoubtedly increases costs and reduces agility. On the other hand, having excess capacity is also inconsistent with the concept of on-demand pay-as-you-go usage in cloud computing. Because whether used or not, end-users have already paid for these infrastructures.

Many organizations have come up with a win-win solution: using both public and private clouds, known as a hybrid cloud.

### Hybrid Cloud

Hybrid cloud is defined as follows: A composition of two or more different cloud infrastructures (private, community, or public) bound together by standardized or proprietary technology that enables data and application portability.

The best practice for a hybrid cloud is to use public clouds as much as possible to take advantage of the benefits of rapid scalability and resource pooling in cloud computing. Meanwhile, in areas where risks, such as data ownership and privacy in public clouds, are higher, private clouds are used.
