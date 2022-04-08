const prodPlugins = [];
if (
	process.env.NODE_ENV === "devbuild" ||
	process.env.NODE_ENV === "prodbuild"
) {
	prodPlugins.push("transform-remove-console");
}
module.exports = {
	presets: ["@vue/cli-plugin-babel/preset"],
	plugins: prodPlugins,
};
