<template>
  <div class="map">
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
import { Scene, PointLayer, HeatmapLayer } from "@antv/l7";
import { Mapbox, GaodeMap } from "@antv/l7-maps";

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
    // initMap() {
    //   const scene = new Scene({
    //     id: "map",
    //     map: new Mapbox({
    //       style: this.$vuetify.theme.dark ? "dark" : "light",
    //       center: [103.83735604457024, 1.360253881403068],
    //       pitch: 4.00000000000001,
    //       zoom: 1.210275860702593,
    //       token:
    //         "pk.eyJ1IjoieWVwY2luZyIsImEiOiJjbDFxMGRxeDMxanFjM2dyemg3MTUzcmsyIn0.s_iuQ8JWUI2hjA_pqJHe_w",
    //     }),
    //   });
    //   scene.on("loaded", () => {
    //     fetch(
    //       "https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json"
    //     )
    //       .then((res) => res.json())
    //       .then((data) => {
    //         const layer = new HeatmapLayer({})
    //           .source(data)
    //           .shape("heatmap")
    //           .size("mag", [0, 1.0]) // weight映射通道
    //           .style({
    //             intensity: 2,
    //             radius: 20,
    //             rampColors: {
    //               colors: [
    //                 "#FF4818",
    //                 "#F7B74A",
    //                 "#FFF598",
    //                 "#91EABC",
    //                 "#2EA9A1",
    //                 "#206C7C",
    //               ].reverse(),
    //               positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    //             },
    //           });
    //         scene.addLayer(layer);
    //       });
    //   });
    // },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
