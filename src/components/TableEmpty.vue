<template>
  <div class="empty py-6">
    <v-img
      class="ma-auto"
      max-width="160"
      :src="$vuetify.theme.dark ? imgDark : imgLight"
    ></v-img>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgDark: require("@/assets/imgs/empty/empty-dark.png"),
      imgLight: require("@/assets/imgs/empty/empty-light.png"),
    };
  },
};
</script>
<style lang="less" scoped></style>
