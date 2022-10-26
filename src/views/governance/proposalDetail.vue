<template>
  <div class="proposal-detail">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex">
            <div class="ball"></div>
            <div class="proposal-info">
              <div class="datanum--text proposal-name">
                {{ "Proposal #" + data.blockNumber }}
              </div>
              <div class="cardtitle--text proposal-create">
                {{ formart_date(data.blockCreatedAt) }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card elevation="0" class="card-block">
            <div
              v-for="item in dataList"
              :key="item.key"
              class="d-flex align-center justify-space-between my-8"
              style="max-width: 650px"
            >
              <span class="cardtitle--text">{{ item.name }}</span>
              <span class="datanum--text">{{ item.value }}</span>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card elevation="0" class="card-block">
            <div
              v-for="item in dataList"
              :key="item.key"
              class="d-flex align-center justify-space-between my-8"
            >
              <span class="cardtitle--text">{{ item.name }}</span>
              <span class="datanum--text">{{ item.value }}</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <table-reason :tableList="data.evidence" />
    </v-container>
  </div>
</template>

<script>
import tableReason from "./components/tableReason.vue";
import { formart_number, formart_date } from "@/utils/utils";
import { fetchProposalDetail } from "@/api/proposal.js";

export default {
  components: { tableReason },
  data() {
    return {
      data: {},
      dataList: [
        {
          name: "Proposer",
          value: "",
          key: "proposer",
        },
        {
          name: "Node",
          value: "",
          key: "node",
        },
        {
          name: "Voted(4EVER)",
          value: "",
          key: "slash",
        },
        {
          name: "Deadline",
          value: "",
          key: "expiredAt",
        },
        {
          name: "Status",
          value: "",
          key: "status",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_date,
    getInfo(params) {
      fetchProposalDetail(params).then((res) => {
        this.data = res.data;
        this.dataList.map((item) => {
          item.value = res.data[item.key];
          return item;
        });
      });
    },
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
    this.getInfo(id);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.proposal-detail {
  .ball {
    width: 60px;
    height: 60px;
    background: linear-gradient(325deg, #79bc5a 0%, #dffcd1 100%);
    border-radius: 50%;
    margin-right: 22px;
  }
  .proposal-info {
    .proposal-name {
      font-size: 27px;
      font-weight: bold;
    }
    .proposal-create {
      font-size: 12px;
      font-weight: bold;
      margin-top: 8;
    }
  }
  .card-block {
    padding: 30px;
  }
}
</style>
