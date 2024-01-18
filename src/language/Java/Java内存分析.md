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

# 《Java内存分析》

## 一、三种初始化

### 	1.静态初始化

```java
int[] a ={1,2,3};
Man[] mans = {new Man(),new Man()};
```

​	==创建 + 赋值==

### 	2.动态初始化

```java
int[] a = new int[2];
a[0]=1;
a[1]=2;
```

​	==包含默认初始化==

### 	3.数组默认初始化

```xml
数组也是引用类型，它的元素相当于类的实例变量，因此数组已经分配空间，其中的每个元素也被按照实例变量同样的方式被“隐式初始化”
```



## 二、Java内存分析

### 	1.内存分析图

[![pFFqBhq.md.png](https://s11.ax1x.com/2024/01/16/pFFqBhq.md.png)](https://imgse.com/i/pFFqBhq)



> **存放基本变量类型：会包含这个基本类型的具体数值**
>
> **引用对象的变量：会存放这个引用在堆里的具体地址**

---

### 2.内存分析举例

![image-20220112155430261](https://pic.imgdb.cn/item/65a6a978871b83018a02c563.png)

```java
int[] array;//第一步压栈

array = new int[6];//第二部在堆中开辟一块6个空间，每个内存均为0

array[0] = 1;//将堆中数据更改
```

