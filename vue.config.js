const path = require("path");
module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.0.111:9432",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
  },
};
