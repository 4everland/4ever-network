<template>
  <div class="node-detail-container">
    <div class="node">
      <div class="node-header d-flex">
        <img class="icon" src="@/assets/imgs/nodeDetail/node-icon.png" alt="" />
        <h3 class="ml-3">Node Info</h3>
      </div>

      <!-- node-info -->
      <v-row class="node-info">
        <v-skeleton-loader
          type="article"
          :loading="true"
          width="100%"
          v-if="JSON.stringify(nodeInfo) == '{}'"
        >
        </v-skeleton-loader>
        <v-row v-else>
          <v-col sm="12" lg="8">
            <ul class="node-info-list">
              <li class="node-info-item">
                <span class="node-text">Node ID : </span>
                <span class="node-value">{{
                  nodeInfo.nodeId ? nodeInfo.nodeId : "/"
                }}</span>
              </li>
              <li class="node-info-item">
                <span class="node-text">Regoin: </span>
                <span class="node-value">{{
                  nodeInfo.region ? nodeInfo.region : "/"
                }}</span>
              </li>
              <li class="node-info-item">
                <span class="node-text right">Program Version: </span>
                <span class="node-value">{{
                  nodeInfo.programVersion ? nodeInfo.programVersion : "/"
                }}</span>
              </li>
            </ul>
          </v-col>
          <v-col sm="12" lg="4">
            <ul class="node-info-list">
              <li class="node-info-item">
                <span class="node-text right">Status: </span>
                <span class="node-value">{{
                  nodeInfo.status ? nodeInfo.status : "/"
                }}</span>
              </li>
              <li class="node-info-item">
                <span class="node-text right">CreateAt: </span>
                <span class="node-value">{{
                  nodeInfo.createdAt ? nodeInfo.createdAt : "/"
                }}</span>
              </li>
              <!-- <li class="node-info-item">
							<span class="node-text right">Total Rewards: </span>
							<span class="node-value"
								>{{
									nodeInfo.totalReward
										? nodeInfo.totalReward
										: "/"
								}}
								<span>4EVER</span>
							</span>
						</li> -->
            </ul>
          </v-col>
        </v-row>
      </v-row>

      <!-- accuracy-rate -->
      <div class="accuracy-rate">
        <div class="accuracy-rate-header d-flex">
          <img class="icon" src="@/assets/imgs/home/2.png" alt="" />
          <h3 class="ml-3">Accuracy Rate</h3>
        </div>
        <div class="accuracy-rate-charts">
          <v-skeleton-loader
            type="image,image"
            class="mt-3"
            :loading="xAxisData.length == 0"
            style="height: 100%"
          >
            <network-line
              :xAxisData="xAxisData"
              :yAxisData="yAxisData"
              yAxisLabelFormatter="{value}%"
            />
          </v-skeleton-loader>
        </div>
      </div>

      <!-- node-statistics -->
      <div class="node-statistics">
        <div class="accuracy-rate-header d-flex">
          <img class="icon" src="@/assets/imgs/home/3.png" alt="" />
          <h3 class="ml-3">Node Statistics</h3>
        </div>
        <div class="statistics-table mt-7">
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
            <template v-slot:header.accuracyRate="{ header }">
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
            <template v-slot:header.createdAt="{ header }">
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
            <template #item.blockNumber="{ item }">
              <span># {{ item.blockNumber }}</span>
            </template>
            <template #item.cidList="{ item }">
              <span class="view-text" @click="handleViewCid(item)">view</span>
            </template>
            <template #item.createdAt="{ item }">
              <span>{{ formart_date(item.createdAt) }}</span>
            </template>
          </v-data-table>

          <v-row class="max-width d-flex align-center">
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

    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        scrollable
        width="690px"
        attach
        content-class="node-detail-dialog"
      >
        <v-card>
          <v-card-title class="dialog-title">
            CID List
            <img
              class="dialog-close"
              src="@/assets/imgs/nodeDetail/close.png"
              alt=""
              @click="dialog = false"
            />
          </v-card-title>
          <v-card-text style="height: 500px">
            <table class="dialog-table">
              <tr>
                <th class="cid">CID</th>
                <th class="status">Status</th>
              </tr>
              <template v-for="item in dialogTableContent">
                <tr :key="item.cid">
                  <td class="cid" :class="item.state ? '' : 'unpin'">
                    {{ item.cid }}
                  </td>
                  <td class="status" :class="item.state ? 'pin' : 'unpin'">
                    {{ item.state ? "Pin" : "Unpin" }}
                  </td>
                </tr>
              </template>
            </table>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { formart_date, formart_storage, formart_rewards } from "@/utils/utils";
