---
icon: pen-to-square
date: 2019-10-30
category:
  - Java
tag:
  - 基础
---


# 《Java基础》

## 01、环境搭建

+ ***JDK***（*Java Development Kit*   -----  Java开发工具包）

  供给开发人员使用，包括了Java开发工具（***java.exe、javac.exe***）、打包工具（***jar.exe***）

  包含了***JRE***

+ ***JRE***（*Java Runtime Environment*   -----  Java运行环境）

  包括了***JVM***（*Java Virtual Machine*）、Java核心类库

  若想要运行一个开发好的Java程序，只需安装*JRE*即可

+ 总结

  使用***JDK***开发工具完成java程序，使用***JRE***运行Java程序

<img src="https://s11.ax1x.com/2024/01/16/pFFb8L4.png" alt="image-20220707214714941" style="zoom:67%;" />

## 02、注释

+ 单行注释

  ```java
  //单行注释
  ```

+ 多行注释

  ```java
  /*
  */
  ```

  不支持嵌套注释

+ 文档注释

  ```java
  /**
  多行注释
  */
  ```

  生成对应API文档

  *`javadoc -encoding utf-8 -d newName -version guo\controller\*.java`*

  生成文档名字：*newName*

  指定java文件生成：*guo\controller\\.java*

## 03、对象的内存解析

+ 堆：存放对象实例
+ 栈：存放局部变量
+ 方法区：存储已经被虚拟机加载的类信息、常量、静态变量、编译后的代码

## 04、JavaBean

+ 是一种Java语言写成的可重用组件
+ 类是公共的
+ 有一个无参的公共构造器
+ 有属性，且有对应的get和set方法

## 05、super关键字

+ 当子类与父类属性相同，通过super关键字，可调用父类属性
+ 当子类与父类方法相同（被重写时），通过super可调用父类方法
+ super修饰构造器，在子类中使用super可调用父类构造器
+ **在构造器内部必须让super声明在首行**
+ 在构造器内部super（参数列表）和this（参数列表）只能出现一个

## 06、自动装箱拆箱

+ 自动装箱

  ```java
  //基本数据类型===>引用数据类型
  int num01 = 100;
  //自动装箱
  Integer num02 = num01;
  ```

+ 自动拆箱

  ```java
  //引用数据类型===>基本数据类型
  int num03 = n
  ```

  

## 07、static关键字

+ 某些特定的数据在内存空间里只有一份

+ 用来修饰方法、属性、代码块、内部类

+ 代码举例

  ```java
  /*
  	
  	实例变量：每个对象中都有一个自己的属性，当修改其中一个变量，不会导致其他实例对象中的属性改变
  		随着对象的创建而加载
  	
  	静态变量（类变量）：每个实例对象中都共享同一个被static修饰的属性，当修改其中一个属性，会导致其他实例属性中的改变
  		随着类的加载而加载
  		静态加载要早于对象的创建
  	
  */
  public class StaticTest{
      public static void main(String[] args){
          Chinese chinese01 = new Chinese();
          chinese01.name="张三";
          chinese01.age=25;
          
          Chinese chinese02 = new Chinese();
          chinese02.name="李四";
          chinese02.age=23;
          
          chinese01.nation = "中国";
          
          System.out.println(chinese02.nation);//此时输出为“中国”
          
          chinese02.nation = "中华人民共和国";
          
          System.out.println(chinese01.nation);//此时输出为“中华人民共和国”
      }
  }
  class Chinese{
      String name;
      Integer age;
      
      //静态变量
      static String nation;
  }
  ```

+ **内存解析图**

  <img src="https://s11.ax1x.com/2024/01/16/pFFbUF1.png" alt="image-20220708100532902" style="zoom:67%;" />

+ static修饰方法

  静态方法中只能调用静态属性、属性

  非静态方法均可调用

  静态方法中不能使用"*this*"和"*super*"关键字

  

> **如何确定一个属性要被static修饰?**

​	属性是被多个对象所共享的，不会随对象的不同而不同



> **如何确定一个方法要被static修饰?**

​	操作静态属性的方法，通常设置为*static*

​	**工具类的创建：**

​		习惯上声明为*static*（不需要创建对象、实例化）



## 08、单例模式

