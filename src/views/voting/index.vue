<template>
  <div class="voting">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-sheet class="banner pt-12 pl-16">
            <div class="banner-title">Voting</div>
            <div class="banner-tips">
              Token holders can earn revenue by staking and voting nodes.
            </div>
            <v-btn class="banner-btn btnColor--text">Vote</v-btn>
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
              <v-img max-height="18" max-width="18" :src="item.icon"></v-img>
              <span class="ml-2 overview-item-title">{{ item.name }}</span>
            </div>
            <div class="mb-2">
              <span class="overview-item-num datanum--text">
                {{ formart_number(item.value) }}
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
import { formart_number } from "@/utils/utils";
import { fetchVoteOverview } from "@/api/vote.js";

export default {
  components: { voteMap, tableValidator },
  data() {
    return {
      detailOverview: [
        {
          icon: require("@/assets/imgs/home/NodeRunner.png"),
          name: "Total Node",
          tips: "111111",
          value: "",
          unit: null,
          price: "",
          key: "node",
        },
        {
          icon: require("@/assets/imgs/home/NodeRunner.png"),
          name: "Total Validators",
          tips: "111111",
          value: "",
          unit: null,
          price: null,
          key: "validator",
        },
        {
          icon: require("@/assets/imgs/home/NodeRunner.png"),
          name: "Voted(4EVER)",
          tips: "111111",
          value: "",
          unit: "4EVER",
          price: "",
          key: "validatorToken",
        },
        {
          icon: require("@/assets/imgs/home/NodeRunner.png"),
          name: "ARP",
          tips: "111111",
          value: "",
          unit: "%",
          price: null,
          key: "apr",
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
          item.value = res.data[item.key];
          return item;
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
    }
    .banner-btn {
      width: 90px;
      height: 24px;
      background: linear-gradient(270deg, #c143df 0%, #ffb867 100%);
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      margin-top: 80px;
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
