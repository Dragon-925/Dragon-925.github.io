import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Java",
      icon: "fa-brands fa-java",
      link: "/language/Java",
      children:[
        {
          text: "《Lambda表达式》",
          link: "language/Java/Jdk8"
        },
        {
          text: "《反射机制》",
          link: "language/Java/反射机制"
        },
        {
          text: "《注解》",
          link: "language/Java/注解"
        },
        {
          text: "《Java基础》",
          link: "language/Java/Java基础"
        },
        {
          text: "《Java多线程基础》",
          link: "language/Java/多线程并发"
        },
        {
          text: "《Java类加载机制》",
          link: "language/Java/Java类加载机制"
        },
        {
          text: "《JVM内存分析》",
          link: "language/Java/Java内存分析"
        },
        {
          text: "《HashMap》",
          link: "language/Java/HashMap"
        }

      ]
    },
    {
      text: "Spring",
      icon: "leaf",
      link: "/language/Spring",
      children:[
        {
          text: "《Spring事务隔离级别》",
          link: "language/Spring/Spring事务隔离级别"
        },
        {
          text: "《Spring之Bean》",
          link: "language/Spring/Spring之Bean"
        },
        {
          text: "《Spring之自动装配》",
          link: "language/Spring/Spring之自动装配"
        },
        {
          text: "《Spring之AOP》",
          link: "language/Spring/Spring之AOP"
        },
        {
          text: "《Spring之IOC容器》",
          link: "language/Spring/Spring之IOC容器"
        }
      ]
    },
    {
      text: "SpringMVC",
      icon: "leaf",
      link: "/language/MVC",
      children:[
        {
          text: "《Spring MVC执行流程》",
          link: "language/MVC/SpringMVC执行流程"
        }
      ]
    },
    {
      text: "SpringBoot",
      icon: "leaf",
      link: "/language/Boot",
      children:[
        {
          text: "《自动配置》",
          link: "language/Boot/SpringBoot自动配置"
        },
        {
          text: "《Spring Boot之Interceptor》",
          link: "language/Boot/Interceptor"
        },
      ]
    },
    {
      text: "MySQL",
      icon: "leaf",
      link: "/数据库/MySQL",
      children:[
        {
          text: "《初识MySQL》",
          link: "数据库/MySQL/初识MySQL"
        }
      ]
    },
        // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    // {
    //   text: "文章",
    //   icon: "book",
    //   prefix: "posts/",
    //   children: "structure",
    // },
    // "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://plugin-md-enhance.vuejs.press/zh/guide/content/revealjs/demo.html",
    // },
  ],
});
