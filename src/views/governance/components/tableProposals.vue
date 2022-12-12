<template>
  <v-row class="mt-8">
    <v-col cols="12">
      <div class="common-title-box mb-8">
        <span class="d-flex align-center cardtitle--text">Proposals</span>
      </div>
      <v-card elevation="0" class="rounded px-4 py-2">
        <v-simple-table root fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <!-- <th class="text-left tableHeader--text">ID</th> -->
                <th class="text-left tableHeader--text">Proponent</th>
                <th class="text-left tableHeader--text">Penalty node</th>
                <th class="text-left tableHeader--text">Penalty amount</th>
                <th class="text-left tableHeader--text">Proposal time</th>
                <th class="text-left tableHeader--text">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in proposalList"
                :key="index"
                @click="toDetail(item)"
              >
                <!-- <td class="datanum--text d-flex align-center">
                  {{ item.id }}
                </td> -->
                <td class="datanum--text">
                  {{ item.proposer }}
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
                <td class="datanum--text">
                  {{ formart_date(item.createdAt) }}
                </td>
                <td :class="item.status">
                  {{ item.status }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <template v-if="pageLength > 0">
          <div class="text-center">
            <v-container>
              <v-row justify="center">
                <v-col cols="6">
                  <v-container class="max-width">
                    <v-pagination
                      v-model="page"
                      class="my-4"
                      :length="pageLength"
                      :elevation="0"
                      @input="pageChange"
                    ></v-pagination>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </template>
        <div class="rounded px-4 py-2" v-if="proposalList.length == 0">
          <table-empty />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { formart_number, formart_date, bignumFormatter } from "@/utils/utils";
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
      page: 1,
      pageSize: 20,
      pageLength: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    formart_date,
    bignumFormatter,
    getNodeList(params) {
      fetchProposalList().then((res) => {
        this.proposalList = res.data.list;
        this.pageLength = res.data.total;
      });
    },
    pageChange(val) {
      this.page = val;
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      this.getNodeList(params);
    },
    toDetail(item) {
      this.$router.push(`/proposalDetail/${item.id}`);
    },
  },
  created() {
    let params = {
      page: this.page,
      pageSize: this.pageSize,
    };
    this.getNodeList(params);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.ball {
  width: 24px;
  height: 24px;
  background: linear-gradient(325deg, #79bc5a 0%, #dffcd1 100%);
  display: inline-block;
  border-radius: 50%;
}
</style>
