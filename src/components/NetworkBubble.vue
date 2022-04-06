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
        style: "light",
        center: [96.99215001469588, 29.281597225674773],
        zoom: 2,
        maxZoom: 10,
      });
      this.scene = new Scene({
        id: "map",
        map,
      });

      // this.scene.on("loaded", () => {
      //   fetch(
      //     "https://gw.alipayobjects.com/os/basement_prod/337ddbb7-aa3f-4679-ab60-d64359241955.json"
      //   )
      //     .then((res) => res.json())
      //     .then((data) => {
      //       data.features = data.features.filter((item) => {
      //         return item.properties.capacity > 4000;
      //       });
      //       console.log(data);
      //       const pointLayer = new PointLayer({})
      //         .source(data)
      //         .shape("circle")
      //         .size("capacity")
      //         .color("capacity", ["#ABCAEA", "#ABCAEA", "#ABCAEA"])
      //         .animate(true)
      //         .active(true)
      //         .style({
      //           opacity: 1,
      //           strokeWidth: 0,
      //         });
      //       this.scene.addLayer(pointLayer);
      //     });
      // });

      this.scene.on("loaded", () => {
        const data = {
          features: [
            {
              geometry: {
                coordinates: [121.47, 31.24],
                type: "Point",
              },
              properties: {
                capacity: 1000,
                country: "China",
                plant: "ShangHai",
                color: "#ABCAEA",
              },
            },
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
                coordinates: [126.99, 37.55],
                type: "Point",
              },
              properties: {
                capacity: 1000,
                country: "Korea",
                plant: "Seoul",
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
            {
              geometry: {
                coordinates: [13.41, 52.52],
                type: "Point",
              },
              properties: {
                capacity: 1000,
                country: "Deutschland",
                plant: "Berlin",
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
          .animate(true)
          .active(true)
          .style({
            opacity: 1,
            stroke: "red",
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
