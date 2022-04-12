import LoadingComponent from "./FullScreenLoading.vue";
const loading = {
	install: function (Vue) {
		const LoadingConstructor = Vue.extend(LoadingComponent);
		const instance = new LoadingConstructor();
		let vm = instance.$mount();
		Vue.nextTick(() => {
			setTimeout(() => {
				let app = document.getElementById("app");
				app && app.appendChild(vm.$el);
			}, 100);
		});
		Vue.prototype.$fullScreenLoading = {
			start: instance.start,
			finish: instance.finish,
		};
	},
};

export default loading;
