<template>
  <div class="map mt-16">
    <div class="common-title-box mb-4">
      <span class="d-flex align-center cardtitle--text"
        >4EVERLAND Validators Map</span
      >
    </div>
    <div
      id="map"
      style="
        width: 100%;
        height: 500px;
        justify-content: center;
        position: relative;
      "
    ></div>
  </div>
</template>

<script>
import { Scene, PointLayer } from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";
import { fetchNodeMapChart } from "@/api/home.js";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    initMap(data) {
      const scene = new Scene({
        id: "map",
        logoVisible: false,
        map: new Mapbox({
          style: this.$vuetify.theme.dark ? "dark" : "light",
          center: [103.83735604457024, 1.360253881403068],
          pitch: 4.00000000000001,
          zoom: 1.210275860702593,
          token:
            "pk.eyJ1IjoieWVwY2luZyIsImEiOiJjbDFxMGRxeDMxanFjM2dyemg3MTUzcmsyIn0.s_iuQ8JWUI2hjA_pqJHe_w",
        }),
      });
      scene.on("loaded", () => {
        const pointLayer = new PointLayer({})
          .source(data, {
            parser: {
              type: "json",
              x: "lng",
              y: "lat",
            },
          })
          .shape("circle")
          .active(true)
          .animate(true)
          .size(56)
          .color("#4cfd47");
        scene.addLayer(pointLayer);
      });
    },
    getMapChart() {
      fetchNodeMapChart().then((res) => {
        const data = res.data.mapValue;
        this.nodeLocationList = data;
        this.initMap(data);
      });
    },
  },
  created() {},
  mounted() {
    this.getMapChart();
  },
};
</script>
<style lang="less" scoped></style>
