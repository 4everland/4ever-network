<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <div class="common-title-box mb-4">
          <span class="d-flex align-center cardtitle--text">
            <v-icon v-text="'$accuracyRateIcon'" small class="mr-2"></v-icon
            >Accuracy Rate</span
          >
          <span>
            <v-select :items="items" label="Solo field" dense solo></v-select>
          </span>
        </div>
        <div id="lineChart"></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { Line } from "@antv/g2plot";
import { fetchReportList } from "@/api/home.js";
import { formart_date } from "@/utils/utils";
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 4 },
  { year: "1993", value: 3.5 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 6 },
  { year: "1997", value: 7 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];

export default {
  components: {},
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      xAxisData: [],
      yAxisData: [],
    };
  },
  computed: {
    // searchNodeList() {
    //   if (this.selectSearchValue == "") return this.nodeList;
    //   if (!this.nodeList.length) return this.nodeList;
    //   const reg = new RegExp(this.selectSearchValue, "ig");
    //   return this.nodeList.filter((item) => item.match(reg));
    // },
  },
  watch: {},
  methods: {
    async setChart() {
      const { data } = await fetchReportList();
      // console.log(data);
      const line = new Line("lineChart", {
        height: 350,
        padding: "auto",
        data: data.item,
        xField: "blockCreatedAt",
        yField: "averageAccuracyRate",
        smooth: true,
        xAxis: {
          label: {
            formatter(val) {
              return formart_date(parseInt(val), "{h}");
            },
          },
        },
        yAxis: {
          label: {
            formatter(val) {
              return val / 1e2 + "%";
            },
          },
        },
        tooltip: {
          showTitle: false,
          formatter: (datum) => {
            return {
              name: formart_date(parseInt(datum.blockCreatedAt), "{h}"),
              value: datum.averageAccuracyRate / 1e2 + "%",
            };
          },
        },
      });

      line.render();
    },
    async getChartsData() {
      try {
        const result = await fetchReportList({ page: 1, size: 500 });
        const time = Date.now() / 1000 - 24 * 60 * 60;
        const data = result.item.filter((obj) => {
          return obj.blockCreatedAt > time;
        });
        if (!data.length) {
          let recordDate = parseInt(new Date().getTime() / 1000);
          let arr = [];
          for (let i = 0; i < 12; i++) {
            arr.unshift(recordDate - (i + 1) * 7200);
          }
          this.xAxisData = arr;
          this.yAxisData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        } else {
          let timeMap = {};
          const xArr = [];
          const xArrData = [];
          data.forEach((item) => {
            const key = new Date(item.blockCreatedAt * 1000).getHours();
            if (!xArr.includes(key)) {
              xArr.push(key);
              xArrData.push(item.blockCreatedAt);
            }
            if (timeMap[key]) {
              timeMap[key].sum += item.averageAccuracyRate;
              timeMap[key].count++;
            } else {
              timeMap[key] = {
                sum: item.averageAccuracyRate,
                count: 1,
              };
            }
          });
          const yArr = xArr.map((key) => {
            return (timeMap[key].sum / timeMap[key].count / 100).toFixed(2);
          });
          this.xAxisData = xArrData.reverse();
          this.yAxisData = yArr.reverse();
        }
      } catch (err) {
        console.log(err, "err");
      }
    },
  },
  created() {},
  mounted() {
    this.setChart();
    // this.getChartsData();
  },
};
</script>
<style lang="less" scoped>
.block-card {
  padding: 30px 35px;
}
</style>
