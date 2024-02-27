---
title: Word Processing Document Component
date: 2023-01-05 16:35:27
tags: POI
---

Word Processing Document (Common WP = HWPF and XWPF)

This article mainly introduces the POI 5.0.x HWPF and XWPF libraries.
<!-- more -->

## HWPF - Horrible Word Processor Format

## XWPF - Open Office XML Word Processor Format

This package includes classes for handling Microsoft .docx word processing files, referred to as XWPF (XML Word Processing Format) in POI.

XWPFDocument is the core class, officially explained as an advanced class for handling .docx files.

### Reading Documents

You can read a `.docx` document using the parameterized constructor.

```java
public XWPFDocument(java.io.InputStream is)
    throws java.io.IOException
```

```java
// Obtain the document input stream
InputStream fileInputStream = new FileInputStream(filePath + fileName + ".docx");
// Create an XWPFDocument object
XWPFDocument xwpfDocument = new XWPFDocument(fileInputStream);
```

### Generating Documents

```java
// Create the document output stream
FileOutputStream fileOutputStream = new FileOutputStream(filePath + fileName + ".docx");
// Write to the document
xwpfDocument.write(fileOutputStream);
// Close the document output stream
fileOutputStream.close();
```

### Document Elements

XWPF objects mainly include paragraphs, tables, and charts.

#### Paragraphs

| Method                                  | Description                   | Remarks |
| --------------------------------------- | ----------------------------- | ------- |
| createParagraph()                       | Create a new paragraph at the end of the document |         |
| insertNewParagraph(XmlCursor cursor)    | Insert a new paragraph at the cursor position |         |
| setParagraph(XWPFParagraph p, int pos)  | Copy paragraph p to position pos |         |
| getParagraphs()                         | Get the list of paragraphs     |         |
| getParagraph(CTP p)                     |                               |         |
| getPosofParagraph(XWPFParagraph p)      | Get the position of paragraph p |         |
| getLastParagraph()                      | Get the last paragraph         |         |
| getParagraphArray(int pos)              | Get the paragraph at the specified pos |       |
| getParagraphPos(int pos)                | Get the position of the paragraph at the specified pos | |
| getParagraphsIterator()                 | Get the paragraph iterator     |         |
| getParagraphsSpliterator()              | Get the paragraph spliterator  |         |

#### Tables

#### Charts