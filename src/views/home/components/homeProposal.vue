<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" :outlined="$vuetify.theme.dark" class="block-card">
        <div class="common-title-box mb-4">
          <span class="d-flex align-center cardtitle--text">
            <v-icon v-text="'$proposalIcon'" small class="mr-2"></v-icon
            >Proposal</span
          >
          <span class="more">View More</span>
        </div>
        <template>
          <v-simple-table root fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left cardtitle--text">ID</th>
                  <th class="text-left cardtitle--text">Title</th>
                  <th class="text-left cardtitle--text">Validator</th>
                  <th class="text-left cardtitle--text">Slash(4EVER)</th>
                  <th class="text-left cardtitle--text">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in majorNodeList" :key="index">
                  <td class="datanum--text">{{ item.domain }}</td>
                  <td class="datanum--text">
                    {{ formart_number(item.stake) }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.validator) }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.validatorToken) }}
                  </td>
                  <td class="datanum--text">
                    {{ formart_number(item.reward) }}
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
        type: "MAJOR",
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
  padding: 30px 35px;
}
</style>
