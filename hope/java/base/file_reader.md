---
icon: page
title: Java 读取文本文件
date: 2022-03-11
category: Java 基础
author: Cloaks
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在首页的文章收藏板块中
star: true
tag:
  - Java
  - File
---

在 java 中有很多读取文本文件的方法。文本文件由字符组成，因此可以使用 Reader 类。在 java 中读取文本文件也有一些实用程序类。

<!-- more -->

* 使用 Files 类读取文本文件；

* 使用 FileReader 类读取文本文件；

* 使用 BufferedReader 类读取文本文件；

* 使用 Scanner 类读取文本文件；

## 使用 java.nio.file.Files 读取文本文件

使用 Files 类将文件的所有内容读入字节数组。

Files 类还有一个方法可以读取所有行到字符串列表。

Files 类是在 Java 7 中引入的，**如果想加载所有文件内容，使用这个类是比较适合的**。

只有在处理小文件并且需要加载所有文件内容到内存中时才应使用此方法。

```java
String fileName = "D:/docs/source.txt";
Path path = Paths.get(fileName);
byte[] bytes = Files.readAllBytes(path);
List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);
```

## 使用 java.io.FileReader 类

可以使用 FileReader 获取 BufferedReader，然后逐行读取文件。

**FileReader 不是一种 java 中读取文本文件的非常有效的方法[^1]**。

[^1]: 不支持编码并使用系统默认编码

```java
File file = new File("D:/docs/source.txt");
FileReader fileReader = new FileReader(file);
BufferedReader bufferedReader = new BufferedReader(fileReader);
String line = "";
while ((line = bufferedReader.readLine()) != null) {
    System.out.println(line);
}
```

## 使用 java.io.BufferedReader

如果想逐行读取文件并对它们进行处理，那么 BufferedReader 是非常合适的。

**它适用于处理大文件，也支持编码。**

BufferedReader 是同步的，因此可以安全地从多个线程完成对 BufferedReader 的读取操作。

BufferedReader的默认缓冲区大小为：8KB。

```java
String fileName = "D:/maxsu/docs/source.txt";
File file = new File(fileName);
FileInputStream fis = new FileInputStream(file);
InputStreamReader isr = new InputStreamReader(fis, cs);
BufferedReader br = new BufferedReader(isr);

String line;
while((line = br.readLine()) != null){
     //process the line
     System.out.println(line);
}
br.close();
```

## 使用 Scanner 读取文本文件

如果要逐行读取文件或基于某些 java 正则表达式读取文件，则可使用 Scanner 类。

Scanner 类使用分隔符模式将其输入分解为标记，分隔符模式默认匹配空格。

然后可以使用各种下一种方法将得到的标记转换成不同类型的值。

Scanner 类不同步，因此不是线程安全的。

```java
Path path = Paths.get(fileName);
Scanner scanner = new Scanner(path);
System.out.println("Read text file using Scanner");
// 一行一行地读取
while(scanner.hasNextLine()){
    //process each line
    String line = scanner.nextLine();
    System.out.println(line);
}
scanner.close();
```

## 实例

以下是显示如何在 java 中读取文本文件的示例。

分别使用：Scanner，Files，BufferedReader 编码和 FileReader 实现。

```java
package com.journaldev.files;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Scanner;

public class JavaReadFile {

    public static void main(String[] args) throws IOException {
        String fileName = "D:/docs/source.txt";

        //使用Java 7中的Files类处理小文件，获取完整的文件数据
        readUsingFiles(fileName);

        //使用Scanner类来处理大文件，逐行读取
        readUsingScanner(fileName);

        //使用BufferedReader读取，逐行读取
        readUsingBufferedReader(fileName);
        readUsingBufferedReaderJava7(fileName, StandardCharsets.UTF_8);
        readUsingBufferedReader(fileName, StandardCharsets.UTF_8);

        //使用FileReader读取，没有编码支持，效率不高
        readUsingFileReader(fileName);
    }

    private static void readUsingFileReader(String fileName) throws IOException {
        File file = new File(fileName);
        FileReader fr = new FileReader(file);
        BufferedReader br = new BufferedReader(fr);
        String line;
        System.out.println("Reading text file using FileReader");
        while((line = br.readLine()) != null){
            //逐行读取
            System.out.println(line);
        }
        br.close();
        fr.close();

    }

    private static void readUsingBufferedReader(String fileName, Charset cs) throws IOException {
        File file = new File(fileName);
        FileInputStream fis = new FileInputStream(file);
        InputStreamReader isr = new InputStreamReader(fis, cs);
        BufferedReader br = new BufferedReader(isr);
        String line;
        System.out.println("Read text file using InputStreamReader");
        while((line = br.readLine()) != null){
            //逐行读取
            System.out.println(line);
        }
        br.close();

    }

    private static void readUsingBufferedReaderJava7(String fileName, Charset cs) throws IOException {
        Path path = Paths.get(fileName);
        BufferedReader br = Files.newBufferedReader(path, cs);
        String line;
        System.out.println("Read text file using BufferedReader Java 7 improvement");
        while((line = br.readLine()) != null){
            //逐行读取
            System.out.println(line);
        }
        br.close();
    }

    private static void readUsingBufferedReader(String fileName) throws IOException {
        File file = new File(fileName);
        FileReader fr = new FileReader(file);
        BufferedReader br = new BufferedReader(fr);
        String line;
        System.out.println("Read text file using BufferedReader");
        while((line = br.readLine()) != null){
            //逐行读取
            System.out.println(line);
        }
        //close resources
        br.close();
        fr.close();
    }

    private static void readUsingScanner(String fileName) throws IOException {
        Path path = Paths.get(fileName);
        Scanner scanner = new Scanner(path);
        System.out.println("Read text file using Scanner");
        //逐行读取
        while(scanner.hasNextLine()){
            //逐行处理
            String line = scanner.nextLine();
            System.out.println(line);
        }
        scanner.close();
    }

    private static void readUsingFiles(String fileName) throws IOException {
        Path path = Paths.get(fileName);
        //将文件读取到字节数组
        byte[] bytes = Files.readAllBytes(path);
        System.out.println("Read text file using Files class");
        //read file to String list
        @SuppressWarnings("unused")
        List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);
        System.out.println(new String(bytes));
    }
}
```

选择使用哪个方法来读取文件取决于项目要求。

例如，如果只是日志记录文件，则可以使用Files和BufferedReader。

如果要查找基于分隔符的文件，则应使用Scanner类。

顺便提及一下RandomAccessFile。也可以用它来读取文本文件。如下示例代码:

```java
RandomAccessFile file = new RandomAccessFile("D:/maxsu/docs/readme.txt", "r");
String str;

while ((str = file.readLine()) != null) {
    System.out.println(str);
}
file.close();
```