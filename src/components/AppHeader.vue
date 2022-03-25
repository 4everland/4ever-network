<template>
  <div>
    <v-app-bar fixed app color="#FAFAFA" height="100">
      <v-container class="d-flex align-center justify-space-between">
        <v-btn text color="transparent" to="/" class="always-active mr-8">
          <logo />
        </v-btn>
        <div class="d-flex align-center justify-space-between">
          <div class="search-bar">
            <v-text-field
              hide-details="auto"
              label="Node/TeeReport/CID......"
              @click="handleSearch"
            >
              <v-img slot="prepend" src="../assets/imgs/header/search-icon.png">
              </v-img>
            </v-text-field>
            <div v-show="isShow && status" class="message-tips">
              <div class="message-header d-flex align-center">
                <i class="header-line left"></i>
                <span>{{ data.type.toUpperCase() }}</span>
                <i class="header-line right"></i>
              </div>
              <div
                class="message-content-block d-flex flex-column"
                v-if="data.type == 'teeReport'"
              >
                <span class="block-info"># 52411</span>
                <span class="block-time">Mar 2，2022 5：21 AM</span>
              </div>
              <div class="message-content-cid" v-else>
                <span class="message-cid"
                  >12D3KooWS6GL7vpFQknW7FDMAEkbXm3hrRvr6fHXX4ehjR7jG3gf</span
                >
                <span>pin</span>
              </div>
            </div>
            <div v-if="isShow && !status" class="message-tips">
              <h2 class="no-results-title">No Results found.</h2>
              <p class="no-results-content">Please search by Nod</p>
            </div>
          </div>
          <div class="connect-wallet ml-7">
            <img src="../assets/imgs/header/link-icon.png" alt="" />
            <span>Connect Wallet</span>
          </div>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";

export default {
  components: { Logo },
  data() {
    return {
      isShow: false,
      data: {
        type: "TeeReport",
        blockInfo: "#52411",
        time: "Mar 2，2022 5：21 AM",
      },
      status: false,
    };
  },
  methods: {
    handleSearch() {
      this.isShow = true;
    },
  },
};
</script>
<style lang="less" scoped>
.always-active {
  opacity: 1 !important;
}
.v-btn--active,
.nav-btn:hover {
  color: #2a7eed;
}
/deep/ .v-btn__content {
  opacity: 1 !important;
}
/deep/ .nav-btn .v-btn__content {
  opacity: 1 !important;
}
.search-bar {
  position: relative;
  width: 297px;
  .message-tips {
    min-width: 100%;
    position: absolute;
    left: 0;
    padding: 0 12px;
    margin-top: 20px;
    box-sizing: border-box;
    border-radius: 8px;
    background: #fff;
    box-shadow: inset 0px -1px 0px 0px #c6d1d7;
    .message-header {
      margin-top: 15px;
      .header-line {
        display: inline-block;
        height: 1px;
        background: #e6e8eb;
      }
      span {
        padding: 0 13px;
      }
      .header-line.left {
        width: 16px;
      }
      .header-line.right {
        flex: 1;
      }
    }
    .message-content-cid {
      padding: 23px 0;
      font-size: 14px;
      color: #495667;
      line-height: 16px;
      .message-cid {
        margin-right: 62px;
      }
    }
    .message-content-block {
      min-width: 100%;
      padding: 13px 0;
      .block-info {
        font-size: 16px;
        color: #34a9ff;
        line-height: 18px;
      }
      .block-time {
        margin-top: 4px;
        font-size: 14px;
        line-height: 16px;
        color: #7c848c;
      }
    }
    .no-results-title {
      padding-top: 19px;
      font-size: 16px;
      color: #495667;
      line-height: 18px;
    }
    .no-results-content {
      margin: 0;
      font-size: 14px;
      color: #7c848c;
      line-height: 16px;
      padding: 10px 0 18px 0;
    }
  }
}
.connect-wallet {
  padding: 5px 11px 5px 6px;
  border: 1px solid #34a9ff;
  border-radius: 2px;
  font-size: 14px;
  color: #34a9ff;
  line-height: 20px;
  cursor: pointer;
  img {
    vertical-align: middle;
    margin-right: 6px;
  }
}
</style>
