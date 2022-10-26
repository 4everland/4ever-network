<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="580">
      <v-card class="pa-4 rounded">
        <v-card-title class="dialog-top">
          <span class="dialog-title cardtitle--text">Voting</span>
          <v-btn icon class="close-btn" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="text-right balance">Balance: 24,524,424 4EVER</div>
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
          <div>
            <div class="d-flex justify-space-between mt-6 info-box">
              <span class="info-name">Node ID</span>
              <span class="info-value datanum--text">bvecsg…-mqe42</span>
            </div>
            <div class="d-flex justify-space-between mt-6 info-box">
              <span class="info-name">APR</span>
              <span class="info-value datanum--text">5%</span>
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
          <v-btn class="ml-8" elevation="0" color="primary" @click="vote" small
            >Confirm</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import contracts from "@/contracts";
export default {
  data() {
    return {
      dialog: false,
      value: "",
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    async vote() {
      const reward = await contracts.Stake.pendingReward(
        "0x3A1A365D9Ee59B47471Cfe31451b4Fd1D7A83Daa"
      );
      console.log("reward", reward);
      const tx = await contracts.Election.vote(
        "0x3A1A365D9Ee59B47471Cfe31451b4Fd1D7A83Daa",
        "0x3A1A365D9Ee59B47471Cfe31451b4Fd1D7A83Daa",
        "10000000",
        "0x3A1A365D9Ee59B47471Cfe31451b4Fd1D7A83Daa",
        10
      );
      console.log(tx);
      const receipt = await tx.wait();
      console.log(receipt);
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
