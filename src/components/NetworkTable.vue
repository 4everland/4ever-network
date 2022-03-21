<template>
  <div class="table-container">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :hide-default-footer="true"
      class="elevation-1"
    ></v-data-table>
    <v-row justify="center">
      <!-- <v-col cols="2"> Total 85 items </v-col> -->
      <v-col cols="12">
        <v-container class="max-width d-flex align-center">
          <span>Total 85 items</span>
          <v-pagination
            v-model="page"
            class="my-4"
            :length="15"
            :total-visible="7"
          ></v-pagination>
          <v-select :items="sizeList" label="Solo field" solo></v-select>
          <div>
            <span>Goto</span>
            <v-input></v-input>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sizeList: [
        { text: "10/page", value: 10 },
        { text: "20/page", value: 20 },
        { text: "30/page", value: 30 },
      ],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
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
};
</script>

<style lang="less" scoped>
/deep/ .v-input__control {
  width: 130px;
}
/deep/ .v-input__slot {
  width: 130px;
}
/deep/ .v-text-field__details {
  display: none;
}
</style>
