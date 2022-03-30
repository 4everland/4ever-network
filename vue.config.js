const path = require("path");
module.exports = {
  transpileDependencies: ["vuetify"],
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "https://view.foreverland.xyz",
  //       changeOrigin: true,
  //       pathRewrite: { "^/api": "" },
  //     },
  //   },
  // },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
  },
};
