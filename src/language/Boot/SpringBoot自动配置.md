---
icon: pen-to-square
date: 2019-12-28
category:
        - Java
        - Spring Boot
tag:
        - Boot原理
---

# 《Spring Boot 自动配置》

<img src="https://pic.imgdb.cn/item/65a8b862871b83018a9b062f.png"></img>

<p>  简单来说，就是将第三方的组件，配置到我们的IOC容器中。在这个过程不需要开发人员去编写相关配置，实现方式就是在启动类中标注@SpringBootApplication注解</p>
<p>而@SpringBootApplication注解又是一个复合注解，实际上实现自动配置的注解是@EnableAutoConfiguration注解，具体实现主要有3点：</p>
<ul>
<ol>1.引入start第三方组件，一定要被@Configuration注解标注，其次必须要用@Bean注解标注注入IOC容器的Bean对象</ol>
<ol>2.再使用约定大于配置的理念，将第三方的start的配置类全路径，写到MEAT-INF/spring.factories文件中</ol>
<ol>3.Spring Boot在拿到第三方jar包后，根据ImportSelector接口去动态选择加载，从而完成自动配置</ol>
</ul>

<img src="https://pic.imgdb.cn/item/65a8b862871b83018a9b04ec.png"></img>
