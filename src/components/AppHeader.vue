<template>
  <div>
    <v-app-bar fixed app color="#FAFAFA" height="100">
      <v-container class="d-flex align-center justify-space-between">
        <v-btn text color="transparent" to="/" class="always-active mr-8">
          <logo />
        </v-btn>
        <div class="d-flex align-center justify-space-between">
          <div class="search-bar">
            <v-text-field hide-details="auto" label="Node/Block/CID......">
              <v-img slot="prepend" src="../assets/imgs/header/search-icon.png">
              </v-img>
            </v-text-field>
          </div>
          <div class="connect-wallet ml-7">
            <img src="../assets/imgs/header/link-icon.png" alt="" />
            <span>Connect Wallet</span>
          </div>
        </div>
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
<style lang="less" scoped>
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
.search-bar {
  width: 297px;
}
.connect-wallet {
  padding: 5px 11px 5px 6px;
  border: 1px solid #34a9ff;
  border-radius: 2px;
  font-size: 14px;
  color: #34a9ff;
  line-height: 20px;
  cursor: pointer;
  img {
    vertical-align: middle;
    margin-right: 6px;
  }
}
</style>
