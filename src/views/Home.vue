<template>
  <div class="home">
    <!-- overview -->
    <div class="overview">
      <h2 class="overview-title">Overview</h2>
      <ul
        class="
          overview-list
          d-flex
          align-center
          flex-wrap
          justify-space-between
        "
      >
        <li class="overview-item">
          <v-skeleton-loader
            type="article"
            style="height: 100%"
            :loading="JSON.stringify(overViewData) == '{}'"
          >
            <img
              class="overview-item-bg"
              src="../assets/imgs/home/node-bg.png"
              alt=""
            />
            <div class="item-content">
              <h3 class="item-title">Total Nodes</h3>
              <div class="data" style="color: '#345AA7">
                {{ overViewData.totalNode }}
              </div>
            </div>
          </v-skeleton-loader>
        </li>
        <li class="overview-item">
          <v-skeleton-loader
            type="article"
            :loading="JSON.stringify(overViewData) == '{}'"
            style="height: 100%"
          >
            <img
              class="overview-item-bg"
              src="../assets/imgs/home/networkfile-bg.png"
              alt=""
            />
            <div class="item-content">
              <h3 class="item-title">Total Files</h3>
              <div class="data" style="color: #6958b2">
                {{ overViewData.totalFiles }}
              </div>
            </div>
          </v-skeleton-loader>
        </li>
        <li class="overview-item">
          <v-skeleton-loader
            type="article"
            :loading="JSON.stringify(overViewData) == '{}'"
            style="height: 100%"
          >
            <img
              class="overview-item-bg"
              src="../assets/imgs/home/storage-bg.png"
              alt=""
            />
            <div class="item-content">
              <h3 class="item-title d-flex align-center">
                <span>Total Storage</span>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <img
                      v-bind="attrs"
                      v-on="on"
                      class="ml-2"
                      style="width: 16px; vertical-align: middle"
                      src="@/assets/imgs/home/warning-icon.png"
                      alt=""
                    />
                  </template>
                  <span>Used storage for network-wide nodes</span>
                </v-tooltip>
              </h3>
              <div class="data" style="color: #7784cc">
                {{ overViewData.totalStorage }}
              </div>
            </div>
          </v-skeleton-loader>
        </li>

        <!-- <li class="overview-item">
					<img class="overview-item-bg" src="../assets/imgs/home/reward-bg.png" alt="" />
					<div class="item-content">
						<h3 class="item-title d-flex align-center">
							<span>Total Rewards</span>
							<v-tooltip top>
								<template v-slot:activator="{ on, attrs }">
									<img
										v-bind="attrs"
										v-on="on"
										class="ml-2"
										style="
											width: 16px;
											vertical-align: middle;
										"
										src="@/assets/imgs/home/warning-icon.png"
										alt=""
									/>
								</template>
								<span
									>The total reward for network-wide
									nodes</span
								>
							</v-tooltip>
						</h3>
						<div class="data">
							<span>{{ overViewData.totalReward }}</span>
							<span class="text ml-2">4EVER</span>
						</div>
					</div>
				</li> -->
      </ul>
    </div>

    <!-- node-locations -->
    <div class="node-locations">
      <network-bubble></network-bubble>
    </div>

    <!-- Latest PoSC Report  -->
    <v-row class="latest-PoSC-report d-flex justify-space-between">
      <v-col xs="12" md="8" lg="8" xl="8" class="report-left">
        <v-skeleton-loader
          type="article"
          :loading="latestReportArr.length == 0"
        >
          <div class="report-left-bar d-flex justify-space-between">
            <h3 class="report-left-title">
              Latest PoSC Report #{{ latestReport.blockNumber }}
            </h3>
            <span class="report-more" @click="handleToMore">More</span>
          </div>
          <ul class="report-list">
            <template v-for="item in latestReportArr">
              <li
                :key="item.nodeId"
                @click="handleViewClick(item, 'nodeDetail')"
                class="report-list-item d-flex justify-space-between"
              >
                <span class="cid">{{ item.nodeId }}</span>
                <span class="rate">{{ item.accuracyRate }}</span>
                <span class="time">{{ item.createdAt }}</span>
              </li>
            </template>
          </ul>
        </v-skeleton-loader>
      </v-col>
      <v-col
        xs="12"
        xl="4"
        md="4"
        lg="4"
        class="report-right ml-xl-5 ml-sm-5 mt-xl-0 mt-sm-0 mt-md-0 mt-lg-0"
      >
        <v-skeleton-loader
          type="article"
          :loading="latestReportArr.length == 0"
        >
          <div class="d-flex report-right-header">
            <h3 class="report-right-title">TeeReport Parameters</h3>
          </div>
          <ul class="report-right-list">
            <li class="report-right-list-item d-flex justify-space-between">
              <span>Generation time per TeeReport</span>
              <!-- <span>{{ challenggeData.interval }} Mintute</span> -->
              <span>20-30 Mins</span>
            </li>
            <li class="report-right-list-item d-flex justify-space-between">
              <span>Numbers of challenge CID per TeeReport</span>
              <!-- <span>{{ challenggeData.checkNum }} Piece</span> -->
              <span>20 Piece</span>
            </li>
            <li class="report-right-list-item d-flex justify-space-between">
              <span>TeeReport retention time</span>
              <!-- <span>{{ challenggeData.retention }} Day</span> -->
              <span>30 Days</span>
            </li>
            <!-- <li
						class="report-right-list-item d-flex justify-space-between"
					>
						<span>Reward per TeeReport</span>
						<span>{{ challenggeData.reward }} 4EVER</span>
					</li> -->
          </ul>
        </v-skeleton-loader>
      </v-col>
    </v-row>

    <!-- Accuracy Rate-->

    <v-row class="storage d-flex justify-space-between">
      <v-col
        xs="12"
        sm="12"
        md="12"
        class="storage-right card-border d-flex flex-column"
      >
        <div
          class="storage-right-header d-flex justify-space-between align-center"
        >
          <div class="d-flex align-center">
            <img class="mr-3" src="../assets/imgs/home/storage.png" alt="" />
            <h3>Accuracy Rate</h3>
          </div>
          <v-select
            :hide-details="true"
            solo
            :items="searchNodeList"
            :menu-props="{ offsetY: true, left: true }"
            @change="handleSelectChange"
          >
            <template #label>
              <span style="font-size: 14px"> Select</span>
            </template>
            <div
              slot="prepend-item"
              class="select-search-bar"
              hide-details="auto"
            >
              <input
                type="text"
                v-model="selectSearchValue"
                class="select-input"
                placeholder="Node ID"
              />
            </div>
          </v-select>
        </div>
        <div class="accuracy-rate-charts">
          <v-skeleton-loader
            type="image,image"
            class="mt-3"
            :loading="xAxisData.length == 0"
            style="height: 100%"
          >
            <network-line
              :grid="{
                top: '10%',
                left: '0%',
                right: '5%',
                bottom: '10%',
                containLabel: true,
              }"
              :xAxisData="xAxisData"
              :yAxisData="yAxisData"
          /></v-skeleton-loader>
        </div>
      </v-col>
    </v-row>

    <!-- statistics -->
    <div class="statistics card-border">
      <div class="statistics-banner">
        <h3 class="statistics-title">Statistics</h3>
      </div>
      <div class="switch-tab">
        <div
          class="switch-default-btn"
          :class="!isShowNode ? 'active-btn' : ''"
          @click="handleShowTable('teeReport')"
        >
          TeeReport
        </div>
        <div
          class="switch-default-btn"
          :class="isShowNode ? 'active-btn' : ''"
          @click="handleShowTable('node')"
        >
          Node
        </div>
      </div>
      <div class="staistics-table">
        <v-data-table
          :headers="tableHeaderData"
          :items="tableContentData"
          item-class="row-item"
          :hide-default-footer="true"
          :items-per-page="50"
          class="elevation-1"
          :loading="loading"
          loading-text="Loading... Please wait"
          :custom-sort="customSort"
        >
          <template #header.accuracyRate="{ header }">
            <span>{{ header.text }}</span>
            <v-tooltip top max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <img
                  v-bind="attrs"
                  v-on="on"
                  class="ml-1"
                  style="width: 10px; height: 10px; vertical-align: middle"
                  src="@/assets/imgs/home/tips.png"
                  alt=""
                />
              </template>
              <span
                >Each IPFS node is challenged on a regular basis to see if it
                has correctly PIN a specific data CID. If the number of CIDs
                received for the challenge is M and the number of IPFS nodes
                that have been PIN correctly is N, the accuracy rate for that
                challenge is N/M*100%.</span
              >
            </v-tooltip>
          </template>
          <template #header.createdAt="{ header }">
            <span>{{ header.text }}</span>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <img
                  v-bind="attrs"
                  v-on="on"
                  class="ml-1"
                  style="width: 10px; height: 10px; vertical-align: middle"
                  src="@/assets/imgs/home/tips.png"
                  alt=""
                />
              </template>
              <span>Time of node joinng network</span>
            </v-tooltip>
          </template>
          <template #item.nodeId="{ item }">
            <span>{{ item.nodeId }}</span>
          </template>
          <template #item.blockNumber="{ item }">
            <span>#{{ item.blockNumber }}</span>
          </template>
          <template #item.teeReportDetail="{ item }">
            <img
              style="width: 20px; height: 12px; cursor: pointer"
              @click="handleViewClick(item, 'reportDetail')"
              src="../assets/imgs/home/eyes.png"
              alt=""
            />
          </template>
          <template #item.nodeDetail="{ item }">
            <img
              style="width: 20px; height: 12px; cursor: pointer"
              @click="handleViewClick(item, 'nodeDetail')"
              src="../assets/imgs/home/eyes.png"
              alt=""
            />
          </template>
          <template #item.blockCreatedAt="{ item }" }>
            <span>
              {{ formart_date(item.blockCreatedAt) }}
            </span>
          </template>
          <template #item.totalReward>
            <!-- <span>{{ formart_rewards(item.totalReward) }}</span> -->
            <span>-</span>
          </template>
          <template #item.reward>
            <!-- <span>{{ formart_rewards(item.totalReward) }}</span> -->
            <span>-</span>
          </template>

          <template #item.region="{ item }">
            <span>{{ item.region ? item.region : "-" }}</span>
          </template>
          <template #item.createdAt="{ item }" }>
            <span>
              {{ formart_date(item.createdAt) }}
            </span>
          </template>
        </v-data-table>

        <v-row class="max-width d-flex align-center" v-if="pagination">
          <v-col>
            <v-pagination
              v-model="currentPage"
              class="my-4"
              @input="handlePagination"
              :length="totalPageSize"
              :total-visible="7"
            ></v-pagination>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { formart_rewards, formart_storage, formart_date } from "@/utils/utils";
