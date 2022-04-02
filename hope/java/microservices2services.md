---
icon: page
title: 如何把微服务项目拆分成单体应用
date: 2022-04-02
category: Spring
author: Cloaks
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在首页的文章收藏板块中
star: true
tag:
  - Java
  - Spring
  - Spring Boot
  - Spring Cloud
---

## 1. 修改 `pom` 文件
### 修改 `<parent>` 标签内容
```xml
<!-- 修改前 -->
<parent>
	<groupId>com.ruoyi</groupId>
	<artifactId>ruoyi-modules</artifactId>
	<version>2.1.1</version>
</parent>
<!-- 修改后 -->
<parent>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-parent</artifactId>
	<version>2.5.8</version>
	<relativePath />
</parent>
```
### 删除与 `spring cloud` 相关的依赖
```xml
<!-- SpringCloud Ailibaba Nacos -->
<dependency>
	<groupId>com.alibaba.cloud</groupId>
	<artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
	<exclusions>
		<exclusion>
			<artifactId>jsr305</artifactId>
			<groupId>com.google.code.findbugs</groupId>
		</exclusion>
		<exclusion>
			<artifactId>commons-collections</artifactId>
			<groupId>commons-collections</groupId>
		</exclusion>
		<exclusion>
			<artifactId>commons-lang</artifactId>
			<groupId>commons-lang</groupId>
		</exclusion>
		<exclusion>
			<artifactId>HdrHistogram</artifactId>
			<groupId>org.hdrhistogram</groupId>
		</exclusion>
	</exclusions>
</dependency>

<!-- SpringCloud Ailibaba Nacos Config -->
<dependency>
	<groupId>com.alibaba.cloud</groupId>
	<artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>

<!-- SpringCloud Ailibaba Sentinel -->
<dependency>
	<groupId>com.alibaba.cloud</groupId>
	<artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```
