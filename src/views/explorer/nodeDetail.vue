<template>
  <div class="node-detail">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card outlined class="node-detail-block-card">
            <div class="d-flex align-center justify-space-between mb-4">
              <div class="d-flex align-center">
                <Logo class="mr-4" />
                <span v-if="true" class="major">Major</span>
                <span v-else class="popular">Popular</span>
              </div>
              <div>
                <v-btn>Voting</v-btn>
                <v-btn>Claim</v-btn>
              </div>
            </div>
            <v-expansion-panels accordion flat v-model="panel">
              <v-expansion-panel @click="viewMore">
                <v-expansion-panel-header>
                  <div class="mr-4">
                    <span class="node-id"
                      >{{ nodeId }}

                      <v-btn icon @click.stop="copyNodeId(nodeId)">
                        <v-icon small>mdi-content-copy</v-icon>
                      </v-btn>
                    </span>
                    <div class="node-desc">
                      Describe: As an established exchange and an early
                      supporter of REI, BigONE has a mature experience in the
                      operation and maintenance of validator nodes and a strict
                      risk control system to ensure the safe and stable
                      operation of nodes.Describe: As an established exchange
                      and an early supporter of REI, BigONE has a mature
                      experience in the operation and maintenance of validator
                      nodes and a strict risk control system to ensure the safe
                      and stable operation of nodes.
                    </div>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row class="node-info">
                    <v-col cols="12" md="6">
                      <v-col
                        cols="12"
                        v-for="item in detailMore.slice(0, 6)"
                        :key="item.key"
                      >
                        <div class="d-flex justify-space-between">
                          <span class="color-main-text">
                            {{ item.name }}
                          </span>
                          <span class="datanum--text">
                            {{ item.value }}
                          </span>
                        </div>
                      </v-col>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-col
                        cols="12"
                        v-for="item in detailMore.slice(6)"
                        :key="item.key"
                      >
                        <div class="d-flex justify-space-between">
                          <span class="color-main-text">
                            {{ item.name }}
                          </span>
                          <span class="datanum--text">
                            {{ item.value }}
                          </span>
                        </div>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-row class="mt-8 detail-overview boxbackgroud rounded" no-gutters>
              <v-col
                v-for="item in detailOverview"
                :key="item.name"
                cols="12"
                md="3"
                class="text-center pa-8 after-border"
              >
                <div class="d-flex align-center justify-center mb-2">
                  <v-img
                    max-height="18"
                    max-width="18"
                    :src="item.icon"
                  ></v-img>
                  <span class="ml-2 overview-item-title">{{ item.name }}</span>
                </div>
                <div class="mb-2">
                  <span class="overview-item-num datanum--text">
                    {{ formart_number(item.value) }}
                  </span>
                  <span class="overview-item-title">
                    {{ item.unit }}
                  </span>
                </div>
                <!-- <div v-if="item.price" class="text-center overview-item-title">
                  $ {{ formart_number(item.price) }}
                </div> -->
              </v-col>
            </v-row>
            <v-row class="mt-12" no-gutters v-if="isSelfNode">
              <v-col cols="12" md="6">
                <div class="boxbackgroud ma-0 mr-md-6 rounded node-block">
                  <div class="node-block-type">Insufficient</div>
                  <div><v-icon small>mdi-content-copy</v-icon></div>
                  <div class="node-block-title">Staked</div>
                  <div class="node-block-value datanum--text">
                    {{ detailBalance.stake }} 4EVER
                  </div>
                  <!-- <div class="node-block-price datanum--text">$ 111,224,1</div> -->
                  <div class="node-block-btn-box">
                    <v-btn
                      class="node-block-btn stake-btn btnColor--text text-capitalize"
                      elevation="0"
                      @click="handleStake"
                      >Stake</v-btn
                    >
                    <v-btn
                      class="node-block-btn unstake-btn btnColor--text text-capitalize"
                      elevation="0"
                      @click="handleUnstake"
                      >Unstake</v-btn
                    >
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="boxbackgroud ma-0 mr-md-6 rounded node-block">
                  <div class="node-block-type">Insufficient</div>
                  <div><v-icon small>mdi-content-copy</v-icon></div>
                  <div class="node-block-title">My Reward</div>
                  <div class="node-block-value datanum--text">
                    {{ detailBalance.reward }} 4EVER
                  </div>
                  <!-- <div class="node-block-price datanum--text">$ 111,224,1</div> -->
                  <div class="node-block-btn-box justify-center">
                    <v-btn
                      class="node-block-btn claim-btn btnColor--text text-capitalize"
                      elevation="0"
                      >Claim</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
            <table-validated v-if="isSelfNode" />
            <table-reward v-if="isSelfNode" />
            <table-validator />
            <table-teeReport />
            <table-slash />
            <table-withdraw v-if="isSelfNode" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <stake-dialog ref="stakeDialog" />
  </div>
</template>

<script>
import { fetchNodeDetail, fetchNodeBalance } from "@/api/node.js";

import Logo from "@/components/Logo.vue";
import tableValidated from "./components/tableValidated.vue";
import tableReward from "./components/tableReward.vue";
import tableValidator from "./components/tableValidator.vue";
import tableTeeReport from "./components/tableTeeReport.vue";
import tableSlash from "./components/tableSlash.vue";
import tableWithdraw from "./components/tableWithdraw.vue";

