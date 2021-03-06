const { sidebarConfig } = require("vuepress-theme-hope");

module.exports = sidebarConfig([
  "",
  "install",
  "get-started",
  {
    title: "įŽææå",
    icon: "guide",
    collapsable: false,
    prefix: "guide/",
    children: [
      "basic",
      "customization",
      "extension",
      "file",
      "edit",
      "intellisense",
      "git",
      "debug",
      "task",
      "command",
    ],
  },
  "ui",
  "settings",
  "shortcut-key",
]);
