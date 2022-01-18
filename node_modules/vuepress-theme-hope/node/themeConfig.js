"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveThemeConfig = void 0;
const vuepress_shared_1 = require("@mr-hope/vuepress-shared");
const encrypt_1 = require("./encrypt");
const setThemeLocales = (themeConfig, rootLang) => {
    const rootLangPath = vuepress_shared_1.lang2Path(rootLang);
    // set locate for base
    themeConfig.locales["/"] = Object.assign(Object.assign(Object.assign({}, vuepress_shared_1.getLocale(rootLang)), (themeConfig.locales[rootLangPath] || {})), (themeConfig.locales["/"] || {}));
    // handle other languages
    Object.keys(themeConfig.locales).forEach((path) => {
        if (path === "/")
            return;
        const lang = vuepress_shared_1.path2Lang(path);
        themeConfig.locales[path] = Object.assign(Object.assign({}, vuepress_shared_1.getLocale(lang)), themeConfig.locales[path]);
    });
};
const resolveThemeConfig = (themeConfig, rootLang) => {
    setThemeLocales(themeConfig, rootLang);
    if (themeConfig.encrypt)
        encrypt_1.resolveEncrypt(themeConfig.encrypt);
};
exports.resolveThemeConfig = resolveThemeConfig;
//# sourceMappingURL=themeConfig.js.map