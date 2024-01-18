---
icon: pen-to-square
date: 2019-01-09
category:
  - Java
tag:
  - JDK新特新
---


# 《Lambda表达式》

## 一、为什么要使用Lambda表达式

+ 避免匿名内部类定义过多
+ 让代码看起来简洁
+ 去掉多余没有意义的代码
+ 留下核心逻辑
+ Lambda是在JDK1.8中产生的

## 二、理解Functional Interface(函数式接口)

+ 函数式接口是学习Java8 lambda表达式的关键所在

+ 函数式接口定义：

  + 任何借口，如果只包含唯一一个抽象方法，那么他就是一个函数式接口

  ```java
  public interface Runnable{
      public abstract void run();
      //接口中默认方法为抽象方法，也可以不写abstract修饰符
  }
  ```

  

  + 对于函数式接口，我们可以通过lambda表达式来创建该接口的对象

### Lambda演变史

#### （1）正常操作

```java
public class TestLambdaImpl implements TestLambda{

    @Override
    public void lambda() {
        System.out.println("I like Lambda");
    }

    public static void main(String[] args) {
        TestLambdaImpl testLambda = new TestLambdaImpl();
        testLambda.lambda();
    }
}
interface TestLambda{
    void lambda();
}
```

#### （2）静态内部类

```java
public class TestLambdaImpl{

    static class Test01Impl implements TestLambda{

        @Override
        public void lambda() {
            System.out.println("静态内部类");
        }
    }
    public static void main(String[] args) {
        Test01Impl ti = new Test01Impl();
        ti.lambda();
    }
}
interface TestLambda{
    void lambda();
}
```

#### （3）局部类

```java
public class TestLambdaImpl{

    public static void main(String[] args) {
        class Test01Impl implements TestLambda{

            @Override
            public void lambda() {
                System.out.println("局部类");
            }
        }
        Test01Impl ti = new Test01Impl();
        ti.lambda();
    }
}
interface TestLambda{
    void lambda();
}
```

#### （4）匿名内部类

==没有类的名称，必须借助接口或者父类==

```java
public class TestLambdaImpl{
    public static void main(String[] args) {
        TestLambda testLambda = null;
        testLambda= new TestLambda(){
            @Override
            public void lambda() {
                System.out.println("匿名内部类");
            }
        };
        testLambda.lambda();
    }
}
interface TestLambda{
    void lambda();
}
```

#### （5）Lambda表达式

```java
public class TestLambdaImpl{
    public static void main(String[] args) {
        TestLambda testLambda = null;
        testLambda = ()->{
            System.out.println("Lambda表达式");
        };
        //也可以写成 "testLambda = ()->System.out.println("Lambda表达式");"

        testLambda.lambda();
    }
}
interface TestLambda{
    void lambda();
}
```

