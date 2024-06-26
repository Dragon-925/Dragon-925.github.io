import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Java",
      icon: "/icons/java.svg",
      // link: "/language/Java",
      collapsible: true,
      children: [
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
        },
        {
          text: "《线程池》",
          link: "language/Java/线程池"
        }
      ]
    },
    {
      text: "Spring",
      icon: "/icons/spring.svg",
      // link: "/language/Spring",
      collapsible: true,
      children: [
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
      icon: "/icons/SpringMVC.svg",
      // link: "/language/MVC",
      collapsible: true,
      children: [
        {
          text: "《Spring MVC执行流程》",
          link: "language/MVC/SpringMVC执行流程"
        }
      ]
    },
    {
      text: "SpringBoot",
      icon: "/icons/SpringBoot.svg",
      // link: "/language/Boot",
      collapsible: true,
      children: [
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
      text: "Elasticsearch",
      icon: "/icons/elasticsearch.svg",
      collapsible: true,
      children: [
        {
          text: "《初识》",
          link: "数据库/Elasticsearch/初识"
        },
        {
          text: "《Java操作》",
          link: "数据库/Elasticsearch/Java操作"
        },
        {
          text: "《DSL文档操作》",
          link: "数据库/Elasticsearch/DSL文档操作"
        },
        {
          text: "《聚合》",
          link: "数据库/Elasticsearch/聚合"
        },
        {
          text: "《自动补全》",
          link: "数据库/Elasticsearch/自动补全"
        },
        {
          text: "《数据同步》",
          link: "数据库/Elasticsearch/数据同步"
        }
      ]
    },
    {
      text: "MySQL",
      icon: "/icons/mysql.svg",
      // link: "/数据库/MySQL",
      collapsible: true,
      children: [
        {
          text: "《初识MySQL》",
          link: "数据库/MySQL/初识MySQL"
        }
      ]
    },
    // {
    //   text: "工具系列",
    //   icon: "/icons/tool.svg",
    //   // link: "/数据库/MySQL",
    //   collapsible: true,
    //   children: [
    //     {
    //       text: "《工具系列》",
    //       link: "tools/工具系列"
    //     }
    //   ]
    // },
    {
      text: "中间件",
      icon: "/icons/中间件.svg",
      collapsible: true,
      children: [
        {
          text: "",
          link: "/middleware/rabbitMQ",
          icon: "/icons/rabbitmq.svg"
        },
        {
          text: "RestAPI",
          link: "/middleware/RestAPI",
        },
        {
          text: "Redis",
          link: "/middleware/redis",
          icon: "/icons/Redis.svg"
        }
      ]
    },
    {
      text: "算法系列",
      icon: "brain",
      collapsible: true,
      children: [
        {
          text: "冒泡排序",
          link: "/algorithm/bubbleSort"
        },
        {
          text: "快速排序",
          link: "/algorithm/quickSort"
        },
        {
          text: "二分查找",
          link: "/algorithm/binarySearch"
        }
      ]
    },
    {
      text: "Linux",
      icon: "server",
      collapsible: true,
      children: [
        {
          text: "《Git》",
          link: "operation/git"
        },
        {
          text: "《Linux》",
          link: "operation/Linux"
        },
        {
          text: "《Docker》",
          link: "operation/Docker"
        }
      ]
    },
    {
      text: "设计模式",
      icon: "/icons/designPattern.svg",
      link: "/designPattern"
    }
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
