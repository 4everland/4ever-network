<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="580">
      <v-card class="pa-4 rounded">
        <v-card-title class="dialog-top">
          <span class="dialog-title cardtitle--text">Set commision rate</span>
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
              <div>Rate</div>
            </div>
            <div
              class="int-box d-flex align-center"
              :class="$vuetify.theme.dark ? 'dark-border' : 'light-border'"
            >
              <input type="text" class="int" v-model="value" />
              <span class="pr-6">%</span>
              <!-- <v-btn text tile plain color="#43A7EB" @click="maxValue"
                >Max</v-btn
              > -->
            </div>
          </div>
          <div class="d-flex justify-space-between mt-6">
            <span>Recommended commision rate</span>
            <span>5%-100%</span>
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
            @click="setApr"
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
    close() {
      this.dialog = false;
      this.value = "";
    },
    maxValue() {
      this.value = 100;
    },
    async setApr() {
      let val = this.value;
      console.log(val);
      if (val > 100) {
        return this.$dialog.error({
          text: "Error",
          title: "Error",
        });
      }
      let apr = this.value * 1e4;
      try {
        const tx = await contracts.Stake.setVoteRewardCoef(apr);
        const receipt = await tx.wait(2);
        console.log(receipt);
        if (receipt) {
          this.close();
        }
      } catch (error) {
        console.log(error);
        this.$dialog.notify.error(error.data.message || "Error", {
          position: "top-right",
          timeout: 5000,
        });
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
.input-box {
  display: flex;
  align-items: center;
  margin-top: 48px;
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
      width: 100%;
      font-size: 18px;
      font-weight: 600;
      color: #7794a5;
      padding: 0 20px;
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
