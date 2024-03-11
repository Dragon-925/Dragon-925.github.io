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

# 《Spring MVC 消息转换器》

> 问题出现

读取数据库中的某条数据的ID为`1766010206729367553`(**bigint**)，接收到后端(**Long**)也是正常的，但是再传入前端就会出现`1766010206729367600`

> 问题分析

前端js处理Long类型的数据只能处理前16位，后三位进行四舍五入操作了，这就导致了我们得到了错误的数据

> 问题解决

将Long类型转换为String类型

**【对象转换器】**

+ ***JacksonObjectMapper***，将Java对象和***json***数据相互转换，也可以将***Long***类型转为***String***类型

  ```java
  public class JacksonObjectMapper extends ObjectMapper {
      public JacksonObjectMapper() {
          super();
        	// 收到未知属性不报异常  
          this.configure(FAIL_ON_UNKNOWN_PROPERTIES, false)
              
          // 反序列化时，属性不存在的兼容处理
          this.getDeserializationConfig().
              withoutFeatures(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
          
          SimpleModule simpleModule = new SimpleModule();
              simpleModule.addDeserializer(BigInteger.class, ToStringSerializer.instance). //反序列化
              simpleModule.addSerializer(Long.class, ToStringSerializer.instance); //序列化
          
          this.registerModule(simpleModule);
      }
  }
  ```

**【消息转换器】**

+ 扩展消息转换器-配置刚才的自定义的对象转换器***JacksonObjectMapper***

  ```java
  @Configuration
  public class WebMvcConfig extends WebMvcConfigurationSupport {
      @Override
      protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
          //创建消息转换器
          MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter();
      	//设置对象转换器
          messageConverter.setObjectMapper(new JacksonObjectMapper());
          //将消息转换器追加到框架转换器集合中，其中add(index,MappingJackson2HttpMessageConverter) index 为执行顺序，0 优先执行
          converters.add(0, messageConverter);
      }
  }
  ```

  