"use strict";

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "front-influencer";
const packageName = "main";

module.exports = {
  // 路径别名
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve(""),
        "@s": resolve(`static/${packageName}`),
        "@a": resolve("api"),
        "@co": resolve("common"),
        "@cps": resolve("components"),
        "@cp": resolve("pages/component"),
      },
    },
  },
};