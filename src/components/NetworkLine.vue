<template>
  <div style="width: 100%; height: 100%" :id="echarts"></div>
</template>

<script>
export default {
  props: {
    xAxisData: {
      type: Array,
      default: () => {
        return ["1", "2", "3", "4", "5"];
      },
    },
    yAxisData: {
      default: () => {
        return [820, 932, 901, 934, 1290];
      },
    },
    yAxisLabelFormatter: {
      type: String || Function,
      default: "{value}%",
    },
    grid: {
      type: Object,
      default: () => {
        return {
          top: "5%",
          left: "1%",
          right: "1%",
          bottom: "1%",
          containLabel: true,
        };
      },
    },
  },
  data() {
    return {
      myLineChart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  methods: {
    drawLine() {
      this.myLineChart = this.$echarts.init(
        document.getElementById(this.echarts)
      );
      window.addEventListener("resize", () => {
        this.myLineChart.resize();
      });
      this.setEchartsOption();
    },
    setEchartsOption() {
      this.myLineChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: (params) => {
            const data = params[0];
            const hours = new Date(data.axisValue * 1000).getUTCHours();
            const date = new Date(data.axisValue * 1000).toUTCString();
            const str = date.split(" ");
            const nowTime =
              str[2] + " " + str[1] + " " + str[3] + " " + hours + ":00";
            return `${nowTime}</br>
              ${data.data}%`;
          },
        },
        grid: this.grid,
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxisData,
          // splitLine: {
          // 	show: true,
          // },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
            color: "#7F8489",
            formatter: function (value, index) {
              return new Date(value * 1000).getUTCHours() + ":00";
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: this.yAxisLabelFormatter,
          },
          max: 100,
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            smooth: true,
            lineStyle: {
              color: "rgb(52, 169, 255, .2)",
              width: 1,
            },
            areaStyle: {
              color: "rgb(52, 169, 255, .2)",
            },
            emphasis: {
              disabled: true,
            },
            itemStyle: {
              color: "#34A9FF",
            },
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
  watch: {
    xAxisData() {
      this.myLineChart.clear();
      this.setEchartsOption();
    },
    yAxisData() {
      this.myLineChart.clear();
      this.setEchartsOption();
    },
  },
};
</script>

<style lang="scss" scoped></style>
