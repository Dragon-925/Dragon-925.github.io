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

## 代理模式

	代理模式（Proxy Pattern）使用一个类代表另一个类的功能，代理模式创建具有现有对象的对象，以便向外界提供功能接口，代理模式属于结构型模式。

> 应用举例

	卖家卖车，找到中间商，交给中间商去将车辆卖出
	买家买车找中间商买
	在这个过程中 中间商代理卖家去卖车，而卖家和买家并没有直接交易

代码举例，就是Spring AOP

> 优点

+ 职责清晰

+ 高扩展性

> 具体实现

`被代理类`

```java
public interface Car {
	void sale();
}

public class Saler implements Car{
	private String carName;

	public Saler(String carName){
		this.carName = carName;
		getCar(carName)
	}

	public void saleCar() {
		//卖车
	}

	private void getCar(String carName){
		//取车
	}
}
```

`代理类`

```java
public class SalerProxy implements Car{
	private Saler saler;
	private String carName;

	public SalerProxy(String carName){
		this.carName = carName;
	}

	@Override
	public void sale(){
		if(saler == null) {
			saler = new Saler(carName);
		}
		saler.sale();
	}
}
```

`消费者`

```java
public class Consumer{
	public static void main(String[] args) {
		Car car = new SaleProxy("小米SU7");
		car.sale();
	}
}
```

## 工厂模式

	隐藏内部创建逻辑，解决接口选择问题。
    工厂模式是为了创建单一对象

`定义接口`

```java
public interface Car {
	void make();
}
```

`定义实现类`

```java
public class Audi implements Car {
    @Override
    public void make(){
        //创建了Audi品牌车
    }
}

public class Benz implements Car {
    @Override
    public void make(){
        //创建了Benz品牌车
    }
}
```

`定义工厂`

```java
public class CarFactory{
    public Car makeCar(String carBrand){
        if(carBrand == null){
            return null;
        }
        if(carBrand.equalsIgnoreCase("Audi")){
            return new Audi();
        }
        if(carBrand.equalsIgnoreCase("Benz")){
            return new Benz();
        }
        return null;
    }
}
```

`调用工厂`

```java
public class Consumer{
    public static void main(String[] args){
        CarFactory factory = new CarFactory();
        Car car = factory.makeCar("Audi");
        car.make(); //输出结果：创建了Audi品牌车

        Car car = factory.makeCar("Benz");
        car.make(); //输出结果：创建了Benz品牌车
    }
}
```

## 抽象工厂模式

    抽象工厂，专注于创建一个超级工厂，用于创建其他工厂，相互依赖的对象。

`定义车辆接口`

```java
public interface Car{
    void create();
}
```

`实现类`

```java
public class Audi implements Car{
    @Override
    public void create(){
        // 创建奥迪
    }
}

public class Benz implements Car{
    @Override
    public void create(){
        // 创建奔驰
    }
}
```

`定义车辆颜色接口`

```java
public interface CarColor{
    void make();
}
```

`定义车颜色实现类`

```java
public class Red implements CarColor{
    void make(){
        // 设置为红色
    }
}

public class White implements CarColor{
    void make(){
        //设置为白色
    }
}
```

`定义抽象工厂`

```java
public abstract class AbstractFactory{
    abstract Car car(String carName);
    abstract CarColor carColor(String carColor);
}
```

`创建抽象工厂`

```java
public class AbstractCar extends AbstractFactory{
    @Override
    public Car car(String carName){
        if(carName == null){
            return null;
        }
        if(carName.equalsIgnoreCase("Audi")){
            return new Audi();
        }
        if(carName.equalsIgnoreCase("Benz")){
            return new Benz();
        }
        return null;
    }

    @Override
    public CarColor carColor(String carColor){
        return null;
    }
}
```

```java
public class AbstractCarColor extends AbstractFactory{
    @Override
    public Car car(String carName){
        return null;
    }

    @Override
    public CarColor carColor(String carColor){
        if(carColor == null){
            return null;
        }
        if(carColor.equalsIgnoreCase("Red")){
            return new Red();
        }
        if(carColor.equalsIgnoreCase("White")){
            return new White();
        }
    }
}
```

`创建抽象工厂生产者`

```java
public class AbstractProducer{
    public static AbstractFactory abstractFactory(String factoryName){
        if(factoryName == null) {
            return null;
        }
        if(factoryName.equalsIgnoreCase("Car")){
            return new Car();
        }
        if(factoryName.equalsIgnoreCase("Color")){
            return new CarColor();
        }
        return null;
    }
}
```

`消费者`

```java
public class AbstractConsumer{
    public static void main(String[] args){
        AbstractFactory car = AbstractProducer.abstractFactory("Car");
        Car audi = car.car("Audi");
        audi.create();

        AbstractFactory carColor = AbstractProducer.abstractFactory("CarColor");
        Red red = carColor.car("red");
        red.make();
    }
}
```
    抽象工厂和工厂模式的区别：
    工厂模式负责创建的是单一产品
    抽象工厂模式，是将创建单一产品的工厂进行创建一个超级工厂，从而生产相互依赖的对象