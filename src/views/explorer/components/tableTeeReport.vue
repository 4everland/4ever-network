<template>
  <v-row class="mt-14">
    <v-col cols="12">
      <div class="common-title-box mb-8">
        <span class="d-flex align-center cardtitle--text">
          <v-icon v-text="'$votingIcon'" small class="mr-2"></v-icon
          >TeeReport</span
        >
      </div>
      <div class="boxbackgroud rounded px-4 py-2">
        <v-simple-table
          root
          fixed-header
          dense
          height="400"
          class="boxbackgroud"
        >
          <template v-slot:default>
            <thead class="boxbackgroud">
              <tr>
                <th class="text-left cardtitle--text boxbackgroud">
                  TeeReport
                </th>
                <th class="text-left cardtitle--text boxbackgroud">Storage</th>
                <th class="text-left cardtitle--text boxbackgroud">Elapse</th>
                <th class="text-left cardtitle--text boxbackgroud">
                  Accuracy Rate
                </th>
                <th class="text-left cardtitle--text boxbackgroud">CreatAt</th>
                <th class="text-left cardtitle--text boxbackgroud">Action</th>
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
                  {{ formart_number(item.validator) }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.validator) }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.validator) }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.validator) }}
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
      pageSize: 10,
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
    pageChange(val) {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      this.getNodeList(params);
    },
  },
  created() {
    this.getNodeList();
  },
  mounted() {},
};
</script>
<style lang="less" scoped></style>
