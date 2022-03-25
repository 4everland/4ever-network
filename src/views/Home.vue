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
            <div class="data" style="color: '#345AA7">120</div>
          </div>
        </li>
        <li class="overview-item">
          <img src="../assets/imgs/home/networkfile-bg.png" alt="" />
          <div class="item-content">
            <h3 class="item-title">Total Network filess</h3>
            <div class="data" style="color: #6958b2">9,880</div>
          </div>
        </li>
        <li class="overview-item">
          <img src="../assets/imgs/home/storage-bg.png" alt="" />
          <div class="item-content">
            <h3 class="item-title">Network Storage</h3>
            <div class="data" style="color: #7784cc">102.43 T</div>
          </div>
        </li>
        <li class="overview-item">
          <img src="../assets/imgs/home/reward-bg.png" alt="" />
          <div class="item-content">
            <h3 class="item-title">Node Reward</h3>
            <div class="data">897,290</div>
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
          <template v-for="item in 4">
            <li
              :key="item"
              class="report-list-item d-flex justify-space-between"
            >
              <span class="cid"
                >12D3KooWS6GL7vpFQknW7FDMAEkbxm3hrRvr6fHXX4ehjR7jG3gf</span
              >
              <span class="rate">98,67%</span>
              <span class="time">Feb 22,2022 16:00:00 UTC</span>
            </li>
          </template>
        </ul>
      </v-col>
      <v-col xs="12" class="report-right">
        <h3 class="report-right-header">PoSC CHALLENGE PSRAMENTERS</h3>
        <ul class="report-right-list">
          <li class="report-right-list-item d-flex justify-space-between">
            <span>Generation time per report</span>
            <span>30 Mintute</span>
          </li>
          <li class="report-right-list-item d-flex justify-space-between">
            <span>Generation time per report</span>
            <span>30 Mintute</span>
          </li>
          <li class="report-right-list-item d-flex justify-space-between">
            <span>Generation time per report</span>
            <span>30 Mintute</span>
          </li>
          <li class="report-right-list-item d-flex justify-space-between">
            <span>Generation time per report</span>
            <span>30 Mintute</span>
          </li>
        </ul>
      </v-col>
    </v-row>

    <v-row class="storage d-flex justify-space-between">
      <v-col
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
        <!-- <ul class="pie-data">
          <li class="d-flex justify-space-between align-center">
            <span>Total Storage</span>
            <span>100G</span>
          </li>
          <li class="d-flex justify-space-between align-center">
            <span>Total Storage</span>
            <span>100G</span>
          </li>
          <li class="d-flex justify-space-between align-center">
            <span>Total Storage</span>
            <span>100G</span>
          </li>
        </ul> -->
      </v-col>
      <v-col
        xs="12"
        sm="12"
        md="7"
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
          >
            <div
              slot="prepend-item"
              class="select-search-bar"
              hide-details="auto"
            >
              <v-text-field label="Node ID" :hide-details="true" solo>
                <v-img
                  slot="prepend"
                  src="../assets/imgs/header/search-icon.png"
                >
                </v-img
              ></v-text-field>
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
        <network-table
          @handleViewClick="handleViewClick"
          :tableHeaderData="tableHeaderData"
          :tableContentData="tableContentData"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NetworkTable from "../components/NetworkTable.vue";
import NetworkBubble from "../components/NetworkBubble.vue";
import NetworkPie from "../components/NetworkPie.vue";
import NetworkLine from "../components/NetworkLine.vue";
import { fetchNodes } from "../api/api";
export default {
  name: "Home",
  data() {
    return {
      row: null,
      isShowNode: false,
      nodeList: [
        "bafybeibvnnk7ikrnttpujwwvay626iamv6gbrlev4",
        "bafybeibvnnk7ikrnttpujwwvay626iamv6gbrlev41",
        "bafybeibvnnk7ikrnttpujwwvay626iamv6gbrlev43",
        "bafybeibvnnk7ikrnttpujwwvay626iamv6gbrlev44",
        "bafybeibvnnk7ikrnttpujwwvay626iamv6gbrlev45",
        "bafybeibvnnk7ikrnttpujwwvay626iamv6gbrlev46",
        "bafybeibvnnk7ikrnttpujwwvay626iamv6gbrlev433",
        "bafybeibvnnk7ikrnttpujwwvay626iamv6gbrlev432",
        "bafybeibvnnk7ikrnttpujwwvay626iamv6gbrlev434",
      ],
      tableHeaderData: [
        {
          text: "Dessert (100g serving)",
          align: "center",
          sortable: false,
          value: "name",
        },
        { text: "Calories", align: "center", value: "calories" },
        { text: "Fat (g)", align: "center", value: "fat" },
        { text: "Carbs (g)", align: "center", value: "carbs" },
        { text: "Protein (g)", align: "center", value: "protein" },
        { text: "Iron (%)", align: "center", value: "iron" },
        { text: "view", align: "center", value: "view", sortable: false },
      ],
      tableContentData: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
    };
  },
  created() {
    fetchNodes().then((res) => {
      console.log(res);
    });
  },
  mounted() {},
  methods: {
    handleShowTable(value) {
      switch (value) {
        case "node":
          this.isShowNode = true;
          break;
        case "treeReport":
          console.log(value);
          this.isShowNode = false;
          break;
        default:
          break;
      }
    },
    handleToMore() {
      this.$router.push("/blockDetail");
    },
    handleViewClick(item) {
      console.log(item);
      this.$router.push("/nodeDetail");
    },
  },
  components: {
    NetworkTable,
    NetworkBubble,
    NetworkPie,
    NetworkLine,
  },
};
</script>
<style lang="less" scoped>
* {
  list-style: none;
}
/deep/ .v-list {
  padding: 0;
}
.select-search-bar {
  padding: 10px 20px;
  width: 381px;
  background: #f1f6fb;
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
          padding: 0 30px;
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
            width: 41px;
          }
          .time {
            width: 146px;
          }
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
      padding: 13px 15px 18px 19px;
      margin-left: 20px;
      width: 280px;
      .report-right-header {
        position: relative;
        width: 166px;
        margin: 0 auto;
        font-size: 18px;
        color: #495667;
      }
      .report-right-header::before {
        content: "";
        position: absolute;
        display: block;
        left: -38px;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        background: url("../assets/imgs/home/champion-icon.png");
      }
      .report-right-list {
        padding-left: 0;
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
      // .pie-data {
      //   position: absolute;
      //   right: 0;
      //   top: 50%;
      //   transform: translateY(-50%);
      //   list-style: none;
      //   width: 161px;
      //   padding: 0;
      //   padding: 0 26px 0 0;
      //   li + li {
      //     margin-top: 20px;
      //   }
      //   span:nth-of-type(1) {
      //     color: #7f8489;
      //     font-size: 12px;
      //   }
      //   span:nth-of-type(2) {
      //     color: #34a9ff;
      //     font-size: 12px;
      //   }
      // }
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
        width: 135px;
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
    }
  }
}
</style>
