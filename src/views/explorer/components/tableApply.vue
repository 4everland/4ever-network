<template>
  <v-row class="mt-16">
    <v-col cols="12">
      <div class="common-title-box mb-8">
        <span class="d-flex align-center cardtitle--text">
          <v-icon v-text="'$applyIcon'" small class="mr-2"></v-icon>Apply</span
        >
      </div>
      <div class="boxbackgroud rounded px-4 py-2">
        <v-simple-table root fixed-header dense class="boxbackgroud">
          <template v-slot:default>
            <thead class="boxbackgroud">
              <tr>
                <th class="text-left tableHeader--text boxbackgroud">Node</th>
                <th class="text-left tableHeader--text boxbackgroud">
                  Amount(4EVER)
                </th>
                <th class="text-left tableHeader--text boxbackgroud">
                  CreateAt
                </th>
                <th class="text-left tableHeader--text boxbackgroud">Status</th>
                <th class="text-left tableHeader--text boxbackgroud">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td class="datanum--text d-flex align-center">
                  {{ item.title }}
                </td>
                <td class="datanum--text">
                  {{ bignumFormatter(item.amount / 1e18) }}
                </td>
                <td class="datanum--text">
                  {{ formart_date(item.createdAt) }}
                </td>
                <td class="datanum--text">
                  {{ item.status }}
                </td>
                <td>
                  <v-btn
                    v-if="item.status == 'READY'"
                    class="widthdraw-btn btnColor--text mx-2"
                    x-small
                    @click.stop="handlerWidthdraw(item)"
                    >Widthdraw</v-btn
                  >
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
    <widthdraw-dialog
      ref="widthdrawDialog"
      @widthdrawSuccess="widthdrawSuccess"
    />
  </v-row>
</template>

<script>
import { formart_number, formart_date, bignumFormatter } from "@/utils/utils";
import { fetchNodeApply } from "@/api/node";
import widthdrawDialog from "@/components/Dialog/widthdrawDialog.vue";
import TableEmpty from "@/components/TableEmpty.vue";

export default {
  components: {
    widthdrawDialog,
    TableEmpty,
  },
  data() {
    return {
      list: [],
      nodeId: null,
      page: 1,
      pageSize: 20,
      pageLength: 0,
    };
  },
  computed: {
    account() {
      const addr = localStorage.getItem("address");
      return this.$store.state.account || addr;
    },
  },
  watch: {},
  methods: {
    formart_number,
    formart_date,
    bignumFormatter,
    async getWithdrawList(params) {
      try {
        const { data } = await fetchNodeApply(this.account, params);
        this.list = data.list;
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
      this.getWithdrawList(params);
    },
    handlerWidthdraw(data) {
      this.$refs.widthdrawDialog.claim(data, "widthdraw");
    },
    widthdrawSuccess() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      this.getWithdrawList(params);
    },
  },
  created() {
    this.nodeId = this.$route.params.id;
    const params = {
      page: this.page,
      pageSize: this.pageSize,
    };
    this.getWithdrawList(params);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.widthdraw-btn {
  width: 99px;
  height: 21px;
  background: linear-gradient(270deg, #6357ab 0%, #ffcd93 100%);
  border-radius: 4px;
  display: inline-block;
  font-size: 11px;
}
</style>