+ 在整个软件系统中只能存在一个对象实例
  + 类的构造器访问权限是设为*private*，防止外部*new*实例化
  + 内部创建类对象（可以实例化）
  + 利用get方法去返出实例化的对象

### 	8.1、懒汉式

```java
public class Order{
    
    //1.私有化类构造器
	private Order(){
        
    }
    
    //2.私有化对象，并用static修饰首先置空
	private static Order order = null;
    
    //3.创建get方法
    public static Order getInstance(){
        
        //4.方法中需要判断私有化对象是否为空，若为空则在内部中实例化该类，交给私有化对象
        if(order == null){
            order = new Order();
        }
        
        //5.否则，直接返出实例化后的对象
        return order;
    }
}
```



### 	8.2、饿汉式

```java
public class Bank{
    
    //1.私有化构造器
    private Bank(){
        
    }
    
	//2.创建内部对象实例
    private static Bank bank = new Bank();
    
	//3.返出实例对象
    public static Bank getInstance(){
        return bank;
    }
}


```

### 8.3、区别/特点

> 饿汉式

+ 优点：
  1. 线程安全
+ 缺点：
  1. 对象加载时间过长

> 懒汉式

+ 优点：
  1. 延迟对象创建
+ 缺点：
  1. 非线程安全

## 09、final关键字

> 修饰类

+ final：最终的
+ 被*final*关键字修饰的类，不能被其他类所继承
+ 使用*final*，是因为该类该提供的都提供了，所以不需要去扩充内容和功能了

> 修饰方法

+ 被*final*修的方法，该方法不可被重写
+ 比如Object中的getClass()方法

> 修饰变量

+ 属性是变量中的一种
+ 被*final*修饰的变量，即是一种常量
+ **常量的名称要大写**

> 修饰形参

+ 当我们经过形参传值时，方法内部不得对该变量更改

  ```java
  public void finalDo(final Integer num){
      System.out.println(num);
  }
  ```

  

## 10、接口

### 1.静态代理模式

```java
public class ProxyTest {
    public static void main(String[] args) {
        ProxyedTest proxyedTest = new ProxyedTest();
        ProxyTest01 proxyTest01 = new ProxyTest01(proxyedTest);
        proxyTest01.browse();
    }
}
//共同接口
interface DoProxy{
    void browse();
}
//被代理类
class ProxyedTest implements DoProxy{

    @Override
    public void browse() {
        System.out.println("张三卖房");
    }
}
//代理类
class ProxyTest01 implements DoProxy{

    private DoProxy doProxy;

    public ProxyTest01(DoProxy doProxy){
        this.doProxy = doProxy;
    }

    @Override
    public void browse() {
        doProxy.browse();
    }
}

```

+ 具体思想

  将被代理类放入代理类中，再在代理类中调用方法

### 2.动态代理模式

```java
public class ProxyTest {
    @Test
    public void test01(){
        SuperMan superMan = new SuperMan();
        Human proxyInstance = (Human) ProxyFactory.getProxyInstance(superMan);
        System.out.println(proxyInstance.getBelief());
        proxyInstance.eat("酸辣粉");
    }
}
interface Human{
    String getBelief();
    void eat(String food);
}
class SuperMan implements Human{

    @Override
    public String getBelief() {
        return "I belief you";
    }

    @Override
    public void eat(String food) {
        System.out.println("I LIKE EAT"+food);
    }
}
/*
1.如何根据加载到内存中的被代理类，动态的创建一个代理类以及其对象

2.当通过代理类的对象调用方法，如何动态的去调用被代理类中的同名方法
 */
class ProxyFactory{
    //调用此方法，返回一个代理类的对象，解决问题一
    public static Object getProxyInstance(Object obj){
        MyInvocationHandler handler = new MyInvocationHandler();
        handler.bind(obj);
        //j
        return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(),handler);
    }
}
class MyInvocationHandler implements InvocationHandler{
    //当我们通过代理类的对象，调用方法a，就会自动的调用如下方法：invocation

    //将被代理类要执行的方法a的功能声明在invoke()中
    private Object obj;

    public void bind(Object obj){
        this.obj = obj;
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        //method：即为代理类对象调用的方法
        Object returnValue = method.invoke(obj, args);
        return returnValue;
    }
}
```



> 工厂模式

