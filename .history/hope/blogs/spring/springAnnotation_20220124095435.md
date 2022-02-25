# 注解开发

## 注解驱动的意义

### 什么是注解驱动

注解启动时使用注解的形式替代 xml 配置，将繁杂的 spring 配置文件从工程中彻底消除掉，简化书写

### 注解驱动的弊端

* 为了达成注解驱动的目的，可能会将原先很简单的书写，变的更加复杂

* XML中配置第三方开发的资源是很方便的，但使用注解驱动无法在第三方开发的资源中进行编辑，因此会增大开发工作量

## 常用注解

### 启动注解功能

* 启动注解扫描，加载类中配置的注解项

  ```xml
  <context:component-scan base-package="packageName"/>
  ```

* 说明：

  * 在进行包所扫描时，会对配置的包及其子包中所有文件进行扫描

  * 扫描过程是以文件夹递归迭代的形式进行的

  * 扫描过程仅读取合法的 java 文件

  * 扫描时仅读取 spring 可识别的注解

  * 扫描结束后会将可识别的有效注解转化为 spring 对应的资源加入 IoC 容器

* 注意：

  * 无论是注解格式还是 XML 配置格式，最终都是将资源加载到 IoC 容器中，差别仅仅是数据读取方式不同

  * 从加载效率上来说注解优于 XML 配置文件

### bean的定义

* 名称：@Component    @Controller    @Service    @Repository

* 类型：**类注解**

* 位置：类定义上方

* 作用：设置该类为 spring 管理的 bean

* 范例：

  ```java
  @Component
  public class ClassName{}
  ```

* 说明：

  * @Controller、@Service 、@Repository是 @Component 的衍生注解，功能同 @Component

* 相关属性
  * value（默认）：定义 bean 的访问 id

### bean的作用域

* 名称：@Scope

* 类型：**类注解**

* 位置：类定义上方

* 作用：设置该类作为 bean 对应的 scope 属性

* 范例：

  ```java
  @Scope
  public class ClassName{}
  ```

* 相关属性

  * value（默认）：定义 bean 的作用域，默认为 singleton

### bean的生命周期

* 名称：@PostConstruct、@PreDestroy

* 类型：**方法注解**

* 位置：方法定义上方

* 作用：设置该类作为 bean 对应的生命周期方法

* 范例：

  ```java
  @PostConstruct
  public void init() { System.out.println("init..."); }
  ```

### 加载第三方资源

* 名称：@Bean

* 类型：**方法注解**

* 位置：方法定义上方

* 作用：设置该方法的返回值作为 spring 管理的 bean

* 范例：

  ```java
  @Bean("dataSource")
  public DruidDataSource createDataSource() {    return ……;    }
  ```

* 说明：

  * 因为第三方 bean 无法在其源码上进行修改，使用 @Bean 解决第三方 bean 的引入问题

  * 该注解用于替代 XML 配置中的静态工厂与实例工厂创建 bean，不区分方法是否为静态或非静态

  * @Bean 所在的类必须被 spring 扫描加载，否则该注解无法生效

* 相关属性
  * value（默认）：定义 bean 的访问 id

### bean 的非引用类型属性注入

* 名称：@Value

* 类型：**属性注解、方法注解**

* 位置：属性定义上方，方法定义上方

* 作用：设置对应属性的值或对方法进行传参

* 范例：

  ```java
  @Value("${jdbc.username}")
  private String username;
  ```

* 说明：

  * value 值仅支持非引用类型数据，赋值时对方法的所有参数全部赋值

  * value 值支持读取 properties 文件中的属性值，通过类属性将 properties 中数据传入类中

  * value 值支持SpEL

  * @value 注解如果添加在属性上方，可以省略 set 方法（set方法的目的是为属性赋值）

* 相关属性
  * value（默认）：定义对应的属性值或参数值

### bean的引用类型属性注入

* 名称：@Autowired、@Qualifier

* 类型：**属性注解、方法注解**

* 位置：属性定义上方，方法定义上方

* 作用：设置对应属性的对象或对方法进行引用类型传参

* 范例：

  ```java
  @Autowired(required = false)
  @Qualifier("userDao")
  private UserDao userDao;
  ```

* 说明：

  * @Autowired默认按类型装配，指定@Qualifier后可以指定自动装配的bean的id

* 相关属性
  * required：定义该属性是否允许为null

### bean的引用类型属性注入

* 名称：@Primary

* 类型：**类注解**

* 位置：类定义上方

* 作用：设置类对应的bean按类型装配时优先装配

* 范例：

  ```java
  @Primary
  public class ClassName{}
  ```

* 说明：

  * @Autowired默认按类型装配，当出现相同类型的bean，使用@Primary提高按类型自动装配的优先级，多个@Primary会导致优先级设置无效

### bean的引用类型属性注入

* 名称：@Inject、@Named、@Resource

* 说明：
  * @Inject与@Named是JSR330规范中的注解，功能与@Autowired和@Qualifier完全相同，适用于不同架构场景
  * @Resource是JSR250规范中的注解，可以简化书写格式

* @Resource相关属性

  * name：设置注入的bean的id

  * type：设置注入的bean的类型，接收的参数为Class类型

### 加载properties文件

* 名称：@PropertySource

