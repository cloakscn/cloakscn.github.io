---
title: How to Design an Application Solution?
tags:
  - Original
  - Cloud Computing
date: 2023-06-15 14:05:09
---

Architects should engage in necessary exploratory learning before diving into metacomputing, as recommended by most methodologies.

<!-- more -->

## The Importance of 5W1H

Seek answers to the following questions:

1. **Why**: What problem are we trying to solve? What are the business goals and driving forces?
2. **Who**: Who needs these problems to be solved? Who are the participants (internal/external)?
3. **What**: What are the business and technical requirements? What are the legal and regulatory constraints? What are the risks?
4. **Where**: Where will these services be provided? Are there specific requirements locally (regulations, taxation, availability issues, language/site issues, etc.)?
5. **When**: When do these services need to be provided? What is the budget? Are there any associations with other projects/solutions?
6. **How**: How will the organization deliver these services? Is the organization, architecture, and customers all prepared?

Once the context of these questions is clarified, architects can better choose the most appropriate service and deployment models for the company.

## Start with Business Architecture

It's best to begin with a conceptual business architecture diagram for a significant cloud solution. This provides a deeper understanding of various touchpoints and business functions across the entire enterprise (at least within the department corresponding to the solution).

![Business Architecture Diagram](/assets/images/cloud-start-with-the-schema/structure.png)

Through this diagram, the team can see different integration points and endpoints within the architectural framework at the top of the diagram, defining external participants in the system and the touchpoints users will use to interact with the system. All external access will be through an Application Programming Interface (API) layer. From the start of sales to the completion of the entire transaction, AEA defines six core business processes that make up the workflow of the product. Below the business processes are a series of services. Some services support buyer requirements, while others are for sellers. Below the service layer are various business services shared by buyers and sellers. Below these services are utility services like security, events, and alerts. At the bottom, integration points with other systems that the enterprise will implement are shown.

For the implementation of any technology, focus on defining the architecture before hastily deciding on vendors and cloud service models. It is crucial to note that technology choices should be primarily driven by business drivers rather than technical preferences. Asking the "Who/What/Why/Where/When/How" questions early in the project can help make wise decisions on cloud service models and deployment patterns.

Moreover, understand the human and real-world constraints before making decisions. I'm not providing a standardized process for organizations to answer these questions. On the surface, it might seem like I'm recommending a waterfall approach, but it's not. Agile practitioners can incorporate these exploration activities in any way they prefer. The emphasis is that organizations should attempt to answer these questions, and the answers should assist in design decisions and the overall architecture in the end.