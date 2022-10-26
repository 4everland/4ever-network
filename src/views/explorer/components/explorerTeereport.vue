<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <template>
          <v-simple-table root fixed-header>
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
                <tr v-for="(item, index) in majorNodeList" :key="index">
                  <td class="datanum--text d-flex align-center">
                    {{ item.name }}
                  </td>
                  <td class="datanum--text">{{ item.domain }}</td>
                  <td class="datanum--text">{{ item.id }}</td>
                  <td class="datanum--text">{{ item.address }}</td>
                  <td class="datanum--text">{{ item.region }}</td>
                  <td class="text-center datanum--text">
                    <v-btn icon @click.stop="openTeeView(item.id)">
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
import { formart_number } from "@/utils/utils";
import { fetchNodeList } from "@/api/home.js";

export default {
  components: {
    TeereportView,
  },
  data() {
    return {
      majorNodeList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
    getNodeList() {
      fetchNodeList({
        type: "ALL",
      }).then((res) => {
        this.majorNodeList = res.data.list;
      });
    },
    openTeeView(id) {
      this.$refs.teereportview.openDialog();
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
