const { config } = require("vuepress-theme-hope");
const navBarConfig = require("./config/navbar");
const sideBarConfig = require("./config/sideBar");

module.exports = config({
    title: "𝕭𝖗𝖊𝖊𝖟𝖊 𝕾𝖍𝖆𝖓𝖊 𝕭𝖑𝖔𝖌",
    description: "🤗😄😃😉𝓖𝓻𝓮𝓮𝓽𝓲𝓷𝓰𝓼! 𝓘'𝓶 𝓑𝓻𝓮𝓮𝔃𝓮 𝓢𝓱𝓪𝓷𝓮 ~😉😃😄🤗",

    head: [
        // 百度站点验证
        ["meta", { name: "baidu-site-verification", content: "nGf5yi0Gec" }],
        ["meta", { name: "baidu-site-verification", content: "4H7tszevS8" }],

        [
            "link",
            {
                rel: "mask-icon",
                href: "/assets/safari-pinned-tab.svg",
                color: "#5c92d1",
            },
        ],
    ],

    shouldPrefetch: (filename) => !filename.includes("page-"),

    dest: "./dist",

    locales: {
        "/": { lang: "zh-CN" },
        // "/en/": {
        //     title: "My name is Breeze Shane",
        //     description: "Breeze Shane Personal Blog",
        // },
    },

    markdown: {
        lineNumbers: true
    },

    themeConfig: {
        logo: "/铃兰.svg",
        author: "Breeze Shane",

        repo: "https://github.com/BreezeShane/BreezeShane.github.io",
        repoDisplay: false,
        docsDir: "src",
        docsBranch: "main",
        nav: navBarConfig.zh,
        // sidebar: sideBarConfig.zh,
        sidebar: [
            "/" /* / */,
            {
              title: "Aritficial Intelligence",
              prefix: "/ArtificialIntelligence/",
              children: [
                  "",
              ],
            },
            {
              title: "Data Structures and Algorithms",
              prefix: "/bar/",
              children: [
                "",
              ],
            },
            {
                title: "Blog",
                prefix: "/BlogBuildingAndUsing/",
                children: [
                  "/BlogBuilding/",
                  "/Markdown语法杂记/",
                  "/LaTeX/",
                  "/ChangeBlogTheme/",
                  "/CreateNewFilebyShell/",
                ],
              },
              {
                title: "Linux",
                prefix: "/Linux/",
                children: [
                  "/Manjaro安装与配置/",
                  "/ZeroTier-One安装与使用/",
                  "/记服务器搭建过程/",
                  "/PrivateNetdiskBuilding/",
                  "/ArcolinuxAndAwesomeWM/",
                  "/AutoIAC/",
                  "/Shells/",
                  "/BuildingServer/",
                ],
              },
              {
                title: "Mathematics",
                prefix: "/Mathematics/",
                children: [
                  "/LipschitzContinuity/",
                  "/CongruenceExpression/",
                ],
              },
              {
                title: "Web",
                prefix: "/Web/",
                children: [
                  "/HowtoForceCVWhenBanned/",
                  "/Frontbackend/",
                ],
              },
              {
                title: "Python",
                prefix: "/Python/",
                children: [
                    "/Crawler/"
                ],
              },
            "/Windows10快捷键大全/",
            "/VComputer/",
            "/Git_Commands/",
            "/about/",
          ],
        // locales: {
        //     /** 英文设置 */
        //     "/en/": {
        //         nav: navBarConfig.en,
        //         sidebar: sideBarConfig.en,
        //     },
        // },

        blog: {
            name: "𝕭𝖗𝖊𝖊𝖟𝖊 𝕾𝖍𝖆𝖓𝖊",
            avatar: "/Breeze Shane.jpg",
            intro: "/about/",
            sidebarDisplay: "mobile",
            links: {
                QQ: "tencent://Message/?Uin=346869441&amp;websiteName=q-zone.qq.com&amp;Menu=yes",
                Qzone: "https://346869441.qzone.qq.com/",
                Gmail: "mailto:bug.breeze.shane@gmail.com",
                Github: "https://github.com/BreezeShane",
                Netease: "https://music.163.com/#/user/home?id=1325265696",
                // Zhihu: "https://www.zhihu.com/people/mister-hope",
                // Steam: "https://steamcommunity.com/id/Mr-Hope/",
                // Weibo: "https://weibo.com/misterhope",
            },
        },

        copyright: {
            status: "global",
        },

        mdEnhance: {
            align: true,
            demo: true,
            flowchart: true,
            footnote: true,
            presentation: true,
            sub: true,
            sup: true,
            tex: true,
        },

        comment: {
            type: "waline",
            serverURL: "https://mister-hope-blog-comment.vercel.app/",
        },

        footer: {
            copyright: "Copyright © 2021-present Breeze Shane",
            display: true,
        },

        hostname: "https://breezeshane.github.io",

        algolia: {
            apiKey: "064a2d15d1a0f7b69df3ef1458d1a510",
            indexName: "mrhope",
        },

        algoliaType: "full",

        iconPrefix: "fas fa-",

        git: {
            timezone: "Asia/Shanghai",
        },

        pwa: {
            favicon: "/favicon.svg",
            themeColor: "#5c92d1",
            cacheHTML: false,
            apple: {
                icon: "/assets/icon/apple-icon-152.png",
                statusBarColor: "black",
            },
            msTile: {
                image: "/assets/icon/ms-icon-144.png",
                color: "#ffffff",
            },
        },
    },
});