### 添加基本依赖（可自行添加）
```xml
<properties>
	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
	<java.version>1.8</java.version>
	<maven-jar-plugin.version>3.1.1</maven-jar-plugin.version>
	<mybatis.spring.boot.starter.version>2.2.0</mybatis.spring.boot.starter.version>
	<pagehelper.spring.boot.starter.version>1.4.0</pagehelper.spring.boot.starter.version>
	<fastjson.version>1.2.79</fastjson.version>
	<druid.version>1.2.8</druid.version>
	<commons.io.version>2.11.0</commons.io.version>
	<commons.fileupload.version>1.4</commons.fileupload.version>
	<commons.collections.version>3.2.2</commons.collections.version>
	<bitwalker.version>1.21</bitwalker.version>
	<jwt.version>0.9.1</jwt.version>
	<kaptcha.version>2.3.2</kaptcha.version>
	<swagger.version>3.0.0</swagger.version>
	<poi.version>4.1.2</poi.version>
	<oshi.version>5.8.6</oshi.version>
	<jna.version>5.10.0</jna.version>
	<velocity.version>2.3</velocity.version>
	<log4j2.version>2.17.1</log4j2.version>
</properties>
<!-- SpringBoot 核心包 -->
<dependencies>
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter</artifactId>
	</dependency>

	<!-- SpringBoot 测试 -->
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-test</artifactId>
		<scope>test</scope>
	</dependency>

	<!-- SpringBoot 拦截器 -->
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-aop</artifactId>
	</dependency>

	<!-- SpringBoot Web容器 -->
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-web</artifactId>
	</dependency>

	<!-- spring-boot-devtools -->
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-devtools</artifactId>
		<optional>true</optional> <!-- 表示依赖不会传递 -->
	</dependency>

	<!-- spring security 安全认证 -->
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-security</artifactId>
	</dependency>

	<!-- redis 缓存操作 -->
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-data-redis</artifactId>
	</dependency>

	<!-- pool 对象池 -->
	<dependency>
		<groupId>org.apache.commons</groupId>
		<artifactId>commons-pool2</artifactId>
	</dependency>

	<!-- Mysql驱动包 -->
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<scope>runtime</scope>
	</dependency>

	<!-- SpringBoot集成mybatis框架 -->
	<dependency>
		<groupId>org.mybatis.spring.boot</groupId>
		<artifactId>mybatis-spring-boot-starter</artifactId>
		<version>${mybatis.spring.boot.starter.version}</version>
	</dependency>

	<!-- pagehelper 分页插件 -->
	<dependency>
		<groupId>com.github.pagehelper</groupId>
		<artifactId>pagehelper-spring-boot-starter</artifactId>
		<version>${pagehelper.spring.boot.starter.version}</version>
	</dependency>

	<!-- 阿里数据库连接池 -->
	<dependency>
		<groupId>com.alibaba</groupId>
		<artifactId>druid-spring-boot-starter</artifactId>
		<version>${druid.version}</version>
	</dependency>

	<!-- 自定义验证注解 -->
	<dependency>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-validation</artifactId>
	</dependency>

	<!-- 常用工具类 -->
	<dependency>
		<groupId>org.apache.commons</groupId>
		<artifactId>commons-lang3</artifactId>
	</dependency>

	<!-- io常用工具类 -->
	<dependency>
		<groupId>commons-io</groupId>
		<artifactId>commons-io</artifactId>
		<version>${commons.io.version}</version>
	</dependency>

	<!-- 文件上传工具类 -->
	<dependency>
		<groupId>commons-fileupload</groupId>
		<artifactId>commons-fileupload</artifactId>
		<version>${commons.fileupload.version}</version>
	</dependency>

	<!-- 解析客户端操作系统、浏览器等 -->
	<dependency>
		<groupId>eu.bitwalker</groupId>
		<artifactId>UserAgentUtils</artifactId>
		<version>${bitwalker.version}</version>
	</dependency>

	<!-- 阿里JSON解析器 -->
	<dependency>
		<groupId>com.alibaba</groupId>
		<artifactId>fastjson</artifactId>
		<version>${fastjson.version}</version>
	</dependency>

	<!-- Spring框架基本的核心工具-->
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-context-support</artifactId>
	</dependency>

	<!-- Token生成与解析-->
	<dependency>
		<groupId>io.jsonwebtoken</groupId>
		<artifactId>jjwt</artifactId>
		<version>${jwt.version}</version>
	</dependency>

	<!-- Jaxb -->
	<dependency>
		<groupId>javax.xml.bind</groupId>
		<artifactId>jaxb-api</artifactId>
	</dependency>

	<!-- Swagger3依赖 -->
	<dependency>
		<groupId>io.springfox</groupId>
		<artifactId>springfox-boot-starter</artifactId>
		<version>${swagger.version}</version>
		<exclusions>
			<exclusion>
				<groupId>io.swagger</groupId>
				<artifactId>swagger-models</artifactId>
			</exclusion>
		</exclusions>
	</dependency>

	<!-- 防止进入swagger页面报类型转换错误，排除3.0.0中的引用，手动增加1.6.2版本 -->
	<dependency>
		<groupId>io.swagger</groupId>
		<artifactId>swagger-models</artifactId>
		<version>1.6.2</version>
	</dependency>

	<!-- 获取系统信息 -->
	<dependency>
		<groupId>com.github.oshi</groupId>
		<artifactId>oshi-core</artifactId>
		<version>${oshi.version}</version>
	</dependency>

	<!-- excel工具 -->
	<dependency>
		<groupId>org.apache.poi</groupId>
		<artifactId>poi-ooxml</artifactId>
		<version>${poi.version}</version>
	</dependency>

	<!-- velocity代码生成使用模板 -->
	<dependency>
		<groupId>org.apache.velocity</groupId>
		<artifactId>velocity-engine-core</artifactId>
		<version>${velocity.version}</version>
	</dependency>

	<!-- collections工具类 -->
	<dependency>
		<groupId>commons-collections</groupId>
		<artifactId>commons-collections</artifactId>
		<version>${commons.collections.version}</version>
	</dependency>

	<!-- 定时任务 -->
	<dependency>
		<groupId>org.quartz-scheduler</groupId>
		<artifactId>quartz</artifactId>
		<exclusions>
			<exclusion>
				<groupId>com.mchange</groupId>
				<artifactId>c3p0</artifactId>
			</exclusion>
		</exclusions>
	</dependency>

	<!-- 验证码 -->
	<dependency>
		<groupId>com.github.penggle</groupId>
		<artifactId>kaptcha</artifactId>
		<version>${kaptcha.version}</version>
		<exclusions>
			<exclusion>
				<artifactId>javax.servlet-api</artifactId>
				<groupId>javax.servlet</groupId>
			</exclusion>
		</exclusions>
	</dependency>
</dependencies>
```
## 2. 修改 `application.yml/application.propeties` 文件
```yml
# 删除有关 Spring Cloud 的相关配置
cloud:
	nacos:
	  discovery:
		# 服务注册地址
		server-addr: 127.0.0.1:8848
	  config:
		# 配置中心地址
		server-addr: 127.0.0.1:8848
		# 配置文件格式
		file-extension: yml
		# 共享配置
		shared-configs: application.${spring.cloud.nacos.config.file-extension}
		group: ${spring.profiles.active}
		max-retry: 8
	sentinel:
	  # 取消控制台懒加载
	  eager: true
	  transport:
		# 控制台地址
		dashboard: 127.0.0.1:8718
# 修改后
# Tomcat 端口
server:
  port: 4001
# Spring 配置
spring:
  servlet:
    multipart:
      # 最大文件限制
      max-file-size: 100MB
      # 最大请求限制
      max-request-size: 100MB
  application:
    # 应用名称
    name: ruoyi-vuln-evaluate
  profiles:
    # 环境配置
    active: dev

  # kafka 消息队列
  kafka:
    # 服务器端口
    bootstrap-servers: 172.17.1.25:9092
    # 生产者
    producer:
       # 设置大于0的值，则客户端会将发送失败的记录重新发送
      retries: 3
      batch-size: 16384
      buffer-memory: 33554432
      acks: 1
      # 指定消息key和消息体的编解码方式
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
    consumer:
      group-id: CollectGroup
      enable-auto-commit: false
      auto-offset-reset: earliest
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
    listener:
      # 自定义变量
      vulnAnalysis:
        # 主题
        topics: test
        # 消费组
        groupId: CollectGroup
      # 当每一条记录被消费者监听器（ListenerConsumer）处理之后提交
      # RECORD
      # 当每一批poll()的数据被消费者监听器（ListenerConsumer）处理之后提交
      # BATCH
      # 当每一批poll()的数据被消费者监听器（ListenerConsumer）处理之后，距离上次提交时间大于TIME时提交
      # TIME
      # 当每一批poll()的数据被消费者监听器（ListenerConsumer）处理之后，被处理record数量大于等于COUNT时提交
      # COUNT
      # TIME |　COUNT　有一个条件满足时提交
      # COUNT_TIME
      # 当每一批poll()的数据被消费者监听器（ListenerConsumer）处理之后, 手动调用Acknowledgment.acknowledge()后提交
      # MANUAL
      # 手动调用Acknowledgment.acknowledge()后立即提交，一般使用这种
      # MANUAL_IMMEDIATE
      ack-mode: manual_immediate
      missing-topics-fatal: false

  # 数据库配置
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    druid:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://172.17.1.25:3306/ry-cloud?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
      username: root
      password: fengtai123

  # redis 配置
  redis:
    host: 172.17.1.25
    port: 6379
    timeout: 60000
    jedis:
      max-active: 8
      min-idle: 0
      max-idle: 8
      max-wait: -1
    password:
    database: 1

# Mybatis配置
mybatis-plus:
  # 搜索指定包别名
  typeAliasesPackage: com.ruoyi.**.domain
  # 配置mapper的扫描，找到所有的mapper.xml映射文件
  mapperLocations: classpath*:mapper/**/*Mapper.xml

# pagehelper配置
page:
  pageNum: 1
  pageSize: 10
```