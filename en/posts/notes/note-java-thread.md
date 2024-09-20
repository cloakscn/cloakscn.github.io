---
title: Thread-related
date: 2023-02-27 13:44:34
category:
   - Notes
tags: 
   - Operating System
   - Java
---
**Process:** An application running in memory. Each process has its own independent memory space, and a process can have multiple threads.

**Thread:** An execution task (control unit) in a process, responsible for the execution of the current program in the process. A process has at least one thread, and a process can run multiple threads, with multiple threads sharing data.

Unlike processes, multiple threads of the same type share the **heap** and **method area** resources of the process, but each thread has its own **program counter, virtual machine stack, and native method stack**, so the burden is much smaller when generating a thread or switching between threads. Because of this, threads are also called lightweight processes.

<!-- more -->

## Differences between Processes and Threads

**Fundamental difference:** A process is the basic unit of operating system resource allocation, while a thread is the basic unit of processor task scheduling and execution.

**Resource overhead:** Each process has its own code and data space (program context), and the switch between processes incurs significant overhead. Threads can be seen as lightweight processes, with threads of the same type sharing code and data space, and the switch between threads has minimal overhead.

**Inclusion relationship:** If there are multiple threads in a process, the execution is not a single line, but multiple lines (threads) working together. A thread is part of a process, so a thread is also called a lightweight process or lightweight process.

**Memory allocation:** Threads within the same process share the address space and resources of the process, while the address space and resources between processes are independent.

**Impact relationship:** After a process crashes, it will not affect other processes in a protected mode. However, if a thread crashes, the entire process will die. Therefore, multi-processes are more robust than multi-threads.

**Execution process:** Each independent process has an entry point, sequential execution sequence, and program exit. However, a thread cannot execute independently; it must exist in an application, with the application providing control over multiple threads. Both can be executed concurrently.

## Thread Lifecycle

1. **New State:** After creating a thread object using the **new** keyword and the **Thread** class or its subclass, the thread object is in the new state. It remains in this state until the program calls **start()** on this thread.
2. **Ready State:** After calling the start() method of the thread object, the thread enters the ready state. Threads in the ready state are in the ready queue, waiting for the Java virtual machine's thread scheduler to schedule them.
3. **Running State:** If a thread in the ready state acquires the **CPU** resource, it can execute **run()**, and the thread is in the running state. A thread in the running state is executing its task. The running state of the thread is complex; it can become **Blocked, Ready, and Dead** during the execution process.
4. **Blocked State:** If a thread executes methods like **sleep()** or **suspend()**, loses the occupied resource, and enters the blocked state. The thread can return to the ready state after the sleep time has passed, it regains device resources, or other blocking situations are resolved. Blocked states can be divided into three types:
   * *Waiting block:* A thread in the running state executes the **wait()** method, causing the thread to enter the waiting block state.
   * *Synchronized block:* The thread fails to acquire the synchronized lock (because the synchronized lock is occupied by other threads).
   * *Other block:* The thread enters the blocked state by calling the thread's **sleep()** or **join()** method when I/O requests are made.
5. **Dead State:**

## How Java Uses Threads

Java provides three ways to create threads:

* By implementing the Runnable interface.
* By extending the Thread class itself.
* By using Callable and Future to create threads.

### Implementing the Runnable Interface

#### **📄RunnableDemo.java**

```java
class RunnableDemo implements Runnable {
   private Thread t;
   private String threadName;
   
   RunnableDemo(String name) {
      threadName = name;
      System.out.println("Creating " +  threadName );
   }
   
   // Override the run method
   public void run() {
      System.out.println("Running " +  threadName );
      try {
         for(int i = 4; i > 0; i--) {
            System.out.println("Thread: " + threadName + ", " + i);
            // Let the thread sleep for a while
            Thread.sleep(50);
         }
      } catch (InterruptedException e) {
         System.out.println("Thread " +  threadName + " interrupted.");
      }
      System.out.println("Thread " +  threadName + " exiting.");
   }
   
   public void start () {
      System.out.println("Starting " +  threadName );
      if (t == null) {
         t = new Thread (this, threadName);
         t.start ();
      }
   }
}
 
public class TestThread {
 
   public static void main(String args[]) {
      RunnableDemo R1 = new RunnableDemo( "Thread-1");
      R1.start();
  
      RunnableDemo R2 = new RunnableDemo( "Thread-2");
      R2.start();
   }   
}
```

