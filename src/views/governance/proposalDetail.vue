<template>
  <div class="proposal-detail">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex">
            <div class="ball"></div>
            <div>
              <div>Proposal #53522</div>
              <div>Feb 22, 2022 16:00:00</div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card elevation="0" class="card-block">
            <div v-for="item in dataList" :key="item.key">
              <span>{{ item.name }}</span>
              <span>{{ item.value }}</span>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card elevation="0" class="card-block">
            <div v-for="item in dataList" :key="item.key">
              <span>{{ item.name }}</span>
              <span>{{ item.value }}</span>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <table-reason />
    </v-container>
  </div>
</template>

<script>
import tableReason from "./components/tableReason.vue";

export default {
  components: { tableReason },
  data() {
    return {
      dataList: [
        {
          name: "Proposer",
          value: "-",
          key: "Proposer",
        },
        {
          name: "Node",
          value: "-",
          key: "Node",
        },
        {
          name: "Voted(4EVER)",
          value: "-",
          key: "Voted(4EVER)",
        },
        {
          name: "Deadline",
          value: "-",
          key: "Deadline",
        },
        {
          name: "Status",
          value: "-",
          key: "Status",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
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
  }
  .card-block {
    padding: 30px;
  }
}
</style>
