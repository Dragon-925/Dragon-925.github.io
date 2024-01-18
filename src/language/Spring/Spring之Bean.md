---
icon: pen-to-square
date: 2019-11-30
category:
        - Java
        - Spring
tag:
        - Bean生命周期
        - Bean作用域
        - Bean实例化
---

# 《Spring 之 Bean》

## Bean 的实例化

### 1.构造器实例化

### 2.静态工厂

```java
/**
 * 静态工厂模式
 * （解耦）
 */
public class DaoFactory {
    public static UserDao userDaoFactory(){
        return new UserDao();
    }
}
```

```xml
<bean id="daoFactory" class="com.dragon.factory.DaoFactory" factory-method="userDaoFactory"/>
```

### 3.实例化工厂

```java
/**
 * 实例化工厂Bean
 */
public class DaoFactory01 implements FactoryBean<UserDao> {
    @Override
    public UserDao getObject() throws Exception {
        return new UserDao();
    }

    @Override
    public Class<?> getObjectType() {
        return UserDao.class;
    }
}
```

```xml
<bean id="daoFactory01" class="com.dragon.factory.DaoFactory01"/>
```

## Bean 的作用域

共有五种作用域

1. singleton：单例模式，只有一个实例
2. prototype：全局模式，每次 new 都会创建一个新的实例
3. request：每次请求创建实例
4. session：在 httpsession 中有效
5. global-session：全局 session

## Bean 的生命周期

- 什么是生命周期？

     从对象创建到对象销毁

- bean 的生命周期

     - 初始化容器

          1.创建对象（内存分配），相当于 new 2.执行构造方法 3.执行属性注入（set 操作） 4.执行 bean 初始化方法

     - 使用 bean

          1.执行业务操作

     - 关闭/销毁容器

          1.执行 bean 销毁方法

- 演示 bean 的生命周期

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

         <bean id="bean01" class="com.dragon.pojo.User" init-method="initMethod" destroy-method="destroyMethod">
             <property name="id" value="3"/>
             <constructor-arg ref="teacher"/>
         </bean>
         <bean id="teacher" class="com.dragon.pojo.Teacher"/>
     </beans>
     ```

     ```java
     public class TestApplication {
         public static void main(String[] args) {
             /*
             1.创建bean 实例
             2.set注入
             3.初始化构造器
             4.获取bean对象
             5.bean销毁
              */
             ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("bean01.xml");
             User bean01 = context.getBean("bean01",User.class);
             System.out.println(bean01.getId());
             bean01.destroyMethod();
         }
     }
     ```

- 实现接口**_InitializingBean_**和**_DisposableBean_**，会默认执行初始化 bean 和销毁 bean

     不过要注意的是，必须使用**_ClassPathXmlApplicationContext_**

     同时若执行销毁方法，是有两种执行方法的

     1. **_ClassPathXmlApplicationContext.close();_**

           强制关闭，不建议使用

     2. **_ClassPathXmlApplicationContext.registerShutdownHook();_**

           推荐使用这种注册关闭，因为当 JVM 关闭时，第一件事就是先去把容器关闭，再去关闭 JVM

     ```java
     public class UserDao implements InitializingBean, DisposableBean {
         @Override
         public void destroy() throws Exception {
             System.out.println(this.getClass().getName()+"  销毁");
         }
         /**
          * 在属性设置之后
          * @throws Exception
          */
         @Override
         public void afterPropertiesSet() throws Exception {
             System.out.println(this.getClass().getName() + "  set-init");
         }

         private UserService userService;
         public UserDao(){
             System.out.println("构造器初始化");
         }
         public void setUserService(UserService userService){
             System.out.println("-----------set依赖注入");
             this.userService = userService;
         }
         public void selectOne(){
             System.out.println("selectOne");
         }
     }
     /**
     输出结果：
             构造器初始化
             -----------set依赖注入
             com.dragon.dao.UserDao  set-init
             selectOne
             com.dragon.dao.UserDao  销毁
     **/
     ```

## Spring 循环依赖

### 3 种形态

1. 相互依赖

      类 A 依赖 B，类 B 依赖 A

      ```java
      class A{
          @Autowired
          private B b;
      }
      class B{
          @Autowired
          private A a;
      }
      ```

2. 三者依赖

      类 A 依赖 B，类 B 依赖 C，类 C 依赖 A

      ```java
      class A{
          @Autowired
          private B b;
      }
      class B{
          @Autowired
          private C c;
      }
      class C{
          @Autowired
          private A a;
      }
      ```

3. 自身依赖

      类 A 依赖 A

      ```java
      public class A{
          @Autowired
          private A a;
      }
      ```

### 解决循环依赖方法

- 共有三种缓存
     1. 一级缓存：存放可以被用户使用的 bean（被实例化的）
     2. 二级缓存：存放创建好，但没有完全初始化完的属性的 bean 集合
     3. 三级缓存：存放正在被创建的 bean 集合，代理 bean，比如 AOP