```shell
Creating Thread-1
Starting Thread-1
Creating Thread-2
Starting Thread-2
Running Thread-1
Thread: Thread-1, 4
Running Thread-2
Thread: Thread-2, 4
Thread: Thread-1, 3
Thread: Thread-2, 3
Thread: Thread-1, 2
Thread: Thread-2, 2
Thread: Thread-1, 1
Thread: Thread-2, 1
Thread Thread-1 exiting.
Thread Thread-2 exiting.
```

### Extending the Thread Class

The extending class must override the run() method, which is the entry point for the new thread. It must also call start() to execute.

#### **📄ThreadDemo.java**

```java
class ThreadDemo extends Thread {
   private Thread t;
   private String threadName;
   
   ThreadDemo( String name) {
      threadName = name;
      System.out.println("Creating " +  threadName );
   }
   
   public void run() {
      System.out.println("Running " +  threadName );
      try {
         for(int i = 4; i > 0; i--) {
            System.out.println("Thread: " + threadName + ", " + i);
            // Let the thread sleep for a while
            Thread.sleep(50);
         }
      } catch (InterruptedException e) {
         System.out.println("Thread " +  threadName + " interrupted.");
      }
      System.out.println("Thread " +  threadName + " exiting.");
   }
   
   public void start () {
      System.out.println("Starting " +  threadName );
      if (t == null) {
         t = new Thread (this, threadName);
         t.start ();
      }
   }
}
 
public class TestThread {
 
   public static void main(String args[]) {
      ThreadDemo T1 =

 new ThreadDemo( "Thread-1");
      T1.start();
  
      ThreadDemo T2 = new ThreadDemo( "Thread-2");
      T2.start();
   }   
}
```

```shell
Creating Thread-1
Starting Thread-1
Creating Thread-2
Starting Thread-2
Running Thread-1
Thread: Thread-1, 4
Running Thread-2
Thread: Thread-2, 4
Thread: Thread-1, 3
Thread: Thread-2, 3
Thread: Thread-1, 2
Thread: Thread-2, 2
Thread: Thread-1, 1
Thread: Thread-2, 1
Thread Thread-1 exiting.
Thread Thread-2 exiting.
```

The Thread class also provides some important methods to help with specific business logic:

| Serial | Method Description | Serial | Method Description |
| :----: | ------------------ | :----: | ------------------ |
| 1    |  public void start()<br>Starts the execution of this thread; the Java virtual machine calls the thread's run method.        | 9    |    public static void yield()<br>Causes the currently executing thread object to temporarily pause and allows other threads to execute.      |
| 2    |     public void run()<br>If this thread is constructed using a separate Runnable run object, then that Runnable object's run method is called; otherwise, this method does nothing and returns.     | 10   |    public static void sleep(long millisec)<br>Causes the currently executing thread to sleep (temporarily cease execution) for the specified number of milliseconds.      |
| 3    |    public final void setName(String name)<br>Changes the name of this thread to be equal to the argument name.      | 11   |public static boolean holdsLock(Object x)<br>Returns true if and only if the current thread holds the monitor lock on the specified object.          |
| 4    |   public final void setPriority(int priority)<br>Changes the priority of this thread.       | 12   | public static Thread currentThread()<br>Returns a reference to the currently executing thread object.         |
| 5    |  public final void setDaemon(boolean on)<br>Marks this thread as either a daemon thread or a user thread.        | 13   |   public static void dumpStack()<br>Dumps the stack trace of the current thread to the standard error stream.       |
| 6    |  public final void join(long millisec)<br>Waits at most millis milliseconds for this thread to die.        | 14   |          |
| 7    |    public void interrupt()<br>Interrupts this thread.      | 15   |          |
| 8    |    public final boolean isAlive()<br>Tests if this thread is alive.      | 16   |          |

#### **📄DisplayMessage.java**

```java
// File name: DisplayMessage.java
// Creating a thread by implementing the Runnable interface
public class DisplayMessage implements Runnable {
   private String message;
   
   public DisplayMessage(String message) {
      this.message = message;
   }
   
   public void run() {
      while(true) {
         System.out.println(message);
      }
   }
}
```

#### **📄GuessANumber.java**

```java
// File name: GuessANumber.java
// Creating a thread by extending the Thread class
 
public class GuessANumber extends Thread {
   private int number;
   public GuessANumber(int number) {
      this.number = number;
   }
   
   public void run() {
      int counter = 0;
      int guess = 0;
      do {
         guess = (int) (Math.random() * 100 + 1);
         System.out.println(this.getName() + " guesses " + guess);
         counter++;
      } while(guess != number);
      System.out.println("** Correct!" + this.getName() + "in" + counter + "guesses.**");
   }
}
```