+ 实现创建者和调用者的分离，即将创建对象的具体过程屏蔽隔离起来，达到提高灵活性的目的
+ 解决方式就是分工

### 3.简单工厂模式

```java
public class CarFactoryMain {
    //简单工厂模式
    public static CarRun checkCar(String carName){
        CarRun carRun = null;
        if (carName.equals("奥迪")){
            carRun = new Audi();
        }else if (carName.equals("比亚迪")){
            carRun = new Byd();
        }else {
            carRun = null;
        }
        return carRun;
    }
    public static void main(String[] args) {
        CarRun carRun = null;
        carRun = CarFactoryMain.checkCar("奥迪");
        carRun.run();
        carRun = CarFactoryMain.checkCar("比亚迪");
        carRun.run();

    }
}
interface CarRun{
    void run();
}
class Audi implements CarRun{

    @Override
    public void run() {
        System.out.println("奥迪在跑");
    }
}
class Byd implements CarRun{

    @Override
    public void run() {
        System.out.println("比亚迪在跑");
    }
}
```

**优点：把创建者和调用者分离**

==缺点：对于增加新产品，不修改代码，是无法扩展，违反了开闭原则==



### 4.工厂方法模式

```java
public class CarFactoryMain01 {
    public static void main(String[] args) {
        CarRun01 type = new Audi01Factory().getType();
        CarRun01 type1 = new Byd01Factory().getType();
        type.run();
        type1.run();
    }
}
//工厂接口
interface FactoryCar{
    CarRun01 getType();
}
//建造奥迪工厂
class Audi01Factory implements FactoryCar{

    @Override
    public CarRun01 getType() {
        return new Audi01();
    }
}
//建造比亚迪工厂
class Byd01Factory implements FactoryCar{

    @Override
    public CarRun01 getType() {
        return new Byd01();
    }
}
interface CarRun01{
    void run();
}
class Audi01 implements CarRun01{

    @Override
    public void run() {
        System.out.println("奥迪在跑");
    }
}
class Byd01 implements CarRun01{

    @Override
    public void run() {
        System.out.println("比亚迪在跑");
    }
}

```

### 5.抽象工厂模式（待学习）

## 11、Stream流

> 简单概述

+ **Stream就是操作容器的**

> 实例化
方式一：

```java
/**
* 通过集合获取Stream
*/
@Test
public void test01(){
    List<Student> students = StudentData.getStudents();

    Stream<Student> stream = null;

    //返回顺序流
    stream = students.stream();

    //返回并行流
    stream = students.parallelStream();
    System.out.println(stream);
}
```
方式二：
```java
/**
 * 通过数组创建
 */
@Test
public void test02(){
    int[] arr = new int[]{1,2,3,4,5,6};
    IntStream stream = Arrays.stream(arr);

    Student student01 = new Student(1002, "李四", 21, 65.0);
    Student student02 = new Student(1003, "王五", 22, 75.0);
    
    Student[] arr01 = new Student[]{student01,student02};
    Stream<Student> stream1 = Arrays.stream(arr01);
}
```

方式三：

```java
/**
 * 通过Stream的of
 */
@Test
public void test03(){
    Stream<String> stringStream = Stream.of("1", "2", "3");
}
```

> 中间操作

### 01.筛选与切片

+ filter(Predicate p)：接收Lambda，从流中排除某些元素

  ```java
      @Test
      public void test01(){
          List<Student> students = StudentData.getStudents();
          //查询学生表中成绩大于70的
          students.stream().filter(student -> student.getScope() > 70).forEach(System.out::println);
      }
  ```

  

+ distinct()：筛选，通过流所生成的hashCode()和equals()去除重复元素

  ```java
  //去重（取出对象中所有数据均相同的数据）
          StudentData.getStudents().stream().distinct().forEach(System.out::println);
  ```

  

+ limit(long maxSize)：截断流，使其元素不超过给定数量

  ```java
  //截断流，获取前三个
  StudentData.getStudents().stream().limit(3).forEach(System.out::println);
  ```

+ skip(long n)：跳过元素，返回一个扔掉前n个元素的流。若流中元素不足n个，则返回一个空流。与limit(n)互补

  ```java
  //跳过前三个，获取其他的
  StudentData.getStudents().stream().skip(3).forEach(System.out::println);
  ```

