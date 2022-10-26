<template>
  <div class="home">
    <v-container>
      <v-row class="overview">
        <v-col v-for="item in overView" :key="item.key" cols="12" md="3">
          <v-card
            elevation="0"
            :outlined="$vuetify.theme.dark"
            class="text-center item-card"
          >
            <div class="d-flex align-center justify-center">
              <v-img max-height="18" max-width="18" :src="item.icon"></v-img>
              <span class="ml-2 overview-item-title">{{ item.title }}</span>
            </div>
            <div class="overview-item-num datanum--text">
              {{ formart_number(item.value) }}
            </div>
          </v-card>
          <div
            class="under-line"
            :style="{
              background: `linear-gradient(63deg, ${item.colors[0]} 0%, ${item.colors[1]} 100%)`,
            }"
          ></div>
        </v-col>
      </v-row>
      <v-row class="total">
        <v-col cols="12" md="4">
          <v-card
            elevation="0"
            :outlined="$vuetify.theme.dark"
            class="total-card"
          >
            <div
              v-for="item in totalList"
              :key="item.key"
              class="total-card-item"
            >
              <span class="total-card-item-name">{{ item.name }}</span>
              <span class="datanum--text">
                {{ formart_number(item.value) }}</span
              >
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card
            elevation="0"
            :outlined="$vuetify.theme.dark"
            class="total-card"
          >
            <div
              v-for="item in tokenList"
              :key="item.key"
              class="total-card-item token-card-item"
            >
              <span class="total-card-item-name">{{ item.name }}</span>
              <span class="datanum--text">
                {{ formart_number(item.value) }}</span
              >
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" class="chart-col">
          <v-card
            elevation="0"
            :outlined="$vuetify.theme.dark"
            class="block-card pt-2"
          >
            <div class="mb-4">
              <div class="d-flex justify-space-between align-center mb-4">
                <div>
                  <span class="title cardtitle--text">Node</span>
                  <span class="tips">Staked 4ever</span>
                </div>
                <div>
                  <v-btn-toggle
                    v-model="nodeChoose"
                    mandatory
                    dense
                    @change="
                      (val) => {
                        lineChartChange('NODE', val);
                      }
                    "
                  >
                    <v-btn x-small>7D</v-btn>
                    <v-btn x-small>1M</v-btn>
                    <v-btn x-small>ALL</v-btn>
                  </v-btn-toggle>
                </div>
              </div>
              <div id="nodeChart"></div>
            </div>
            <div class="mb-4">
              <div class="d-flex justify-space-between align-center mb-4">
                <div>
                  <span class="title cardtitle--text">User</span>
                  <span class="tips">Staked 4ever</span>
                </div>
                <div>
                  <v-btn-toggle
                    v-model="userChoose"
                    mandatory
                    dense
                    @change="
                      (val) => {
                        lineChartChange('USER', val);
                      }
                    "
                  >
                    <v-btn x-small>7D</v-btn>
                    <v-btn x-small>1M</v-btn>
                    <v-btn x-small>ALL</v-btn>
                  </v-btn-toggle>
                </div>
              </div>
              <div id="userChart"></div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="map-block">
        <v-col cols="12">
          <node-map ref="nodeMap" />
        </v-col>
      </v-row>
      <v-row class="node-block">
        <v-col cols="12" md="4">
          <v-card
            elevation="0"
            :outlined="$vuetify.theme.dark"
            class="block-card"
          >
            <div class="common-title-box mb-4">
              <span class="cardtitle--text">Node Location</span>
            </div>
            <template>
              <v-simple-table root dense fixed-header height="260px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left cardtitle--text">Region</th>
                      <th class="text-left cardtitle--text">Node</th>
                      <th class="text-left cardtitle--text">Tokens(4EVER)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in nodeLocationList" :key="index">
                      <td class="cardtitle--text">{{ item.region }}</td>
                      <td class="datanum--text">
                        {{ formart_number(item.node) }}
                      </td>
                      <td class="datanum--text">
                        {{ formart_number(item.token) }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card
            elevation="0"
            :outlined="$vuetify.theme.dark"
            class="block-card"
          >
            <div class="common-title-box mb-4">
              <span class="cardtitle--text">Major Node</span>
              <span class="more">
                <v-btn text tile plain to="/explorer">View More</v-btn>
              </span>
            </div>
            <template>
              <v-simple-table root dense fixed-header height="260px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left cardtitle--text">Service domian</th>
                      <th class="text-left cardtitle--text">Staked (4EVER)</th>
                      <th class="text-left cardtitle--text">Validator</th>
                      <th class="text-left cardtitle--text">
                        Validators (4EVER)
                      </th>
                      <th class="text-left cardtitle--text">Reward (4EVER)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in majorNodeList" :key="index">
                      <td class="cardtitle--text">{{ item.domain }}</td>
                      <td class="datanum--text">
                        {{ formart_number(item.stake) }}
                      </td>
                      <td class="datanum--text">
                        {{ formart_number(item.validator) }}
                      </td>
                      <td class="datanum--text">
                        {{ formart_number(item.validatorToken) }}
                      </td>
                      <td class="datanum--text">
                        {{ formart_number(item.reward) }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card>
        </v-col>
      </v-row>
      <accuracy-rate />
      <home-voting />
      <home-proposal />
      <home-user-rank />
    </v-container>
  </div>
</template>

<script>
import { formart_number } from "@/utils/utils";
import { Line } from "@antv/g2plot";

import nodeMap from "./components/nodeMap.vue";
import accuracyRate from "./components/accuracyRate.vue";
import homeVoting from "./components/homeVoting.vue";
import homeProposal from "./components/homeProposal.vue";
import homeUserRank from "./components/homeUserRank.vue";

import {
  fetchHomeOverview,
  fetchStakesLinechart,
  fetchNodeMapChart,
  fetchNodeList,
} from "@/api/home.js";

export default {
  components: { nodeMap, accuracyRate, homeVoting, homeProposal, homeUserRank },
  data() {
    return {
      nodeChoose: 0,
      userChoose: 0,
      overView: [
        {
          icon: require("@/assets/imgs/home/NodeRunner.png"),
          title: "Node Runner",
          value: "",
          key: "nodeRunner",
          colors: ["#9032CF", "#D1A8EE"],
        },
        {
          icon: require("@/assets/imgs/home/TeeReport.png"),
          title: "TeeReport",
          value: "",
          key: "totalTeeReport",
          colors: ["#F45F93", "#F6B7CC"],
        },
        {
          icon: require("@/assets/imgs/home/TotalSupply.png"),
          title: "Total Supply",
          value: "",
          key: "totalSupply",
          colors: ["#7DC55D", "#DEFBD1"],
        },
        {
          icon: require("@/assets/imgs/home/TotalStake.png"),
          title: "Total Stake",
          value: "",
          key: "totalStake",
          colors: ["#5190DD", "#6CF5F7"],
        },
      ],
      totalList: [
        {
          name: "Total TeeReport",
          value: "",
          key: "totalTeeReport",
        },
        {
          name: "Total File",
          value: "",
          key: "totalFile",
        },
        {
          name: "Total Storage",
          value: "",
          key: "totalStorage",
        },
        {
          name: "Average Accuracy Rate",
          value: "",
          key: "avgAccuracyRate",
        },
      ],
      tokenList: [
        {
          name: "Supply 4EVER",
          value: "",
          key: "supply",
        },
        {
          name: "Staked 4EVER",
          value: "",
          key: "stake",
        },
        {
          name: "Voted 4EVER",
          value: "",
          key: "voted",
        },
        {
          name: "Slash 4EVER",
          value: "",
          key: "slash",
        },
        {
          name: "Burned 4EVER",
          value: "",
          key: "burned",
        },
      ],
      mapData: {},
      nodeLocationList: [],
      majorNodeList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    init() {
      this.getOverview();
      this.getNodeList();
      this.$nextTick(() => {
        this.setNodeChart();
        this.setUserChart();
        this.getMapChart();
      });
    },
    getOverview() {
      fetchHomeOverview().then((res) => {
        this.overView.map((item) => {
          item.value = res.data[item.key];
          return item;
        });
        this.totalList.map((item) => {
          item.value = res.data[item.key];
          return item;
        });
        this.tokenList.map((item) => {
          item.value = res.data[item.key];
          return item;
        });
      });
    },
    async getStakedLineChart(params) {
      const { data } = await fetchStakesLinechart(params);
      return data;
    },
    async setNodeChart(params) {
      if (!params) {
        let currentDate = new Date();
        let before = currentDate.getTime();
        let after = currentDate.setDate(currentDate.getDate() - 7);
        params = {
          before,
          after,
          type: "NODE",
        };
      }
      const data = await this.getStakedLineChart(params);
      const line = new Line("nodeChart", {
        height: 110,
        padding: "auto",
        data,
        xField: "x",
        yField: "y",
        smooth: true,
      });

      line.render();
    },
    async setUserChart(params) {
      if (!params) {
        let currentDate = new Date();
        let before = currentDate.getTime();
        let after = currentDate.setDate(currentDate.getDate() - 7);
        params = {
          before,
          after,
          type: "USER",
        };
      }
      const data = await this.getStakedLineChart(params);
      const line = new Line("userChart", {
        height: 110,
        padding: "auto",
        data,
        xField: "x",
        yField: "y",
        smooth: true,
      });

      line.render();
    },
    getMapChart() {
      fetchNodeMapChart().then((res) => {
        const data = res.data.mapValue;
        this.nodeLocationList = data;
        this.$refs.nodeMap.initMap(data);
      });
    },
    getNodeList() {
      fetchNodeList({
        type: "MAJOR",
      }).then((res) => {
        this.majorNodeList = res.data.list;
      });
    },
    lineChartChange(type, val) {
      let currentDate = new Date();
      let before = currentDate.getTime();
      let after = null;
      switch (val) {
        case 0:
          after = currentDate.setDate(currentDate.getDate() - 7);
          break;
        case 1:
          after = currentDate.setDate(currentDate.getDate() - 30);
          break;
        case 2:
          after = 0;
          break;
        default:
          break;
      }
      const params = {
        before,
        after,
        type,
      };
      if (type == "NODE") {
        this.setNodeChart(params);
      } else if (type == "USER") {
        this.setUserChart(params);
      }
    },
  },
  created() {
    this.init();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.home {
  .block-card {
    height: 353px;
    padding: 0 20px;
    padding-top: 30px;
  }
  .overview {
    .item-card {
      max-width: 315px;
      height: 150px;
      margin: 0 auto;
      padding-top: 28px;
      .overview-item-title {
        font-size: 12px;
        font-weight: bold;
        color: #8093a1;
      }
      .overview-item-num {
        font-size: 36px;
        font-weight: bold;
        margin-top: 20px;
      }
    }
    .under-line {
      max-width: 315px;
      height: 3px;
      background: linear-gradient(63deg, #9032cf 0%, #d1a8ee 100%);
      border-radius: 0px 0px 75px 75px;
      margin: 0 auto;
    }
  }
  .total {
    .total-card {
      height: 353px;
      padding: 44px 35px;
      .total-card-item {
        font-size: 18px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
        .total-card-item-name {
          color: #7f92a0;
        }
      }
      .token-card-item {
        margin-bottom: 30px;
      }
    }
    .chart-col {
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .tips {
        font-size: 9px;
        font-weight: bold;
        color: #b5cfde;
        margin-left: 17px;
      }
    }
  }
}
</style>
