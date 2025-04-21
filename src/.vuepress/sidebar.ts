import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  "/",
  {
    text: "Mathematics",
    collapsible: true,
    icon: "/logos/infinity-solid.svg",
    prefix: "/Mathematics/",
    children: "structure"
  },
  {
    text: "Artificial Intelligence",
    collapsible: true,
    icon: "/logos/hexagon-nodes-solid.svg",
    prefix: "/Artificial-Intelligence/",
    children: "structure"
  },
  {
    text: "Paper Reviews",
    collapsible: true,
    icon: "/logos/pen-to-square-solid.svg",
    prefix: "/Paper-Reviews/",
    children: "structure"
  },
  {
    text: "Diverse Essays",
    collapsible: true,
    icon: "/logos/swatchbook-solid.svg",
    prefix: "/Diverse-Essays/",
    children: "structure"
  },
  {
    text: "友人帳",
    icon: "/logos/address-book-solid.svg",
    link: "https://breezeshane.github.io/YuuJinChou/"
  },
  "resume",
]);
