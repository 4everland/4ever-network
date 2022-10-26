<template>
  <div class="governance">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-sheet class="banner pt-12 pl-16">
            <div class="banner-tips">Voting Rewards</div>
            <div class="banner-title">Voting in the Governance System</div>
            <div class="banner-tips">
              The Sentinel program will collect the information of the evil node
              with two-thirds of the signatures of the master node to initiate
              governance and publicity. If the evil node files an appeal, each
              coin holding user can pledge 4EVER in the 4EVERLAND network and
              obtain a new 4EVER reward in the form of voting reward; At the
              same time, they can also participate in voting on proposals such
              as network updates and management, and the voting will be
              automatically implemented.
            </div>
            <div>
              <v-btn class="banner-btn">Vote</v-btn>
              <v-btn class="banner-btn">Learn more</v-btn>
            </div>
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
            class="text-center pa-8"
          >
            <div class="d-flex align-center justify-center mb-2">
              <span class="ml-2 overview-item-title">{{ item.name }}</span>
            </div>
            <div class="mb-2">
              <span class="overview-item-num datanum--text">
                {{ formart_number(item.value) }}
              </span>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <v-card elevation="0" class="mt-8">
        <div class="governance-system-title datanum--text pa-8 pb-0">
          Governance System
        </div>
        <v-row class="mt-8 governance-system rounded" no-gutters>
          <v-col
            v-for="(item, index) in governanceList"
            :key="item.name"
            cols="12"
            md="4"
            class="pa-8"
          >
            <div class="d-flex align-center">
              <div class="num-tag">{{ index + 1 }}</div>
              <span class="governance-system-text datanum--text">
                {{ formart_number(item.name) }}
              </span>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <table-proposals />
    </v-container>
  </div>
</template>

<script>
import tableProposals from "./components/tableProposals.vue";

import { formart_number } from "@/utils/utils";

export default {
  components: { tableProposals },
  data() {
    return {
      detailOverview: [
        {
          name: "Total proposal",
          value: "1234566",
          key: "stake",
        },
        {
          name: "Under publicity",
          value: "1234566",
          key: "validator",
        },
        {
          name: "Executed",
          value: "1234566",
          key: "vote",
        },
        {
          name: "Rejected",
          value: "1234566",
          key: "apr",
        },
      ],
      governanceList: [
        {
          name: "Sentry procedure initiates punishment proposal",
        },
        {
          name: "DAO governance in case of objection",
        },
        {
          name: "Whether the proposal is implemented",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.governance {
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
      max-width: 730px;
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
  .governance-system-title {
    font-size: 27px;
    font-weight: 600;
  }
  .governance-system {
    overflow: hidden;
    .num-tag {
      width: 91px;
      height: 48px;
      line-height: 48px;
      background-image: url("../../assets/imgs/node/tag.png");
      background-size: contain;
      text-align: center;
      color: #fff;
      padding-right: 10px;
      font-size: 27px;
    }
    .governance-system-text {
      font-size: 14px;
      font-weight: 600;
      margin-left: 26px;
      max-width: 180px;
    }
  }
}
</style>
