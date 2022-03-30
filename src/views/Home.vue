<template>
  <div class="home">
    <div class="overview">
      <h2 class="overview-title">Overview</h2>
      <ul
        class="overview-list d-flex align-center flex-wrap justify-space-between"
      >
        <li class="overview-item">
          <img src="../assets/imgs/home/node-bg.png" alt="" />
          <div class="item-content">
            <h3 class="item-title">Total Nodes</h3>
            <div class="data" style="color: '#345AA7">
              {{ overViewData.totalNode }}
            </div>
          </div>
        </li>
        <li class="overview-item">
          <img src="../assets/imgs/home/networkfile-bg.png" alt="" />
          <div class="item-content">
            <h3 class="item-title">Total Network files</h3>
            <div class="data" style="color: #6958b2">
              {{ overViewData.totalFiles }}
            </div>
          </div>
        </li>
        <li class="overview-item">
          <img src="../assets/imgs/home/storage-bg.png" alt="" />
          <div class="item-content">
            <h3 class="item-title">Network Storage</h3>
            <div class="data" style="color: #7784cc">
              {{ overViewData.totalStorage }}
            </div>
          </div>
        </li>
        <li class="overview-item">
          <img src="../assets/imgs/home/reward-bg.png" alt="" />
          <div class="item-content">
            <h3 class="item-title">Node Reward</h3>
            <div class="data">
              <span>{{ overViewData.totalReward }}</span>
              <span class="text">4EVR</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="node-locations">
      <network-bubble></network-bubble>
    </div>

    <v-row class="latest-PoSC-report d-flex justify-space-between">
      <v-col xs="12" class="report-left">
        <div class="report-left-bar d-flex justify-space-between">
          <h3 class="report-left-title">Latest PoSC Report #10086</h3>
          <span class="report-more" @click="handleToMore">More</span>
        </div>
        <ul class="report-list">
          <template v-for="item in latestReportArr">
            <li
              :key="item.nodeId"
              class="report-list-item d-flex justify-space-between"
            >
              <span class="cid">{{ item.nodeId }}</span>
              <span class="rate">{{ item.accuracyRate }}</span>
              <span class="time">{{ item.createdAt }}</span>
            </li>
          </template>
        </ul>
      </v-col>
      <v-col xs="12" class="report-right">
        <div class="d-flex report-right-header">
          <h3 class="report-right-title">TeeReport PSRAMENTERS</h3>
        </div>
        <ul class="report-right-list">
          <li class="report-right-list-item d-flex justify-space-between">
            <span>Generation time per report</span>
            <span>{{ challenggeData.interval }} Mintute</span>
          </li>
          <li class="report-right-list-item d-flex justify-space-between">
            <span>Number of CIDs per Posc</span>
            <span>{{ challenggeData.checkNum }} Piece</span>
          </li>
          <li class="report-right-list-item d-flex justify-space-between">
            <span>Report retention time</span>
            <span>{{ challenggeData.retention }} Day</span>
          </li>
          <li class="report-right-list-item d-flex justify-space-between">
            <span>Reward per block</span>
            <span>{{ challenggeData.reward }} 4EVER</span>
          </li>
        </ul>
      </v-col>
    </v-row>

    <v-row class="storage d-flex justify-space-between">
      <!-- <v-col
        xs="12"
        sm="12"
        md="5"
        class="storage-left card-border d-flex flex-column"
      >
        <div class="storage-left-header d-flex align-center">
          <img class="mr-3" src="../assets/imgs/home/storage.png" alt="" />
          <h3>Storage</h3>
        </div>

        <div class="pie-chart">
          <network-pie />
        </div>
      </v-col> -->
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
            :items="nodeList"
            label="select a node"
            :menu-props="{ offsetY: true, left: true }"
            @change="handleSelectChange"
          >
            <div
              slot="prepend-item"
              class="select-search-bar"
              hide-details="auto"
            >
              <input
                type="text"
                class="select-input"
                placeholder="select a node"
              />
            </div>
          </v-select>
        </div>

        <div class="accuracy-rate-charts">
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
          />
        </div>
      </v-col>
    </v-row>

    <div class="statistics card-border">
      <div class="statistics-banner">Statistics</div>
      <div class="switch-tab">
        <div
          class="switch-default-btn"
          :class="isShowNode ? 'active-btn' : ''"
          @click="handleShowTable('node')"
        >
          Node
        </div>
        <div
          class="switch-default-btn"
          :class="!isShowNode ? 'active-btn' : ''"
          @click="handleShowTable('treeReport')"
        >
          TreeReport
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
        >
          <template v-slot:item.nodeId="{ item }">
            <span>{{
              typeof item.nodeId == "string"
                ? item.nodeId.slice(0, 4) + "xxxx" + item.nodeId.slice(-4)
                : ""
            }}</span>
          </template>
          <template v-slot:item.blockNumber="{ item }">
            <span>#{{ item.blockNumber }}</span>
          </template>
          <template v-slot:item.treeReportDetail="{ item }">
            <!-- {{ item }} -->
            <img
              style="width: 20px; height: 12px; cursor: pointer"
              @click="handleViewClick(item, 'reportDetail')"
              src="../assets/imgs/home/eyes.png"
              alt=""
            />
          </template>
          <template v-slot:item.nodeDetail="{ item }">
            <!-- {{ item }} -->
            <img
              style="width: 20px; height: 12px; cursor: pointer"
              @click="handleViewClick(item, 'nodeDetail')"
              src="../assets/imgs/home/eyes.png"
              alt=""
            />
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
import { BigNumber } from "@ethersproject/bignumber";
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
      loading: true,
      pagination: true,
      currentPage: 1,
      totalPageSize: 0,
      row: null,
      isShowNode: false,
      overViewData: {},
      challenggeData: {},
      latestReport: [],
      latestReportArr: [],
      listQuery: {
        page: 1,
        size: 10,
      },
      nodeList: [],
      tableHeaderData: [
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
          text: "Total Reward",
          align: "center",
          sortable: false,
          value: "reward",
        },
        { text: "CreateAt", align: "center", value: "blockCreatedAt" },
        {
          text: "view",
          align: "center",
          value: "treeReportDetail",
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
  mounted() {},
  methods: {
    handleShowTable(value) {
      switch (value) {
        case "node":
          this.loading = true;
          this.isShowNode = true;
          this.pagination = false;
          this.listQuery = { page: 1, size: 10 };
          this.getNodeList();
          break;
        case "treeReport":
          this.loading = true;
          this.isShowNode = false;
          this.pagination = true;
          this.listQuery = { page: 1, size: 10 };
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
    getNetworkInfo() {
      fetchNetworkInfo().then((res) => {
        if (res.code.toUpperCase() == "SUCCESS") {
          // console.log(res);
          res.data.params.interval = Math.ceil(res.data.params.interval / 60);
          res.data.params.retention = Math.ceil(
            res.data.params.retention / 60 / 24
          );
          this.challenggeData = res.data.params;

          res.data.statistics.totalReward = formart_rewards(
            res.data.statistics.totalReward
          );
          res.data.statistics.totalStorage = formart_storage(
            res.data.statistics.totalStorage
          );
          res.data.params.reward = formart_rewards(res.data.params.reward);
          this.overViewData = res.data.statistics;
        }
      });
    },
    getRoport() {
      fetchReport("latest").then((res) => {
        if (res.code.toUpperCase() == "SUCCESS") {
          // console.log(res);
          // res.data.blockCreatedAt = formart_date(res.data.blockCreatedAt);
          res.data.reports.map((item) => {
            item.createdAt = formart_date(item.createdAt);
            item.accuracyRate = (item.accuracyRate / 100).toFixed(2) + "%";
            return item;
          });
          this.latestReport = res.data;
          this.latestReportArr = res.data.reports;
        }
      });
    },
    getReportList() {
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
          text: "Total Reward",
          align: "center",
          sortable: false,
          value: "reward",
        },
        { text: "CreateAt", align: "center", value: "blockCreatedAt" },
        {
          text: "view",
          align: "center",
          value: "treeReportDetail",
          sortable: false,
        },
      ];
      fetchReportList(this.listQuery).then((res) => {
        if (res.code.toUpperCase() == "SUCCESS") {
          this.loading = false;
          this.tableContentData = res.data.item.map((item) => {
            item.blockCreatedAt = formart_date(item.blockCreatedAt);
            item.averageAccuracyRate =
              (item.averageAccuracyRate / 100).toFixed(2) + "%";
            item.totalSize = (item.totalSize / 1024 / 1024).toFixed(2) + "T";
            item.averageElapsedTime = item.averageElapsedTime / 1000 + "S";
            item.reward = formart_rewards(item.reward);
            return item;
          });
          this.totalPageSize = Math.ceil(res.data.total / 10);
        }
      });
    },
    getNodeList() {
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
        { text: "Total Rewards", align: "center", value: "totalReward" },
        {
          text: "Status",
          align: "center",
          sortable: false,
          value: "status",
        },
        { text: "CreateAt", align: "center", value: "createdAt" },
        {
          text: "detail",
          align: "center",
          value: "nodeDetail",
          sortable: false,
        },
      ];
      fetchNodes().then((res) => {
        // console.log(res);
        if (res.code.toUpperCase() == "SUCCESS") {
          this.loading = false;
          if (this.isShowNode) {
            this.tableContentData = res.data.map((item) => {
              item.createdAt = formart_date(item.createdAt);
              item.totalReward = formart_rewards(item.totalReward);
              item.accuracyRate = (item.accuracyRate / 100).toFixed(2) + "%";
              return item;
            });
          }

          this.nodeList = res.data.map((item) => {
            return item.nodeId;
          });
        }
      });
    },
    getChartsData() {
      fetchReportList({ page: 1, size: 500 }).then((res) => {
        if (res.code.toUpperCase() == "SUCCESS") {
          // console.log("echartsdata", res);
          // let allBlock = res.data.item;
          const time = Date.now() / 1000 - 24 * 60 * 60;
          const data = res.data.item.filter((obj) => {
            return obj.blockCreatedAt > time;
          });
          // console.log("data", data);
          let timeMap = {};
          const xArr = [];
          data.forEach((item) => {
            const key = new Date(item.blockCreatedAt * 1000).getHours();
            if (!xArr.includes(key)) xArr.push(key);
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
          // console.log("timeMap", timeMap);
          const yArr = xArr.map((key) => {
            return (timeMap[key].sum / timeMap[key].count / 100).toFixed(2);
          });
          this.xAxisData = xArr;
          this.yAxisData = yArr;
        }
      });
    },

    handleSelectChange(value) {
      fetchNodeDetail(value, { page: 1, size: 500 }).then((res) => {
        const time = Date.now() / 1000 - 24 * 60 * 60;
        const data = res.data.item.filter((obj) => {
          return obj.createdAt > time;
        });
        let timeMap = {};
        const xArr = [];
        data.forEach((item) => {
          const key = new Date(item.createdAt * 1000).getHours();
          if (!xArr.includes(key)) xArr.push(key);
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
        this.xAxisData = xArr;
        this.yAxisData = yArr;
      });
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
  },
  components: {
    NetworkBubble,
    NetworkLine,
  },
};
</script>
<style lang="less" scoped>
* {
  list-style: none;
}

.select-search-bar {
  position: relative;
  padding: 10px 20px;
  width: 381px;
  background: #f1f6fb;
  .select-input {
    width: 100%;
    height: 40px;
    text-indent: 40px;
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
      margin-top: 26px;
      padding-left: 0;
      .overview-item {
        position: relative;
        width: 235px;
        height: 140px;
        margin-bottom: 20px;
        border-radius: 5px;
        border: 1px solid #e6e8eb;
        background: #ffffff;
        > img {
          position: absolute;
          left: 0;
          top: 0;
          width: 121px;
        }
        .item-content {
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
          // .time {
          //   width: 146px;
          // }
          > span {
            cursor: pointer;
          }
          > span:hover {
            color: #34a9ff;
          }
        }
      }
    }
    .report-right {
      // padding: 13px 15px 18px 19px;
      margin-left: 20px;
      width: 280px;
      .report-right-header {
        // position: relative;
        // display: flex;
        // margin: 0 auto;
        // font-size: 18px;
        // color: #495667;
      }
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
      }
      .report-right-list {
        padding-left: 0;
        margin-top: 20px;
        .report-right-list-item {
          padding: 12px 0;
          font-size: 12px;
          > span {
            cursor: pointer;
          }
          > span:hover {
            color: #34a9ff;
          }
        }
      }
    }
  }
  .storage {
    width: 100%;
    .storage-left {
      position: relative;
      width: 449px;
      height: 367px;
      padding: 31px 27px 0 19px;
      box-sizing: border-box;
      .storage-left-header {
        img {
          width: 20px;
          height: 20px;
        }
      }
      .pie-chart {
        flex: 1;
      }
    }
    .storage-right {
      width: 530px;
      height: 367px;
      padding: 31px 25px 0 30px;
      box-sizing: border-box;

      .storage-right-header {
        img {
          width: 20px;
          height: 20px;
        }
      }
      .accuracy-rate-charts {
        flex: 1;
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
      .accuracy-rate-charts {
      }
    }
  }
  .statistics {
    width: 100%;
    margin: 20px 0;
    .statistics-banner {
      height: 79px;
      padding: 0 16px;
      font-weight: bold;
      font-size: 18px;
      line-height: 79px;
      border-bottom: 1px solid #e6e8eb;
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
        background: #f8f8f8;
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
