let Url;
const env = process.env;
console.log(env.NODE_ENV);
if (env.VUE_APP_NODE_ENV == "dev") {
  Url = "/api";
} else if (env.VUE_APP_NODE_ENV == "prod") {
  Url = "456";
}
export default Url;