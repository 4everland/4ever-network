<template>
  <v-row class="mt-14">
    <v-col cols="12">
      <div class="common-title-box mb-8">
        <span class="d-flex align-center cardtitle--text">
          <v-icon v-text="'$slashIcon'" small class="mr-2"></v-icon>Slash</span
        >
      </div>
      <div class="boxbackgroud rounded px-4 py-2">
        <v-simple-table root fixed-header dense class="boxbackgroud">
          <template v-slot:default>
            <thead class="boxbackgroud">
              <tr>
                <th class="text-left tableHeader--text boxbackgroud">Title</th>
                <th class="text-left tableHeader--text boxbackgroud">
                  Slash(4EVER)
                </th>
                <th class="text-left tableHeader--text boxbackgroud">
                  Execute
                </th>
                <th class="text-left tableHeader--text boxbackgroud">
                  CreateAt
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td class="datanum--text d-flex align-center">
                  {{ item.title }}
                </td>
                <td class="datanum--text">
                  {{ bignumFormatter(item.slash / 1e18) }}
                </td>
                <td class="datanum--text">
                  {{ item.executed }}
                </td>
                <td class="datanum--text">
                  {{ formart_date(item.slashedAt) }}
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
      <div class="boxbackgroud rounded px-4 py-2" v-if="list.length == 0">
        <table-empty />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { formart_number, formart_date, bignumFormatter } from "@/utils/utils";
import { fetchNodeSlash } from "@/api/node";
import TableEmpty from "@/components/TableEmpty.vue";
export default {
  components: { TableEmpty },
  data() {
    return {
      nodeId: null,
      list: [],
      page: 1,
      pageSize: 20,
      pageLength: 0,
    };
  },
  methods: {
    formart_number,
    formart_date,
    bignumFormatter,
    async getSlashList(params) {
      try {
        const { data } = await fetchNodeSlash(this.nodeId, params);
        this.list = data.list;
        this.pageLength = data.total;
      } catch (err) {
        //
        console.log(err);
      }
    },
    pageChange(val) {
      this.page = val;
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      this.getSlashList(params);
    },
  },
  created() {
    this.nodeId = this.$route.params.id;
    this.getSlashList();
  },
};
</script>
<style lang="less" scoped></style>
