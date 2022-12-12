<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="580">
      <v-card class="pa-4 rounded">
        <v-card-title class="dialog-top">
          <span class="dialog-title cardtitle--text">Voting</span>
          <v-btn icon class="close-btn" @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="input-box">
            <div
              class="dialog-prepend inputBg"
              :class="$vuetify.theme.dark ? 'dark-border' : 'light-border'"
            >
              <div class="ball"></div>
              <div>Amount</div>
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
          <div class="text-right balance">
            Balance: {{ formart_number(balance) }} 4EVER
          </div>
          <!-- <div>
            <div class="d-flex justify-space-between mt-6 info-box">
              <span class="info-name">Node ID</span>
              <span class="info-value datanum--text">{{ data.nodeId }}</span>
            </div>
            <div class="d-flex justify-space-between mt-6 info-box">
              <span class="info-name">Commision rate</span>
              <span class="info-value datanum--text">{{
                data.apr / 1e4 + "%"
              }}</span>
            </div>
          </div> -->
        </v-card-text>
        <v-card-actions class="justify-center">
          <div v-if="isVoteApproved">
            <v-btn elevation="0" outlined color="primary" @click="close" small
              >Cancel</v-btn
            >
            <v-btn
              class="ml-8"
              elevation="0"
              color="primary"
              @click="vote"
              small
              :loading="voteLoading"
              >Confirm</v-btn
            >
          </div>
          <div v-else>
            <v-btn
              small
              color="#00A8F1"
              class="white--text"
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
    isVoteApproved() {
      return this.$store.state.isVoteApproved;
    },
  },
  data() {
    return {
      dialog: false,
      value: "",
      data: {},
      approveLoading: false,
      voteLoading: false,
    };
  },
  methods: {
    formart_number,
    open(data) {
      this.dialog = true;
      this.data = data;
    },
    close() {
      this.dialog = false;
      this.value = "";
    },
    async handelApprove() {
      this.approveLoading = true;
      await this.$store.dispatch("updateVoteApprove");
      this.approveLoading = false;
    },
    async onMax() {
      this.value = this.balance;
    },
    async vote() {
      this.voteLoading = true;
      try {
        const amount = BigNumber.from(this.value).mul((1e18).toString());
        const candidate = this.account;
        const nodeId = this.data.id;
        const body = {
          amount: amount.toString(),
          candidate,
          nodeId,
        };
        const res = await fetchBeforeVote(body);
        const data = res.data;
        if (res.code == "409") {
          this.$dialog.notify.error(
            "The voting will result in the same total number of votes as the existing nodes, which is not permitted. Please enter again.",
            {
              position: "top-right",
              timeout: 5000,
            }
          );
          return;
        }
        const anchor = data.anchor;
        const tx = await contracts.Election.vote(
          this.data.address,
          this.account,
          amount,
          anchor,
          10
        );
        console.log(tx);
        const receipt = await tx.wait();
        console.log(receipt);
        if (receipt) {
          this.$dialog.notify.success("Successfully", {
            position: "top-right",
            timeout: 5000,
          });
          this.close();
        }
      } catch (error) {
        console.log(error);
        this.$dialog.notify.error(error.data.message, {
          position: "top-right",
          timeout: 5000,
        });
      } finally {
        this.voteLoading = false;
      }
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
  margin-top: 18px;
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
