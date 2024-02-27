---
title: Java Log Date Formatting
date: 2023-01-03 09:27:16
tags: Java
---

Formatting date representation involves converting a date/time format to a pre-defined date/time format. For example, converting the date "Fri May 18 15:46:24 CST 2016" to the format "2016-5-18 15:46:24 Friday".

In Java, you can use the `DateFormat` class and the `SimpleDateFormat` class to format dates. The usage of these two classes for formatting dates is detailed below.
<!-- more -->

## DateFormat Class

**`DateFormat` is an abstract class for subclasses that format and parse dates or time in a language-independent manner.** Subclasses of date/time formatting (such as SimpleDateFormat) allow formatting (i.e., date → text), parsing (text → date), and normalization of dates.

When creating a `DateFormat` object, the `new` keyword should not be used. Instead, you should use the static methods in the `DateFormat` class, such as `getDateInstance()`. The example code is as follows:

```Java
DateFormat df = DateFormat.getDateInstance();
```

After creating a `DateFormat` object, you can call methods on that object to format dates/times. Commonly used methods in the `DateFormat` class are shown in the table below.

| Method | Description |
| - | - |
| String format(Date date) | Formats the Date into a date/time string |
| Date parse(String source) | Parses the given string into a date/time |
|  |  |
| Calendar getCalendar() | Gets the calendar associated with this date/time format |
| void setCalendar(Calendar newCalendar) | Sets the calendar for this format |
|  |  |
| static DateFormat getDateInstance() | Gets the **date format** with `default formatting style` and `default locale` |
| static DateFormat getDateInstance(int style) | Gets the **date format** with `specified formatting style` and `default locale` |
| static DateFormat getDateInstance(int style, Locale locale) | Gets the **date format** with `specified formatting style` and `specified locale` |
|  |  |
| static DateFormat getDateTimeInstance() | Gets the **date/time format** with `default formatting style` and `default locale` |
| static DateFormat getDateTimeInstance(int dateStyle, int timeStyle) | Gets the **date/time format** with `specified date/time formatting style` and `default locale` |
| static DateFormat getDateTimeInstance(int dateStyle, int timeStyle, Locale locale) | Gets the **date/time format** with `specified date/time formatting style` and `specified locale` |
|  |  |
| static DateFormat getTimeInstance() | Gets the **time format** with `default formatting style` and `default locale` |
| static DateFormat getTimeInstance(int style) | Gets the **time format** with `specified formatting style` and `default locale` |
| static DateFormat getTimeInstance(int style, Locale locale) | Gets the **time format** with `specified formatting style` and `specified locale` |

Formatting styles are primarily set using `DateFormat` constants. Different constants can be passed into the methods shown in the table to control the length of the result.

Here is an example of using the `DateFormat` class to format dates/times:

```Java
// Get dates with different formatting styles and the Chinese locale
DateFormat df1 = DateFormat.getDateInstance(DateFormat.SHORT, Locale.CHINA);
DateFormat df2 = DateFormat.getDateInstance(DateFormat.FULL, Locale.CHINA);
DateFormat df3 = DateFormat.getDateInstance(DateFormat.MEDIUM, Locale.CHINA);
DateFormat df4 = DateFormat.getDateInstance(DateFormat.LONG, Locale.CHINA);

// Get times with different formatting styles and the Chinese locale
DateFormat df5 = DateFormat.getTimeInstance(DateFormat.SHORT, Locale.CHINA);
DateFormat df6 = DateFormat.getTimeInstance(DateFormat.FULL, Locale.CHINA);
DateFormat df7 = DateFormat.getTimeInstance(DateFormat.MEDIUM, Locale.CHINA);
DateFormat df8 = DateFormat.getTimeInstance(DateFormat.LONG, Locale.CHINA);

// Format dates with different formatting styles into date strings
String date1 = df1.format(new Date());
String date2 = df2.format(new Date());
String date3 = df3.format(new Date());
String date4 = df4.format(new Date());

// Format times with different formatting styles into time strings
String time1 = df5.format(new Date());
String time2 = df6.format(new Date());
String time3 = df7.format(new Date());
String time4 = df8.format(new Date());

// Output dates
System.out.println("SHORT: " + date1 + " " + time1);
System.out.println("FULL: " + date2 + " " + time2);
System.out.println("MEDIUM: " + date3 + " " + time3);
System.out.println("LONG: " + date4 + " " + time4);
```

When you run this code, the output will be like the following:

```Java
SHORT: 18-10-15 9:30 AM
FULL: 2018年10月15日 星期一 上午09时30分43秒 CST
MEDIUM: 2018-10-15 9:30:43
LONG: 2018年10月15日 上午09时30分43秒
```

## SimpleDateFormat Class

If using the `DateFormat` class to format dates/times doesn't meet your requirements, you need to use a subclass of `DateFormat` called `SimpleDateFormat`.

