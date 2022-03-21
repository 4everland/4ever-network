<template>
  <div class="home">
    <div class="overview">
      <h2 class="overview-title">Overview</h2>
      <ul class="overview-list d-flex justify-space-between align-center">
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

    <div class="node-locations"></div>

    <v-row class="latest-PoSC-report">
      <v-col lg="8" md="8" class="report-left">
        <div class="report-left-bar d-flex justify-space-between">
          <span class="report-left-title">Latest PoSC Report #10086</span>
          <span class="report-more">More</span>
        </div>
        <ul class="report-list">
          <li class="report-list-item d-flex justify-space-between">
            <span>12D3KooWS6GL7vpFQknW7FDMAEkbxm3hrRvr6fHXX4ehjR7jG3gf</span>
            <span>98,67%</span>
            <span>Feb 22,2022 16:00:00 UTC</span>
          </li>
          <li class="report-list-item d-flex justify-space-between">
            <span>12D3KooWS6GL7vpFQknW7FDMAEkbxm3hrRvr6fHXX4ehjR7jG3gf</span>
            <span>98,67%</span>
            <span>Feb 22,2022 16:00:00 UTC</span>
          </li>
          <li class="report-list-item d-flex justify-space-between">
            <span>12D3KooWS6GL7vpFQknW7FDMAEkbxm3hrRvr6fHXX4ehjR7jG3gf</span>
            <span>98,67%</span>
            <span>Feb 22,2022 16:00:00 UTC</span>
          </li>
          <li class="report-list-item d-flex justify-space-between">
            <span>12D3KooWS6GL7vpFQknW7FDMAEkbxm3hrRvr6fHXX4ehjR7jG3gf</span>
            <span>98,67%</span>
            <span>Feb 22,2022 16:00:00 UTC</span>
          </li>
        </ul>
      </v-col>
      <v-spacer></v-spacer>
      <v-col lg="3" md="4" class="report-right">
        <div class="report-right-header">PoSC CHALLENGE PSRAMENTERS</div>
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

    <div class="storage d-flex justify-space-between">
      <div class="storage-left card-border"></div>
      <div class="storage-right card-border"></div>
    </div>

    <div class="statistics card-border">
      <div class="statistics-banner">Statistics</div>
      <div class="switch-tab">
        <v-btn elevation="2" rounded color="#34A9FF">Node</v-btn>
        <v-btn elevation="2" rounded color="#34A9FF">TreeReport</v-btn>
      </div>

      <div class="staistics-table">
        <network-table></network-table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NetworkTable from "../components/NetworkTable.vue";
export default {
  name: "Home",
  data() {
    return {
      row: null,
    };
  },
  components: {
    NetworkTable,
  },
};
</script>
<style lang="less" scoped>
* {
  list-style: none;
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
      // flex: 1;
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
      // width: 280px;
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
      width: 449px;
      height: 367px;
    }
    .storage-right {
      width: 530px;
      height: 367px;
    }
  }
  .statistics {
    width: 100%;
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
    }
    .staistics-table {
      padding: 20px;
    }
  }
}
</style>
