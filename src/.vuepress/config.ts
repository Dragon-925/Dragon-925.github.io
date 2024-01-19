import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Dawson",
  description: "Dawson 的博客",
  head: [
    ["link",{
      rel: "icon",
      href: 'https://pic.imgdb.cn/item/65a6ab2a871b83018a0985ba.jpg'
    }]
  ],  
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});