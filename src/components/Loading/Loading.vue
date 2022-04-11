<template>
	<div class="loading-container">
		<v-dialog v-model="dialog" width="200" persistent>
			<v-card>
				<v-card-text class="text-center">
					<v-progress-circular
						indeterminate
						color="primary"
					></v-progress-circular>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-snackbar v-model="snackbar" :color="color" text centered>
			<div class="d-flex align-center">
				<i class="iconfont" :class="iconClass" :style="{ color }"></i>
				<span class="ml-3">{{ content }}</span>
			</div>
			<!-- <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template> -->
		</v-snackbar>
	</div>
</template>
<script>
export default {
	name: "Loading",
	data() {
		return {
			dialog: false,
			snackbar: false,
			content: "",
			color: "gray",
			iconClass: "icon-chenggong",
		};
	},
	methods: {
		show() {
			this.dialog = true;
		},
		hide() {
			this.dialog = false;
		},
		success(params) {
			if (params instanceof Object) {
				throw new Error("argument can not be Object");
			}
			this.iconClass = "icon-chenggong";
			this.color = "green";
			this.snackbar = true;
			this.content = params;
		},
		warning(params) {
			this.iconClass = "icon-tixingshixin";
			this.color = "#DE912F";
			this.snackbar = true;
			this.content = params;
		},
		error(params) {
			this.iconClass = "icon-cuowutishitianchong";
			this.color = "red";
			this.snackbar = true;
			this.content = params;
		},
	},
};
</script>
<style lang="less" scoped>
/deep/ .v-card__text {
	padding: 20px !important;
}
</style>