`SimpleDateFormat` is a concrete class for formatting and parsing dates in a locale-sensitive manner. It allows the formatting (date → text), parsing (text → date), and normalization of dates using a user-defined pattern.

`SimpleDateFormat` class has three main constructors:

* `SimpleDateFormat()`: Constructs a `SimpleDateFormat` using the default pattern and default locale.
* `SimpleDateFormat(String pattern)`: Constructs a `SimpleDateFormat` using the specified pattern and default locale.
* `SimpleDateFormat(String pattern, Locale locale)`: Constructs a `SimpleDateFormat` using the specified pattern and specified locale.

Commonly used letters and their meanings for custom date format patterns in `SimpleDateFormat` are listed in the table below.

| Letter | Meaning | Example |
| - | - | - |
| y | Year. Typically used as yy for two-digit years, yyyy for four-digit years | yy for the year 11;<br/>yyyy for the year 2011 |
| M | Month. Typically used as MM for the month. If used as MMM, it displays the month name based on the locale | MM for the month 05;<br/>MMM for the month (in Locale.CHINA) as "十月";<br/>(in Locale.US) as "Oct" |
| d | Day in month. Typically used as dd for the day | dd for the day 10 |
| D | Day in year. Represents the day of the year. Used as D | D for the day in the year 295 |
| E | Day of the week. Used as E. Displays the day of the week based on the locale | E for the day of the week (in Locale.CHINA) as "星期四";<br/>(in Locale.US) as "Thu" |
| H | Hour in day (0-23). Typically used as HH for the hour

 | HH for the hour 18 |
| h | Hour in am/pm (1-12). Typically used as hh for the hour | hh for the hour 10 (note that 10 might be 10 AM or 10 PM) |
| m | Minute. Typically used as mm for the minute | mm for the minute 29 |
| s | Second. Typically used as ss for the second | ss for the second 38 |
| S | Millisecond. Typically used as SSS for the millisecond | SSS for the millisecond 156 |

Below is an example Java program that uses the `SimpleDateFormat` class to format the current date and print it with the format "yyyy 年 MM 月 dd 日 EEEE HH 点 mm 分 ss 秒".

```Java
import java.text.SimpleDateFormat;
import java.util.Date;

public class Test13 {
    public static void main(String[] args) {
        Date now = new Date(); // Create a Date object to get the current time
        // Specify the formatting pattern
        SimpleDateFormat f = new SimpleDateFormat("yyyy 年 MM 月 dd 日 EEEE HH 点 mm 分 ss 秒");
        System.out.println(f.format(now)); // Format the current time according to the specified pattern
    }
}
```

The output of this program will be:

```Java
今天是 2018 年 10 月 15 日 星期一 09 点 26 分 23 秒
```

## Note

### About the Thread Safety of SimpleDateFormat

1. **Using a Local Variable**

The simplest way is to define the `SimpleDateFormat` object as a local variable. In the example code, `SimpleDateFormat` object is defined above the `parse(String)` method, solving the problem.

```Java
private static void newSimpleDate() {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    ThreadPoolExecutor poolExecutor = new ThreadPoolExecutor(10, 100, 1, TimeUnit.MINUTES, new LinkedBlockingQueue<>(1000));
    while (true) {
        poolExecutor.execute(new Runnable() {
            @Override
            public void run() {
                String dateString = simpleDateFormat.format(new Date());
                try {
                    Date parseDate = simpleDateFormat.parse(dateString);
                    String dateString2 = simpleDateFormat.format(parseDate);
                    if (!dateString.equals(dateString2)) {
                        System.out.println(dateString.equals(dateString2));
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
```

The result of running this program will be:

```java
false
false
false
false
false
false
false
```

This indicates there is a thread safety issue.

2. **Creating a New `SimpleDateFormat` Object Each Time**

Create a new `SimpleDateFormat` object each time.

```Java
private static void oneSimpleDate() {
    ThreadPoolExecutor poolExecutor = new ThreadPoolExecutor(10, 100, 1, TimeUnit.MINUTES, new LinkedBlockingQueue<>(1000));
    while (true) {
        poolExecutor.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    date2String(new Date(), "yyyy-MM-dd HH:mm:ss");
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}

public static void date2String(Date date, String pattern) throws ParseException {
    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

    String dateString = new SimpleDateFormat(pattern).format(date);
    Date parseDate = simpleDateFormat.parse(dateString);
    String dateString2 = simpleDateFormat.format(parseDate);
    System.out.println(dateString.equals(dateString2));
}
```

The result of running this program will be:

```java
true
true
true
true
true
true
true
```

This indicates there is no thread safety issue.

