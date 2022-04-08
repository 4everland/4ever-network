const path = require("path");
const webpack = require("webpack");
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
		plugins: [
			new webpack.ProvidePlugin({
				mapboxgl: "mapbox-gl",
			}),
		],
	},
	lintOnSave: false,
};
