<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <div class="common-title-box mb-4">
          <span class="d-flex align-center cardtitle--text">
            <v-icon v-text="'$proposalIcon'" small class="mr-2"></v-icon
            >Proposal</span
          >
          <span class="more">
            <v-btn text tile plain to="/governance">View More</v-btn>
          </span>
        </div>
        <template>
          <v-simple-table root fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left tableHeader--text">ID</th>
                  <th class="text-left tableHeader--text">Title</th>
                  <th class="text-left tableHeader--text">Validator</th>
                  <th class="text-left tableHeader--text">Slash(4EVER)</th>
                  <th class="text-left tableHeader--text">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in proposalList" :key="index">
                  <td class="datanum--text">{{ item.id }}</td>
                  <td class="datanum--text">
                    {{ item.title }}
                  </td>
                  <td class="datanum--text d-flex align-center">
                    <v-img
                      v-if="item.logo"
                      class="mr-2 rounded-circle"
                      width="24"
                      max-width="24"
                      height="24"
                      max-height="24"
                      :src="item.logo"
                    ></v-img>
                    <span class="ball mr-2" v-else></span>
                    {{ item.node }}
                  </td>
                  <td class="datanum--text">
                    {{ bignumFormatter(item.slash / 1e18) }}
                  </td>
                  <td :class="item.status">
                    {{ item.status }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
        <div class="py-6" v-if="proposalList.length == 0">
          <table-empty />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { formart_number, bignumFormatter } from "@/utils/utils";
import { fetchProposalList } from "@/api/proposal.js";
import TableEmpty from "@/components/TableEmpty.vue";

export default {
  components: { TableEmpty },
  filters: {
    statusFilter(status) {
      const statusMap = {
        PUBLIC: "Public",
        OBJECT: "Objected",
        EXECUTED: "Executed",
        VOTING: "Voting",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      proposalList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    bignumFormatter,
    getNodeList() {
      const params = {
        pageSize: 6,
      };
      fetchProposalList(params).then((res) => {
        this.proposalList = res.data.list;
      });
    },
  },
  created() {
    this.getNodeList();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.block-card {
  padding: 30px 35px;
}
.ball {
  width: 24px;
  height: 24px;
  background: linear-gradient(325deg, #79bc5a 0%, #dffcd1 100%);
  display: inline-block;
  border-radius: 50%;
}
</style>
