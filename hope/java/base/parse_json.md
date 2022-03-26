---
icon: page
title: Java 解析 JSON 的四种方式
date: 2022-03-27
category: Java 基础
author: Cloaks
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在首页的文章收藏板块中
star: true
tag:
  - Java
  - JSON
---

JSON是一种轻量级的数据交换格式，采用完全独立于编程语言的文本格式来存储和表示数据。简洁和清晰的层次结构使得 JSON 成为理想的数据交换语言。 易于阅读和编写，同时也易于解析和生成，并有效地提升网络传输效率。

<!-- more -->

一个实体类：用于与JSON数据进行相互转换

```java
public class Person {
    private String name;
    private String sex;
    private int age;
    public Person(String name, String sex, int age) {
        this.name = name;
        this.sex = sex;
        this.age = age;
    }
    public String getName() {
        return name;
    }
    public String getSex() {
        return sex;
    }
    public int getAge() {
        return age;
    }
    @Override
    public String toString() {
        return "Person{name='" + name + '\'' + ", sex='" + sex + '\'' + ", age=" + age + '}';
    }
}
```

## 传统写法

有实体类生成 json 字符串

```java
public Person getPerson(){
    return new Person("张三", "男", 25);
}
@Test
public void EntityToJson(){
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("name", getPerson().getName());
    jsonObject.put("sex", getPerson().getSex());
    jsonObject.put("age", getPerson().getAge());
    System.out.println(jsonObject.toString());
}
```

由 json 字符串生成实体类

```java
@Test
public void JsonToEntity(){
    String jsonString = "{\"sex\":\"男\",\"name\":\"张三\",\"age\":25}";
    JSONObject jsonObject = new JSONObject(jsonString);
    Person person = new Person(jsonObject.get("name").toString(), jsonObject.get("sex").toString(), Integer.valueOf(jsonObject.get("age").toString()));
    System.out.println(person.toString());
}
```

## Jackson 写法

