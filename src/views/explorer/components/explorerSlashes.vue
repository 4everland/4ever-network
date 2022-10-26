<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <template>
          <v-simple-table root fixed-header height="80vh">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left cardtitle--text">Node</th>
                  <th class="text-left cardtitle--text">Slash(4EVER)</th>
                  <th class="text-left cardtitle--text">Porposer</th>
                  <th class="text-left cardtitle--text">Executor</th>
                  <th class="text-left cardtitle--text">CreateAt</th>
                  <th class="text-center cardtitle--text">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in slashesList" :key="index">
                  <td class="datanum--text d-flex align-center">
                    <v-img
                      class="mr-2 rounded-circle"
                      width="18"
                      max-width="18"
                      height="18"
                      max-height="18"
                      :src="item.logo"
                    ></v-img>
                    {{ item.name }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.slash) }}
                  </td>
                  <td class="datanum--text">{{ item.proposer }}</td>
                  <td class="datanum--text">{{ item.executor }}</td>
                  <td class="datanum--text">{{ item.slashAt }}</td>
                  <td class="text-center datanum--text">
                    <v-btn icon :to="`/proposalDetail/${item.proposalId}`">
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
  </v-row>
</template>

<script>
import { formart_number } from "@/utils/utils";
import { fetchSlashesList } from "@/api/explorer.js";

export default {
  components: {},
  data() {
    return {
      slashesList: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,

    getNodeList() {
      fetchSlashesList().then((res) => {
        this.slashesList = res.data.list;
      });
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
