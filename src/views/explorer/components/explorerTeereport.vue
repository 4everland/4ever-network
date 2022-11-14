<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <template>
          <v-simple-table root fixed-header height="80vh">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left cardtitle--text">ID</th>
                  <th class="text-left cardtitle--text">Accuracy</th>
                  <th class="text-left cardtitle--text">Storage</th>
                  <th class="text-left cardtitle--text">
                    Average challenge time
                  </th>
                  <th class="text-left cardtitle--text">CreateAt</th>
                  <th class="text-center cardtitle--text">Action</th>
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
                    <v-btn icon @click.stop="openTeeView(item)">
                      <v-icon v-text="'$viewIcon'" dense></v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-card>
    </v-col>
    <TeereportView ref="teereportview" />
  </v-row>
</template>

<script>
import TeereportView from "./TeereportView.vue";
import { formart_number, formart_date, formart_storage } from "@/utils/utils";
import { fetchTeeReportList } from "@/api/explorer.js";

export default {
  components: {
    TeereportView,
  },
  data() {
    return {
      teeReportList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    formart_date,
    formart_storage,
    getNodeList() {
      fetchTeeReportList().then((res) => {
        this.teeReportList = res.data.item;
      });
    },
    openTeeView(data) {
      this.$refs.teereportview.openDialog(data);
    },
  },
  created() {
    this.getNodeList();
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
