<template>
  <div class="voting" ref="scrollDiv">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-sheet class="banner pt-12 pl-16">
            <div class="banner-title">Voting</div>
            <div class="banner-tips">
              Token holders can earn revenue by staking token to vote nodes. The
              4EVELAND node network will support 4EVER Token holders in the form
              of stakes to vote for nodes anytime, anywhere, and get the rewards
              based on the APR factor, stake amount and stake time set by the
              node. Furthermore, this voting dataset is crucial for determining
              the campaign and ranking of nodes worldwide.
            </div>
            <v-btn class="banner-btn btnColor--text" @click="onScroll"
              >Vote</v-btn
            >
          </v-sheet>
        </v-col>
      </v-row>
      <v-card elevation="0">
        <v-row class="mt-8 detail-overview rounded" no-gutters>
          <v-col
            v-for="item in detailOverview"
            :key="item.name"
            cols="12"
            md="3"
            class="text-center pa-8 after-border"
          >
            <div class="d-flex align-center justify-center mb-2">
              <span class="ml-2 overview-item-title">{{ item.name }}</span>
            </div>
            <div class="mb-2">
              <span class="overview-item-num datanum--text">
                {{ item.value }}
              </span>
              <span class="overview-item-title">
                {{ item.unit }}
              </span>
            </div>
            <!-- <div v-if="item.price" class="text-center overview-item-title">
                  $ {{ formart_number(item.price) }}
                </div> -->
          </v-col>
        </v-row>
      </v-card>
      <vote-map />
      <table-validator />
    </v-container>
  </div>
</template>

<script>
import voteMap from "./components/voteMap.vue";
import tableValidator from "./components/tableValidator.vue";
import { formart_number, bignumFormatter } from "@/utils/utils";
import { fetchVoteOverview } from "@/api/vote.js";

export default {
  components: { voteMap, tableValidator },
  data() {
    return {
      detailOverview: [
        {
          name: "Total Node",
          tips: "111111",
          value: "",
          unit: null,
          price: "",
          key: "node",
          format(val) {
            return bignumFormatter(val);
          },
        },
        {
          name: "Total Validators",
          tips: "111111",
          value: "",
          unit: null,
          price: null,
          key: "validator",
          format(val) {
            return bignumFormatter(val);
          },
        },
        {
          name: "Voted(4EVER)",
          tips: "111111",
          value: "",
          unit: "4EVER",
          price: "",
          key: "validatorToken",
          format(val) {
            return bignumFormatter(val / 1e18);
          },
        },
        {
          name: "ARP",
          tips: "111111",
          value: "",
          unit: "%",
          price: null,
          key: "apr",
          format(val) {
            return val / 1e4 + "%";
          },
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    getOverview() {
      fetchVoteOverview().then((res) => {
        this.detailOverview.map((item) => {
          item.value = item.format(res.data[item.key]);
          return item;
        });
      });
    },
    onScroll() {
      this.$nextTick(() => {
        const height = this.$refs.scrollDiv.clientHeight;
        window.scrollTo({
          top: height,
          behavior: "smooth",
        });
      });
    },
  },
  created() {
    this.getOverview();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.voting {
  .banner {
    width: 100%;
    height: 300px;
    max-width: 1350px;
    max-height: 300px;
    background-image: url("../../assets/imgs/voting/banner.png");
    background-position: 0 0;
    background-size: contain;
    border-radius: 4px;
    .banner-title {
      font-size: 27px;
      font-weight: bold;
      color: #ffffff;
    }
    .banner-tips {
      font-size: 12px;
      font-weight: bold;
      color: #d8d8d8;
      max-width: 500px;
    }
    .banner-btn {
      width: 90px;
      height: 24px;
      background: linear-gradient(270deg, #c143df 0%, #ffb867 100%);
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      margin-top: 40px;
    }
  }
  .detail-overview {
    overflow: hidden;
    .after-border {
      position: relative;
      .overview-item-title {
        font-size: 12px;
        font-weight: bold;
        color: #8093a1;
      }
      .overview-item-num {
        font-size: 36px;
        font-weight: bold;
        margin-top: 20px;
      }
    }
  }
}
</style>
