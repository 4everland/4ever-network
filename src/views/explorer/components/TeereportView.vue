<template>
  <div class="teereport-view" v-show="dialog" @click.stop="closeDialog">
    <v-card
      transition="slide-x-transition"
      class="teereport-container"
      v-click-outside="onClickOutside"
      @click.stop="onClickIn"
      >123</v-card
    >
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialog: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    onClickOutside() {},
    onClickIn(e) {
      e.preventDefault();
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.teereport-view {
  width: 100%;
  height: 100vh;
  padding: 0 45px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 201;
  .teereport-container {
    width: 96%;
    max-width: 1350px;
    height: 625px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
    border-radius: 15px 15px 0 0;
  }
}
</style>
