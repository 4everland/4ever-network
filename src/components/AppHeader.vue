<template>
  <div>
    <v-app-bar fixed app color="#FAFAFA" height="100">
      <v-container class="d-flex align-center">
        <v-btn text color="transparent" to="/" class="always-active mr-8">
          <logo />
        </v-btn>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";

export default {
  components: { Logo },
  data() {
    return {};
  },
};
</script>
<style scoped>
.always-active {
  opacity: 1 !important;
}
.v-btn--active,
.nav-btn:hover {
  color: #2a7eed;
}
/deep/ .v-btn__content {
  opacity: 1 !important;
}
/deep/ .nav-btn .v-btn__content {
  opacity: 1 !important;
}
</style>