import NetworkBubble from "../components/NetworkBubble.vue";
import NetworkLine from "../components/NetworkLine.vue";
import {
  fetchNetworkInfo,
  fetchNodes,
  fetchReportList,
  fetchReport,
  fetchNodeDetail,
} from "../api/api";
export default {
  name: "Home",
  data() {
    return {
      showtips: false,
      loading: true,
      pagination: true,
      currentPage: 1,
      totalPageSize: 0,
      isShowNode: false,
      overViewData: {},
      challenggeData: {},
      latestReport: [],
      latestReportArr: [],
      listQuery: {
        page: 1,
        size: 10,
      },
      selectSearchValue: "",
      nodeList: [],
      tableHeaderData: [
        {
          text: "Node ID",
          align: "center",
          sortable: false,
          value: "nodeId",
        },
        {
          text: "Region",
          align: "center",
          sortable: false,
          value: "region",
        },
        {
          text: "PoSC Accuracy Rate",
          align: "center",
          value: "accuracyRate",
        },
        {
          text: "Total Rewards",
          align: "center",
          value: "totalReward",
        },
        {
          text: "Status",
          align: "center",
          sortable: false,
          value: "status",
        },
        { text: "CreateAt", align: "center", value: "createdAt" },
        {
          text: "Detail",
          align: "center",
          value: "nodeDetail",
          sortable: false,
        },
      ],
      tableContentData: [],
      xAxisData: [],
      yAxisData: [],
    };
  },
  created() {
    this.getNetworkInfo();
    this.getRoport();
    this.getNodeList();
    this.getReportList();
    this.getChartsData();
  },
  computed: {
    searchNodeList() {
      if (this.selectSearchValue == "") return this.nodeList;
      if (!this.nodeList.length) return this.nodeList;
      const reg = new RegExp(this.selectSearchValue, "ig");
      return this.nodeList.filter((item) => item.match(reg));
    },
  },
  methods: {
    handleShowTable(value) {
      this.tableContentData = [];
      this.currentPage = 1;
      this.listQuery = { page: 1, size: 10 };
      switch (value) {
        case "node":
          this.isShowNode = true;
          this.pagination = false;
          this.getNodeList();
          break;
        case "teeReport":
          this.isShowNode = false;
          this.pagination = true;
          this.getReportList();
          break;
        default:
          break;
      }
    },
    handleToMore() {
      this.$router.push({
        path: "/blockDetail",
        query: {
          blockNumber: this.latestReport.blockNumber,
        },
      });
    },
    async getNetworkInfo() {
      try {
        const result = await fetchNetworkInfo();
        result.params.interval = Math.ceil(result.params.interval / 60);
        result.params.retention = Math.ceil(result.params.retention / 60 / 24);
        this.challenggeData = result.params;
        result.statistics.totalReward = formart_rewards(
          result.statistics.totalReward
        );
        result.statistics.totalStorage = formart_storage(
          result.statistics.totalStorage
        );
        result.params.reward = formart_rewards(result.params.reward);
        this.overViewData = result.statistics;
      } catch (err) {
        console.log(err);
      }
    },
    async getRoport() {
      try {
        const result = await fetchReport("latest");
        result.reports.map((item) => {
          item.createdAt = formart_date(item.createdAt);
          item.accuracyRate = (item.accuracyRate / 100).toFixed(2) + "%";
          return item;
        });
        this.latestReport = result;
        this.latestReportArr = result.reports.slice(0, 4);
      } catch (err) {
        console.log(err, "err");
      }
    },
    async getReportList() {
      this.tableHeaderData = [
        {
          text: "TeeReport",
          align: "center",
          sortable: false,
          value: "blockNumber",
        },
        {
          text: "Average Accuracy Rate",
          align: "center",
          value: "averageAccuracyRate",
        },
        { text: "Total Storage", align: "center", value: "totalSize" },
        {
          text: "Average Challenge Time",
          align: "center",
          value: "averageElapsedTime",
        },
        {
          text: "Total Rewards",
          align: "center",
          sortable: false,
          value: "reward",
        },
        { text: "CreateAt", align: "center", value: "blockCreatedAt" },
        {
          text: "View",
          align: "center",
          value: "teeReportDetail",
          sortable: false,
        },
      ];
      try {
        this.loading = true;
        const result = await fetchReportList(this.listQuery);
        this.loading = false;
        this.tableContentData = result.item.map((item) => {
          // item.blockCreatedAt = formart_date(item.blockCreatedAt);
          item.averageAccuracyRate =
            (item.averageAccuracyRate / 100).toFixed(2) + "%";
          item.totalSize = formart_storage(item.totalSize);

          item.averageElapsedTime = item.averageElapsedTime / 1000 + "S";
          item.reward = formart_rewards(item.reward);
          return item;
        });
        this.totalPageSize = Math.ceil(result.total / 10);
      } catch (err) {
        console.log(err, "err");
      }
    },
    async getNodeList() {
      this.tableHeaderData = [
        {
          text: "Node ID",
          align: "center",
          sortable: false,
          value: "nodeId",
        },
        {
          text: "Region",
          align: "center",
          sortable: false,
          value: "region",
        },
        {
          text: "PoSC Accuracy Rate",
          align: "center",
          value: "accuracyRate",
        },
        {
          text: "Total Rewards",
          align: "center",
          value: "totalReward",
        },
        {
          text: "Status",
          align: "center",
          sortable: false,
          value: "status",
        },
        { text: "CreateAt", align: "center", value: "createdAt" },
        {
          text: "Detail",
          align: "center",
          value: "nodeDetail",
          sortable: false,
        },
      ];
      try {
        this.loading = true;
        const result = await fetchNodes();
        this.loading = false;
        if (this.isShowNode) {
          this.tableContentData = result.map((item) => {
            item.accuracyRate = (item.accuracyRate / 100).toFixed(2) + "%";
            return item;
          });
        }
        this.nodeList = result.map((item) => {
          return item.nodeId;
        });
      } catch (err) {
        console.log(err, "err");
      }
    },
    async getChartsData() {
      try {
        const result = await fetchReportList({ page: 1, size: 500 });
        const time = Date.now() / 1000 - 24 * 60 * 60;
        const data = result.item.filter((obj) => {
          return obj.blockCreatedAt > time;
        });
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
      } catch (err) {
        console.log(err, "err");
      }
    },
    async handleSelectChange(value) {
      this.selectSearchValue = "";
      this.$loading.show();
      try {
        const result = await fetchNodeDetail(value, {
          page: 1,
          size: 500,
        });
        const time = Date.now() / 1000 - 24 * 60 * 60;
        const data = result.item.filter((obj) => {
          return obj.createdAt > time;
        });
        let timeMap = {};
        const xArr = [];
        const xArrData = [];
        data.forEach((item) => {
          const key = new Date(item.createdAt * 1000).getHours();
          if (!xArr.includes(key)) {
            xArr.push(key);
            xArrData.push(item.createdAt);
          }
          if (timeMap[key]) {
            timeMap[key].sum += item.accuracyRate;
            timeMap[key].count++;
          } else {
            timeMap[key] = {
              sum: item.accuracyRate,
              count: 1,
            };
          }
        });
        const yArr = xArr.map((key) => {
          return (timeMap[key].sum / timeMap[key].count / 100).toFixed(2);
        });
        this.xAxisData = xArrData.reverse();
        this.yAxisData = yArr.reverse();
      } catch (err) {
        console.log(err, "err");
      }
      this.$loading.hide();
    },
    handlePagination(value) {
      this.listQuery.page = value;
      this.loading = true;
      this.getReportList();
    },
    handleViewClick(item, type) {
      switch (type) {
        case "reportDetail":
          this.$router.push({
            path: "/blockDetail",
            query: {
              blockNumber: item.blockNumber,
            },
          });
          break;
        case "nodeDetail":
          this.$router.push({
            path: "/nodeDetail",
            query: {
              nodeId: item.nodeId,
            },
          });
          break;
        default:
          break;
      }
    },
    customSort(items, index, isDesc) {
      if (!index.length || !items.length) {
        return items;
      } else {
        let key = index[0];
        // if (!items[0].hasOwnProperty(key)) return items;
        if (!Object.prototype.hasOwnProperty.call(key, items[0])) return items;

        items.sort((a, b) => {
          if (!isDesc.length) return items;
          if (isDesc[0]) {
            return (
              Number(b[key].toString().replace(/[a-zA-Z]|%/, "")) -
              Number(a[key].toString().replace(/[a-zA-Z]|%/, ""))
            );
          } else {
            return (
              Number(a[key].toString().replace(/[a-zA-Z]|%/, "")) -
              Number(b[key].toString().replace(/[a-zA-Z]|%/, ""))
            );
          }
        });
        return items;
      }
    },
    formart_date,
    formart_rewards,
  },
  components: {
    NetworkBubble,
    NetworkLine,
  },
};
</script>
<style lang="less" scoped>
#map {
  width: 100%;
  height: 450px;
}
/deep/.v-select__selections > input::placeholder {
  font-size: 12px;
}
/deep/ .l7-control-logo.l7-control {
  display: none;
}
/deep/ .v-list-item__title {
  font-size: 14px;
}
/deep/ .v-select__selection {
  font-size: 14px;
}
.select-search-bar {
  position: relative;
  padding: 10px 20px;
  width: 381px;
  background: #f1f6fb;
  .select-input {
    width: 100%;
    height: 40px;
    padding-left: 40px;
    box-sizing: border-box;
    border-radius: 5px;
    background: #fff;
  }
}
.select-search-bar::after {
  z-index: 999;
  content: "";
  display: block;
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: url("../assets/imgs/header/search-icon.png") no-repeat;
  background-size: 100%;
}
.card-border {
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #e6e8eb;
}
.home {
  max-width: 1000px;
  margin: 10px auto 0;
  .overview {
    padding: 31px 0 20px;
    .overview-title {
      font-size: 20px;
      color: #495667;
      line-height: 20px;
    }
    .overview-list {
      width: 100%;
      justify-content: space-around;
      margin-top: 26px;
      padding-left: 0;
      .overview-item {
        position: relative;
        width: 30%;
        height: 140px;
        margin-bottom: 20px;
        border-radius: 5px;
        border: 1px solid #e6e8eb;
        background: #ffffff;
        .overview-item-bg {
          position: absolute;
          left: 0;
          top: 0;
          width: 121px;
        }
        /deep/.item-content {
          z-index: 1;
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 30px;
          box-sizing: border-box;

          .item-title {
            height: 22px;
            font-size: 16px;
            font-weight: 600;
            color: #495667;
            line-height: 22px;
          }
          .data {
            height: 50px;
            margin-top: 2px;
            font-size: 36px;
            color: #2b547f;
            line-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .text {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .node-locations {
    width: 100%;
    height: 450px;
    border-radius: 5px;
    border: 1px solid #e6e8eb;
  }
  .latest-PoSC-report {
    margin: 0;
    width: 100%;
    padding: 20px 0;
    .report-left,
    .report-right {
      height: 250px;
      border-radius: 5px;
      padding: 27px 25px 19px 21px;

      border: 1px solid #e6e8eb;
      background: #ffffff;
    }
    .report-left {
      flex: 1;
      padding: 27px 25px 19px 21px;
      .report-left-bar {
        width: 100%;
        .report-left-title {
          position: relative;
          height: 21px;
          padding-left: 36px;
          font-size: 18px;
          line-height: 21px;
          color: #495667;
        }
        .report-left-title::before {
          position: absolute;
          content: "";
          display: block;
          width: 24px;
          height: 24px;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background: url(../assets/imgs/home/report-icon.png) no-repeat;
          background-size: 100%;
        }
        .report-more {
          font-size: 14px;
          color: #34a9ff;
          cursor: pointer;
        }
      }
      .report-list {
        width: 100%;
        padding-left: 0;
        margin-top: 20px;
        .report-list-item {
          font-size: 12px;
          padding: 12px 0;
          cursor: pointer;

          .cid {
            flex: 1;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .rate {
            // width: 41px;
            margin: 0 20px;
          }
        }
        .report-list-item:hover {
          color: #34a9ff;
        }
      }
    }
    .report-right {
      // margin-left: 20px;
      margin-top: 20px;
      .report-right-title {
        position: relative;
        height: 21px;
        padding-left: 36px;
        font-size: 18px;
        line-height: 21px;
        color: #495667;
      }
      .report-right-title::before {
        content: "";
        position: absolute;
        display: block;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background: url("../assets/imgs/home/champion-icon.png");
        background-size: 100%;
      }
      .report-right-list {
        padding-left: 0;
        margin-top: 20px;
        .report-right-list-item {
          padding: 12px 0;
          font-size: 12px;
        }
      }
    }
  }
  .storage {
    width: 100%;
    .storage-right {
      padding: 31px 25px 30px 30px;
      box-sizing: border-box;
      .storage-right-header {
        img {
          width: 20px;
          height: 20px;
        }
      }
      .accuracy-rate-charts {
        // flex: 1;
        height: 300px;
      }
      /deep/ .v-input__control {
        width: 135px;
        min-height: 30px;
      }
      /deep/ .v-input__slot {
        width: 145px;
      }
      /deep/ .v-input {
        flex: 0;
      }
    }
  }
  .statistics {
    width: 100%;
    margin: 20px 0;
    .statistics-banner {
      height: 79px;
      padding: 0 30px;
      font-weight: bold;
      font-size: 18px;
      line-height: 79px;
      border-bottom: 1px solid #e6e8eb;
      .statistics-title {
        position: relative;
        padding-left: 30px;
      }
      .statistics-title::before {
        position: absolute;
        content: "";
        display: block;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background: url("../assets/imgs/home/3.png") no-repeat;
        background-size: 100%;
      }
    }

    .switch-tab {
      padding: 13px 16px;
      .switch-default-btn {
        display: inline-block;
        padding: 4px 13px;
        font-size: 12px;
        color: #7e848a;
        border-radius: 20px;
        border: 1px solid #e6e8eb;
        cursor: pointer;
      }
      .switch-default-btn + .switch-default-btn {
        margin-left: 10px;
      }
      .active-btn {
        background: #34a9ff;
        color: #fff;
      }
    }
    .staistics-table {
      padding: 0 20px 20px 20px;
      /deep/ .v-pagination__item,
      /deep/ .v-pagination__navigation {
        box-shadow: none;
        font-size: 12px;
        font-weight: 600;
      }

      /deep/ .v-data-table.elevation-1.theme--light {
        box-shadow: none !important;
      }
      /deep/ td,
      /deep/ th {
        border-bottom: none !important;
        line-height: 48px;
        white-space: nowrap;
        font-size: 12px !important;
        color: #495667;
      }

      /deep/ th:nth-of-type(1) {
        position: sticky;
        left: 0;
        background: #e6e8eb;
      }
      /deep/ td:nth-of-type(1) {
        position: sticky;
        left: 0;
        background: #fff;
      }
      /deep/ th:last-of-type {
        position: sticky;
        right: -1px;
        background: #e6e8eb;
      }
      /deep/ td:last-of-type {
        position: sticky;
        right: -1px;
        background: #fff;
      }
      /deep/
        .v-data-table__wrapper
        tbody
        tr:nth-of-type(odd)
        > td:first-of-type {
        background: #f8f8f8 !important;
      }
      /deep/
        .v-data-table__wrapper
        tbody
        tr:nth-of-type(odd)
        > td:first-of-type {
        background: #f8f8f8 !important;
      }
      /deep/ .v-data-table__wrapper tbody tr:nth-of-type(odd) td:last-of-type {
        background: #f8f8f8 !important;
      }
      /deep/ .v-input__control {
        width: 130px;
      }
      /deep/ .v-input__slot {
        width: 130px;
      }
      /deep/ .v-text-field__details {
        display: none;
      }
      /deep/ .v-data-table__wrapper tbody tr:nth-of-type(odd) {
        background: #f8f8f8 !important;
      }
      /deep/ .v-data-table__wrapper .v-data-table-header tr {
        background: #e6e8eb;
      }
      /deep/ .v-text-field.v-text-field--solo .v-input__control {
        min-height: 30px;
      }
      /deep/ .v-input__slot {
        margin: 0;
      }
    }
  }
}
</style>
