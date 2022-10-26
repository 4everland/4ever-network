<template>
  <v-row class="mt-16">
    <v-col cols="12">
      <div class="common-title-box mb-8">
        <span class="d-flex align-center cardtitle--text">
          <v-icon v-text="'$votingIcon'" small class="mr-2"></v-icon
          >Reward</span
        >
      </div>
      <div class="boxbackgroud rounded px-4 py-2">
        <v-simple-table
          root
          fixed-header
          dense
          height="220"
          class="boxbackgroud"
        >
          <template v-slot:default>
            <thead class="boxbackgroud">
              <tr>
                <th class="text-left cardtitle--text boxbackgroud">
                  Reward(4EVER)
                </th>
                <th class="text-left cardtitle--text boxbackgroud">CreateAt</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in voteList" :key="index">
                <td class="datanum--text">
                  {{ formart_number(item.validator) }}
                </td>
                <td class="datanum--text">123456</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
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
<style lang="less" scoped></style>
