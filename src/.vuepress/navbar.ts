import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "语言系列",
    icon: "code",
    prefix: "/language/",
    children:[
      {
        text: "Java",
        icon: "/icons/java.svg",
        link:"Java",
      },
      {
        text: "Spring",
        icon: "/icons/spring.svg",
        link:"Spring",
      },
      {
        text: "Spring MVC",
        icon: "/icons/SpringMVC.svg",
        link:"MVC",
      },
      {
        text: "Spring Boot",
        icon: "/icons/SpringBoot.svg",
        link:"Boot",
      },

    ],
  },
  {
    text: "数据库系列",
    icon: "database",
    prefix: "/数据库/",
    children: [
      {
        text: "MySQL",
        icon: "/icons/mysql.svg",
        link:"MySQL"
      }
    ]
  },
  
  {
    text: "运维系列",
    icon: "server",
    link: "Operation"
  },
  {
    text: "算法系列",
    icon: "brain",
    link: "Algorithm"
  },
  {
    text: "工具系列",
    icon: "/icons/tool.svg",
    link: "tools"
  },
  // {
  //   text: "博文",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "JDK8",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "苹果1", icon: "pen-to-square", link: "1" },
  //         { text: "苹果2", icon: "pen-to-square", link: "2" },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     {
  //       text: "MySQL",
  //       icon: "pen-to-square",
  //       prefix: "banana/",
  //       children: [
  //         {
  //           text: "香蕉 1",
  //           icon: "pen-to-square",
  //           link: "1",
  //         },
  //         {
  //           text: "香蕉 2",
  //           icon: "pen-to-square",
  //           link: "2",
  //         },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     { text: "樱桃", icon: "pen-to-square", link: "cherry" },
  //     { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
  //     "tomato",
  //     "strawberry",
  //   ],
  // },
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
