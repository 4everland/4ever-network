<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <template>
          <v-simple-table root fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left cardtitle--text">Node</th>
                  <th class="text-left cardtitle--text">Domain</th>
                  <th class="text-left cardtitle--text">ID</th>
                  <th class="text-left cardtitle--text">Adress</th>
                  <th class="text-left cardtitle--text">Location</th>
                  <th class="text-left cardtitle--text">Type</th>
                  <th class="text-left cardtitle--text">Version</th>
                  <th class="text-left cardtitle--text">PoSC</th>
                  <th class="text-left cardtitle--text">Staked (4EVER)</th>
                  <th class="text-left cardtitle--text">Voted (4EVER)</th>
                  <th class="text-left cardtitle--text">Reward (4EVER)</th>
                  <th class="text-left cardtitle--text">Slash (4EVER)</th>
                  <th class="text-left cardtitle--text">Status</th>
                  <th class="text-left cardtitle--text">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in majorNodeList" :key="index">
                  <td class="datanum--text">{{ item.name }}</td>
                  <td class="datanum--text">{{ item.domain }}</td>
                  <td class="datanum--text">{{ item.id }}</td>
                  <td class="datanum--text">{{ item.address }}</td>
                  <td class="datanum--text">{{ item.region }}</td>
                  <td class="datanum--text">{{ item.type }}</td>
                  <td class="datanum--text">{{ item.version }}</td>
                  <td class="datanum--text">{{ item.posc }}</td>
                  <td class="datanum--text">
                    {{ formart_number(item.stake) }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.voted) }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.reward) }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.slash) }}
                  </td>
                  <td class="datanum--text">{{ item.status }}</td>
                  <td
                    class="datanum--text"
                    :style="{
                      background: `${$vuetify.theme.dark ? '#171819' : '#fff'}`,
                    }"
                  >
                    view
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
import { fetchNodeList } from "@/api/home.js";

export default {
  components: {},
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

table > tbody > tr > td:nth-last-child(1),
table > thead > tr > th:nth-last-child(1) {
  position: sticky !important;
  position: -webkit-sticky !important;
  right: 0;
}
</style>