import NetworkLine from "@/components/NetworkLine.vue";
import { fetchNodeInfo, fetchNodeDetail } from "@/api/api";
export default {
  data() {
    return {
      nodeId: null,
      dialog: false,
      loading: true,
      totalPageSize: 0,
      currentPage: 1,
      listQuery: {
        page: 1,
        size: 10,
      },
      tableHeaderData: [
        {
          text: "TeeReport",
          align: "center",
          sortable: false,
          value: "blockNumber",
        },
        {
          text: "Size of Challenge File",
          align: "center",
          value: "totalSize",
        },
        { text: "Elapsed Time", align: "center", value: "elapsedTime" },
        {
          text: "PoSC Accuracy Rate",
          align: "center",
          value: "accuracyRate",
        },
        { text: "CreateAt", align: "center", value: "createdAt" },
        {
          text: "CID List",
          align: "center",
          value: "cidList",
          sortable: false,
        },
      ],
      tableContentData: [],
      dialogTableContent: [],
      nodeInfo: {},
      xAxisData: [],
      yAxisData: [],
    };
  },
  async created() {
    this.$loading.show();
    this.nodeId = this.$route.query.nodeId;
    await this.getNodeInfo();
    await this.getNodeDetail();
    await this.getChartsData();
    this.$loading.hide();
  },
  methods: {
    async getNodeInfo() {
      const result = await fetchNodeInfo(this.nodeId);
      result.createdAt = formart_date(result.createdAt);
      result.totalReward = formart_rewards(result.totalReward);
      this.nodeInfo = result;
    },
    async getNodeDetail() {
      const result = await fetchNodeDetail(this.nodeId, this.listQuery);
      this.loading = false;
      this.tableContentData = result.item.map((item) => {
        item.accuracyRate = (item.accuracyRate / 100).toFixed(2) + "%";
        // item.createdAt = formart_date(item.createdAt);
        item.totalSize = formart_storage(item.totalSize);
        item.elapsedTime = item.elapsedTime / 1000 + "S";
        return item;
      });
      this.totalPageSize = Math.ceil(result.total / 10);
    },
    async getChartsData() {
      const result = await fetchNodeDetail(this.nodeId, {
        page: 1,
        size: 500,
      });
      const time = Date.now() / 1000 - 24 * 60 * 60;
      const data = result.item.filter((obj) => {
        return obj.createdAt > time;
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
      }
    },
    handlePagination(value) {
      this.listQuery.page = value;
      this.loading = true;
      this.getNodeDetail();
    },
    handleViewCid(item) {
      this.dialogTableContent = item.cids;
      this.dialog = true;
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
  },
  components: {
    NetworkLine,
  },
};
</script>

<style lang="less" scoped>
/deep/.v-skeleton-loader__article {
  background: transparent !important;
}
.node-detail-container {
  max-width: 1000px;
  width: 100%;
  padding: 0 20px;
  margin: 18px auto 20px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #e6e8eb;
  background: #ffffff;
  .icon {
    width: 24px;
  }
  .node {
    padding: 32px 0 10px;
    .node-info {
      z-index: 2;
      position: relative;
      width: 100%;
      // height: 260px;
      padding: 30px;
      margin-top: 26px;
      box-sizing: border-box;
      border-radius: 5px;
      border: 1px solid #e6e8eb;
      background: #ffffff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      /deep/ .col {
        padding: 0;
      }
      .node-info-list {
        // list-style: none;
        .node-info-item {
          display: flex;
          font-size: 14px;
          color: #465669;
          line-height: 40px;
          .node-text {
            display: inline-block;
            // min-width: 110px;
          }
          .node-value {
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            word-wrap: none;
            margin-left: 20px;
            color: #495667;
            line-height: 40px;
            font-weight: bold;
          }
        }
      }
    }
    .node-info::after {
      content: "";
      display: block;
      position: absolute;
      z-index: -1;
      right: -46px;
      top: 0;
      height: 100%;
      width: 386px;
      background: url("../assets/imgs/nodeDetail/node-bg.png") no-repeat;
    }
  }

  .accuracy-rate {
    padding: 60px 0;
    .accuracy-rate-charts {
      margin-top: 55px;
      height: 300px;
    }
  }
  .statistics-table {
    .view-text {
      color: #34a9ff;
      font-size: 12px;
      cursor: pointer;
    }
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

  .node-detail-dialog {
    .dialog-table {
      width: 100%;
      tr {
        display: flex;
        justify-content: space-between;
      }
      td,
      th {
        height: 56px;
        line-height: 56px;
        font-size: 12px;
      }
      tr:nth-of-type(1) {
        background: #e6e8eb !important;
      }
      tr:nth-of-type(odd) {
        background: #f8f8f8;
      }
      .cid {
        width: 400px;
        text-align: center;
      }
      .status {
        width: 120px;
        text-align: center;
      }
      .pin {
        color: #34a9ff;
      }
      .unpin {
        color: #fb0505;
      }
    }
  }
  .node-detail-dialog .v-card__title {
    position: relative;
    justify-content: center;
    padding: 33px 0 21px 0;
    font-size: 18px;
    font-weight: 600;
    color: #7d848b;
  }
  .dialog-close {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
