import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuetifyDialog from "vuetify-dialog";
// import { Stake__factory } from "4everland-dao-contracts";
import "vuetify-dialog/dist/vuetify-dialog.css";
// import * as echarts from "echarts";
import snackbar from "vuetify-snackbars";
import "@/assets/font/iconfont.css";
import "./styles/reset.css";
import "./styles/common.scss";
Vue.use(snackbar);
Vue.config.productionTip = false;
// Vue.prototype.$echarts = echarts;
Vue.prototype.$vuetify = vuetify;
Vue.use(VuetifyDialog, {
  context: {
    vuetify,
  },
});

let vm = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

export default vm;
