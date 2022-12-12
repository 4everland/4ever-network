<template>
  <div class="governance">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-sheet class="banner transparent pt-16 pl-16">
            <div class="banner-title">Be a 4EVERLAND Node</div>
            <div class="banner-tips">
              Welcome to the 4EVERLAND network! All you need to do is provide
              your node ID and stake 4EVER to become a node and enjoy the
              benefits.
            </div>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="mt-8 governance-system rounded" no-gutters>
        <v-col
          v-for="(item, index) in governanceList"
          :key="item.name"
          cols="12"
          md="4"
          class="pa-8"
        >
          <div class="text-center" :class="index == step ? 'active' : ''">
            <span class="round-tag">{{ index + 1 }}</span>
            <span class="governance-system-text datanum--text">
              {{ formart_number(item.name) }}
            </span>
          </div>
        </v-col>
      </v-row>
      <div elevation="0" class="mt-8 card-block" v-show="step == 0">
        <!-- <div class="card-tips datanum--text">
          Welcome to the 4EVERLAND network! All you need to do is provide your
          node ID and stake 4EVER to become a node and enjoy the benefits.
        </div> -->
        <div class="card-input">
          <div class="input-title">Node ID:</div>
          <input
            v-model="nodeId"
            type="text"
            class="int inputBg"
            style="width: 660px"
            placeholder="Enter"
          />
        </div>
        <div class="card-btn">
          <v-btn
            width="660"
            height="48"
            small
            color="#00A8F1"
            class="white--text"
            @click="handelRegister"
            :loading="registerLoading"
            >Next</v-btn
          >
        </div>
      </div>
      <div elevation="0" class="mt-8 card-block" v-show="step == 1">
        <div
          class="card-tips datanum--text text-center"
          style="max-width: 860px"
        >
          Registering a node is required to stake at least 1,000,000 4EVER for
          the maintenance of the network. Generally, the more you stake, the
          more you're rewarded, but if your node does not operate as it should,
          part of your stake will be deducted as a result.
        </div>

        <div class="card-input">
          <div class="d-flex justify-space-between align-center mb-2">
            <div class="input-title">Stake:</div>
            <span v-if="balance" class="datanum--text" style="font-size: 14px"
              >Balance: {{ formart_number(balance) }} 4EVER</span
            >
          </div>
          <div>
            <div class="inputBg" style="width: 660px">
              <input
                v-model="stakeAmount"
                type="text"
                class="int"
                style="width: 580px"
                placeholder="Enter"
              />
              <v-btn text tile plain color="#43A7EB" @click="onMax">Max</v-btn>
            </div>
          </div>
        </div>
        <div class="card-btn">
          <div v-if="isStakeApproved">
            <v-btn
              width="660"
              height="48"
              small
              block
              color="#00A8F1"
              class="white--text"
              :loading="stakeLoading"
              @click="handelStake"
              >Stake</v-btn
            >
            <v-btn
              class="mt-4"
              width="660"
              height="48"
              small
              block
              text
              color="#00A8F1"
              @click="handelViewNow"
              >View</v-btn
            >
          </div>
          <v-btn
            v-else
            width="660"
            height="48"
            small
            block
            color="#00A8F1"
            class="white--text"
            :loading="approveLoading"
            @click="handelApprove"
            >Approve</v-btn
          >
        </div>
      </div>
      <div elevation="0" class="mt-8 card-block" v-show="step == 2">
        <div class="card-tips datanum--text">
          You can add your node information on the
          <a
            href="https://github.com/liqwa1234/node"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub link</a
          >
          to get the community to view and vote for it to be a 4EVERLAND master
          node.
        </div>
        <div class="card-btn">
          <v-btn
            width="660"
            height="48"
            small
            block
            color="#00A8F1"
            class="white--text"
            href="https://github.com/liqwa1234/node"
            target="_blank"
            >GitHub</v-btn
          >
          <v-btn
            class="mt-4"
            width="660"
            height="48"
            small
            block
            text
            color="#00A8F1"
            @click="handelViewNow"
            >View</v-btn
          >
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { formart_number } from "@/utils/utils";
import { stake } from "@/utils/contracts";
import { BigNumber } from "ethers";
import contracts from "@/contracts";

