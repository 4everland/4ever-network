<template>
  <div class="node-detail">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row class="mt-8 detail-overview boxbackgroud rounded" no-gutters>
            <v-col
              v-for="item in detailOverview"
              :key="item.name"
              cols="12"
              md="4"
              class="text-center pa-8 after-border"
            >
              <div class="d-flex align-center justify-center mb-2">
                <v-img max-width="18" :src="item.icon"></v-img>
                <span class="ml-2 overview-item-title">{{ item.name }}</span>
              </div>
              <div class="mb-2">
                <span class="overview-item-num datanum--text">
                  {{ item.value }}
                </span>
                <span class="overview-item-title">
                  {{ item.unit }}
                </span>
              </div>
              <!-- <div v-if="item.price" class="text-center overview-item-title">
                  $ {{ bignumFormatter(item.price) }}
                </div> -->
            </v-col>
          </v-row>
          <table-validated />
          <table-reward />
          <table-withdraw />
        </v-col>
      </v-row>
    </v-container>
    <stake-dialog ref="stakeDialog" />
    <apr-dialog ref="aprDialog" />
    <voting-dialog ref="votingDialog" />
    <claim-dialog ref="claimDialog" />
  </div>
</template>

<script>
import Clipboard from "clipboard";

import contracts from "@/contracts";

import { fetchNodeDetail } from "@/api/node.js";

import Logo from "@/components/Logo.vue";
import tableValidated from "./components/tableValidated.vue";
import tableReward from "./components/tableReward.vue";
import tableValidator from "./components/tableValidator.vue";
import tableTeeReport from "./components/tableTeeReport.vue";
import tableSlash from "./components/tableSlash.vue";
import tableWithdraw from "./components/tableWithdraw.vue";

import stakeDialog from "@/components/Dialog/stakeDialog.vue";
import aprDialog from "@/components/Dialog/aprDialog.vue";
import votingDialog from "@/components/Dialog/votingDialog.vue";
import claimDialog from "@/components/Dialog/claimDialog.vue";
import { BigNumber } from "@ethersproject/bignumber";