### 02.排序

+ sorted：产生一个新流，其中按<u>自然顺序</u>排序

  ```java
  //自然排序
  List<Integer> integers = Arrays.asList(1, 200, 34, 4, 556, 61);
  integers.stream().sorted().forEach(System.out::println);
  ```

+ sorted：产生一个新流，其中按<u>比较器顺序</u>排序

  ```java
  //定制排序(根据年龄排序)
  List<Student> students = StudentData.getStudents();
  students.stream().sorted((e1,e2) -> Integer.compare(e1.getAge(),e2.getAge())).forEach(System.out::println);
  ```

### 03.映射

将字母变成大写

```java
List<String> strings = Arrays.asList("aa", "bb", "cc", "dd");
strings.stream().map(str->str.toUpperCase()).forEach(System.out::println);
```



获取学生姓名大于3的姓名

```java
StudentData.getStudents().stream().map(Student::getName).collect(Collectors.toList()).stream().filter(student01 -> student01.length()>3).forEach(System.out::println);
```

### 04.终止操作

```java
import java.util.Optional;

public class StreamAPITest02 {
    @Test
    public void test01(){
        /*
        allMatch(Predicate p) 检查是否匹配所有元素
        查询是否年龄均大于18
         */
        boolean allMatch = StudentData.getStudents().stream().allMatch(e -> e.getAge() > 18);
        System.out.println(allMatch);
        System.out.println();

        /*
        anyMatch(Predicate p) 检查是否至少匹配一个元素
        查询是成绩是否有75分的
        */
        boolean anyMatch = StudentData.getStudents().stream().anyMatch(e -> e.getScope()==65);
        System.out.println(anyMatch);
        System.out.println();

        /*
        noneMatch(Predicate p) 检查是否没有匹配的元素
        查询是是否存在学生姓李

        若存在则返回false，不存在返回true
        */
        boolean noneMatch = StudentData.getStudents().stream().noneMatch(e -> e.getName().contains("李"));
        System.out.println(noneMatch);
        System.out.println();

        /*
        findFirst：返回第一个元素
         */
        Optional<Student> first = StudentData.getStudents().stream().findFirst();
        System.out.println(first);
        System.out.println();

        /*
        count：返回流中的个数
         */
        long count = StudentData.getStudents().stream().count();
        System.out.println(count);
        System.out.println();

        /*
        max：返回流中最大值
         */
        Optional<Double> max = StudentData.getStudents().stream().map(e -> e.getScope()).max(Double::compareTo);
        System.out.println(max.get());
        System.out.println();

        /*
        min：返回流中最小值
         */
        Optional<String> s = StudentData.getStudents().stream().min((e1, e2) -> Double.compare(e1.getScope(), e2.getScope())).map(Student::getName);
        System.out.println(s.get());
    }
}

```

> 归约

+ reduce(***T** iden,**BinaryOperator** b*)：可以将流中元素反复结合起来，得到一个值。返回T

  ```java
  /*
  计算1-10的和
  */
  List<Integer> integers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  System.out.println(integers.stream().reduce(0, Integer::sum).intValue());
  ```

  ```java
  /*
  计算所有学生总成绩
  */
  Double reduce = StudentData.getStudents().stream().map(e -> e.getScope()).reduce((double) 0, Double::sum);
  System.out.println(reduce);
  ```

  

+ reduce(***BinaryOperator** b*)：可以将六种元素反复结合起来，得到一个值。返回Optional\<T>

  ```java
  /*
  计算总成绩
  */
  Optional<Double> reduce = StudentData.getStudents().stream().map(Student::getScope).reduce(Double::sum);
  System.out.println(reduce);
  ```

  

> 收集

+ Collector：收集为List集合或者Set集合

  ```java
  /*
  查找成绩大于80的同学，返回结果一个List或set
  */
  
  //返回List
  List<Student> collect = StudentData.getStudents().stream().filter(student -> student.getScope() > 80).collect(Collectors.toList());
  collect.forEach(System.out::println);
  System.out.println();
  
  //返回Set
  Set<Student> collect1 = StudentData.getStudents().stream().filter(student -> student.getScope() > 80).collect(Collectors.toSet());
  collect1.forEach(System.out::println);
  ```

  

