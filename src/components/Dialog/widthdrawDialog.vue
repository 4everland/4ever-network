<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="580">
      <v-card class="pa-4 rounded">
        <v-card-title class="dialog-top">
          <span class="dialog-title cardtitle--text">Widthdraw</span>
          <v-btn icon class="close-btn" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div class="tips">
            You will lose your node rewards if you unstake your votes. Do you
            want to continue?
          </div>
        </v-card-title>
        <v-card-text>
          <div class="text-right balance">
            Balance: {{ formart_number(balance) }} 4EVER
          </div>
          <div class="input-box">
            <div
              class="dialog-prepend inputBg"
              :class="$vuetify.theme.dark ? 'dark-border' : 'light-border'"
            >
              <div class="ball"></div>
              <div>Stake</div>
            </div>
            <div
              class="int-box"
              :class="$vuetify.theme.dark ? 'dark-border' : 'light-border'"
            >
              <input
                type="text"
                class="int"
                v-model="value"
                placeholder="Enter amount"
              />
              <v-btn text tile plain color="#43A7EB">Max</v-btn>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            elevation="0"
            outlined
            color="primary"
            @click="dialog = false"
            small
            >Cancel</v-btn
          >
          <v-btn
            class="ml-8"
            elevation="0"
            color="primary"
            @click="onWithdraw"
            small
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import contracts from "@/contracts";
import { formart_number } from "@/utils/utils";
import { BigNumber } from "@ethersproject/bignumber";
import { fetchBeforeVote } from "@/api/vote";

export default {
  computed: {
    account() {
      return this.$store.state.account;
    },
    balance() {
      return this.$store.state.balance;
    },
  },
  data() {
    return {
      dialog: false,
      value: "",
      data: {},
    };
  },
  methods: {
    formart_number,
    open(data) {
      this.dialog = true;
      this.data = data;
    },
    async onWithdraw() {
      const amount = BigNumber.from(this.value).mul((1e18).toString());
      const candidate = this.account;
      const nodeId = this.data.id;
      const body = {
        amount: "-" + amount.toString(),
        candidate,
        nodeId,
      };
      const { data } = await fetchBeforeVote(body);
      const anchor = data.anchor;

      //申请
      // const tx = await contracts.Election.applyWithdraw(
      //   this.data.address,
      //   amount,
      //   anchor,
      //   10
      // )

      //申请条件
      const voterApply = await contracts.Election.voterApply(this.account);
      const lastApplyTimestamp = voterApply.lastApplyWithdrawTimestamp;
      const frozenPeriod = await contracts.Election.voteFronzenPeriod();
      // Date.now() / 1000 > lastApplyTimestamp + frozenPeriod;

      //提现
      // const tx = await contracts.Election.withdraw(this.data.address, amount);
      // console.log(tx);
      // const receipt = await tx.wait();
      // console.log(receipt);
    },
  },
};
</script>
<style lang="less" scoped>
.dialog-top {
  position: relative;
  justify-content: center;
  .dialog-title {
    font-size: 27px;
    font-weight: bold;
  }
  .close-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
  .tips {
    font-size: 12px;
    font-weight: 600;
    color: #7195a7;
  }
}
.balance {
  font-size: 12px;
  font-weight: bold;
  color: #7794a5;
}
.input-box {
  display: flex;
  align-items: center;
  margin-top: 18px;
  .dialog-prepend {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 128px;
    height: 48px;
    .ball {
      width: 27px;
      height: 27px;
      background: #d8d8d8;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .int-box {
    width: 398px;
    height: 48px;
    .int {
      height: 48px;
      width: 300px;
      font-size: 18px;
      font-weight: 600;
      color: #7794a5;
      padding-left: 20px;
      &::placeholder {
        color: #7b92a2;
      }
    }
  }
  .light-border {
    border: 1px solid #dbe3e9;
  }
  .dark-border {
    border: 1px solid #3e464b;
  }
}
.info-box {
  font-size: 12px;
  font-weight: bold;
  .info-name {
    color: #7794a5;
  }
}
</style>
