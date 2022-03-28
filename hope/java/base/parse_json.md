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

由实体类生成 json 字符串

``` java
@Test
public void EntityToJson() throws IOException {
    Person person = new Person("张三", "男", 25);
    ObjectMapper objectMapper = new ObjectMapper();
    String jsonString = objectMapper.writeValueAsString(person);
    System.out.println(jsonString);
}
```

由 json 字符串生成实体类

``` java
@Test
public void JsonToEntity() throws IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    String jsonString = "{\"name\":\"张三\",\"sex\":\"男\",\"age\":25}";
    Person person = objectMapper.readValue(jsonString, Person.class);
    System.out.println(person);
}
```

## 利用 GSON 方式

由实体类生成字符串

``` java
@Test
public void EntityToJson(){
    Person person = new Person("张三", "男", 25);
    Gson gson = new Gson();
    String jsonString = gson.toJson(person);
    System.out.println(jsonString);
}
```

由 json 字符串生成实体类

``` java
@Test
public void JsonToEntity(){
    String jsonString = "{\"name\":\"张三\",\"sex\":\"男\",\"age\":25}";
    Gson gson = new Gson();
    Person person = gson.fromJson(jsonString, Person.class);
    System.out.println(person.toString());
}
```

## 利用 FastJSON 方式

由实体类生成 json 字符串

``` java
@Test
public void EntityToJson(){
    Person person = new Person("张三", "男", 25);
    Object jsonString = JSON.toJSON(person);
    System.out.println(jsonString.toString());
}
```

由 json 字符串生成实体类

``` java
@Test
public void JsonToEntity(){
    String jsonString = "{\"name\":\"张三\",\"sex\":\"男\",\"age\":25}";
    Person person = JSON.parseObject(jsonString, Person.class);
    System.out.println(person.toString());
}
```

## 几种方式比较

| 类型           | 简介                                                           |
| -------------- | -------------------------------------------------------------- |
| 传统Json方式： | 复杂的Json数据转换成实体类存在缺陷，性能和功能不够完善         |
| Jackson方式：  | 复杂的Json数据转换成实体类存在缺陷，性能和功能优于传统方式     |
| Gson方式：     | 功能方面在几种方式中最优，性能方面不如Jackson方式              |
| FastJson方式： | 复杂的实体类转换成Json数据存在缺陷，解析json的速度优于其他方式 |

## Q&A

**Q1: 在不知道 key 的情况下获取 json 的 key 值**

可以使用 `JsonObject.key()` 获取迭代器对象

``` java
String json="{'name':'angui','age':'23','like':'吃水果'}";
JSONObject j = JSON.parseObject(json);
j.remove("age");
System.out.println(json.toString());
System.out.println(j.toJSONString());

//将json转换为key=value&key=value&...的形式
StringBuilder sb = new StringBuilder();
String sbString="";
try {
    org.json.JSONObject jsonObject = new org.json.JSONObject(json);
    Iterator iterator = jsonObject.keys();
    while(iterator.hasNext()){
        String key = (String) iterator.next();
        sb.append("&"+key);
        sb.append("="+jsonObject.getString(key));
    }
    sb.append("&key");
    sbString = sb.substring(1);
} catch (JSONException e) {
    e.printStackTrace();
}
System.out.println(sbString);
```
