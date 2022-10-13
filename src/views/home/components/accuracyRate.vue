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
    };
  },
  computed: {},
  watch: {},
  methods: {
    setChart() {
      const line = new Line("lineChart", {
        height: 450,
        padding: "auto",
        data,
        xField: "year",
        yField: "value",
        smooth: true,
      });

      line.render();
    },
  },
  created() {},
  mounted() {
    this.setChart();
  },
};
</script>
<style lang="less" scoped>
.block-card {
  padding: 30px 35px;
}
</style>
