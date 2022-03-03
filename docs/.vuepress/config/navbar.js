const { navbarConfig } = require("vuepress-theme-hope");

module.exports = {
    zh: navbarConfig([
        { text: "主页", icon: "home", link: "/" },
        { text: "祝词", icon: "igloo", link: "/qap/" },
        { text: "友链", icon: "link", link: "/links/" },
        { text: "关于", icon: "info-circle", link: "/about/" },
        // {
        //   text: "随笔",
        //   icon: "note",
        //   prefix: "/note/",
        //   items: [
        //     { text: "随笔", link: "", icon: "note" },
        //     {
        //       text: "诗集: 四季",
        //       items: [
        //         { text: "春之诗", link: "spring/", icon: "flower" },
        //         { text: "夏之歌", link: "summer/", icon: "leaf" },
        //         { text: "秋之思", link: "fall/", icon: "autumn" },
        //         { text: "冬之语", link: "winter/", icon: "snow" },
        //       ],
        //     },
        //     {
        //       text: "其他作品",
        //       items: [
        //         { text: "笑谈人生", link: "life/", icon: "form" },
        //         { text: "轻言细语", link: "poem/", icon: "like" },
        //       ],
        //     },
        //     { text: "Node.js", link: "node-js/", icon: "nodeJS" },
        //   ],
        // },
    ]),

    // en: navbarConfig([
    //     { text: "Home", link: "/en/", icon: "home" },
    // ]),
};