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
	lintOnSave: false,
	// chainWebpack: (config) => {
	// 	config.when(process.env.NODE_ENV !== "development", (config) => {
	// 		config
	// 			.plugin("ScriptExtHtmlWebpackPlugin")
	// 			.after("html")
	// 			.use("script-ext-html-webpack-plugin", [
	// 				{
	// 					// `runtime` must same as runtimeChunk name. default is `runtime`
	// 					inline: /runtime\..*\.js$/,
	// 				},
	// 			])
	// 			.end();
	// 		config.optimization.splitChunks({
	// 			chunks: "all",
	// 			cacheGroups: {
	// 				libs: {
	// 					name: "chunk-libs",
	// 					test: /[\\/]node_modules[\\/]/,
	// 					priority: 10,
	// 					chunks: "initial", // only package third parties that are initially dependent
	// 				},
	// 				vuetify: {
	// 					name: "chunk-vuetify", // split elementUI into a single package
	// 					priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
	// 					test: /[\\/]node_modules[\\/]_?vuetify(.*)/, // in order to adapt to cnpm
	// 				},
	// 				commons: {
	// 					name: "chunk-commons",
	// 					test: resolve("src/components"), // can customize your rules
	// 					minChunks: 3, //  minimum common number
	// 					priority: 5,
	// 					reuseExistingChunk: true,
	// 				},
	// 			},
	// 		});
	// 		config.optimization.runtimeChunk("single");
	// 	});
	// },
};
