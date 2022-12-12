<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <template>
          <v-simple-table root fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left tableHeader--text">Node</th>
                  <th class="text-left tableHeader--text">Slash(4EVER)</th>
                  <th class="text-left tableHeader--text">Porposer</th>
                  <th class="text-left tableHeader--text">Executor</th>
                  <th class="text-left tableHeader--text">CreateAt</th>
                  <th class="text-center tableHeader--text">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in slashesList" :key="index">
                  <td class="datanum--text d-flex align-center">
                    <v-img
                      v-if="item.logo"
                      class="mr-2 rounded-circle"
                      width="24"
                      max-width="24"
                      height="24"
                      max-height="24"
                      :src="item.logo"
                    ></v-img>
                    <span class="ball mr-2" v-else></span>
                    {{ item.name }}
                  </td>
                  <td class="datanum--text">
                    {{ bignumFormatter(item.slash / 1e18) }}
                  </td>
                  <td class="datanum--text">
                    {{ formatNodeId(item.proposer) }}
                  </td>
                  <td class="datanum--text">{{ item.executor }}</td>
                  <td class="datanum--text">
                    {{ formart_date(item.slashAt) }}
                  </td>
                  <td class="text-center datanum--text">
                    <v-btn icon :to="`/proposalDetail/${item.proposalId}`">
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
        <div class="py-6" v-if="slashesList.length == 0">
          <table-empty />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {
  formart_number,
  bignumFormatter,
  formatNodeId,
  formart_date,
} from "@/utils/utils";
import { fetchSlashesList } from "@/api/explorer.js";
import TableEmpty from "@/components/TableEmpty.vue";

export default {
  components: { TableEmpty },
  data() {
    return {
      slashesList: [],
      page: 1,
      pageSize: 20,
      pageLength: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    bignumFormatter,
    formatNodeId,
    formart_date,
    getNodeList(params) {
      fetchSlashesList(params).then((res) => {
        this.slashesList = res.data.list;
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
.ball {
  width: 24px;
  height: 24px;
  background: linear-gradient(325deg, #79bc5a 0%, #dffcd1 100%);
  display: inline-block;
  border-radius: 50%;
}
</style>
