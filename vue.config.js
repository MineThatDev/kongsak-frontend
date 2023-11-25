const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    https: true,
    hot: true,
    proxy: {
      "^/api": {
        target: "http://localhost:4000",
        pathRewrite: {
          "^/api": "",
        },
      },
      "^/xapi": {
        target: "http://localhost:3000",
        pathRewrite: {
          "^/xapi": "",
        },
      },
    },
  },
  transpileDependencies: ["quasar"],
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    },
  },
});
