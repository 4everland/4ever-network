<template>
  <div class="table-container">
    <v-data-table
      :headers="tableHeaderData"
      :items="tableContentData"
      item-class="row-item"
      :hide-default-footer="true"
      :items-per-page="50"
      class="elevation-1"
    >
      <template v-slot:item.view="{ item }">
        <!-- {{ item }} -->
        <img
          style="width: 20px; height: 12px; cursor: pointer"
          @click="handleToDetail(item)"
          src="../assets/imgs/home/eyes.png"
          alt=""
        />
      </template>
      <template v-slot:item.cidList="{ item }">
        <!-- {{ item }} -->
        <span class="view-item" @click="handleToDetail(item)">view</span>
      </template>
      <template v-slot:item.status="{ item }">
        <span :class="item.status ? 'pin' : 'unpin'">
          {{ item.status ? "pin" : "unpin" }}
        </span>
      </template>
    </v-data-table>

    <v-row class="max-width d-flex align-center" v-if="pagination">
      <v-col>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="15"
          :total-visible="7"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Boolean,
      default: true,
    },
    tableHeaderData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableContentData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      whichPage: "",
      sizeList: [
        { text: "10/page", value: 10 },
        { text: "20/page", value: 20 },
        { text: "30/page", value: 30 },
      ],
      selectValue: 10,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "center",
          sortable: false,
          value: "name",
        },
        { text: "Calories", align: "center", value: "calories" },
        { text: "Fat (g)", align: "center", value: "fat" },
        { text: "Carbs (g)", align: "center", value: "carbs" },
        { text: "Protein (g)", align: "center", value: "protein" },
        { text: "Iron (%)", align: "center", value: "iron" },
        { text: "view", align: "center", value: "view", sortable: false },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
        },
      ],
      page: 1,
    };
  },
  methods: {
    handleToDetail(item) {
      this.$emit("handleViewClick", item);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .v-pagination__item,
/deep/ .v-pagination__navigation {
  box-shadow: none;
  font-size: 12px;
  font-weight: 600;
}

/deep/ .v-data-table.elevation-1.theme--light {
  box-shadow: none !important;
}
/deep/ td,
/deep/ th {
  border-bottom: none !important;
  line-height: 48px;
  font-size: 12px !important;
  color: #495667;
}
/deep/ .v-input__control {
  width: 130px;
}
/deep/ .v-input__slot {
  width: 130px;
}
/deep/ .v-text-field__details {
  display: none;
}
/deep/ .v-data-table__wrapper tbody tr:nth-of-type(odd) {
  background: #f8f8f8;
}
/deep/ .v-data-table__wrapper .v-data-table-header tr {
  background: #e6e8eb;
}
/deep/ .v-text-field.v-text-field--solo .v-input__control {
  min-height: 30px;
}
/deep/ .v-input__slot {
  margin: 0;
}
.jump-page /deep/ .v-input__slot,
.jump-page /deep/ .v-input__control {
  width: 50px;
}
.view-item {
  color: #34a9ff;
  font-size: 12px;
  cursor: pointer;
}
.pin {
  color: #34a9ff;
}
.unpin {
  color: #fb0505;
}
</style>
