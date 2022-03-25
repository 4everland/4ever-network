<template>
  <div class="node-detail-container">
    <div class="node">
      <div class="node-header d-flex">
        <img src="@/assets/imgs/nodeDetail/node-icon.png" alt="" />
        <h3 class="ml-3">Node Info</h3>
      </div>
      <v-row class="node-info">
        <v-col sm="12" lg="7">
          <ul class="node-info-list">
            <li class="node-info-item">
              <span class="node-text">Node ID : </span>
              <span class="node-value">bafybeibvnnk7ikrnttpwxsdda2323d</span>
            </li>
            <li class="node-info-item">
              <span class="node-text">Node ID: </span>
              <span class="node-value">bafybeibvnnk7ikrnttpwxsdda2323d</span>
            </li>
            <li class="node-info-item">
              <span class="node-text">Disk: </span>
              <span class="node-value">bafybeibvnnk7ikrnttpwxsdda2323d</span>
            </li>
            <li class="node-info-item">
              <span class="node-text">CPU: </span>
              <span class="node-value">bafybeibvnnk7ikrnttpwxsdda2323d</span>
            </li>
            <li class="node-info-item">
              <span class="node-text">Memory: </span>
              <span class="node-value">bafybeibvnnk7ikrnttpwxsdda2323d</span>
            </li>
          </ul>
        </v-col>
        <v-col sm="12" lg="5">
          <ul class="node-info-list">
            <li class="node-info-item">
              <span class="node-text right">Program Version: </span>
              <span class="node-value">3232323</span>
            </li>
            <li class="node-info-item">
              <span class="node-text right">Mr_enclava: </span>
              <span class="node-value">3232323</span>
            </li>
            <li class="node-info-item">
              <span class="node-text right">Total Reward: </span>
              <span class="node-value">3232323</span>
            </li>
            <li class="node-info-item">
              <span class="node-text right">Status: </span>
              <span class="node-value">3232323</span>
            </li>
            <li class="node-info-item">
              <span class="node-text right">CreateAt: </span>
              <span class="node-value">3232323</span>
            </li>
          </ul>
        </v-col>
      </v-row>

      <div class="accuracy-rate">
        <div class="accuracy-rate-header d-flex">
          <img src="@/assets/imgs/nodeDetail/node-icon.png" alt="" />
          <h3 class="ml-3">Accuracy Rate</h3>
        </div>
        <div class="accuracy-rate-charts">
          <network-line
            :xAxisData="xAxisData"
            :yAxisData="yAxisData"
            yAxisLabelFormatter="{value}%"
          />
        </div>
      </div>

      <div class="node-statistics">
        <div class="accuracy-rate-header d-flex">
          <img src="@/assets/imgs/nodeDetail/node-icon.png" alt="" />
          <h3 class="ml-3">Node Statistics</h3>
          <img src="@/assets/imgs/nodeDetail/node-icon.png" alt="" />
        </div>
        <div class="statistics-table mt-7">
          <network-table
            @handleViewClick="handleViewClick"
            :tableHeaderData="tableHeaderData"
            :tableContentData="tableContentData"
          />
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
          <v-card-title>CID List</v-card-title>
          <v-card-text style="height: 500px">
            <network-table
              :pagination="false"
              :tableHeaderData="dialogTableHeader"
              :tableContentData="dialogTableContent"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import NetworkLine from "@/components/NetworkLine.vue";
