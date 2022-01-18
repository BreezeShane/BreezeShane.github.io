"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlias = void 0;
const path_1 = require("path");
const getAlias = (themeConfig, ctx) => {
    const { siteConfig } = ctx;
    // Resolve algolia
    const isAlgoliaSearch = Boolean(themeConfig.algolia) ||
        Object.keys((siteConfig.locales && themeConfig.locales) || {}).some((base) => themeConfig.locales[base].algolia);
    const blogEnabled = themeConfig.blog !== false;
    const commentEnabled = themeConfig.comment &&
        themeConfig.comment.type &&
        themeConfig.comment.type !== "disable";
    const themeColorEnabled = !(themeConfig.themeColor === false && themeConfig.darkmode === "disable");
    const { custom = {} } = themeConfig;
    const noopModule = "@mr-hope/vuepress-shared/lib/esm/noopModule";
    return {
        "@AlgoliaSearchBox": isAlgoliaSearch
            ? themeConfig.algoliaType === "full"
                ? path_1.resolve(__dirname, "../components/AlgoliaSearch/Full.vue")
                : path_1.resolve(__dirname, "../components/AlgoliaSearch/Dropdown.vue")
            : noopModule,
        "@BlogInfo": blogEnabled
            ? path_1.resolve(__dirname, "../components/Blog/BlogInfo.vue")
            : noopModule,
        "@BloggerInfo": blogEnabled
            ? path_1.resolve(__dirname, "../components/Blog/BloggerInfo.vue")
            : noopModule,
        "@BlogHome": blogEnabled
            ? path_1.resolve(__dirname, "../components/Blog/BlogHome.vue")
            : noopModule,
        "@BlogPage": blogEnabled
            ? path_1.resolve(__dirname, "../components/Blog/BlogPage.vue")
            : noopModule,
        "@ContentTop": custom.contentTop
            ? path_1.resolve(ctx.sourceDir, ".vuepress", custom.contentTop)
            : noopModule,
        "@ContentBottom": custom.contentBottom
            ? path_1.resolve(ctx.sourceDir, ".vuepress", custom.contentBottom)
            : noopModule,
        "@PageTop": custom.pageTop
            ? path_1.resolve(ctx.sourceDir, ".vuepress", custom.pageTop)
            : noopModule,
        "@PageBottom": custom.pageBottom
            ? path_1.resolve(ctx.sourceDir, ".vuepress", custom.pageBottom)
            : noopModule,
        "@Comment": commentEnabled
            ? "@mr-hope/vuepress-plugin-comment/lib/client/Comment.vue"
            : noopModule,
        "@NavbarStart": custom.navbarStart
            ? path_1.resolve(ctx.sourceDir, ".vuepress", custom.navbarStart)
            : noopModule,
        "@NavbarCenter": custom.navbarCenter
            ? path_1.resolve(ctx.sourceDir, ".vuepress", custom.navbarCenter)
            : noopModule,
        "@NavbarEnd": custom.navbarEnd
            ? path_1.resolve(ctx.sourceDir, ".vuepress", custom.navbarEnd)
            : noopModule,
        "@ThemeColor": themeColorEnabled
            ? path_1.resolve(__dirname, "../components/Theme/ThemeColor.vue")
            : noopModule,
        "@SidebarTop": custom.sidebarTop
            ? path_1.resolve(ctx.sourceDir, ".vuepress", custom.sidebarTop)
            : noopModule,
        "@SidebarCenter": custom.sidebarCenter
            ? path_1.resolve(ctx.sourceDir, ".vuepress", custom.sidebarCenter)
            : noopModule,
        "@SidebarBottom": custom.sidebarBottom
            ? path_1.resolve(ctx.sourceDir, ".vuepress", custom.sidebarBottom)
            : noopModule,
    };
};
exports.getAlias = getAlias;
//# sourceMappingURL=alias.js.map