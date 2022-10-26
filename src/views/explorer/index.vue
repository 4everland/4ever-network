<template>
  <div class="explorer">
    <v-container>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        slider-color="transparent"
      >
        <v-tab v-for="item in items" :key="item.name">
          {{ item.label }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="transparent">
        <v-tab-item v-for="item in items" :key="item.name">
          <components :is="item.name"></components>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import explorerNode from "./components/explorerNode.vue";
import explorerTeereport from "./components/explorerTeereport.vue";
import explorerSlashes from "./components/explorerSlashes.vue";

export default {
  components: {
    explorerNode,
    explorerTeereport,
    explorerSlashes,
  },
  data() {
    return {
      tab: null,
      items: [
        {
          name: "explorerNode",
          label: "NODES",
        },
        {
          name: "explorerTeereport",
          label: "TEEREPORTS",
        },
        {
          name: "explorerSlashes",
          label: "SLASHES",
        },
      ],
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
