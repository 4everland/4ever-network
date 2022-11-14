<template>
  <v-row class="mt-8">
    <v-col cols="12">
      <div class="common-title-box mb-8">
        <span class="d-flex align-center cardtitle--text">All Validators</span>
      </div>
      <v-card elevation="0" class="rounded px-4 py-2">
        <v-simple-table root fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left cardtitle--text">Node ID</th>
                <th class="text-left cardtitle--text">Validator</th>
                <th class="text-left cardtitle--text">Voted(4EVER)</th>
                <th class="text-left cardtitle--text">APR</th>
                <th class="text-left cardtitle--text">Status</th>
                <th class="text-left cardtitle--text">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in voteList" :key="index">
                <td class="datanum--text d-flex align-center">
                  {{ item.nodeId }}
                </td>
                <td class="datanum--text">
                  {{ bignumFormatter(item.validator) }}
                </td>
                <td class="datanum--text">
                  {{ bignumFormatter(item.vote / 1e18) }}
                </td>
                <td class="datanum--text">
                  {{ bignumFormatter(item.apr / 1e4) + "%" }}
                </td>
                <td class="datanum--text">{{ item.status }}</td>
                <td class="datanum--text">
                  <v-btn
                    class="voting-btn btnColor--text"
                    x-small
                    @click.stop="handlerVoting(item)"
                    >Voting</v-btn
                  >
                  <v-btn
                    v-if="item.isVote"
                    class="claim-btn btnColor--text ml-2"
                    x-small
                    @click.stop="handlerClaim(item)"
                    >Claim</v-btn
                  >
                  <!-- <v-btn
                    v-if="item.isVote"
                    class="widthdraw-btn btnColor--text"
                    x-small
                    @click.stop="handlerWidthdraw(item)"
                    >Widthdraw</v-btn
                  > -->
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
      </v-card>
    </v-col>
    <voting-dialog ref="votingDialog" />
    <claim-dialog ref="claimDialog" />
    <widthdraw-dialog ref="widthdrawDialog" />
  </v-row>
</template>

<script>
import { formart_number, bignumFormatter } from "@/utils/utils";
import { fetchVoteList } from "@/api/vote.js";
import votingDialog from "@/components/Dialog/votingDialog.vue";
import claimDialog from "@/components/Dialog/claimDialog.vue";
import widthdrawDialog from "@/components/Dialog/widthdrawDialog.vue";
export default {
  components: { votingDialog, claimDialog, widthdrawDialog },
  data() {
    return {
      voteList: [],
      page: 1,
      pageSize: 10,
      pageLength: 0,
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
    async getNodeList(params) {
      const account = await this.$store.dispatch("getAccount");
      params.address = account;
      fetchVoteList(params).then((res) => {
        this.voteList = res.data.list;
        this.pageLength = res.data.total;
      });
    },
    pageChange(val) {
      this.page = val;
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        address: this.account,
      };
      this.getNodeList(params);
    },
    handlerVoting(data) {
      this.$refs.votingDialog.open(data);
    },
    handlerClaim(data) {
      this.$refs.claimDialog.open(data);
    },
    handlerWidthdraw(data) {
      this.$refs.widthdrawDialog.open(data);
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
.voting-btn {
  width: 74px;
  height: 21px;
  background: linear-gradient(270deg, #ff6ceb 0%, #ffb881 100%);
  border-radius: 4px;
  display: inline-block;
  font-size: 11px;
}
.claim-btn {
  width: 74px;
  height: 18px;
  background: linear-gradient(270deg, #53ccfb 0%, #fbb2dd 100%);
  border-radius: 4px;
  display: inline-block;
  font-size: 11px;
}
.widthdraw-btn {
  width: 99px;
  height: 21px;
  background: linear-gradient(270deg, #6357ab 0%, #ffcd93 100%);
  border-radius: 4px;
  display: inline-block;
  font-size: 11px;
}
</style>
