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
              <tr v-for="(item, index) in list" :key="index">
                <td class="datanum--text d-flex align-center">
                  {{ item.blockNumber }}
                </td>
                <td class="datanum--text">
                  {{ formart_storage(item.totalSize) }}
                </td>
                <td class="datanum--text">
                  {{ item.elapsedTime }}
                </td>
                <td class="datanum--text">{{ item.accuracyRate }}%</td>
                <td class="datanum--text">
                  {{ formart_date(item.createdAt) }}
                </td>
                <td class="datanum--text">
                  <v-btn color="primary" x-small>action</v-btn>
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
  </v-row>
</template>

<script>
import { formart_number, formart_storage, formart_date } from "@/utils/utils";
import { fetchNodeReport } from "@/api/node";
export default {
  components: {},
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 20,
      nodeId: null,
      pageLength: 0,
    };
  },

  computed: {},
  watch: {},
  methods: {
    formart_number,
    formart_storage,
    formart_date,
    async getNodeReport(params) {
      try {
        const { data } = await fetchNodeReport(this.nodeId, params);
        this.list = data.item;
        this.pageLength = data.total;
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
      this.getNodeReport(params);
    },
  },
  created() {
    this.nodeId = this.$route.params.id;
    let params = {
      page: this.page,
      pageSize: this.pageSize,
    };
    this.getNodeReport(params);
  },
  mounted() {},
};
</script>
<style lang="less" scoped></style>
