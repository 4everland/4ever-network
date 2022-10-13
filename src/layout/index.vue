<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view />
    </v-main>
    <!-- <app-footer /> -->
  </v-app>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
  name: "layout",
  components: { AppHeader, AppFooter },
  created() {},
  mounted() {
    //
  },
  data: () => ({
    //
  }),
};
</script>
<style lang="less" scoped></style>
