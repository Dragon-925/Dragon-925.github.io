---
icon: pen-to-square
date: 2019-12-14
category:
  - Java
  - SpringMVC
tag:
  - framework
  - SpringMVC
---

# 《Spring MVC执行流程》

> 思考一个问题：每次在地址栏输入URL，总会调用到我们后端的controller包中的某个类中的某个方法,这个过程是怎么找到的？

1. DispatcherServlet表示前置控制器，是整个SpringMVC的控制中心。用户发出请求，DispatcherServlet接收请求并拦截请求。

   我们假设请求的url为 : http://localhost:8080/SpringMVC/hello

   

   **如上url拆分成三部分：**

   http://localhost:8080服务器域名

   SpringMVC部署在服务器上的web站点

   hello表示控制器

   通过分析，如上url表示为：请求位于服务器localhost:8080上的SpringMVC站点的hello控制器。

2. HandlerMapping为处理器==映射==。DispatcherServlet调用HandlerMapping,HandlerMapping根据请求url查找Handler。

3. HandlerExecution表示具体的Handler,其主要作用是==根据url查找控制器==，如上url被查找控制器为：hello。

4. HandlerExecution将==解析后的信息==传递给DispatcherServlet,如解析控制器映射等。

5. HandlerAdapter表示处理器==适配==器，其按照特定的规则去执行Handler。

6. Handler让具体的==Controller执行==。

7. Controller将具体的执行信息返回给HandlerAdapter,如ModelAndView。

8. HandlerAdapter将视图逻辑名或模型传递给DispatcherServlet。

9. DispatcherServlet调用==视图解析器(ViewResolver)来解析HandlerAdapter传递的逻辑视图名==。

10. 视图解析器将解析的逻辑视图名传给DispatcherServlet。

11. DispatcherServlet根据视图解析器解析的视图结果，==调用具体的视图==。

12. 最终视图呈现给用户。

<img src="https://pic.imgdb.cn/item/65a7f096871b83018ab5c774.png"></img>

## 常用组件

### 1.DispatcherServlet（前端控制器）

+ 作用：接收http请求和拦截，响应返回数据和视图结果

### 2.HandlerMapping（处理映射器）

+ 作用：根据请求的url去找到Handler

### 3.HandlerAdapter（处理适配器）

+ 作用：按照HandlerAdapter要求的特定规则去执行

### 4.Handler（Controller）

+ 作用：按照HandlerAdapter要求去执行

### 5.ViewResolver（视图解析器）

+ 作用：解析ModelAndView返回view视图层