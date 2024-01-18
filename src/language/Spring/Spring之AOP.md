---
icon: pen-to-square
date: 2019-12-12
category:
        - Java
        - Spring
tag:
        - AOP
        - IOC容器
        - 动态代理
        - CGLIB
        - JDK动态代理
---

# 《Spring 之 AOP》

> AOP 是什么

- 面向切面,AOP（Aspect-Oriented Programming，面向切面编程）能够将那些与业务无关，却为业务 模块所共同调用的逻辑或责任（例如事务处理、日志管理、权限控制等）封装起来，便于减少 系统的重复代码，降低模块间的耦合度，并有利于未来的可扩展性和可维护性。

- Spring AOP 是基于动态代理的，如果要代理的对象实现了某个接口，那么 SpringAOP 就会使 用 JDK 动态代理去创建代理对象；而对于没有实现接口的对象，就无法使用 JDK 动态代理，转 而使用 CGlib 动态代理生成一个被代理对象的子类来作为代理。 当然也可以使用 AspectJ，Spring AOP 中已经集成了 AspectJ，AspectJ 应该算得上是 Java 生 态系统中最完整的 AOP 框架了。使用 AOP 之后我们可以把一些通用功能抽象出来，在需要用到 的地方直接使用即可，这样可以大大简化代码量。我们需要增加新功能也方便，提高了系统的扩展性。日志功能、事务管理和权限管理等场景都用到了 AOP。

> 为什么会有 AOP？

​ 在不改变源代码的基础上，去增加一些新的功能

### AOP 核心概念

- 连接点（JoinPoint）

     被拦截的点，指方法

- 切入点（PointCut）

     被拦截后执行的增强功能，指方法

- 切面（Aspect）

     描述切入点和通知的对应关系

- 通知（Advice）

     在切入点执行的操作

- 通知类

例子：

```java
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.dragon.service.impl.UserServiceImpl.add())")
    private void pt(){

    }
    @Before("pt()")
    public void myAdvice(){
        System.out.println(System.currentTimeMillis());
    }
}
```

那么在这个操作里面就用到了动态代理，其中包括代理对象和目标对象。

- 目标对象：指原来的对象，也就是被代理的对象
- 代理对象：就是替代原来对象的对象，去执行

输出内容：

```java
public class MyApplicationTest {
    @Test
    public void test01(){
        ApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfig.class);
        UserService bean = context.getBean("userServiceImpl", UserService.class);
        System.out.println(bean);
        System.out.println(bean.getClass());
    }
}
/*
bean：           com.dragon.service.impl.UserServiceImpl@776b83cc
bean.getClass()：class com.sun.proxy.$Proxy21
*/
```

**动态代理**

- 有接口

     使用 JDK 动态代理：实现接口代理对象

- 无接口

     使用 CGLIB 动态代理：创建子类代理对象

### JDK 动态代理

使用了`java.lang.reflect`包中的**_Proxy_**类里面的**_newProxyInstance_**方法

其中该方法包含三个参数

1. 类加载器
2. 类的实现接口
3. 创建代理对象（实现 InvocationHandler 接口），写增强部分

- **代理对象**

     ```java
     public class JdkProxy {
         public static void main(String[] args) {
             //接口
             Class[] interfaces = {UserDao.class};

             //被切入的类
             UserDaoImpl userDao = new UserDaoImpl();
     /*
     java.lang.reflect下的Proxy类
     调用newProxyInstance方法去实现AOP操作
     */
             UserDao dao = (UserDao) Proxy.newProxyInstance(
                 JdkProxy.class.getClassLoader(),interfaces,new UserDaoProxy(userDao));

             int res = dao.add(1, 2);
             System.out.println(res);
         }
     }
     ```

- **实现 InvocationHandler 接口**

     ```java
     public class UserDaoProxy implements InvocationHandler {
         private Object obj;
     //构造函数，传入要操作的类
         public UserDaoProxy(Object obj){
             this.obj = obj;
         }
     /*
     proxy:被代理对象
     method:被代理对象的方法Method对象
     args:被代理对象的某方法接收的参数
     */
         @Override
         public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

             System.out.println(method.getName()+"方法执行前");

             Object invoke = method.invoke(obj, args);

             System.out.println(method.getName()+"方法执行之后");
             return invoke;
         }

     }
     ```

## AOP 切入点表达式

> 访问修饰符 返回值类型 包路径.类名.方法名(参数) 异常

- **_.._**

## AOP 通知类型

### AOP 注解

**_@Aspect_**

- **_@Before_**

     在被代理目标方法之前执行

- **_@After_**

     在被代理目标方法之后执行

- **_@AfterReturning_**

     在被代理目标方法完成之后执行

- **_@AfterThrowing_**

     在被代理目标方法执行中出现异常执行

- **_@Around_**

**_@PointCut()_**：抽取方法

```java
@Component
@Aspect
public class UserProxy {
    /**
     * 相同切入点抽取
     */
    //抽取方法
    @Pointcut(value = "execution(* com.dragon.aop.User.add(..))")
    public void commonTest(){

    }

    //调用commonTest()相当于调用了User中的add方法
    @Before(value = "commonTest()")
    public void before(){
        System.out.println("执行之前");
    }

    @After(value = "commonTest()")
    public void after(){
        System.out.println("执行之后");
    }

    @AfterReturning(value = "commonTest()",returning = "obj")
    public void afterReturning(JoinPoint joinPoint,Object obj){
        Signature signature = joinPoint.getSignature();
        System.out.println("afterReturning");
        System.out.println(signature.getName()+obj);
    }

//出现异常抛出
    @AfterThrowing(value = "commonTest()",throwing = "ex")
    public void afterThorowingAdviceMethod(JoinPoint joinPoint,Exception ex){
        //获取连接点所对应方法的签名信息
        Signature signature = joinPoint.getSignature();
        System.out.println("LoggerAspect,方法："+signature.getName()+",异常:"+ex);
    }

    @Around(value = "commonTest()")
    public void around(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("=====环绕之前======");
        joinPoint.proceed();
        System.out.println("======环绕之后=======");
    }
}
```

## 调用目标参数

```java
@Before("ptGetArgs()")
public void myAdvice(JoinPoint jp){
    Object[] args = jp.getArgs();//关键代码
    System.out.println(Arrays.toString(args));
    System.out.println(System.currentTimeMillis());
}
```