import NetworkTable from "@/components/NetworkTable.vue";
export default {
  data() {
    return {
      dialog: false,
      tableHeaderData: [
        {
          text: "TeeReport",
          align: "center",
          sortable: false,
          value: "teeReport",
        },
        { text: "Size of Challenge File", align: "center", value: "size" },
        { text: "Elapsed Time", align: "center", value: "time" },
        { text: "PoSC Accuracy Rate", align: "center", value: "rate" },
        { text: "CreateAt", align: "center", value: "createTime" },
        {
          text: "CID List",
          align: "center",
          value: "cidList",
          sortable: false,
        },
      ],
      dialogTableHeader: [
        { text: "Node ID", value: "cid", align: "center", sortable: false },
        {
          text: "Status",
          align: "center",
          value: "status",
          sortable: false,
        },
      ],
      dialogTableContent: [
        {
          cid: "bafybeibvnnk7ikrnttpwxsdd12323d",
          status: 1,
        },
        {
          cid: "bafybeibvnnk7ikrnttp3xsdda2323d",
          status: 1,
        },
        {
          cid: "bafybeibvnnk7ik4nttpwxsdda2323d",
          status: 0,
        },
        {
          cid: "bafybeibvnnkikrnt4pwxsdda2323d",
          status: 1,
        },
        {
          cid: "bafybeibvnnk7ik2nttpwxsdda2323d",
          status: 0,
        },
        {
          cid: "bafybeibv4nk7ikrnttpwxsdda2323d",
          status: 1,
        },
        {
          cid: "bafybeibvnnk7ik4nttpwxsdda2323d",
          status: 0,
        },
        {
          cid: "bafybeibvnnkikrnt4p455wxsdda2323d",
          status: 1,
        },
        {
          cid: "bafybeibvnnk7ik2ntt545pwxsdda2323d",
          status: 0,
        },
        {
          cid: "bafybeibv4nk7ikrntt454pwxsdda2323d",
          status: 1,
        },
        {
          cid: "bafybeibvnnk7ik4544ntt5pwxsdda2323d",
          status: 0,
        },
        {
          cid: "bafybeibvnnkik545rnt4pwxsdda2323d",
          status: 1,
        },
        {
          cid: "bafybeibvnnk745ik2nttpwxsd23a2323d",
          status: 0,
        },
        {
          cid: "bafybeibv4nk7ikrnt545tpwxsdda2323d",
          status: 1,
        },
        {
          cid: "bafybeibvnnk7ik2nttpwxsdda2323d",
          status: 0,
        },
        {
          cid: "bafybeibv4nk7ikrnttpwxsdda2323d",
          status: 1,
        },
        {
          cid: "233224343",
          status: 0,
        },
        {
          cid: "bafybeibv4nk7ikrn3232ttpwxsdda2323d",
          status: 1,
        },
        {
          cid: "bafybeibvnnk7ik2n232ttpwxsdda2323d",
          status: 0,
        },
        {
          cid: "bafybeibv4nk323ttpwxsdda2323d",
          status: 1,
        },
      ],
      tableContentData: [
        {
          teeReport: "Frozen Yogurt",
          size: 132,
          time: 6.0,
          rate: 24,
          createTime: 4.0,
        },
        {
          teeReport: "Frozen Yogurt",
          size: 32,
          time: 6.0,
          rate: 24,
          createTime: 4.0,
        },
        {
          teeReport: "Frozen Yogurt",
          size: 43,
          time: 6.0,
          rate: 24,
          createTime: 4.0,
        },
        {
          teeReport: "Frozen Yogurt",
          size: 54,
          time: 6.0,
          rate: 24,
          createTime: 4.0,
        },
        {
          teeReport: "Frozen Yogurt",
          size: 159,
          time: 6.0,
          rate: 24,
          createTime: 4.0,
        },
        {
          teeReport: "Frozen Yogurt",
          size: 656,
          time: 6.0,
          rate: 24,
          createTime: 4.0,
        },
        {
          teeReport: "Frozen Yogurt",
          size: 656,
          time: 6.0,
          rate: 24,
          createTime: 4.0,
        },
        {
          teeReport: "Frozen Yogurt",
          size: 656,
          time: 6.0,
          rate: 24,
          createTime: 4.0,
        },
        {
          teeReport: "Frozen Yogurt",
          size: 656,
          time: 6.0,
          rate: 24,
          createTime: 4.0,
        },
      ],

      xAxisData: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ],
      yAxisData: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ],
    };
  },
  methods: {
    handleViewClick(scoped) {
      console.log(scoped);
      this.dialog = true;
    },
  },
  components: {
    NetworkLine,
    NetworkTable,
  },
};
</script>

<style lang="less" scoped>
.node-detail-container {
  max-width: 1000px;
  width: 100%;
  padding: 0 20px;
  margin: 18px auto 20px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #e6e8eb;
  background: #ffffff;
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
          font-size: 16px;
          color: #465669;
          line-height: 40px;
          .node-text {
            display: inline-block;
            width: 70px;
          }

          .node-text.right {
            width: 130px;
          }
          .node-value {
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            word-wrap: none;
            margin-left: 40px;
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

  .node-detail-dialog .v-card__title {
    position: relative;
    justify-content: center;
    padding: 33px 0 21px 0;
    font-size: 18px;
    font-weight: 600;
    color: #7d848b;
  }
}
</style>
