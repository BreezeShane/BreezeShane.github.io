import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Mathematics",
    icon: "/logos/infinity-solid.svg",
    link: "/Mathematics/"
  },
  {
    text: "Artificial Intelligence",
    icon: "/logos/hexagon-nodes-solid.svg",
    link: "/Artificial-Intelligence/"
  },
  {
    text: "Paper Reviews",
    icon: "/logos/pen-to-square-solid.svg",
    link: "/Paper-Reviews/"
  },
  {
    text: "Diverse Essays",
    icon: "/logos/swatchbook-solid.svg",
    link: "/Diverse-Essays/"
  },
  {
    text: "友人帳",
    icon: "/logos/address-book-solid.svg",
    link: "https://breezeshane.github.io/YuuJinChou/"
  },
  "resume",
  // {
  //   text: "博文",
  //   icon: "pen-to-square",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "苹果",
  //       icon: "pen-to-square",
  //       prefix: "apple/",
  //       children: [
  //         { text: "苹果1", icon: "pen-to-square", link: "1" },
  //         { text: "苹果2", icon: "pen-to-square", link: "2" },
  //         "3",
  //         "4",
  //       ],
  //     },
  //   ],
  // },
]);