#### **📄ThreadClassDemo.java**

```java
// File name: ThreadClassDemo.java
public class ThreadClassDemo {
 
   public static void main(String [] args) {
      Runnable hello = new DisplayMessage("Hello");
      Thread thread1 = new Thread(hello);
      thread1.setDaemon(true);
      thread1.setName("hello");
      System.out.println("Starting hello thread...");
      thread1.start();
      
      Runnable bye = new DisplayMessage("Goodbye");
      Thread thread2 = new Thread(bye);
      thread2.setPriority(Thread.MIN_PRIORITY);
      thread2.setDaemon(true);
      System.out.println("Starting goodbye thread...");
      thread2.start();
 
      System.out.println("Starting thread3...");
      Thread thread3 = new GuessANumber(27);
      thread3.start();
      try {
         thread3.join();
      } catch(InterruptedException e) {
         System.out.println("Thread interrupted.");
      }
      System.out.println("Starting thread4...");
      Thread thread4 = new GuessANumber(75);
      
      thread4.start();
      System.out.println("main() is ending...");
   }
}
```

```shell
Starting hello thread...
Starting goodbye thread...
Hello
Hello
Hello
Hello
Hello
Hello
Goodbye
Good

bye
Goodbye
Goodbye
Goodbye
.......
```

### Creating Threads Using Callable and Future

1. Create a class that implements the Callable interface and implements the call() method. This call() method will serve as the thread execution body and will have a return value.
2. Create an instance of the class that implements Callable, use the FutureTask class to wrap the Callable object, and the FutureTask object encapsulates the return value of the call() method.
3. Use the FutureTask object as the target to create and start a new thread.
4. Call the get() method of the FutureTask object to obtain the return value after the child thread execution is complete.

#### 📄CallableThreadTest.java

```java
public class CallableThreadTest implements Callable<Integer> {
    public static void main(String[] args)  
    {  
        CallableThreadTest ctt = new CallableThreadTest();  
        FutureTask<Integer> ft = new FutureTask<>(ctt);  
        for(int i = 0;i < 100;i++)  
        {  
            System.out.println(Thread.currentThread().getName()+" loop variable i's value"+i);  
            if(i==20)  
            {  
                new Thread(ft,"Thread with return value").start();  
            }  
        }  
        try  
        {  
            System.out.println("Sub-thread's return value："+ft.get());  
        } catch (InterruptedException e)  
        {  
            e.printStackTrace();  
        } catch (ExecutionException e)  
        {  
            e.printStackTrace();  
        }  
  
    }
    @Override  
    public Integer call() throws Exception  
    {  
        int i = 0;  
        for(;i<100;i++)  
        {  
            System.out.println(Thread.currentThread().getName()+" "+i);  
        }  
        return i;  
    }  
}
```

### Comparison of Three Ways to Create Threads

1. When creating multiple threads by implementing the Runnable or Callable interface, the thread class only implements the Runnable or Callable interface and can also inherit other classes.

2. When using the Thread class to create multiple threads by extending it, the writing is simple. If you need to access the current thread, you don't need to use the Thread.currentThread() method, just use this to get the current thread.

## Key Concepts in Threads

In multithreaded programming, you need to understand the following key concepts:

* Thread synchronization
* Inter-thread communication
* Thread deadlock
* Thread control: suspend, stop, and resume

## About ThreadLocal

ThreadLocal is called a thread-local variable, which creates a copy of a variable for each thread, achieving data isolation.

Commonly used for data isolation between threads; for transaction operations, used to store thread transaction information; for database connections; for session management.

### How to Use

```java
public class ThreadLocalTest {

    public static void main(String[] args) {

        // ThreadLocal variable
        ThreadLocal<String> local = new ThreadLocal<>();

        // Using the Stream stream to create threads
        IntStream.range(0, 10).forEach(i -> new Thread(() -> {
            local.set(Thread.currentThread().getName() + ":" + i);
            System.out.println("Thread: " + Thread.currentThread().getName() + ", local: " + local.get());
        }).start());
    }
}
```

```
Thread: Thread-0, local: Thread-0:0
Thread: Thread-1, local: Thread-1:1
Thread: Thread-2, local: Thread-2:2
Thread: Thread-3, local: Thread-3:3
Thread: Thread-4, local: Thread-4:4
Thread: Thread-5, local: Thread-5:5
Thread: Thread-6, local: Thread-6:6
Thread: Thread-7, local: Thread-7:7
Thread: Thread-8, local: Thread-8:8
Thread: Thread-9, local: Thread-9:9
```
