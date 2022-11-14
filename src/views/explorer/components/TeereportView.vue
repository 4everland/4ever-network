<template>
  <div class="teereport-view" v-show="dialog" @click.stop="closeDialog">
    <v-card
      class="teereport-container"
      v-click-outside="onClickOutside"
      @click.native.stop="onClickIn"
    >
      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center">
            <div class="ball"></div>
            <div class="proposal-info">
              <div class="datanum--text proposal-name">
                {{ "Proposal #" + data.blockNumber }}
              </div>
              <div class="cardtitle--text proposal-create">
                {{ formart_date(data.blockCreatedAt) }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="rounded px-4 py-2">
            <v-simple-table root fixed-header dense height="400">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left cardtitle--text">Node ID</th>
                    <th class="text-left cardtitle--text">Accuracy Rate</th>
                    <th class="text-left cardtitle--text">
                      Size of Challenge File
                    </th>
                    <th class="text-left cardtitle--text">Elapsed Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in reportList" :key="index">
                    <td class="datanum--text d-flex align-center">
                      {{ item.nodeId }}
                    </td>
                    <td class="datanum--text">
                      {{ formart_number(item.accuracyRate / 100) + "%" }}
                    </td>
                    <td class="datanum--text">
                      {{ formart_storage(item.totalSize) }}
                    </td>
                    <td class="datanum--text">
                      {{ formart_number(item.elapsedTime) }}
                      <span>S</span>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <!-- <template>
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
            </template> -->
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { formart_number, formart_date, formart_storage } from "@/utils/utils";

import { fetchReportDetail } from "@/api/explorer.js";
export default {
  components: {},
  data() {
    return {
      dialog: false,
      data: {},
      reportList: [],
      page: 1,
      pageSize: 10,
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    formart_date,
    formart_storage,
    async getNodeList(height) {
      const { data } = await fetchReportDetail(height);
      this.reportList = data.reports;
    },
    pageChange(val) {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      this.getNodeList(params);
    },
    async openDialog(data) {
      await this.getNodeList(data.blockNumber);
      this.data = data;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    onClickOutside() {},
    onClickIn(e) {
      e.preventDefault();
    },
  },
  created() {
    // this.getNodeList();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.teereport-view {
  width: 100%;
  height: 100vh;
  padding: 0 45px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 201;
  .teereport-container {
    width: 96%;
    max-width: 1350px;
    height: 625px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
    border-radius: 15px 15px 0 0;
    padding: 30px 40px;
    .ball {
      width: 60px;
      height: 60px;
      background: linear-gradient(325deg, #79bc5a 0%, #dffcd1 100%);
      border-radius: 50%;
      margin-right: 22px;
    }
    .proposal-info {
      .proposal-name {
        font-size: 27px;
        font-weight: bold;
      }
      .proposal-create {
        font-size: 12px;
        font-weight: bold;
        margin-top: 8;
      }
    }
  }
}
</style>
