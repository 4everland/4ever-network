<template>
  <div class="search-view" v-show="dialog" @click.stop="closeDialog">
    <v-card
      transition="slide-x-transition"
      class="teereport-container"
      v-click-outside="onClickOutside"
      @click.native.stop="onClickIn"
    >
      <v-input append-icon="mdi-close" @click:append="closeDialog">
        <v-text-field
          placeholder="Node ID /  Teeport ID /  CID / Proposal ID"
          v-model="keyWord"
          @keydown="onSearch"
        ></v-text-field>
      </v-input>

      <div class="error-massage" v-if="showErr">
        <div class="error-title">Error</div>
        <div class="error-text mt-2">
          The search string must be a node ID, TeeReport ID, CID, proposal ID.
        </div>
      </div>

      <div class="item-box" v-else>
        <div
          class="item boxbackgroud"
          v-for="(item, index) in searchResults"
          :key="index"
          @click="toDetail(item)"
        >
          <span class="datanum--text">
            <span v-if="!item.nodeId && item.id">#</span>
            {{ item.nodeId || item.id || item.cid }}</span
          >
          <span class="ml-8" style="color: #7f92a0">{{
            item.type | typeFilter
          }}</span>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { fetchSearch } from "@/api/home";

export default {
  components: {},
  filters: {
    typeFilter(type) {
      const statusMap = {
        node: "Node ID",
        proposal: "Proposal ID",
        teeReport: "Report ID",
        cid: "CID",
      };
      return statusMap[type];
    },
  },
  data() {
    return {
      dialog: false,
      keyWord: "",
      searchResults: [],
      showErr: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.showErr = false;
      this.keyWord = "";
    },
    onClickOutside() {},
    onClickIn(e) {
      e.preventDefault();
    },
    onSearch(e) {
      console.log(e);
      if (e.keyCode == 13) {
        console.log(this.keyWord);
        this.searchResults = [];
        this.search(this.keyWord);
      }
    },
    search(keyWord) {
      fetchSearch(keyWord)
        .then((res) => {
          const obj = res.data;
          if (obj.type == null) {
            this.showErr = true;
          } else {
            this.showErr = false;
          }
          for (let key in obj) {
            if (obj[key]) {
              if (key != "block" && key != "type") {
                let item = obj[key];
                item.type = key;
                console.log(item);
                this.searchResults.push(item);
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.showErr = true;
        });
    },
    toDetail(item) {
      this.dialog = false;
      switch (item.type) {
        case "node":
          this.$router.push(`/nodeDetail/${item.id}`);
          break;
        case "teeReport":
          this.$router.push(`/teereportDetail/${item.id}`);
          break;
        case "proposal":
          this.$router.push(`/proposalDetail/${item.id}`);
          break;
        default:
          break;
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.search-view {
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
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.5);
    border-radius: 0 0 15px 15px;
    padding: 30px 38px;
    .item-box {
      .item {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        font-size: 11px;
        padding: 0 12px;
        cursor: pointer;
      }
    }
    .error-massage {
      color: #ff5b60;
      .error-title {
        font-size: 18px;
        font-weight: bold;
      }
      .error-text {
        font-size: 14px;
      }
    }
  }
}
</style>
