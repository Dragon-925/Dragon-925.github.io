---
icon: pen-to-square
date: 2020-01-10
category:
        - Java
        - Spring
tag:
        - IOC容器
---

# 《Spring 之 IOC 容器》

## 什么是 IOC 容器？

- 其实就是控制反转，把对象的创建和对象之间的调用过程交给 Spring 管理

## 为什么使用 IOC 容器？

为了方便管理 Bean，将对象的创建和实例化过程进行解耦

## 什么是控制反转？

控制反转，简单来说就是将控制权给到了 Spring,为的就是将对象的创建和对象调用过程进行解耦，
其中最常见的方式就是 DI 依赖注入：如果在注入 BeanA 到 IOC 容器，发现 BeanA 依赖于 BeanB，那么也会将 BeanB 注入到 IOC 容器中

## IOC 底层原理是什么？

工厂模式+xml 解析+反射

## IOC 简单底层原理

**beans.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="user" class="com.dragon.pojo.User"/>
<!--    <bean id="user" class="com.dragon.pojo.User"/>-->
<!--    <bean id="user" class="com.dragon.pojo.User"/>-->
</beans>
```

1. **工厂模式**

      ```java
      public class ClassPathXmlApplicationContext implements ApplicationContext{
          /*
          1.创建IOC容器
              String 对应getBean()中的参数
              Object 对应具体创建的类
          */
          private Map<String,Object> iocContainer = new HashMap<>();

          /*
          2.构造器创建
          */
          public ClassPathXmlApplicationContext(String xmlPath){
              /*
              3.Dom4j解析xml配置文件中的bean并返回List集合
                  其中Bean是一个封装了xml中bean的id、class的实体类
              */
              List<Bean> listBean = getListBean(xmlPath);

              /*
              4.创建对象(反射)
              */
              createObject(listBean);

          }
          //这里就是getBean(id)
          @Override
          public Object getBean(String id) {
              return iocContainer.get(id);
          }
      }
      ```

2. **Dom4J 解析 XML**

      ```java
      private List<Bean> getListBean(String xmlPath) throws DocumentException{

              SAXReader saxReader = new SAXReader();
      //读配置文件
              Document document = saxReader.read("src/main/resources/" + xmlPath);
      //获取根节点元素<beans>
              Element rootElement = document.getRootElement();
      //获取子节点集合
              Iterator<Element> elementIterator = rootElement.elementIterator();

              ArrayList<Bean> beans = new ArrayList<>();
      //迭代子节点集合
              while (elementIterator.hasNext()){
                  Bean bean = new Bean();

                  Element next = elementIterator.next();
      //获取bean中的id值
                  String id = next.attributeValue("id");
                  bean.setId(id);
      //获取bean中的class值
                  String clazz = next.attributeValue("class");
                  bean.setClassPath(clazz);

                  beans.add(bBean);
              }
              return beans;
          }
      ```

3. **反射机制**

      ```java
      public void createObject(List<Bean> beans){

              try{

                  Iterator<Bean> iterator = beans.iterator();
                  while(iterator.hasNext()){
                      Bean bean = iterator.next();
      //获取类路径
                      String classPath = bean.getClassPath();
      //反射机制获取类
                      Class aClass = Class.forName(classPath);
      //实例化
                      Object instance = aClass.newInstance();
      //将id和实例化后的内容放入容器中
                      iocContainer.put(bean.getId(), instance);
                  }

              }catch (Exception e){
                  e.printStackTrace();
              }

          }
      ```
