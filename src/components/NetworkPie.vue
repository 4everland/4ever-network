<template>
  <div class="echarts-pie" :id="echarts"></div>
</template>

<script>
export default {
  name: "EchartPie",
  props: {
    // colorData: {
    //   type: String,
    //   default: "red",
    // },
    // radiusData: {
    //   type: Array,
    //   default: () => {
    //     return ["40%", "75%"];
    //   },
    // },
    // activeData: {
    //   type: Number,
    //   default: 0,
    // },
    data: {
      type: Array,
      default: () => {
        return [
          { name: "Used storsge", value: 40 },
          { name: "Available", value: 60 },
        ];
      },
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.drawPie();
    });
  },
  methods: {
    drawPie() {
      console.log(this.echarts);
      let myPieChart = this.$echarts.init(
        document.getElementById(this.echarts)
      );
      window.addEventListener("resize", () => {
        myPieChart.resize();
      });
      myPieChart.setOption({
        tooltip: {
          trigger: "none",
        },
        legend: {
          show: true,
          left: "right",
          top: "top",
          formatter: (name) => {
            const value = this.data.find((item) => {
              return item.name == name;
            });
            // return name + "" + value.value;
            return [`{a|${name}}:`, `{b|${value.value}}`].join("");
          },
          // formatter: "{a|这段文本采用样式a}",

          textStyle: {
            rich: {
              a: {
                color: "#7F8489",
                fontSize: 12,
              },
              b: {
                color: "#34A9FF",
                fontSize: 12,
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            radius: [60, 100],
            center: ["50%", "50%"],
            startAngle: 80,
            label: {
              formatter: "{name|{b}}\n{time|{c} %}",
              lineHeight: 15,
              rich: {
                time: {
                  fontSize: 10,
                  color: "#999",
                },
              },
            },
            labelLine: {
              minTurnAngle: 60,
            },
            // labelLayout: function (params) {
            //   const isLeft = params.labelRect.x < myPieChart.getWidth() / 2;
            //   const points = params.labelLinePoints;
            //   points[2][0] = isLeft
            //     ? params.labelRect.x
            //     : params.labelRect.x + params.labelRect.width;
            //   return {
            //     labelLinePoints: points,
            //   };
            // },
            data: this.data,
          },
        ],
      });
    },
  },
  computed: {
    echarts() {
      return "echarts" + Math.random() * 10000;
    },
  },
};
</script>

<style scoped>
.echarts-pie {
  width: 100%;
  height: 100%;
}
</style>
