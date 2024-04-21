---
icon: /icons/tool.svg
date: 2022-03-03
category:
  - Java
  - 设计模式
tag:
  - 设计模式
---

# 《设计模式》

## 简介

+ 设计模式是软件开发人员在软件开发过程中面临复杂度问题的一般问题的解决方案

+ 设计模式（Design pattern）是重构解决方案不是开发的解决方案

+ 设计模式是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结

+ 使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性

+ 毫无疑问，设计模式于己于他人于系统都是多赢的，设计模式使代码编制真正工程化，设计模式是软件工程的基石，如同大厦的一块块砖石一样

+ 项目中合理地运用设计模式可以完美地解决很多问题，每种模式在现实中都有相应的原理来与之对应，每种模式都描述了一个在我们周围不断重复发生的问题，以及该问题的核心解决方案，这也是设计模式能被广泛应用的原因

## 单例模式

        控制对象的实例化,有些情况下，我们希望限制一个类只能拥有一个实例，以确保一些特定的约束条件得到满足。单例模式提供了一种简洁的方式来实现这种控制。

单例模式分为==懒汉模式==和==饿汉模式==两种

> 懒汉模式

```java
public class LazySingle {
        private static LazySingle lazySingle;

        private LazySingle() {

        }

        // 非线程安全
        public static LazySingle getInstance() {
                if(lazySingle == null) {
                        lazySingle = new LazySingle();
                }
                return lazySingle;
        }

        // 线程安全

        public static synchronized LazySingle getSafeInstance() {
                if(lazySingle == null) {
                        lazySingle = new LazySingle();
                }
                return lazySingle;        
        }
}
```

> 饿汉模式-非线程安全

```java
public class HungrySingle {
        private static HungrySingle hungrySingle = new HungrySingle();

        private HUngrySingle() {

        }

        public static HungrySingle(){
                return hungrySingle;
        }
}
```

> 饿汉模式-线程安全

```java
public class HungrySafeSingle {
	private volatile static HungrySafeSingle hungrySafeSingle;

	private HungrySafeSingle() {

	}

	public static HungrySafeSingle hungrySafeSingle() {
		if(hungrySafeSingle == null){ // 第一次检查，避免不必要的同步
			synchronized(HungrySafeSingle.class){
				if(hungrySafeSingle == null){ // 第二次检查，确保只创建一个实例
					hungrySafeSingle = new HUngrySafeSingle(); 
				}
			}
		}
		return hungrySafeSingle;
	}
}
```
该方式为双检锁/双重校验锁（DCL，即 double-checked locking）

	这种方式采用双锁机制，安全且在多线程情况下能保持高性能getInstance()的性能对应用程序很关键


> 饿汉模式-线程安全-登记式/静态内部类方式

```java
public class HungrySafeSingle {
	private HungrySafeSingle(){

	}
	private static class SingleHolder{
		private final static HungrySafeSingle INSTANCE= new HungrySafeSingle();
	}

	public static final HungrySafeSingle getInstance() {
		return SingleHolder.INSTANCE;
	}
}
```

这种方式使用了 lazy loading方式，使得只有在使用时，才进行创建


> 饿汉模式-线程安全-枚举方式

```java
public enum HungrySafeSingle{
	INSTANCE;
}
```

这种写法，拥有延迟加载特性还防止了反序列化，同时不能通过 reflection attack 来调用私有构造方法，缺点是可读性差，不存在抽象层，扩展有很大的困难
