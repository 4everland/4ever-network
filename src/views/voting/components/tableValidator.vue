<template>
  <v-row class="mt-8">
    <v-col cols="12">
      <div class="common-title-box mb-8">
        <span class="d-flex align-center cardtitle--text">All Validators</span>
      </div>
      <v-card elevation="0" class="rounded px-4 py-2">
        <v-simple-table root fixed-header height="500">
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
                  {{ item.id }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.validator) }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.vote) }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.apr) + "%" }}
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
import { formart_number } from "@/utils/utils";
import { fetchVoteList } from "@/api/vote.js";
export default {
  components: {},
  data() {
    return {
      voteList: [],
      page: 1,
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,

    getNodeList() {
      fetchVoteList().then((res) => {
        this.voteList = res.data.list;
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
