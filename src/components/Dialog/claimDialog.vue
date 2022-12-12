<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="580">
      <v-card class="pa-4 rounded">
        <v-card-title class="dialog-top">
          <span class="dialog-title cardtitle--text">Claim Your Rewards</span>
          <v-btn icon class="close-btn" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <!-- <div class="input-box">
            <div
              class="dialog-prepend inputBg"
              :class="$vuetify.theme.dark ? 'dark-border' : 'light-border'"
            >
              <div class="ball"></div>
              <div>4EVER</div>
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
          </div> -->
          <div>
            <div class="d-flex justify-space-between mt-6 info-box">
              <span class="info-name">Rewards</span>
              <span class="info-value datanum--text"
                >{{ formart_number(reward) }} 4EVER</span
              >
            </div>
            <div class="d-flex justify-space-between mt-6 info-box">
              <span class="info-name">Adress</span>
              <span class="info-value datanum--text">{{ account }}</span>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn elevation="0" outlined color="primary" @click="close" small
            >Cancel</v-btn
          >
          <v-btn
            class="ml-8"
            elevation="0"
            color="primary"
            @click="onClaim"
            :loading="claimLoading"
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

export default {
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  data() {
    return {
      dialog: false,
      value: "",
      data: {},
      reward: "0",
      claimLoading: false,
    };
  },
  methods: {
    formart_number,
    open(data) {
      this.data = data;
      this.getMyReward();
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.value = "";
    },
    async onClaim() {
      this.claimLoading = true;
      const tx = await contracts.Election.claim(
        this.data.address,
        this.account
      );
      console.log(tx);
      const receipt = await tx.wait();
      console.log(receipt);
      this.claimLoading = false;
      this.close();
    },
    async getMyReward() {
      const reward = await contracts.Election.pendingReward(
        this.data.address,
        this.account
      );
      console.log("reward user", reward);
      this.reward = reward.div((1e18).toString());
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
