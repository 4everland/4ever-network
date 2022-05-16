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
    return {
      scene: null,
      pointLayer: null,
      maxSize: 100,
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const map = new Mapbox({
        pitch: 0,
        token:
          "pk.eyJ1IjoiNGV2ZXJsYW5kIiwiYSI6ImNsMXZqZjd0bzAxeGYzZG1yZHRleng3d28ifQ.jo3h6cZvLjm8snIHAI6NCQ",
        style: "light",
        center: [14.857049565957709, 17.050336040201174],
        zoom: 1.2,
        maxZoom: 10,
        dragRotate: false,
      });
      this.scene = new Scene({
        id: "map",
        map,
      });
      this.scene.on("loaded", () => {
        const data = {
          features: [
            {
              geometry: {
                coordinates: [-0.12, 51.51],
                type: "Point",
              },
              properties: {
                capacity: 1000,
                country: "United Kingdom",
                plant: "London",
                color: "#ABCAEA",
              },
            },
            {
              geometry: {
                coordinates: [-123.11, 49.33],
                type: "Point",
              },
              properties: {
                capacity: 1000,
                country: "Canada",
                plant: "Vancouver",
                color: "#ABCAEA",
              },
            },
            {
              geometry: {
                coordinates: [-73.96, 40.73],
                type: "Point",
              },
              properties: {
                capacity: 1000,
                country: "United States",
                plant: "New York",
                color: "#ABCAEA",
              },
            },
            {
              geometry: {
                coordinates: [114.17, 22.33],
                type: "Point",
              },
              properties: {
                capacity: 1000,
                country: "China",
                plant: "Hong Kong",
                color: "#ABCAEA",
              },
            },
            {
              geometry: {
                coordinates: [151.24, -33.75],
                type: "Point",
              },
              properties: {
                capacity: 1000,
                country: "Australia",
                plant: "Sydney",
                color: "#ABCAEA",
              },
            },
          ],
          type: "FeatureCollection",
        };
        this.pointLayer = new PointLayer({})
          .source(data)
          .shape("circle")
          .size("capacity", [10, 100])
          .color("color")
          .animate({
            rings: 1,
            speed: 0.7,
          })
          // .active(true)
          .style({
            // opacity: 0.5,
            strokeWidth: 20,
          });
        this.scene.addLayer(this.pointLayer);
      });
      this.scene.on("zoomchange", (e) => {
        const currentZoom = this.scene.getZoom().toFixed(2);
        let maxSize = currentZoom * 50;
        this.pointLayer.size("capacity", [10, maxSize]);
        this.pointLayer.render();
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
