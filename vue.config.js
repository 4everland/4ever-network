function resolve(dir) {
  return path.join(__dirname, dir);
}

const path = require("path");
const webpack = require("webpack");
module.exports = {
  productionSourceMap: false,
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
        "@": resolve("src"),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: "mapbox-gl",
      }),
    ],
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "4EVERLAND Explorer | 4EVERLAND";
      return args;
    });
  },
};
