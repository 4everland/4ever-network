<template>
  <div>
    <v-app-bar root fixed app elevate-on-scroll height="50">
      <v-container class="d-flex align-center justify-space-between">
        <v-btn text color="transparent" to="/">
          <logo />
        </v-btn>
        <div>
          <v-btn class="text-capitalize" depressed icon plain>
            <v-icon small> mdi-magnify </v-icon>
          </v-btn>
          <v-btn
            class="text-capitalize"
            depressed
            plain
            text
            tile
            to="/explorer"
            >Explorer</v-btn
          >
          <v-btn class="text-capitalize" depressed plain text tile to="/voting"
            >Voting</v-btn
          >
          <v-btn
            class="text-capitalize"
            depressed
            plain
            text
            tile
            to="/governance"
            >Governance</v-btn
          >
          <v-btn class="text-capitalize" depressed plain text tile to="/run"
            >Run a Node</v-btn
          >
        </div>
      </v-container>
      <v-switch v-model="$vuetify.theme.dark"></v-switch>
    </v-app-bar>
  </div>
</template>

<script>
import { formart_date } from "@/utils/utils";
import Logo from "../components/Logo.vue";
import { mapActions, mapMutations } from "vuex";
import { fetchSearchValue } from "@/api/api";
export default {
  components: { Logo },
  data() {
    return {
      isLoading: true,
      rewards: 0,
      isLogin: false,
      isShow: false,
      searchValue: "",
      searchData: {},
      status: false,
      claimDialog: false,
    };
  },
  created() {
    if (!window.ethereum) return;
    // this.updateChainId();

    // this.getAccount();

    // this.listen();
  },
  methods: {
    ...mapActions([
      // "getAccount",
      "updateAccount",
      "updateChainId",
      "updateBalance",
      "claim",
    ]),
    ...mapMutations(["UPDATE_ACCOUNT", "UPDATE_BALANCE"]),
    async connectWallet() {
      if (!window.ethereum) {
        window.open("https://metamask.io/download.html", "_blank");
        return this.$message.warning("Please download Metamask");
      }
      const isUnlocked = await window.ethereum._metamask.isUnlocked();
      if (!isUnlocked) {
        return this.$message.warning("Please unlock Metamask");
      }

      await this.updateAccount();
    },
    handleClaim() {
      if (this.$store.state.balance == 0)
        return this.$message.error("Insufficient account balance！");
      this.claimDialog = true;
    },
    async handleClaimConfirm() {
      this.claimDialog = false;
      this.$loading.show();
      try {
        const result = await this.claim();
        this.updateBalance();
        this.$message.success("Claim successfully!");
      } catch (error) {
        this.$message.error("Claim failed!");
      }
      this.$loading.hide();
    },
    async handleSearch() {
      try {
        this.searchValue = this.searchValue.trim();
        const reg = /^[A-Za-z0-9]{1,255}$/;
        if (!reg.test(this.searchValue)) {
          return this.$message.warning(
            "Only allow English characters/numbers！"
          );
        }
        const result = await fetchSearchValue(this.searchValue);
        if (result.type.toUpperCase() == "BLOCK") {
          result.block.createdAt = formart_date(result.block.createdAt);
        }
        this.searchData = result;
        console.log(result);
        this.status = true;
      } catch (e) {
        console.log("err", e);
      }
      this.isShow = true;
    },
    listen() {
      window.ethereum.on("accountsChanged", (accounts) => {
        window.location.reload();
      });
      window.ethereum.on("chainChanged", (chainId) => {
        window.location.reload();
      });
    },
    formart_date,
  },
};
</script>
<style lang="less" scoped></style>
