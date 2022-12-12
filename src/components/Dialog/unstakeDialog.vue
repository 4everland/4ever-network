<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="580">
      <v-card class="pa-4 rounded">
        <v-card-title class="dialog-top">
          <span class="dialog-title cardtitle--text">UnStake</span>
          <v-btn icon class="close-btn" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-2">
          <div class="d-flex justify-center">
            <span>{{ tipsText }}</span>
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
                v-model="myNodeStake"
                disabled
                placeholder="Enter amount"
              />
              <!-- <v-btn text tile plain color="#43A7EB" @click="onMax">Max</v-btn> -->
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn elevation="0" outlined color="primary" @click="close" small
            >Cancel</v-btn
          >
          <!-- <v-btn
            class="ml-8"
            elevation="0"
            color="primary"
            @click="handlerStake"
            small
            >Confirm</v-btn
          > -->
          <v-btn
            v-if="candidateApply.waitQuit"
            class="ml-8"
            elevation="0"
            color="primary"
            @click="handlerClaim"
            small
            :disabled="noClaim"
            :loading="claimLoading"
            >Claim</v-btn
          >
          <v-btn
            v-else
            class="ml-8"
            elevation="0"
            color="primary"
            @click="handlerApply"
            small
            :loading="applyLoading"
            >Apply</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { formart_number } from "@/utils/utils";
import { stake } from "@/utils/contracts";
import { BigNumber } from "ethers";
import contracts from "@/contracts";

export default {
  computed: {
    account() {
      return this.$store.state.account;
    },
    balance() {
      return this.$store.state.balance;
    },
    myNodeStake() {
      return this.$store.state.myNodeStake;
    },
    myReward() {
      return this.$store.state.myReward;
    },
  },
  data() {
    return {
      dialog: false,
      value: "",
      candidateApply: {},
      applyLoading: false,
      claimLoading: false,
      noClaim: true,
      tipsText:
        "The cancellation means that your node will be completely withdrawn from the network. Your paid pledges and nodes rewards will be returned after T+7 days. The cancellation is irreversible, please proceed with caution.",
    };
  },
  methods: {
    formart_number,
    async open() {
      const candidateApply = await this.getUnstakeTime();
      this.candidateApply = candidateApply;
      console.log(candidateApply);
      if (candidateApply.waitQuit) {
        const nowTime = (Date.now() / 1000).toFixed().toString();
        const timestamp = candidateApply.endTime.sub(nowTime);
        console.log(timestamp);
        if (timestamp > 0) {
          this.tipsText =
            "The cancellation request has been submitted. You will be able to claim the staked amount after X days.";
        } else {
          this.tipsText =
            "The cancellation request has been submitted. You can claim the staked amount now.";
          this.noClaim = false;
        }
        this.dialog = true;
      } else {
        this.tipsText =
          "The cancellation means that your node will be completely withdrawn from the network. Your paid pledges and nodes rewards will be returned after T+7 days. The cancellation is irreversible, please proceed with caution.";
        this.dialog = true;
      }
    },
    close() {
      this.dialog = false;
      this.value = "";
    },
    async onMax() {
      this.value = this.balance;
    },
    async handlerStake() {
      const amount = BigNumber.from(this.value).mul((1e18).toString());
      stake(this.account, amount).then((res) => {
        this.close();
        this.$store.dispatch("updateMyNodeStake");
        return this.$dialog.notify.success("Successfully", {
          position: "top-right",
          timeout: 5000,
        });
      });
    },
    async handlerApply() {
      this.$dialog
        .warning({
          text: "The cancellation is irreversible. Your nodes will be removed from the 4EVERLAND network and the data will be erased. Please confirm before proceeding.",
          title: "Tips",
        })
        .then((res) => {
          console.log(res);
          if (res) {
            this.applyUnstake();
          }
        });
    },
    async handlerClaim() {
      if (this.myReward > 0) {
        return this.$dialog.notify.error("有reward未领取", {
          position: "top-right",
          timeout: 5000,
        });
      }
      this.claimLoading = true;
      try {
        const tx = await contracts.Stake.quit(this.account);
        console.log(tx);
        const receipt = await tx.wait();
        console.log(receipt);
        this.$dialog.notify.success(
          "The node has successfully logged out and removed from the 4EVERLAND network.",
          {
            position: "top-right",
            timeout: 5000,
          }
        );
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.$dialog.notify.error(error.data.message, {
          position: "top-right",
          timeout: 5000,
        });
      } finally {
        this.claimLoading = false;
        this.close();
      }
    },
    async applyUnstake() {
      this.applyLoading = true;
      try {
        const tx = await contracts.Stake.applyQuit({ gasLimit: 400000 });
        console.log(tx);
        const receipt = await tx.wait();
        console.log(receipt);
      } catch (error) {
        console.log(error);
        this.$dialog.notify.error(error.data.message, {
          position: "top-right",
          timeout: 5000,
        });
      } finally {
        this.applyLoading = false;
        this.close();
      }
    },
    async getUnstakeTime() {
      const candidateApply = await contracts.Stake.candidateApplyInfo(
        this.account
      );
      return candidateApply;
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
</style>
