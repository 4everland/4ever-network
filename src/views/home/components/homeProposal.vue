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
                  <th class="text-left cardtitle--text">ID</th>
                  <th class="text-left cardtitle--text">Title</th>
                  <th class="text-left cardtitle--text">Validator</th>
                  <th class="text-left cardtitle--text">Slash(4EVER)</th>
                  <th class="text-left cardtitle--text">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in proposalList" :key="index">
                  <td class="datanum--text">{{ item.id }}</td>
                  <td class="datanum--text">
                    {{ item.title }}
                  </td>
                  <td class="datanum--text d-flex align-center">
                    <span class="ball"></span>
                    {{ item.node }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.slash) }}
                  </td>
                  <td :class="item.status">
                    {{ item.status | statusFilter }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { formart_number } from "@/utils/utils";
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
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,

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
<style lang="less" scoped>
.block-card {
  padding: 30px 35px;
}
.ball {
  width: 18px;
  height: 18px;
  background: linear-gradient(325deg, #79bc5a 0%, #dffcd1 100%);
  display: inline-block;
  border-radius: 50%;
  margin-right: 20px;
}
</style>
