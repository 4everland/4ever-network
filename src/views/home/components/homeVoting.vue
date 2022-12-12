<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <div class="common-title-box mb-4">
          <span class="d-flex align-center cardtitle--text">
            <v-icon v-text="'$votingIcon'" small class="mr-2"></v-icon
            >Voting</span
          >
          <span class="more">
            <v-btn text tile plain to="/voting">View More</v-btn>
          </span>
        </div>
        <template>
          <v-simple-table root fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left tableHeader--text">Node ID</th>
                  <th class="text-left tableHeader--text">Validators</th>
                  <th class="text-left tableHeader--text">Voting</th>
                  <th class="text-left tableHeader--text">Commision rate</th>
                  <th class="text-left tableHeader--text">Status</th>
                  <th class="text-left tableHeader--text">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in voteList" :key="index">
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
                    <span class="ball" v-else></span>
                    {{ formatNodeId(item.nodeId) }}
                    <span v-if="item.isMajor" class="major">Major</span>
                    <span v-else class="popular">Popular</span>
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.validator) }}
                  </td>
                  <td class="datanum--text">
                    {{ bignumFormatter(item.vote / 1e18) }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.apr / 1e4) + "%" }}
                  </td>
                  <td class="datanum--text">
                    {{ item.status }}
                  </td>
                  <td class="datanum--text">
                    <v-btn
                      v-if="item.status != 'QUITTING'"
                      class="voting-btn btnColor--text"
                      small
                      @click="handleVoting(item)"
                      >Voting</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
        <div class="py-6" v-if="voteList.length == 0">
          <table-empty />
        </div>
      </v-card>
    </v-col>
    <voting-dialog ref="votingDialog" />
  </v-row>
</template>

<script>
import { formart_number, bignumFormatter, formatNodeId } from "@/utils/utils";
import { fetchVoteList } from "@/api/vote.js";
import votingDialog from "@/components/Dialog/votingDialog.vue";
import TableEmpty from "@/components/TableEmpty.vue";

export default {
  components: { votingDialog, TableEmpty },
  data() {
    return {
      voteList: [],
    };
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  watch: {},
  methods: {
    formart_number,
    bignumFormatter,
    formatNodeId,
    getNodeList() {
      const params = {
        pageSize: 6,
        address: this.account,
      };
      fetchVoteList(params).then((res) => {
        this.voteList = res.data.list;
      });
    },
    handleVoting(data) {
      this.$refs.votingDialog.open(data);
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
  margin-right: 14px;
}
.major {
  width: 44px;
  height: 21px;
  border-radius: 2px;
  border: 1px solid #e182b9;
  font-size: 12px;
  font-weight: bold;
  color: #e182b9;
  text-align: center;
  margin-left: 14px;
  display: inline-block;
}
.popular {
  width: 54px;
  height: 21px;
  border-radius: 2px;
  border: 1px solid #43a7eb;
  font-size: 12px;
  font-weight: bold;
  color: #43a7eb;
  text-align: center;
  margin-left: 14px;
  display: inline-block;
}
.voting-btn {
  width: 66px;
  height: 24px;
  background: linear-gradient(270deg, #ff6ceb 0%, #ffb881 100%);
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}
</style>
