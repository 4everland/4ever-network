<template>
  <v-row class="mt-8">
    <v-col cols="12">
      <div class="common-title-box mb-8">
        <span class="d-flex align-center cardtitle--text">Reason</span>
      </div>
      <v-card elevation="0" class="rounded px-4 py-2">
        <v-simple-table root fixed-header height="500">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left cardtitle--text">Validator ID</th>
                <th class="text-left cardtitle--text">TeeReport ID</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableList" :key="index">
                <td class="datanum--text d-flex align-center">
                  {{ item.reportId }}
                </td>
                <td class="datanum--text">
                  {{ formart_number(item.validator) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <template>
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
                    ></v-pagination>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { formart_number } from "@/utils/utils";
export default {
  components: {},
  props: ["tableList"],
  data() {
    return {
      voteList: [],
      page: 1,
    };
  },
  computed: {},
  watch: {},
  methods: {
    formart_number,
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