import stakeDialog from "@/components/Dialog/stakeDialog.vue";

import { formart_number, formatToken } from "@/utils/utils";

export default {
  components: {
    Logo,
    tableValidated,
    tableReward,
    tableValidator,
    tableTeeReport,
    tableSlash,
    tableWithdraw,
    stakeDialog,
  },
  data() {
    return {
      nodeId: null,
      panel: null,
      detailMore: [
        {
          name: "Domain",
          key: "domain",
          value: "",
        },
        {
          name: "Address",
          key: "address",
          value: "",
        },
        {
          name: "Location",
          key: "location",
          value: "",
        },
        {
          name: "Version",
          key: "version",
          value: "",
        },
        {
          name: "Cpu",
          key: "cpu",
          value: "",
        },
        {
          name: "Disk",
          key: "disk",
          value: "",
        },
        {
          name: "Voting APR",
          key: "apr",
          value: "",
        },
        {
          name: "Status",
          key: "status",
          value: "",
        },
        {
          name: "CreatedAt",
          key: "createdAt",
          value: "-",
        },
      ],
      detailOverview: [
        {
          icon: require("@/assets/imgs/home/NodeRunner.png"),
          name: "Staked",
          tips: "111111",
          value: "",
          unit: "4EVER",
          price: "11111",
          key: "stake",
        },
        {
          icon: require("@/assets/imgs/home/NodeRunner.png"),
          name: "Validator",
          tips: "111111",
          value: "",
          unit: null,
          price: null,
          key: "validator",
        },
        {
          icon: require("@/assets/imgs/home/NodeRunner.png"),
          name: "Voted",
          tips: "111111",
          value: "",
          unit: "4EVER",
          price: "11111",
          key: "vote",
        },
        {
          icon: require("@/assets/imgs/home/NodeRunner.png"),
          name: "ARP",
          tips: "111111",
          value: "",
          unit: "%",
          price: null,
          key: "apr",
        },
      ],
      detailBalance: {
        stake: "",
        reward: "",
      },
      nodeHolder: null,
    };
  },
  computed: {
    isSelfNode() {
      // return this.nodeHolder == localStorage.getItem("address");
      return true;
    },
  },
  watch: {},
  methods: {
    formart_number,
    formatToken,
    getNodeOverview() {
      const nodeId = this.nodeId;
      fetchNodeDetail(nodeId).then((res) => {
        this.nodeHolder = res.data.address;
        this.detailMore.map((item) => {
          item.value = res.data[item.key];
          return item;
        });
        this.detailOverview.map((item) => {
          item.value = res.data[item.key];
          return item;
        });
      });
    },
    getNodeBalance() {
      const nodeId = this.nodeId;
      fetchNodeBalance(nodeId).then((res) => {
        if (res.data) {
          this.detailBalance = res.data;
        }
      });
    },

    copyNodeId(nodeId) {
      console.log(nodeId);
    },
    viewMore() {
      console.log(this.panel);
    },
    handleStake() {
      this.$refs.stakeDialog.open();
    },
    handleUnstake() {
      this.$refs.stakeDialog.open();
    },
  },
  created() {
    this.nodeId = this.$route.params.id;
    this.getNodeOverview();
    this.getNodeBalance();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.node-detail {
  &-block-card {
    padding: 28px 30px;
    border-radius: 15px;
    .major {
      width: 44px;
      height: 21px;
      border-radius: 2px;
      border: 1px solid #e182b9;
      font-size: 12px;
      font-weight: bold;
      color: #e182b9;
      text-align: center;
      display: inline-block;
    }
    .popular {
      width: 54px;
      height: 21px;
      border-radius: 2px;
      border: 1px solid #43a7eb;
      font-size: 12px;
      font-weight: bold;
      color: #43a7eb;
      text-align: center;
      display: inline-block;
    }
    .node-id {
      font-size: 12px;
      font-weight: bold;
    }
    .node-desc {
      font-size: 9px;
      color: #8093a1;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .node-info {
      font-size: 12px;
      font-weight: bold;
    }
    .detail-overview {
      overflow: hidden;
      .after-border {
        position: relative;
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
      .after-border::after {
        content: "";
        width: 2px;
        height: 75px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        background: #e2e7eb;
      }
      .after-border:last-child::after {
        content: none;
      }
    }
    .node-block {
      width: 623px;
      height: 300px;
      padding: 0 40px;
      padding-top: 30px;
      .node-block-type {
        font-size: 12px;
        font-weight: bold;
        color: #e673b6;
        text-align: right;
      }
      .node-block-title {
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        color: #8093a1;
      }
      .node-block-value {
        font-size: 27px;
        font-weight: bold;
        text-align: center;
        margin-top: 27px;
      }
      .node-block-price {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        padding-top: 11px;
      }
      .node-block-btn-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 42px;
        .node-block-btn {
          display: inline-block;
          width: 210px;
          height: 28px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        .stake-btn {
          background: linear-gradient(270deg, #7dc55d 0%, #defbd1 100%);
        }
        .unstake-btn {
          background: linear-gradient(270deg, #5c433a 0%, #93756d 100%);
        }
        .claim-btn {
          width: 315px;
          height: 28px;
          background: linear-gradient(270deg, #53ccfb 0%, #fbb2dd 100%);
        }
      }
    }
  }
}
</style>
