import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./styles/reset.css";

Vue.config.productionTip = false;
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.prototype.$vuetify = vuetify;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
