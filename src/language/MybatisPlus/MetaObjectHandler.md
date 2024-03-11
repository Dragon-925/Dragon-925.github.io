---
icon: pen-to-square
date: 2020-12-14
category:
  - Java
  - mybatis
tag:
  - framework
  - mybatis
---

# 《MetaObjectHandler的使用》

> 问题出现

使用mybatis-plus多次进行保存修改基础字段，使得代码冗余度高

> 问题分析

`MetaObjectHandler` 是 MyBatis-Plus 框架提供的一个接口，用于处理实体对象的公共字段自动填充功能。通过实现 `MetaObjectHandler` 接口，你可以在插入或更新操作时自动填充一些公共字段，比如创建时间、更新时间、创建人、更新人等。这样可以减少重复的代码编写，提高开发效率。

> 问题解决

1. 引入mybatis-plus依赖

   ```xml
   <dependency>
       <groupId>com.baomidou</groupId>
       <artifactId>mybatis-plus-boot-starter</artifactId>
       <version>{mybatis-plus-version}</version>
   </dependency>
   ```

   

2. 创建一个组件实现***MetaObjectHandler***接口并被***spring***托管

   ```java
   @Component
   public class MyMetaObjectHandler implements MetaObjectHandler {
   
       @Override
       public void insertFill(MetaObject metaObject) {
           this.strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
           // 还可以填充其他字段，比如创建人等
       }
   
       @Override
       public void updateFill(MetaObject metaObject) {
           this.strictUpdateFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
           // 还可以填充其他字段，比如更新人等
       }
   }
   ```

   【实体类】

   ```java
   import com.baomidou.mybatisplus.annotation.TableField;
   import com.baomidou.mybatisplus.annotation.FieldFill;
   
   //表示插入时调用insertFill()填充create_time字段
   @TableField(fill = FieldFill.INSERT, value = "create_time")
   private LocalDateTime createTime;
   ```

   ==注意：如果你在使用MyBatis-Plus 3.x版本时，确实不需要使用`@TableField(fill = FieldFill.INSERT, value = "create_time")`这样的注解来实现自动填充字段。==