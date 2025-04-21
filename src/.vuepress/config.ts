import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "𝕭𝖗𝖊𝖊𝖟𝖊 𝕾𝖍𝖆𝖓𝖊 𝕭𝖑𝖔𝖌",
  description: "和风曦日的个人博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
