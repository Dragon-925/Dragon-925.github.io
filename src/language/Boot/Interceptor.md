---
icon: pen-to-square
date: 2020-01-25
category:
        - Java
        - Spring Boot
tag:
        - Boot原理
        - 拦截器
---

# 《Boot 之 Interceptor》

## 1.概述

对访问路径进行拦截和放行的，底层使用的是 java 反射机制（动态代理）

## 2.创建拦截器

1. 创建拦截类

      ```java
      import org.springframework.web.servlet.HandlerInterceptor;
      import org.springframework.web.servlet.ModelAndView;
      import javax.servlet.http.HttpServletRequest;
      import javax.servlet.http.HttpServletResponse;
      import java.util.Date;

      /*
      实现HandlerInterceptor接口
      重写方法
      */
      @Component
      public class LoginInterceptor implements HandlerInterceptor {
          /*
          该方法，处于controller之前执行，进行对请求地址的拦截
          true为放行，false为拦截
          */
          @Override
          public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
              System.out.println(new Date() + "preHandle:" + request.getRequestURL());
              //判断名为user的session是否为null
              //是则false
              //否是true
              return request.getSession().getAttribute("user") != null;
          }
      	/*
      	处于controller完毕后，做的一些改动，比如返回前端值为5，可以在这里更改为6
      	*/
          @Override
          public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
              System.out.println(new Date() + "postHandle:" + request.getRequestURL());
          }
      	/*
      	释放内存，清理内存变量
      	*/
          @Override
          public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
              System.out.println(new Date() + "afterCompletion:" + request.getRequestURL());
          }
      }
      ```

2. 创建配置类

      ```java
      import com.dragon.interceptor.LoginInterceptor;
      import lombok.extern.slf4j.Slf4j;
      import org.springframework.context.annotation.Configuration;
      import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
      import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
      import javax.annotation.Resource;

      @Slf4j
      @Configuration
      public class MyWebMvcConfig implements WebMvcConfigurer {
          @Resource
          private LoginInterceptor loginInterceptor;

          @Override
          public void addInterceptors(InterceptorRegistry registry) {
              registry.addInterceptor(loginInterceptor)
                      .addPathPatterns("/**") //拦截所有路径
                      .excludePathPatterns("/user/login");//放行指定路径
          }
      }

      ```

      当用户未登录时，Interceptor 中的 preHandler()返回 false，进行拦截所有路径（除了"/user/login"）

      当用户登录成功后，Interceptor 中的 preHandler()返回 true，进行所有路径放行

## 3.全局跨域

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import javax.annotation.Resource;

@Slf4j
@Configuration
public class MyWebMvcConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer corsConfigurer()
    {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").
                        allowedOrigins("*"). //允许跨域的域名，可以用*表示允许任何域名使用
                        allowedMethods("*"). //允许任何方法（post、get等）
                        allowedHeaders("*"). //允许任何请求头
                        allowCredentials(true). //带上cookie信息
                        exposedHeaders(HttpHeaders.SET_COOKIE).maxAge(3600L); //maxAge(3600)表明在3600秒内，不需要再发送预检验请求，可以缓存该结果
            }
        };
    }
}
```
