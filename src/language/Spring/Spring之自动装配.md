---
icon: pen-to-square
date: 2019-12-10
category:
        - Java
        - Spring
tag:
        - 自动装配
        - IOC容器
        - Bean
---

# 《自动装配》

- 什么是自动装配？

     所谓自动装配就是往 IOC 容器中以什么样的方式去注入 bean

- 注解使用

     1. _@Autowired_：默认按照 byType 装配
     2. _@Qualifired_：配合 AutoWired 使用指定 Name
     3. _@Resource_：默认按照 name 查找，查找不到，按照 type 查找

### 装配规则

1. **_byName_**：按照名称自动装配
2. **_byType_**：按照类型自动装配
3. **_constructor_**：构造器中的参数装配