import {
  formart_number,
  formart_date,
  formatToken,
  bignumFormatter,
} from "@/utils/utils";

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
    aprDialog,
    votingDialog,
    claimDialog,
  },
  data() {
    return {
      nodeId: null,
      panel: null,
      nodeData: {},

      detailOverview: [
        {
          icon: require("@/assets/imgs/nodeDetail/Staked.png"),
          name: "Total Validated",
          tips: "",
          value: "",
          unit: null,
          price: null,
          key: "stake",
          format(val) {
            return bignumFormatter(val / 1e18);
          },
        },
        {
          icon: require("@/assets/imgs/nodeDetail/Validator.png"),
          name: "Total Voted",
          tips: "",
          value: "",
          unit: "4EVER",
          price: null,
          key: "validator",
          format(val) {
            return bignumFormatter(val);
          },
        },
        {
          icon: require("@/assets/imgs/nodeDetail/Voted.png"),
          name: "Total Reward",
          tips: "",
          value: "",
          unit: "4EVER",
          price: null,
          key: "vote",
          format(val) {
            return bignumFormatter(val / 1e18);
          },
        },
      ],
      nodeHolder: "",
      description: null,
      Timer: null,
    };
  },
  computed: {
    // isSelfNode() {
    //   const account = this.$store.state.account;
    //   if (account) {
    //     return this.nodeHolder.toLowerCase() == account.toLowerCase();
    //   } else {
    //     return false;
    //   }
    // },
    account() {
      return this.$store.state.account;
    },
    myNodeStake() {
      return this.$store.state.myNodeStake;
    },
    myReward() {
      return this.$store.state.myReward;
    },
  },
  watch: {
    $route() {
      this.getNodeOverview();
    },
    account(newVal) {
      if (newVal) {
        // this.getNodeOverview();
      }
    },
    // isSelfNode(newVal) {
    //   if (newVal) {
    //     this.Timer = setInterval(() => {
    //       console.log("refresh reward");
    //       this.$store.dispatch("updateMyReward");
    //     }, 5000);
    //   }
    // },
  },
  methods: {
    formart_number,
    formart_date,
    formatToken,
    bignumFormatter,
    async getNodeOverview() {
      const account = await this.$store.dispatch("getAccount");
      const id = this.$route.params.id;
      const params = {
        address: account,
      };
      fetchNodeDetail(id, params).then((res) => {
        this.nodeData = res.data;
        this.nodeHolder = res.data.address;
        this.nodeId = res.data.nodeId;
        this.description = res.data.description;
        this.detailMore.map((item) => {
          if (item.format) {
            item.value = item.format(res.data[item.key]);
          } else {
            item.value = res.data[item.key];
          }
          return item;
        });
        this.detailOverview.map((item) => {
          item.value = item.format(res.data[item.key]);
          return item;
        });
      });
    },
    copyNodeId(e, nodeId) {
      const clipboard = new Clipboard(e.target, { text: () => nodeId });
      clipboard.on("success", (e) => {
        clipboard.off("error");
        clipboard.off("success");
        clipboard.destroy();
        return this.$dialog.notify.success("Successfully", {
          position: "top-right",
          timeout: 5000,
        });
      });
      clipboard.on("error", (e) => {
        clipboard.off("error");
        clipboard.off("success");
        clipboard.destroy();
        return this.$dialog.notify.error("Error", {
          position: "top-right",
          timeout: 5000,
        });
      });
      clipboard.onClick(e);
    },
    handlerVoting(data) {
      this.$refs.votingDialog.open(data);
    },
    handlerUserClaim(data) {
      this.$refs.claimDialog.open(data);
    },
    viewMore() {
      console.log(this.panel);
    },
    handleStake() {
      this.$refs.stakeDialog.open();
    },
    async handleUnstake() {
      // const isStakeUnfrozen = await contracts.Stake.isStakeUnfrozen(
      //   this.account
      // );
      // console.log(isStakeUnfrozen);
      try {
        const tx = await contracts.Stake.applyQuit();
        console.log(tx);
        const receipt = await tx.wait();
        console.log(receipt);
      } catch (error) {
        console.log(error);
        return this.$dialog.notify.error(error.data.message, {
          position: "top-right",
          timeout: 5000,
        });
      }

      const candidateApply = await contracts.Stake.candidateApplyInfo(
        this.account
      );
      // candidateApply.amount
      const lastApplyQuitTimestamp = candidateApply.lastApplyQuitTimestamp;
      const stakeFrozenPeriod = await contracts.Stake.stakeFrozenPeriod();

      const tx = await contracts.Stake.quit(this.account);
    },
    async handlerClaim() {
      try {
        const tx = await contracts.Stake.claim(this.account);
        console.log(tx);
        const receipt = await tx.wait();
        console.log(receipt);
      } catch (error) {
        console.log(error);
        return this.$dialog.notify.error(error.data.message, {
          position: "top-right",
          timeout: 5000,
        });
      }
    },
    handlerAprChange() {
      this.$refs.aprDialog.open();
    },
    async getStake() {
      const candidate = await contracts.Stake.candidateInfo(this.account);
      console.log("stake", candidate);
      this.stake = candidate.amount.div((1e18).toString());
    },
    async getReward() {
      const reward = await contracts.Stake.pendingReward(this.account);
      console.log("reward", reward);
      this.reward = reward.div((1e18).toString());
    },
  },
  created() {
    this.getNodeOverview();
  },
  mounted() {},
  destroyed() {
    if (this.Timer) {
      clearTimeout(this.Timer);
    }
  },
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
    .voting-btn {
      width: 74px;
      height: 30px;
      background: linear-gradient(270deg, #ff6ceb 0%, #ffb881 100%);
      border-radius: 4px;
      display: inline-block;
      font-size: 11px;
    }
    .claim-btn {
      width: 74px;
      height: 30px;
      background: linear-gradient(270deg, #53ccfb 0%, #fbb2dd 100%);
      border-radius: 4px;
      display: inline-block;
      font-size: 11px;
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
