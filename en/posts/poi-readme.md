---
title: Apache POI
date: 2023-01-05 16:20:59
tags: POI
---

## Introduction

`A Java library for reading and writing Microsoft Office binary and OOXML file formats.`
A Java library designed for reading and writing Microsoft Office binary and OOXML file formats.

<!-- more -->

`The Apache POI Project's mission is to create and maintain Java APIs for manipulating various file formats based upon the Office Open XML standards (OOXML) and Microsoft's OLE 2 Compound Document format (OLE2). In short, you can read and write MS Excel files using Java. In addition, you can read and write MS Word and MS PowerPoint files using Java. Apache POI is your Java Excel solution (for Excel 97-2008). We have a complete API for porting other OOXML and OLE2 formats and welcome others to participate.`
The mission of the Apache POI Project is to create and maintain Java APIs for manipulating various file formats based on the Office Open XML standards (OOXML) and Microsoft's OLE 2 Compound Document format (OLE2). In summary, it enables reading and writing of MS Excel files using Java. Moreover, you can handle MS Word and MS PowerPoint files with Java. Apache POI serves as your Java Excel solution (for Excel 97-2008). The project provides a comprehensive API for porting other OOXML and OLE2 formats, and collaboration from others is encouraged.

`OLE2 files include most Microsoft Office files such as XLS, DOC, and PPT as well as MFC serialization API based file formats. The project provides APIs for the OLE2 Filesystem (POIFS) and OLE2 Document Properties (HPSF).`
OLE2 files encompass the majority of Microsoft Office files, including XLS, DOC, and PPT, as well as file formats based on the MFC serialization API. The project offers APIs for the OLE2 Filesystem (POIFS) and OLE2 Document Properties (HPSF).

`Office OpenXML Format is the new standards based XML file format found in Microsoft Office 2007 and 2008. This includes XLSX, DOCX and PPTX. The project provides a low level API to support the Open Packaging Conventions using openxml4j.`
Office OpenXML Format is the XML file format based on new standards introduced in Microsoft Office 2007 and 2008. This format includes XLSX, DOCX, and PPTX. The project supplies a low-level API to support the Open Packaging Conventions using openxml4j.

`For each MS Office application there exists a component module that attempts to provide a common high level Java api to both OLE2 and OOXML document formats. This is most developed for Excel workbooks (SS=HSSF+XSSF). Work is progressing for Word documents (WP=HWPF+XWPF) and PowerPoint presentations (SL=HSLF+XSLF).`
Each MS Office application has a component module aiming to offer a common high-level Java API for both OLE2 and OOXML document formats. This is most advanced for Excel workbooks (SS=HSSF+XSSF). Efforts are underway for Word documents (WP=HWPF+XWPF) and PowerPoint presentations (SL=HSLF+XSLF).

`The project has some support for Outlook (HSMF). Microsoft opened the specifications to this format in October 2007. We would welcome contributions.`
The project provides some support for Outlook (HSMF). Microsoft opened the specifications for this format in October 2007, and contributions are welcomed.

`There are also projects for Visio (HDGF and XDGF), TNEF (HMEF), and Publisher (HPBF).`
Projects also exist for Visio (HDGF and XDGF), TNEF (HMEF), and Publisher (HPBF).

## Components

`This library includes the following components, roughly in descending order of maturity:`
This library comprises the following components, listed approximately in descending order of maturity:

* Excel spreadsheets (Common SS = HSSF, XSSF, and SXSSF)
* PowerPoint slideshows (Common SL = HSLF and XSLF)
* [Word processing documents👈](https://cloaks.cn/2023/01/05/poi-word-process/) (Common WP = HWPF and XWPF)
* Outlook email (HSMF and HMEF)
* Visio diagrams (HDGF and XDGF)
* Publisher (HPBF)

* Excel spreadsheets (Common SS = HSSF, XSSF, and SXSSF)
* PowerPoint slideshows (Common SL = HSLF and XSLF)
* [Word processing documents👈](https://cloaks.cn/2023/01/05/poi-word-process/) (Common WP = HWPF and XWPF)
* Outlook email (HSMF and HMEF)
* Visio diagrams (HDGF and XDGF)
* Publisher (HPBF)

`And lower-level, supporting components:`
And lower-level, supporting components:

* `OLE2 Filesystem (POIFS)`
* `OLE2 Document Properties (HPSF)`
* `TNEF (HMEF) for Outlook winmail.dat files`
* `OpenXML4J (OOXML)`

* OLE2 Filesystem (POIFS)
* OLE2 Document Properties (HPSF)
* TNEF (HMEF) for Outlook winmail.dat files
* OpenXML4J (OOXML)