import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Dawson",
  description: "Dawson 的博客",
  // logo: "",
  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});