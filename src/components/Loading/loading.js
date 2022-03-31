import LoadingComponent from "./Loading.vue";
const loading = {
  install: function (Vue) {
    const LoadingConstructor = Vue.extend(LoadingComponent);
    const instance = new LoadingConstructor();
    instance.$mount(document.createElement("div"));
    document.body.appendChild(instance.$el);
    Vue.prototype.$loading = {
      show: () => {
        instance.show = true;
      },
      hide: () => {
        instance.show = false;
      },
    };
    window.$loading = Vue.prototype.$loading;
  },

  // show: function () {
  //   console.log('show')
  // }
};

export default loading;