* 类型：**类注解**

* 位置：类定义上方

* 作用：加载properties文件中的属性值

* 范例：

  ```java
  @PropertySource(value = "classpath:filename.properties")
  public class ClassName {
      @Value("${propertiesAttributeName}")
      private String attributeName;
  }
  ```

* 说明：

  * 不支持*通配格式，一旦加载，所有spring控制的bean中均可使用对应属性值

* 相关属性

  * value（默认）：设置加载的properties文件名

  * ignoreResourceNotFound：如果资源未找到，是否忽略，默认为false

### 纯注解格式

* 名称：@Configuration、@ComponentScan

* 类型：**类注解**

* 位置：类定义上方

* 作用：设置当前类为 spring 核心配置加载类

* 范例：

  ```java
  @Configuration
  @ComponentScan("scanPackageName")
  public class SpringConfigClassName{
  }
  ```

* 说明：

  * 核心配合类用于替换 spring 核心配置文件，此类可以设置空的，不设置变量与属性

  * bean扫描工作使用注解@ComponentScan替代

**AnnotationConfigApplicationContext**

* 加载纯注解格式上下文对象，需要使用 `AnnotationConfigApplicationContext`

  ```java
  AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
  ```

### 第三方bean配置与管理

* 名称：@Import

* 类型：**类注解**

* 位置：类定义上方

* 作用：导入第三方 bean 作为 spring 控制的资源

* 范例：

  ```java
  @Configuration
  @Import(OtherClassName.class)
  public class ClassName {
  }
  ```

* 说明：

  * @Import 注解在同一个类上，仅允许添加一次，如果需要导入多个，使用数组的形式进行设定

  * 在被导入的类中可以继续使用 @Import 导入其他资源（了解）

  * @Bean 所在的类可以使用导入的形式进入 spring 容器，无需声明为 bean

## bean加载控制

### 依赖加载

1. @DependsOn

* 名称：@DependsOn

* 类型：类注解、方法注解

* 位置：bean 定义的位置（类上或方法上）

* 作用：控制bean的加载顺序，使其在指定 bean 加载完毕后再加载

* 范例：

  ```java
  @DependsOn("beanId")
  public class ClassName {
  }
  ```

* 说明：

  * 配置在方法上，使 @DependsOn 指定的 bean 优先于 @Bean 配置的 bean 进行加载

  * 配置在类上，使 @DependsOn 指定的 bean 优先于当前类中所有 @Bean 配置的 bean 进行加载

  * 配置在类上，使 @DependsOn 指定的 bean 优先于 @Component 等配置的 bean 进行加载

* 相关属性

  * value（默认）：设置当前 bean 所依赖的 bean 的 id

2. @Order

* 名称：@Order

* 类型：**配置类注解**

* 位置：配置类定义的位置（类上）

* 作用：控制配置类的加载顺序

* 范例：

  ```java
  @Order(1)
  public class SpringConfigClassName {
  }
  ```

3. @Lazy

* 名称：@Lazy

* 类型：**类注解、方法注解**

* 位置：bean 定义的位置（类上或方法上）

* 作用：控制 bean 的加载时机，使其延迟加载

* 范例：

  ```java
  @Lazy
  public class ClassName {
  }
  ```

#### 依赖加载应用场景

@DependsOn

* 微信订阅号，发布消息和订阅消息的 bean 的加载顺序控制

* 双11活动期间，零点前是结算策略A，零点后是结算策略B，策略B操作的数据为促销数据。策略B加载顺序与促销数据的加载顺序

@Lazy

* 程序灾难出现后对应的应急预案处理是启动容器时加载时机

@Order

* 多个种类的配置出现后，优先加载系统级的，然后加载业务级的，避免细粒度的加载控制

### 整合第三方技术

#### 综合案例改版（注解整合MyBatis）

#### 注解整合MyBatis分析

* 业务类使用注解形式声明 bean，属性采用注解注入

* 建立独立的配置管理类，分类管理外部资源，根据功能进行分类，并提供对应的方法获取bean

* 使用注解形式启动bean扫描，加载所有注解配置的资源（bean）

* 使用AnnotationConfigApplicationContext对象加载所有的启动配置类，内部使用导入方式进行关联

#### 注解整合MyBatis步骤

1. 修改 mybatis 外部配置文件格式为注解格式

2. 业务类使用 @Component 声明 bean，使用 @Autowired 注入对象

3. 建立配置文件 JDBCConfig 与 MyBatisConfig 类，并将其导入到核心配置类 SpringConfig

4. 开启注解扫描

5. 使用 `AnnotationConfigApplicationContext` 对象加载配置项

#### 综合案例改版（注解整合Junit）

1. Spring 接管 Junit 的运行权，使用 Spring 专用的 Junit 类加载器

2. 为 Junit 测试用例设定对应的 spring 容器：

* 从 Spring5.0 以后，要求 Junit 的版本必须是 4.12 及以上

* Junit 仅用于单元测试，不能将 Junit 的测试类配置成 spring 的 bean，否则该配置将会被打包进入工程中

导入Spring整合Junit坐标

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.1.9.RELEASE</version>
</dependency>
```

Spring 整合 Junit 测试用例注解格式

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfig.class)
public class UserServiceTest {
}
```