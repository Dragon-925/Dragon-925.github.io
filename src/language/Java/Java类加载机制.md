---
icon: pen-to-square
date: 2019-11-20
category:
  - Java
  - JVM
tag:
  - 基础
  - JVM
---

# 《Java类加载机制》

## 一、类加载流程
[![pFFq0Nn.md.png](https://s11.ax1x.com/2024/01/16/pFFq0Nn.md.png)](https://imgse.com/i/pFFq0Nn)



当程序主动使用某个类时，如果该类还未被加载到内存中，则系统会通过**如下三步骤：**

### 第一步：类的加载

（将class文件读入内存，并为之创建一个Java.lang.Class对象。此过程由类加载器完成）

### 第二步：类的链接

（将类的二进制数据合并到jre中）

 - 验证：代码正确，是否安全
 - 准备：正式为类变量（static）分配内存并设置类变量默认初始值的阶段，这些内存都将在方法区中进行分配
 - 虚拟机常量池内的符号引用（常量名）替换为直接引用（地址）的过程，**也就是说虚拟机去直接找到我们的引用类型**

 ### 第三步：类的初始化

 （JVM负责对类进行初始化）

 - 执行类构造器*< clinit>()*方法的过程。类构造器*< clinit>()*方法是由编译期自动收集所有被***static***修饰的方法以及变量，合并产生的。（类构造器是构造类信息的，不是构造该类对象的构造器）。
 - 双亲委派机制
 - 虚拟机保证在多线程环境中被正确加锁和同步。

 

## 二、类加载器

### 1、类加载器的作用

​		将class文件字节码内容加载到内存中，并将这些静态数据转换成方法区的运行时数据结构，然后再堆中生成一个代表这个类的***java.lang.Class***对象，作为方法区中类数据的访问入口

### 2、类的缓存

​		标准的JavaSE类加载器可以按照要求查找类，但一旦类被加载到类加载器中，他将维持加载（缓存）一段时间，不过JVM垃圾回（gc）收机制可以回收这些Class对象

### 3、类加载器展示

类的加载是由类加载器完成的，类加载器分为两种。

+ Java虚拟机自带的类加载器

  - 启动类加载器
  - 扩展类加载器
  - 系统类加载器

+ 用户自定义类加载器

  - *Java.lang.ClassLoader*的子类实例

#### (1).根类加载器（引导类加载器）

  ​		根类加载器是最底层的类加载器，是虚拟机的一部分（JVM自带的类加载器），是由C++实现的，且没有父加载器，也没有继承*java.lang.ClassLoader*类。它主要负责Java平台核心库***rt.jar***（加载由系统属性"*sun.boot.class.path*"指定的路径下的核心类库，是由C++编写）（JAVA_HOME\jre\lib），出于安全考虑，根类加载器只加载Java、Javax、sun开头的类。

```java
public static void main(String[] args){
    ClassLoder loader = Object.class.getClassLoader();
    System.out.print(loader);
    //输出为：null
    //因为根类加载器是由C++编写，所以Java并不能读取到
}
```

#### (2).扩展类加载器

​		指原来SUN公司实现的*sun.misc.Launcher$ExtClassLoader*类（JDK9是*jdk.internal.loader.ClassLoaders\$​​​PlatformClassLoader*类），由Java语言编写，父加载器是根类加载器。负责加载<JAVA_HOME>\jre\lib\\==ext==目录下的类库或者系统变量"java.ext.dirs*"指定的目录下的类库。

#### (3).系统类加载器

​		也称为“应用类加载器”，也是纯Java类，是原来SUN公司实现的*snu.misc.Launcher$AppClassLoader*类(JDK9是*jdk.internal.loader.ClassLoaders\$AppClassLoader)*。他的父加载器是扩展类加载器。它负责从classpath环境变量或者系统属性java.class.path所指定的目录中加载类。他是用户自定义的类加载器的默认父加载器。一般情况下，该类加载器是程序中默认的类加载器，可以通过*ClassLoader.getSystemClassLoader()*直接获得。加载我们自己项目也是最常用的加载器。

#### (4)类加载器路径

```java
    public static void main(String[] args) {
        System.out.println(System.getProperty("java.class.path"));
    }
    /*
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\charsets.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\deploy.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\access-bridge-64.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\cldrdata.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\dnsns.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\jaccess.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\jfxrt.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\localedata.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\nashorn.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\sqljdbc4.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\sunec.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\sunjce_provider.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\sunmscapi.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\sunpkcs11.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\ext\zipfs.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\javaws.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\jce.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\jfr.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\jfxswt.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\jsse.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\management-agent.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\plugin.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\resources.jar;
    * Z:\Progrem Files\Java\jdk1.8.0_241\jre\lib\rt.jar;
    * Z:\JavaWorkSpace\idea\out\production\test01;
    * Z:\Progrem Files\idea\IntelliJ IDEA 2021.1\lib\idea_rt.jar
    */

```



#### (5).小结

​		在程序开发中，类的加载几乎是由上述3种类加载器相互配合执行的，同时我们可以自定义类加载器，需要注意的是，Java虚拟机对class文件采用的是按需加载的方式，也就是说当需要使用该类时，才会将它的class文件加载到内存生成class对象，而且加载某个类的class文件，Java虚拟机采用的时双亲委派机制，即把加载类的请求交给父加载器处理，如果父加载器处理不了，自己再处理，它是一种任务委派模式。

## 三、双亲委派机制

[![pFFqa7j.md.png](https://s11.ax1x.com/2024/01/16/pFFqa7j.md.png)](https://imgse.com/i/pFFqa7j)

​		除了根类加载器之外，其他类加载器都需要有自己的父类加载器，从*JDK1.2*开始，类的加载过程采用双亲委派机制，这种机制能够很好的保护*Java*程序的安全。除了虚拟机自带的根类加载器之外，其余的类加载器都有唯一的父类加载器。也就是说除了根类加载器之外，其他的加载器都会现委托自己的父类加载器去执行（如果不行，一直推到根类加载器），如果父类不行，再自己执行。真正加载类的加载器我们叫做**启动类加载器**

> 注意：双亲委派机制的父子关系并非面向对象程序设计中的继承关系，而是通过使用**组合模式**来复用父加载器代码

+ **使用双亲委派机制的好处**
  - 可以避免类的重复加载，当父类加载器已经加载了该类时，就没有必要子类ClassLoader再加载一次。
  - 考虑安全因素，Java核心API中定义类型不会被随意替换，假设通过网络传递一个名为“java.lang.Object”的类，通过双亲委派机制传递到启动类加载器，而启动类加载器在核心Java API发现这个名字的类，发现该类已经被加载，并不会重新加载网络传递过来的java.lang.Object，而直接返回已经加载过的Object.class，这样便可以防止核心API库被随意篡改。

## 四、ClassLoader

​		所有类加载器（除了跟类加载器）都必须继承java.lang.ClassLoader（是一个抽象类）。主要方法如下：

+ ### loadClass

  ​		在ClassLoader源码中，有一个方法loadClass(String name,boolean resolve)，这里就是双亲委派机制的代码实现。从源码中可以了解它的执行顺序。需要注意的是，只有父类加载器加载不到类的时候，会调用findClass方法进行类的查找，所以在定义自己的类加载器时，不能覆盖掉该方法，而应该覆盖掉findClass方法。

  > 使用指定二进制名称类加载类，此方法的默认实现将按以下顺序搜索类
  >
  > 1.调用***findLoadedClass(String)***检查是否已经加载类
  >
  > 2.在父类加载器上调用***loadClass***方法。如果父类加载器为null，则使用虚拟机的内置类加载器。
  >
  > 3.调用***findClass(String)***方法查找类。

  ​		==使用上述步骤找到类，并且***resolve***标志为真，则此方法将在得到的Class对象上调用***resolveClass(Class)***方法。鼓励用ClassLoader的子类重写***findClass(String)***，而不是使用此方法。==

  

+ ### findClass

  ​		在自定义类加载器时，一般我们需要覆盖这个方法，且ClassLoader中给出了一个默认的错误实现。

  ```java
  protected Class<?> findClass(String name) throws ClassNotFoundException {
      throw new ClassNotFoundException(name);
  }
  ```

  

+ ### defineClass

  ​		该方法的签名如下，用来将byte字节解析成虚拟机能够识别的Class对象。defineClass()方法通常与findClass()方法一起使用。在自定义类加载器时，会直接覆盖ClassLoader的findClass()方法获取要加载类的字节码，然后调用defineClass()方法生成Class对象。

  ```java
  protected final Class<?> defineClass(byte[] b, int off, int len)
      throws ClassFormatError
  {
      return defineClass(null, b, off, len, null);
  }
  ```

  

+ ### resolveClass

  ​	连接指定类，类加载器可以使用此方法来连接。
  
  

## 五、URLClassLoader

​		在java.net包中，JDK提供了一个更加易用的类加载器URLClassLoader，它扩展了ClassLoader，能够从本地或者网上指定的位置加载类。我们可以使用子类作为自定义类加载器使用。

构造方法

```java
public URLClassLoader(URL[] urls)//指定要加载的类所在的URL地址，父类加载器默认为系统类加载器
public URLClassLoader(URL[] urls,ClassLoader parent)//指定要加载的类所在的URL地址，并指定父类加载器
```

## 六、类加载时机

类加载时机分为主动加载和被动加载2种。

**主动加载**有以下几种情况：

1. 实例化
2. 调用类中的静态变量
3. 调用类中的静态方法
4. 反射获取类信息
5. 初始化子类，父类没有被初始化的情况下，这种也是主动加载

**被动加载**：

1. 通过子类引用父类的静态属性，不会导致子类初始化

2. 通过定义数组引用类，不会导致该类初始化

3. 访问类中的常量不会初始化