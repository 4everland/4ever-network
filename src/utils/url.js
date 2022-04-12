let Url;
const env = process.env;
if (env.VUE_APP_NODE_ENV == "dev") {
	Url = "https://view.foreverland.xyz";
} else if (env.VUE_APP_NODE_ENV == "prod") {
	Url = "https://explorer-api.4everland.org";
}
export default Url;
