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
                  <th class="text-left tableHeader--text">Domain</th>
                  <th class="text-left tableHeader--text">ID</th>
                  <th class="text-left tableHeader--text">Adress</th>
                  <th class="text-left tableHeader--text">Location</th>
                  <th class="text-left tableHeader--text">Type</th>
                  <th class="text-left tableHeader--text">Version</th>
                  <!-- <th class="text-left tableHeader--text">PoSC</th> -->
                  <th class="text-left tableHeader--text">Staked (4EVER)</th>
                  <th class="text-left tableHeader--text">Voted (4EVER)</th>
                  <th class="text-left tableHeader--text">Reward (4EVER)</th>
                  <th class="text-left tableHeader--text">Slash (4EVER)</th>
                  <th class="text-left tableHeader--text">Status</th>
                  <th class="text-center tableHeader--text">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in majorNodeList" :key="index">
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
                  <td class="datanum--text">{{ item.domain }}</td>
                  <td class="datanum--text">{{ formatNodeId(item.nodeId) }}</td>
                  <td class="datanum--text">{{ item.address }}</td>
                  <td class="datanum--text">{{ item.region }}</td>
                  <td class="datanum--text">
                    <span v-if="item.isMajor" class="major">Major</span>
                    <span v-else class="popular">Popular</span>
                  </td>
                  <td class="datanum--text">{{ item.version || "unknow" }}</td>
                  <!-- <td class="datanum--text">{{ item.posc / 1e4 + "%" }}</td> -->
                  <td class="datanum--text">
                    {{ bignumFormatter(item.stake / 1e18) }}
                  </td>
                  <td class="datanum--text">
                    {{ bignumFormatter(item.voted / 1e18) }}
                  </td>
                  <td class="datanum--text">
                    {{ bignumFormatter(item.reward / 1e18) }}
                  </td>
                  <td class="datanum--text">
                    {{ bignumFormatter(item.slash / 1e18) }}
                  </td>
                  <td class="datanum--text">{{ item.status }}</td>
                  <td
                    class="datanum--text"
                    :style="{
                      background: `${$vuetify.theme.dark ? '#171819' : '#fff'}`,
                    }"
                  >
                    <v-btn icon :to="`/nodeDetail/${item.id}`">
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
        <div class="py-6" v-if="majorNodeList.length == 0">
          <table-empty />
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { formart_number, bignumFormatter, formatNodeId } from "@/utils/utils";
import { fetchNodeList } from "@/api/home.js";
import TableEmpty from "@/components/TableEmpty.vue";

export default {
  components: { TableEmpty },
  data() {
    return {
      majorNodeList: [],
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
    getNodeList(params) {
      fetchNodeList(params).then((res) => {
        this.majorNodeList = res.data.list;
        this.pageLength = res.data.total;
      });
    },
    pageChange(val) {
      this.page = val;
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        type: "ALL",
      };
      this.getNodeList(params);
    },
  },
  created() {
    let params = {
      page: this.page,
      pageSize: this.pageSize,
      type: "ALL",
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

table > tbody > tr > td:nth-last-child(1),
table > thead > tr > th:nth-last-child(1) {
  position: sticky !important;
  position: -webkit-sticky !important;
  right: -1px;
  text-align: center;
  min-width: 100px;
  // background: linear-gradient(270deg, #171819 0%, rgba(0, 0, 0, 0.2) 100%);
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
