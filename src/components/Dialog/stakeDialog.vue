<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="580">
      <v-card class="pa-4 rounded">
        <v-card-title class="dialog-top">
          <span class="dialog-title cardtitle--text">Stake</span>
          <v-btn icon class="close-btn" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-6">
          <div class="d-flex justify-end">
            <span> Balance: {{ formart_number(balance) }} 4EVER</span>
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
              <v-btn text tile plain color="#43A7EB" @click="onMax">Max</v-btn>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn elevation="0" outlined color="primary" @click="close" small
            >Cancel</v-btn
          >
          <v-btn
            v-if="isStakeApproved"
            class="ml-8"
            elevation="0"
            color="primary"
            :loading="stakeLoading"
            @click="handlerStake"
            small
            >Confirm</v-btn
          >
          <div v-else>
            <v-btn
              small
              color="primary"
              class="ml-8"
              :loading="approveLoading"
              @click="handelApprove"
              >Approve</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { formart_number } from "@/utils/utils";
import { stake } from "@/utils/contracts";
import { BigNumber } from "ethers";

export default {
  computed: {
    account() {
      return this.$store.state.account;
    },
    balance() {
      return this.$store.state.balance;
    },
    isStakeApproved() {
      return this.$store.state.isStakeApproved;
    },
  },
  data() {
    return {
      dialog: false,
      approveLoading: false,
      stakeLoading: false,
      value: "",
    };
  },
  methods: {
    formart_number,
    open() {
      this.dialog = true;
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
      this.stakeLoading = true;
      stake(this.account, amount).then((res) => {
        this.close();
        this.$store.dispatch("updateMyNodeStake");
        this.$dialog.notify.success("Successfully", {
          position: "top-right",
          timeout: 5000,
        });
        this.stakeLoading = false;
      });
    },
    async handelApprove() {
      this.approveLoading = true;
      this.$store.dispatch("updateStakeApprove");
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
