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
                <th class="text-left cardtitle--text boxbackgroud">
                  Reward(4EVER)
                </th>
                <th class="text-left cardtitle--text boxbackgroud">CreateAt</th>
                <th class="text-left cardtitle--text boxbackgroud">Status</th>
                <th class="text-left cardtitle--text boxbackgroud">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td class="datanum--text d-flex align-center">
                  {{ item.name }}
                  ---logo---
                  {{ item.logo }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.validator) }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.apr) }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.vote) }}
                </td>

                <td class="datanum--text">
                  {{ item.reward }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.vote) }}
                </td>

                <td class="datanum--text">123456</td>
                <td class="datanum--text">
                  <v-btn
                    class="voting-btn btnColor--text"
                    x-small
                    @click.stop="handlerVoting"
                    >Voting</v-btn
                  >
                  <v-btn
                    class="claim-btn btnColor--text"
                    x-small
                    @click.stop="handlerClaim"
                    >Claim</v-btn
                  >
                  <v-btn
                    class="widthdraw-btn btnColor--text"
                    x-small
                    @click.stop="handlerWidthdraw"
                    >Widthdraw</v-btn
                  >
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
      </div>
    </v-col>
    <apr-dialog ref="aprDialog" />
    <voting-dialog ref="votingDialog" />
    <claim-dialog ref="claimDialog" />
    <widthdraw-dialog ref="widthdrawDialog" />
  </v-row>
</template>

<script>
import { formart_number } from "@/utils/utils";
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
  computed: {},
  watch: {},
  methods: {
    formart_number,
    async getVotedList(params) {
      try {
        const address = localStorage.getItem("address");
        console.log(address);
        const { data } = await fetchVotedList(address, params);
        console.log(data);
        this.list = data.list;
        this.pageLength = data.page;
      } catch (error) {
        alert(error);
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
    handlerVoting() {
      this.$refs.votingDialog.open();
    },
    handlerClaim() {
      this.$refs.claimDialog.open();
    },
    handlerWidthdraw() {
      this.$refs.widthdrawDialog.open();
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
