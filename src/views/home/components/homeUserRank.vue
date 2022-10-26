<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <div class="common-title-box mb-4">
          <span class="d-flex align-center cardtitle--text">
            <v-icon v-text="'$userRankIcon'" small class="mr-2"></v-icon>User
            voting ranking</span
          >
        </div>
        <template>
          <v-simple-table root fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left cardtitle--text">User voting address</th>
                  <th class="text-left cardtitle--text">Number of votes</th>
                  <th class="text-left cardtitle--text">Voting amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in voteRankList" :key="index">
                  <td class="datanum--text">{{ item.address }}</td>
                  <td class="datanum--text">
                    {{ formart_number(item.voteTimes) }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.voteToken) }}
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
import { fetchVoteRank } from "@/api/vote.js";
export default {
  components: {},
  data() {
    return {
      voteRankList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,

    getNodeList() {
      fetchVoteRank().then((res) => {
        this.voteRankList = res.data.list;
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
</style>
