import { navbar } from "vuepress-theme-hope";

export const Navbar = navbar([
  {
    text: "Main Menu",
    icon: "/menu.svg",
    children: [
      "/",
      "/links/",
      "/qap/",
      "/about/",
    ]
  },
  {
    text: "Mathematics",
    icon: '/navicons/math.svg',
    prefix: "/Mathematics/",
    children: [
      {
        text: "Linear Algebra",
        prefix: "LinearAlgebra/",
        children: [
          "RelativeConcepts",
          "RelativeCompute",
          "Norm",
          "特征分解",
          "奇异值分解",
          "Moore-Penrose伪逆",
          "「实例」主成分分析",
        ],
      },
      {
        text: "Probability Theory",
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
    text: "Aritficial Intelligence",
    prefix: "/ArtificialIntelligence/",
    icon: "/navicons/AI.svg",
    children: [
        "AIOverview",
        "EnvInstall",
        {
          text: "Generative Adversarial Networks",
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
        "GPU",
    ],
  },
  {
    text: "Data Structures",
    prefix: "/DataStructures/",
    icon: "/navicons/data_structure.svg",
    children: [
      "Basis",
      "LinearList",
      {
        text: "Stack",
        children: [
          "StackBasedonSequentialLinearList",
          "StackBasedonSingleLinkedList",
        ],
      },
      "Queue",
      {
        text: "Tree",
        prefix: "Tree/",
        children: [
          "BinaryTree",
          "2-3Tree",
          "Red-BlackTree",
          "BTree",
          "B-plusTree.md",
        ],
      },
    ],
  },
  {
    text: "Algorithm Design and Analysis",
    prefix: "/AlgorithmDesignAndAnalysis/",
    icon: "/navicons/algorithm.svg",
    children: [
      "Basis",
    ],
  },
  {
    text: "DataBase",
    prefix: "/Database/",
    icon: "/navicons/database.svg",
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
    text: "Linux",
    prefix: "/Linux/",
    icon: "/navicons/archlinux.svg",
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
      "KeXieNetDisk",
      "ArchLinux",
    ],
  },
  {
    text: "Web",
    prefix: "/Web/",
    icon: "/navicons/web.svg",
    children: [
      "HowtoForceCVWhenBanned",
      "Frontbackend",
      "SDN",
    ],
  },
  {
    text: "Blog",
    prefix: "/BlogBuildingAndUsing/",
    icon: "/navicons/blog.svg",
    children: [
      "BlogBuilding",
      "Markdown语法杂记",
      "LaTeXforMd",
      "ChangeBlogTheme",
      "CreateNewFilebyShell",
    ],
  },  
  {
    text: "Others",
    prefix: "/",
    icon: "/navicons/others.svg",
    children: [
      "Crawler",
      "Windows10快捷键大全",
      "VComputer",
      "Git_Commands",
    ]
  },
]);