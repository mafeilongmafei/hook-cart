const {
  addDecoratorsLegacy,
  override,
  addWebpackAlias
} = require("customize-cra");

const path = require("path");
module.exports = override(
 
  //添加装饰器
  addDecoratorsLegacy(),
  //添加别名
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src/"),
    "c": path.resolve(__dirname, "./src/components"),
  })
);
