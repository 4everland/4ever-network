<template>
  <div class="explorer">
    <v-container>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        slider-color="transparent"
      >
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="transparent">
        <v-tab-item v-for="item in items" :key="item">
          <explorerNode />
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import explorerNode from "./components/explorerNode.vue";

export default {
  components: {
    explorerNode,
  },
  data() {
    return {
      tab: null,
      items: ["NODES", "TEEREPORTS", "SLASHES"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
