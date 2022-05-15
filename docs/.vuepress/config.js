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
              title: "Mathematics",
              prefix: "Mathematics/",
              children: [
                {
                  title: "Linear Algebra",
                  prefix: "LinearAlgebra/",
                  children: [
                    "RelativeConcepts",
                    "RelativeCompute",
                    "Norm",
                    "特征分解",
                    "奇异值分解",
                    "Moore-Penrose伪逆",
                    "[实例]主成分分析",
                  ],
                },
                {
                  title: "Probability Theory",
                  prefix: "ProbabilityTheory/",
                  children: [
                    "随机变量",
                    "概率分布",
                    "边缘概率",
                    "条件概率及其链式法则",
                    "独立性和条件独立性",
                    "期望、方差和协方差",
                    "常见概率分布",
                    "常见函数及其性质",
                    "贝叶斯规则",
                    "连续性变量的技术细节",
                    "信息论",
                    "结构化概率模型",
                  ],
                },
                "CongruenceExpression",
                "LipschitzContinuity",
                "Convex",
                "ConjugateFunction",
              ],
            },
            {
              title: "Aritficial Intelligence",
              prefix: "ArtificialIntelligence/",
              children: [
                  "AIOverview",
                  "EnvInstall",
                  {
                    title: "Generative Adversarial Networks",
                    prefix: "GAN/",
                    children: [
                      "ElementaryCourse",
                      "StandardGAN",
                      "WGAN",
                      "WGAN-gp",
                      "WGAN-div",
                      "EnlightenGAN",
                      "LowLightMetrics",
                      "FGAN",
                    ],
                  },
                  "ISDN",
              ],
            },
            {
              title: "Data Structures",
              prefix: "DataStructures/",
              children: [
                "SequentialLinearList",
                "SingleLinkedList",
                "CircularLinkedList",
                "DoubleLinkedList",
                {
                  title: "Stack",
                  children: [
                    "StackBasedonSequentialLinearList",
                    "StackBasedonSingleLinkedList",
                  ],
                },
                "Queue",
                {
                  title: "Tree",
                  prefix: "Tree/",
                  children: [
                    "BinaryTree",
                    "2-3Tree",
                    "Red-BlackTree",
                    "BTree",
                    "B+Tree",
                  ],
                },
              ],
            },
            {
              title: "Algorithm Design and Analysis",
              prefix: "AlgorithmDesignAndAnalysis/",
              children: [
                "Basis",
              ],
            },
            {
              title: "DataBase",
              prefix: "Database/",
              children: [
                "DataBase",
                "RelationalAlgebra",
                "MySQL",
                "QueryOptimization",
                // "Trigger",
                // "DatabaseSafety",
                // "NormalForm",
              ],
            },
            {
              title: "Linux",
              prefix: "Linux/",
              children: [
                "Manjaro安装与配置",
                "ZeroTier-One安装与使用",
                "记服务器搭建过程",
                "PrivateNetdiskBuilding",
                "ArcolinuxAndAwesomeWM",
                "AutoIAC",
                "Shells",
                "BuildingServer",
                "openGauss",
                "ShareConda",
                "UUA",
                "SystemSafety",

              ],
            },
            {
              title: "Web",
              prefix: "Web/",
              children: [
                "HowtoForceCVWhenBanned",
                "Frontbackend",
                "SDN",
              ],
            },
            {
                title: "Blog",
                prefix: "BlogBuildingAndUsing/",
                children: [
                  "BlogBuilding",
                  "Markdown语法杂记",
                  "LaTeXforMd",
                  "ChangeBlogTheme",
                  "CreateNewFilebyShell",
                ],
              },
            "Crawler",
            "Windows10快捷键大全",
            "VComputer",
            "Git_Commands",
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
            roundAvatar: true,
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
            flowchart: false,
            mermaid: true,
            footnote: true,
            presentation: {
              plugins: ["highlight", "math"]
            },
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
            Name: "mrhope",
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
