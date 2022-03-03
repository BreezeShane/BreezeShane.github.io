const { sidebarConfig } = require("vuepress-theme-hope");

module.exports = {
    zh: sidebarConfig({

        "/about/": ["", "site"],

        // fallback
        "/": ["", "/about/"],
    }),

    en: sidebarConfig({

        "/en/about/": ["", "site"],

        // fallback
        "/en/": ["", "about/"],
    }),
};