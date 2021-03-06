const { config } = require("vuepress-theme-hope");
const navBarConfig = require("./config/navbar");
const sideBarConfig = require("./config/sideBar");

module.exports = config({
    title: "๐ญ๐๐๐๐๐ ๐พ๐๐๐๐ ๐ญ๐๐๐",
    description: "๐ค๐๐๐๐๐ป๐ฎ๐ฎ๐ฝ๐ฒ๐ท๐ฐ๐ผ! ๐'๐ถ ๐๐ป๐ฎ๐ฎ๐๐ฎ ๐ข๐ฑ๐ช๐ท๐ฎ ~๐๐๐๐ค",

    head: [
        // ็พๅบฆ็ซ็น้ช่ฏ
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
        logo: "/้ๅฐ.svg",
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
                    "็นๅพๅ่งฃ",
                    "ๅฅๅผๅผๅ่งฃ",
                    "Moore-Penroseไผช้",
                    "[ๅฎไพ]ไธปๆๅๅๆ",
                  ],
                },
                {
                  title: "Probability Theory",
                  prefix: "ProbabilityTheory/",
                  children: [
                    "้ๆบๅ้",
                    "ๆฆ็ๅๅธ",
                    "่พน็ผๆฆ็",
                    "ๆกไปถๆฆ็ๅๅถ้พๅผๆณๅ",
                    "็ฌ็ซๆงๅๆกไปถ็ฌ็ซๆง",
                    "ๆๆใๆนๅทฎๅๅๆนๅทฎ",
                    "ๅธธ่งๆฆ็ๅๅธ",
                    "ๅธธ่งๅฝๆฐๅๅถๆง่ดจ",
                    "่ดๅถๆฏ่งๅ",
                    "่ฟ็ปญๆงๅ้็ๆๆฏ็ป่",
                    "ไฟกๆฏ่ฎบ",
                    "็ปๆๅๆฆ็ๆจกๅ",
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
                "NormalForm",
                // "QueryOptimization",
                // "Trigger",
                // "DatabaseSafety",
              ],
            },
            {
              title: "Linux",
              prefix: "Linux/",
              children: [
                "Manjaroๅฎ่ฃไธ้็ฝฎ",
                "ZeroTier-Oneๅฎ่ฃไธไฝฟ็จ",
                "่ฎฐๆๅกๅจๆญๅปบ่ฟ็จ",
                "PrivateNetdiskBuilding",
                "ArcolinuxAndAwesomeWM",
                "AutoIAC",
                "Shells",
                "BuildingServer",
                "openGauss",
                "ShareConda",
                "UUA",
                "SystemSafety",
                "KeXieNetDisk",
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
                  "Markdown่ฏญๆณๆ่ฎฐ",
                  "LaTeXforMd",
                  "ChangeBlogTheme",
                  "CreateNewFilebyShell",
                ],
              },
            "Crawler",
            "Windows10ๅฟซๆท้ฎๅคงๅจ",
            "VComputer",
            "Git_Commands",
            "/about/",
          ],
        // locales: {
        //     /** ่ฑๆ่ฎพ็ฝฎ */
        //     "/en/": {
        //         nav: navBarConfig.en,
        //         sidebar: sideBarConfig.en,
        //     },
        // },

        blog: {
            name: "๐ญ๐๐๐๐๐ ๐พ๐๐๐๐",
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
            copyright: "Copyright ยฉ 2021-present Breeze Shane",
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
