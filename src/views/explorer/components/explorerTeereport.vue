<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <template>
          <v-simple-table root fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left tableHeader--text">ID</th>
                  <th class="text-left tableHeader--text">Accuracy</th>
                  <th class="text-left tableHeader--text">Storage</th>
                  <th class="text-left tableHeader--text">
                    Average challenge time
                  </th>
                  <th class="text-left tableHeader--text">CreateAt</th>
                  <th class="text-center tableHeader--text">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in teeReportList" :key="index">
                  <td class="datanum--text d-flex align-center">
                    {{ "#" + item.blockNumber }}
                  </td>
                  <td class="datanum--text">
                    {{ item.averageAccuracyRate / 100 + "%" }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_storage(item.totalSize) }}
                  </td>
                  <td class="datanum--text">
                    {{ item.averageElapsedTime }}
                    <!-- <span style="color: #7f92a0; font-size: 12px">S</span> -->
                    <span>S</span>
                  </td>
                  <td class="datanum--text">
                    {{ formart_date(item.blockCreatedAt) }}
                  </td>
                  <td class="text-center datanum--text">
                    <v-btn icon :to="`/teereportDetail/${item.blockNumber}`">
                      <v-icon v-text="'$viewIcon'" dense></v-icon>
                    </v-btn>
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
        </template>
        <div class="py-6" v-if="teeReportList.length == 0">
          <table-empty />
        </div>
      </v-card>
    </v-col>
    <TeereportView ref="teereportview" />
  </v-row>
</template>

<script>
import TeereportView from "./TeereportView.vue";
import { formart_number, formart_date, formart_storage } from "@/utils/utils";
import { fetchTeeReportList } from "@/api/explorer.js";
import TableEmpty from "@/components/TableEmpty.vue";

export default {
  components: {
    TeereportView,
    TableEmpty,
  },
  data() {
    return {
      teeReportList: [],
      page: 1,
      pageSize: 20,
      pageLength: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    formart_date,
    formart_storage,
    getNodeList(params) {
      fetchTeeReportList(params).then((res) => {
        this.teeReportList = res.data.item;
        this.pageLength = res.data.total;
      });
    },
    pageChange(val) {
      this.page = val;
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      this.getNodeList(params);
    },
    openTeeView(data) {
      this.$refs.teereportview.openDialog(data);
    },
  },
  created() {
    let params = {
      page: this.page,
      pageSize: this.pageSize,
    };
    this.getNodeList(params);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.block-card {
  padding: 5px 35px;
}

table > tbody > tr > td,
table > thead > tr > th {
  white-space: nowrap;
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
  display: inline-block;
}
</style>
