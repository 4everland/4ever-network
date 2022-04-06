<template>
	<v-app>
		<app-header />
		<v-main>
			<router-view />
		</v-main>
		<app-footer />
	</v-app>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
	name: "App",
	components: { AppHeader, AppFooter },

	data: () => ({
		//
	}),
};
</script>
<style lang="less" scoped>
/deep/ .v-main__wrap {
	background: linear-gradient(
		90deg,
		#ffffff 0%,
		#e5efff 5%,
		#ffffff 45%,
		#ffffff 80%,
		#fef4ff 100%
	);
}
</style>
