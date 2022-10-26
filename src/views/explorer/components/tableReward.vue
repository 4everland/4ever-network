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
              <tr v-for="(item, index) in list" :key="index">
                <td class="datanum--text">
                  {{ formart_number(item.reward) }}
                </td>
                <td class="datanum--text">
                  {{ formart_date(item.createdAt) }}
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
  </v-row>
</template>

<script>
import { formart_number, formart_date } from "@/utils/utils";
import { fetchRewardLog } from "@/api/node";
export default {
  components: {},
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 20,
      pageLength: 0,
      nodeId: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    formart_date,
    async getRewardList(params) {
      try {
        const { data } = await fetchRewardLog(this.nodeId, params);
        this.list = data.list;
        this.pageLength = data.page;
      } catch (error) {
        //
        console.log(error);
      }
    },
    pageChange(val) {
      this.page = val;
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      this.getRewardList(params);
    },
  },
  created() {
    this.nodeId = this.$route.params.id;
    const params = {
      page: this.page,
      pageSize: this.pageSize,
    };
    this.getRewardList(params);
  },
  mounted() {},
};
</script>
<style lang="less" scoped></style>