In simple terms, `SimpleDateFormat` is not thread-safe. However, it does not mean it cannot be used safely in a multi-threaded environment. When used as a local variable, creating a new instance each time, or using synchronization, or adopting `DateTimeFormatter`, it can avoid the problem.

#### Resolving the Thread Safety Issue of `SimpleDateFormat`

* **Local Variable Approach**

Define the `SimpleDateFormat` object as a local variable. The following code shows how to solve the problem using this approach.

```java
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;

public class SimpleDateFormatTest02 {
    // Total number of executions
    private static final int EXECUTE_COUNT = 1000;
    // Number of threads running simultaneously
    private static final int THREAD_COUNT = 20;

    public static void main(String[] args) throws InterruptedException {
        final Semaphore semaphore = new Semaphore(THREAD_COUNT);
        final CountDownLatch countDownLatch = new CountDownLatch(EXECUTE_COUNT);
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < EXECUTE_COUNT; i++) {
            executorService.execute(() -> {
                try {
                    semaphore.acquire();
                    try {
                        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                        simpleDateFormat.parse("2020-01-01");
                    } catch (ParseException e) {
                        System.out.println("Thread: " + Thread.currentThread().getName() + " Failed to format the date");
                        e.printStackTrace();
                        System.exit(1);
                    } catch (NumberFormatException e) {
                        System.out.println("Thread: " + Thread.currentThread().getName() + " Failed to format the date");
                        e.printStackTrace();
                        System.exit(1);
                    }
                    semaphore.release();
                } catch (InterruptedException e) {
                    System.out.println("Semaphore error");
                    e.printStackTrace();
                    System.exit(1);
                }
                countDownLatch.countDown();
            });
        }
        countDownLatch.await();
        executorService.shutdown();
        System.out.println("All threads formatted the date successfully");
    }
}
```

* **Synchronized Lock Approach**

Define the `SimpleDateFormat` object as a global static variable. All threads share the `SimpleDateFormat` object. When calling the `format` method, synchronize on the `SimpleDateFormat` object.

```java
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;

public class SimpleDateFormatTest03 {
    // Total number of executions
    private static final int EXECUTE_COUNT = 1000;
    // Number of threads running simultaneously
    private static final int THREAD_COUNT = 20;
    // SimpleDateFormat object
    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

    public static void main(String[] args) throws InterruptedException {
        final Semaphore semaphore = new Semaphore(THREAD_COUNT);
        final CountDownLatch countDownLatch = new CountDownLatch(EXECUTE_COUNT);
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < EXECUTE_COUNT; i++) {
            executorService.execute(() -> {
                try {
                    semaphore.acquire();
                    try {
                        synchronized (simpleDateFormat) {
                            simpleDateFormat.parse("2020-01-01");
                        }
                    } catch (ParseException e) {
                        System.out.println("Thread: " + Thread.currentThread().getName() + " Failed

 to format the date");
                        e.printStackTrace();
                        System.exit(1);
                    } catch (NumberFormatException e) {
                        System.out.println("Thread: " + Thread.currentThread().getName() + " Failed to format the date");
                        e.printStackTrace();
                        System.exit(1);
                    }
                    semaphore.release();
                } catch (InterruptedException e) {
                    System.out.println("Semaphore error");
                    e.printStackTrace();
                    System.exit(1);
                }
                countDownLatch.countDown();
            });
        }
        countDownLatch.await();
        executorService.shutdown();
        System.out.println("All threads formatted the date successfully");
    }
}
```

In the examples above, the `SimpleDateFormat` object is either a local variable or a global static variable with synchronization. Both approaches can resolve the thread safety issue of `SimpleDateFormat`.

The key code to solve the problem is as follows:

```java
synchronized (simpleDateFormat){
    simpleDateFormat.parse("2020-01-01");
}
```

It is important to note that while this approach can address the thread safety issue of the `SimpleDateFormat` class, it introduces a synchronization lock. As a result, only one thread can execute the `parse(String)` method at a given time. This can impact the performance of the program.

* **Using Lock**

The Lock mechanism is similar to the synchronized approach. Both rely on the JVM's lock mechanism to ensure thread safety in high-concurrency scenarios. The code to address the issue using Lock is as follows:

