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
                  <th class="text-left cardtitle--text">Node ID</th>
                  <th class="text-left cardtitle--text">Validators</th>
                  <th class="text-left cardtitle--text">Voting</th>
                  <th class="text-left cardtitle--text">APR</th>
                  <th class="text-left cardtitle--text">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in voteList" :key="index">
                  <td class="datanum--text d-flex align-center">
                    <span class="ball"></span>
                    {{ item.id }}
                    <span v-if="item.isMajor" class="major">Major</span>
                    <span v-else class="popular">Popular</span>
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.validator) }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.vote) }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.apr) }}
                  </td>
                  <td class="datanum--text">
                    <v-btn
                      class="voting-btn btnColor--text"
                      small
                      @click="handleVoting"
                      >Voting</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-card>
    </v-col>
    <voting-dialog ref="votingDialog" />
  </v-row>
</template>

<script>
import { formart_number } from "@/utils/utils";
import { fetchVoteList } from "@/api/vote.js";
import votingDialog from "@/components/Dialog/votingDialog.vue";
export default {
  components: { votingDialog },
  data() {
    return {
      voteList: [],
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
    handleVoting() {
      this.$refs.votingDialog.open();
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
