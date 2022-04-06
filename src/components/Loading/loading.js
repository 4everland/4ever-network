import LoadingComponent from "./Loading.vue";
import Vuetify from "vuetify/lib";
const loading = {
  install: function (Vue) {
    const LoadingConstructor = Vue.extend(LoadingComponent);
    const instance = new LoadingConstructor();
    instance.$vuetify = new Vuetify().framework;
    let vm = instance.$mount();
    Vue.nextTick(() => {
      setTimeout(() => {
        let app = document.getElementById("app");
        app && app.appendChild(vm.$el);
      }, 100);
    });
    Vue.prototype.$loading = {
      show: instance.show,
      hide: instance.hide,
    };
    Vue.prototype.$message = {
      success: instance.success,
      warning: instance.warning,
      error: instance.error,
    };
  },
};

export default loading;
