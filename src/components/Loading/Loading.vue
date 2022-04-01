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

    <v-snackbar v-model="snackbar" :color="color" text>
      <div class="d-flex align-center">
        <i class="iconfont" :class="iconClass" :style="{ color }"></i>
        <span class="ml-3">{{ content }}</span>
      </div>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
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
// .loading-container {
//   position: relative;
//   z-index: 9999;
//   .loading-mask {
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     background-color: rgba(0, 0, 0, 0.1);
//   }
//   .loading-content {
//     position: fixed;
//     left: 50%;
//     top: 45%;
//     z-index: 300;
//     transform: translate(-50%, -45%);
//     text-align: center;
//   }
// }
/deep/ .v-card__text {
  padding: 20px !important;
}
</style>
