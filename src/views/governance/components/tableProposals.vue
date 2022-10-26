<template>
  <v-row class="mt-8">
    <v-col cols="12">
      <div class="common-title-box mb-8">
        <span class="d-flex align-center cardtitle--text">Proposals</span>
      </div>
      <v-card elevation="0" class="rounded px-4 py-2">
        <v-simple-table root fixed-header height="500">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left cardtitle--text">ID</th>
                <th class="text-left cardtitle--text">Proponent</th>
                <th class="text-left cardtitle--text">Penalty node</th>
                <th class="text-left cardtitle--text">Penalty amount</th>
                <th class="text-left cardtitle--text">Proposal time</th>
                <th class="text-left cardtitle--text">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in proposalList" :key="index">
                <td class="datanum--text d-flex align-center">
                  {{ item.id }}
                </td>
                <td class="datanum--text">
                  {{ item.proposer }}
                </td>
                <td class="datanum--text d-flex align-center">
                  <v-img
                    class="mr-2 rounded-circle"
                    width="18"
                    max-width="18"
                    height="18"
                    max-height="18"
                    :src="item.logo"
                  ></v-img>
                  {{ item.node }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.slash) }}
                </td>
                <td class="datanum--text">
                  {{ formart_date(item.createdAt) }}
                </td>
                <td :class="item.status">
                  {{ item.status | statusFilter }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <template>
          <div class="text-center">
            <v-container>
              <v-row justify="center">
                <v-col cols="6">
                  <v-container class="max-width">
                    <v-pagination
                      v-model="page"
                      class="my-4"
                      :length="6"
                      :elevation="0"
                    ></v-pagination>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { formart_number, formart_date } from "@/utils/utils";
import { fetchProposalList } from "@/api/proposal.js";
export default {
  components: {},
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
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    formart_date,
    getNodeList() {
      fetchProposalList().then((res) => {
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
<style lang="less" scoped></style>