```java
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class SimpleDateFormatTest04 {
    // Total number of executions
    private static final int EXECUTE_COUNT = 1000;
    // Number of threads running simultaneously
    private static final int THREAD_COUNT = 20;
    // SimpleDateFormat object
    private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    // Lock object
    private static Lock lock = new ReentrantLock();

    public static void main(String[] args) throws InterruptedException {
        final Semaphore semaphore = new Semaphore(THREAD_COUNT);
        final CountDownLatch countDownLatch = new CountDownLatch(EXECUTE_COUNT);
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < EXECUTE_COUNT; i++) {
            executorService.execute(() -> {
                try {
                    semaphore.acquire();
                    try {
                        lock.lock();
                        simpleDateFormat.parse("2020-01-01");
                    } catch (ParseException e) {
                        System.out.println("Thread: " + Thread.currentThread().getName() + " Failed to format the date");
                        e.printStackTrace();
                        System.exit(1);
                    } catch (NumberFormatException e) {
                        System.out.println("Thread: " + Thread.currentThread().getName() + " Failed to format the date");
                        e.printStackTrace();
                        System.exit(1);
                    } finally {
                        lock.unlock();
                    }
                    semaphore.release();
                } catch (InterruptedException e) {
                    System.out.println("Semaphore error");
                    e.printStackTrace();
                    System.exit(1);
                }
                countDownLatch.countDown();
            });
        }
        countDownLatch.await();
        executorService.shutdown();
        System.out.println("All threads formatted the date successfully");
    }
}
```

In this code, a `ReentrantLock` is used to synchronize access to the `SimpleDateFormat` object.

* **ThreadLocal Approach**

This approach involves storing each thread's copy of the `SimpleDateFormat` object using `ThreadLocal`, effectively avoiding interference between threads. The code to resolve the thread safety issue using `ThreadLocal` is as follows:

```java
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;

public class SimpleDateFormatTest05 {
    // Total number of executions
    private static final int EXECUTE_COUNT = 1000;
    // Number of threads running simultaneously
    private static final int THREAD_COUNT = 20;

    private static ThreadLocal<DateFormat> threadLocal = new ThreadLocal<DateFormat>() {
        @Override
        protected DateFormat initialValue() {
            return new SimpleDateFormat("yyyy-MM-dd");
        }
    };

    public static void main(String[] args) throws InterruptedException {
        final Semaphore semaphore = new Semaphore(THREAD_COUNT);
        final CountDownLatch countDownLatch = new CountDownLatch(EXECUTE_COUNT);
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < EXECUTE_COUNT; i++) {
            executorService.execute(() -> {
                try {
                    semaphore.acquire();
                    try {
                        threadLocal.get().parse("2020-01-01");
                    } catch (ParseException e) {
                        System.out.println("Thread: " + Thread.currentThread().getName() + " Failed to format the date");
                        e.printStackTrace();
                        System.exit(1);
                    } catch (NumberFormatException e) {
                        System.out.println("Thread: " + Thread.currentThread().getName() + " Failed to format the date");
                        e.printStackTrace();
                        System.exit(1);
                    }
                    semaphore.release();
                } catch (InterruptedException e) {
                    System.out.println("Semaphore error");
                    e.printStackTrace();
                    System.exit(1);
                }
                countDownLatch.countDown();
            });
        }
        countDownLatch.await();
        executorService.shutdown();
        System.out.println("All threads formatted the date successfully");
    }
}
```

In this code, each thread uses its own `SimpleDateFormat` object stored in a `ThreadLocal` variable.

* **DateTimeFormatter Approach**

The `DateTimeFormatter` class, introduced in Java 8, is inherently thread-safe. It can be used directly in high-concurrency scenarios. The code to address the issue using `DateTimeFormatter` is as follows:

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;

public class SimpleDateFormatTest07 {
    // Total number of executions
    private static final int EXECUTE_COUNT = 1000;
    // Number of threads running simultaneously
    private static final int THREAD_COUNT = 20;

   private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static void main(String[] args) throws InterruptedException {
        final Semaphore semaphore = new Semaphore(THREAD_COUNT);
        final CountDownLatch countDownLatch = new CountDownLatch(EXECUTE_COUNT);
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < EXECUTE_COUNT; i++) {
            executorService.execute(() -> {
                try {
                    semaphore.acquire();
                    try {
                        LocalDate.parse("2020-01-01", formatter);
                    } catch (Exception e) {
                        System.out.println("Thread: " + Thread.currentThread().getName() + " Failed to format the date");
                        e.printStackTrace();
                        System.exit(1);
                    }
                    semaphore.release();
                } catch (InterruptedException e) {
                    System.out.println("Semaphore error");
                    e.printStackTrace();
                    System.exit(1);
                }
                countDownLatch.countDown();
            });
        }
        countDownLatch.await();
        executorService.shutdown();
        System.out.println("All threads formatted the date successfully");
    }
}
```

In this code, the `DateTimeFormatter` object is used to parse dates in a thread-safe manner.

In summary, among the solutions to address the thread safety issue of the `SimpleDateFormat` class:

1. **Local Variable Approach:** Not recommended for high-concurrency production environments due to potential performance issues.
2. **Synchronized/Lock Approach:** Can resolve the issue but may introduce performance overhead.
3. **ThreadLocal Approach:** Effective and recommended for high-concurrency production environments.
4. **DateTimeFormatter Approach:** Provides a thread-safe solution with good performance.

The choice of the best solution depends on the specific requirements and characteristics of the application.