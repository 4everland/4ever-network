<template>
  <div class="bubble-container" style="height: 100%">
    <div id="map" style="position: relative; height: 100%"></div>
  </div>
</template>

<script>
import { Scene, PointLayer } from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";

export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const scene = new Scene({
        id: "map",
        map: new Mapbox({
          pitch: 0,
          style: "mapbox://styles/mapbox/outdoors-v11",
          center: [96.99215001469588, 29.281597225674773],
          zoom: 2.194613775109773,
          maxZoom: 10,
        }),
      });
      scene.on("loaded", () => {
        fetch(
          "https://gw.alipayobjects.com/os/basement_prod/337ddbb7-aa3f-4679-ab60-d64359241955.json"
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            data.features = data.features.filter((item) => {
              return item.properties.capacity > 4000;
            });
            const pointLayer = new PointLayer({})
              .source(data)
              .shape("circle")
              .size("capacity", [50, 50])
              .color("capacity", ["#ABCAEA", "#ABCAEA", "#ABCAEA"])
              .animate(true)
              .active(true)
              .style({
                opacity: 0.5,
                strokeWidth: 0,
              });

            scene.addLayer(pointLayer);
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bubble-container {
  #id {
    height: 100%;
    position: relative;
  }
}
</style>
