<template>
  <div class="governance">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-sheet class="banner transparent">
            <div class="banner-title">Be a 4EVERLAND Node</div>
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
          <div class="d-flex align-center">
            <div class="num-tag">{{ index + 1 }}</div>
            <span class="governance-system-text datanum--text">
              {{ formart_number(item.name) }}
            </span>
          </div>
        </v-col>
      </v-row>
      <v-card elevation="0" class="mt-8 card-block">
        <div class="card-tips datanum--text">
          Welcome to the 4EVERLAND network! All you need to do is provide your
          node ID and stake 4EVER to become a node and enjoy the benefits.
        </div>
        <div class="card-input">
          <span>Node ID:</span>
          <input
            v-model="nodeId"
            type="text"
            class="int inputBg"
            placeholder="Enter"
          />
        </div>
        <div class="card-btn">
          <v-btn
            small
            color="#00A8F1"
            class="white--text"
            @click="handelRegister"
            >Next</v-btn
          >
        </div>
      </v-card>
      <v-card elevation="0" class="mt-8 card-block">
        <div
          class="card-tips datanum--text text-center"
          style="max-width: 860px"
        >
          Registering a node is required to stake at least 50,000 4EVER for the
          maintenance of the network. Generally, the more you stake, the more
          you're rewarded, but if your node does not operate as it should, part
          of your stake will be deducted as a result.
        </div>

        <div class="card-input">
          <div class="d-flex justify-end mb-2" v-if="balance">
            <span class="datanum--text" style="font-size: 14px"
              >Balance: {{ formart_number(balance) }} 4EVER</span
            >
          </div>
          <div class="d-flex align-center">
            <span>Stake:</span>
            <div class="inputBg ml-4">
              <input
                v-model="stakeAmount"
                type="text"
                class="int ml-0"
                placeholder="Enter"
                style="width: 380px"
              />
              <v-btn text tile plain color="#43A7EB" @click="onMax">Max</v-btn>
            </div>
          </div>
        </div>
        <div class="card-btn">
          <div v-if="isApproved">
            <v-btn small color="#00A8F1" @click="handelViewNow" outlined
              >View Now</v-btn
            >
            <v-btn
              small
              color="#00A8F1"
              class="white--text ml-6"
              @click="handelStake"
              >Stake</v-btn
            >
          </div>
          <v-btn
            v-else
            small
            color="#00A8F1"
            class="white--text"
            @click="handelApprove"
            >Approve</v-btn
          >
        </div>
      </v-card>
      <v-card elevation="0" class="mt-8 card-block">
        <div class="card-tips datanum--text">
          You can add your node information on the
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            >GitHub link</a
          >
          to get the community to view and vote for it to be a 4EVERLAND master
          node.
        </div>
        <div class="card-btn">
          <v-btn
            small
            color="#00A8F1"
            class="white--text"
            @click="handelViewNow"
            >View Now</v-btn
          >
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { formart_number } from "@/utils/utils";
import { BigNumber } from "ethers";
import contracts from "@/contracts";
export default {
  components: {},

  data() {
    return {
      nodeId: "",
      balance: null,
      stakeAmount: null,
      isApproved: false,
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
    };
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  watch: {},
  methods: {
    formart_number,
    async handelRegister() {
      const nodeId = this.nodeId;
      console.log(contracts.Stake);
      //   register(
      //   manifest: string,
      //   overrides?: Overrides & { from?: string | Promise<string> }
      // )
      const tx = await contracts.Stake.register(nodeId);
      console.log(tx);
      const receipt = await tx.wait();
      console.log(receipt);
    },
    async handelApprove() {
      const uint256Max = BigNumber.from("1").shl(256).sub(1);
      const tx = await contracts.Token.approve(
        contracts.Stake.address,
        uint256Max
      );
      console.log(tx);
      const receipt = await tx.wait();
      console.log(receipt);
    },
    async handelStake() {
      const minStake = await contracts.Stake.minStake();
      const alreadyStaked = await contracts.Stake.candidateInfo(this.account);
      console.log(alreadyStaked.amount.toString(), minStake.toString());
      const tx = await contracts.Stake.stake(BigNumber.from(this.stakeAmount));
      console.log(tx);
      const receipt = await tx.wait();
      console.log(receipt);
    },
    async handelViewNow() {},
    async getBalance() {
      console.log(contracts);
      const balance = await contracts.Token.balanceOf(this.account);
      const allowance = await contracts.Token.allowance(
        this.account,
        contracts.Stake.address
      );
      const isApproved = allowance.gt(balance) && allowance.gt(0);
      console.log("allowance", allowance);
      this.balance = balance;
      this.isApproved = isApproved;
    },
    async onMax() {
      this.stakeAmount = this.balance;
    },
  },
  created() {},
  mounted() {
    this.getBalance();
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
    display: flex;
    align-items: center;
    justify-content: center;
    .banner-title {
      font-size: 36px;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
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
    .governance-system-text {
      font-size: 18px;
      font-weight: 600;
      color: #666;
      margin-left: 26px;
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
      span {
        font-size: 18px;
        font-weight: 600;
        color: #7b92a2;
      }
      .int {
        width: 420px;
        height: 48px;
        font-size: 18px;
        font-weight: 600;
        color: #7b92a2;
        margin-left: 16px;
        padding: 0 14px;
        &::placeholder {
          color: #7b92a2;
        }
      }
    }

    .card-btn {
      margin-top: 67px;
      text-align: center;
    }
  }
}
</style>