export default {
  components: {},
  data() {
    return {
      step: 0,
      nodeId: "",
      stakeAmount: null,
      detailOverview: [
        {
          name: "Total proposal",
          value: "1234566",
          key: "stake",
        },
        {
          name: "Under publicity",
          value: "1234566",
          key: "validator",
        },
        {
          name: "Executed",
          value: "1234566",
          key: "vote",
        },
        {
          name: "Rejected",
          value: "1234566",
          key: "apr",
        },
      ],
      governanceList: [
        {
          name: "Register",
        },
        {
          name: "Stake",
        },
        {
          name: "Node Info",
        },
      ],
      registerLoading: false,
      stakeLoading: false,
      approveLoading: false,
    };
  },
  computed: {
    account() {
      const addr = localStorage.getItem("address");
      return this.$store.state.account || addr;
    },
    balance() {
      return this.$store.state.balance;
    },
    isStakeApproved() {
      return this.$store.state.isStakeApproved;
    },
    myNodeId() {
      return this.$store.state.myNodeId;
    },
    myStake() {
      return this.$store.state.myStake;
    },
  },
  watch: {
    isStakeApproved(newVal, oldVal) {
      if (newVal) {
        this.approveLoading = false;
      }
    },
    // myNodeId(newVal, oldVal) {
    //   console.log(newVal);
    //   if (newVal) {
    //     this.step = 1;
    //   }
    // },
    // myStake(newVal, oldVal) {
    //   console.log(newVal);
    //   if (newVal >= 500000 * 1e18) {
    //     this.step = 2;
    //   }
    // },
  },
  methods: {
    formart_number,
    async connectWallet() {
      await this.$store.dispatch("getConnect");
    },
    async handelRegister() {
      const nodeId = this.nodeId;
      this.registerLoading = true;
      try {
        const tx = await contracts.Stake.register(nodeId);
        console.log(tx);
        const receipt = await tx.wait();
        console.log(receipt);
        if (receipt) {
          this.step = 1;
          console.log(this.step);
        }
      } catch (error) {
        return this.$dialog.notify.error(error.data.message, {
          position: "top-right",
          timeout: 5000,
        });
      } finally {
        this.registerLoading = false;
      }
    },
    async handelApprove() {
      this.approveLoading = true;
      this.$store.dispatch("updateStakeApprove");
    },
    async handelStake() {
      const amount = BigNumber.from(this.stakeAmount).mul((1e18).toString());
      this.stakeLoading = true;
      stake(this.account, amount)
        .then((res) => {
          if (res) {
            this.step = 2;
          }
          this.stakeLoading = false;
        })
        .catch((err) => {
          this.stakeLoading = false;
        });
    },
    async handelViewNow() {
      this.$router.push("/");
    },

    async onMax() {
      this.stakeAmount = this.balance;
    },
  },
  async created() {
    if (!this.account) {
      try {
        await this.connectWallet();
      } catch (error) {
        console.log(error);
        if (error.code == 4001) {
          this.$router.push("/");
        }
      }
    }
  },
  mounted() {
    console.log(this.myStake);
    console.log(this.myNodeId);
    if (this.myStake >= 1000000 * 1e18) {
      this.step = 2;
    }
    if (this.myNodeId) {
      this.step = 1;
    }
  },
};
</script>
<style lang="less" scoped>
.governance {
  .banner {
    width: 100%;
    height: 300px;
    max-width: 1350px;
    max-height: 300px;
    background-image: url("../../assets/imgs/node/banner.png");
    background-position: 0 0;
    background-size: contain;
    border-radius: 4px;

    .banner-title {
      font-size: 36px;
      font-weight: bold;
      color: #ffffff;
    }
    .banner-tips {
      max-width: 530px;
      font-size: 14px;
      font-weight: bold;
      color: #d8d8d8;
    }
  }
  .governance-system {
    overflow: hidden;
    .num-tag {
      width: 91px;
      height: 48px;
      line-height: 48px;
      background-image: url("../../assets/imgs/node/tag.png");
      background-size: contain;
      text-align: center;
      color: #fff;
      padding-right: 10px;
      font-size: 27px;
    }
    .round-tag {
      width: 38px;
      height: 38px;
      line-height: 38px;
      background: linear-gradient(90deg, #ad91be 0%, #755889 100%);
      text-align: center;
      font-weight: bold;
      color: #fff;
      font-size: 23px;
      border-radius: 50%;
      display: block;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    .governance-system-text {
      font-size: 18px;
      font-weight: 600;
      color: #666;
    }
    .active {
      .num-tag {
        background-image: url("../../assets/imgs/node/tag_active.png");
      }
      .round-tag {
        background: linear-gradient(270deg, #c143df 0%, #ffb867 100%);
      }
      .governance-system-text {
        background: linear-gradient(270deg, #c143df 0%, #ffb867 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .card-block {
    width: 1350px;
    height: 353px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .card-tips {
      font-size: 14px;
      font-weight: 600;
    }
    .card-input {
      margin-top: 42px;
      .input-title {
        font-size: 18px;
        font-weight: 600;
        color: #7b92a2;
        margin-bottom: 13px;
      }
      .int {
        max-width: 100%;
        height: 48px;
        font-size: 18px;
        font-weight: 600;
        color: #7b92a2;
        padding: 0 14px;
        // margin-top: 13px;
        &::placeholder {
          color: #7b92a2;
        }
      }
    }

    .card-btn {
      margin-top: 60px;
      text-align: center;
    }
  }
}
</style>
