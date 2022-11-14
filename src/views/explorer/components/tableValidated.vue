<template>
  <v-row class="mt-16">
    <v-col cols="12">
      <div class="common-title-box mb-8">
        <span class="d-flex align-center cardtitle--text">
          <v-icon v-text="'$votingIcon'" small class="mr-2"></v-icon
          >Validated</span
        >
      </div>
      <div class="boxbackgroud rounded px-4 py-2">
        <v-simple-table root fixed-header height="220" class="boxbackgroud">
          <template v-slot:default>
            <thead class="boxbackgroud">
              <tr class="boxbackgroud">
                <th class="text-left cardtitle--text boxbackgroud">Node</th>
                <th class="text-left cardtitle--text boxbackgroud">
                  Total Voted(4EVER)
                </th>
                <th class="text-left cardtitle--text boxbackgroud">APR</th>
                <th class="text-left cardtitle--text boxbackgroud">
                  Voted(4EVER)
                </th>
                <th class="text-left cardtitle--text boxbackgroud">CreateAt</th>
                <th class="text-left cardtitle--text boxbackgroud">Status</th>
                <th class="text-left cardtitle--text boxbackgroud">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td class="datanum--text d-flex align-center">
                  <v-img
                    class="mr-2 rounded-circle"
                    width="18"
                    max-width="18"
                    height="18"
                    max-height="18"
                    :src="item.logo"
                  ></v-img>
                  {{ item.nodeId }}
                </td>
                <td class="datanum--text">
                  {{ bignumFormatter(item.totalVote / 1e18) }}
                </td>
                <td class="datanum--text">
                  {{ bignumFormatter(item.apr / 1e4) + "%" }}
                </td>
                <td class="datanum--text">
                  {{ bignumFormatter(item.vote / 1e18) }}
                </td>
                <td class="datanum--text">
                  {{ formart_date(item.votedAt) }}
                </td>
                <td class="datanum--text">{{ item.status }}</td>
                <td class="datanum--text">
                  <v-btn
                    class="voting-btn btnColor--text mx-2"
                    x-small
                    @click.stop="handlerVoting(item)"
                    >Voting</v-btn
                  >
                  <!-- <v-btn
                    class="claim-btn btnColor--text mx-2"
                    x-small
                    @click.stop="handlerClaim(item)"
                    >Claim</v-btn
                  >
                  <v-btn
                    class="widthdraw-btn btnColor--text mx-2"
                    x-small
                    @click.stop="handlerWidthdraw(item)"
                    >Widthdraw</v-btn
                  > -->
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon small class="ml-2" v-bind="attrs" v-on="on">
                        <v-icon small> mdi-dots-vertical </v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-btn tile text @click.stop="handlerClaim(item)"
                          >Claim</v-btn
                        >
                      </v-list-item>
                      <v-list-item>
                        <v-btn tile text>Apply</v-btn>
                      </v-list-item>
                    </v-list>
                  </v-menu>
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
      </div>
    </v-col>
    <apr-dialog ref="aprDialog" />
    <voting-dialog ref="votingDialog" />
    <claim-dialog ref="claimDialog" />
    <widthdraw-dialog ref="widthdrawDialog" />
  </v-row>
</template>

<script>
import { formart_number, formart_date, bignumFormatter } from "@/utils/utils";
import { fetchVotedList } from "@/api/vote.js";
import aprDialog from "@/components/Dialog/aprDialog.vue";
import votingDialog from "@/components/Dialog/votingDialog.vue";
import claimDialog from "@/components/Dialog/claimDialog.vue";
import widthdrawDialog from "@/components/Dialog/widthdrawDialog.vue";
export default {
  components: { aprDialog, votingDialog, claimDialog, widthdrawDialog },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 20,
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
    formart_date,
    async getVotedList(params) {
      try {
        const account = this.account;
        const { data } = await fetchVotedList(account, params);
        this.list = data.list;
        this.pageLength = data.total;
      } catch (error) {
        console.log(error);
      }
    },
    pageChange(val) {
      this.page = val;
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      this.getVotedList(params);
    },

    handlerSetApr() {
      this.$refs.aprDialog.open();
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
    const params = {
      page: this.page,
      pageSize: this.pageSize,
    };
    this.getVotedList(params);
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
  height: 21px;
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
