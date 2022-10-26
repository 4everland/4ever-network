<template>
  <div>
    <v-app-bar root fixed app elevate-on-scroll height="50">
      <v-container class="d-flex align-center justify-space-between">
        <v-btn text color="transparent" to="/">
          <logo />
        </v-btn>
        <div>
          <v-btn
            class="text-capitalize"
            depressed
            icon
            plain
            @click.stop="openTeeView()"
          >
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
          <v-btn class="text-capitalize" depressed plain text tile to="/node"
            >Run a Node</v-btn
          >
        </div>
        <AppSearch ref="search" />
      </v-container>

      <v-btn
        v-if="formatAccount"
        small
        elevation="1"
        color="#00A8F1"
        class="white--text"
        :outlined="$vuetify.theme.dark"
        >{{ formatAccount }}</v-btn
      >
      <v-btn
        v-else
        small
        elevation="1"
        color="#00A8F1"
        class="white--text"
        :outlined="$vuetify.theme.dark"
        @click="connectWallet"
        >Connect</v-btn
      >
      <v-btn
        small
        icon
        color="#7F92A0"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        class="mx-6"
      >
        <v-icon v-if="$vuetify.theme.dark">mdi-white-balance-sunny</v-icon>
        <v-icon v-else> mdi-brightness-2</v-icon>
      </v-btn>
      <!-- <v-switch v-model="$vuetify.theme.dark"></v-switch> -->
    </v-app-bar>
  </div>
</template>

<script>
import { formart_date } from "@/utils/utils";
import Logo from "../components/Logo.vue";
import AppSearch from "./AppSearch.vue";
import { mapActions, mapMutations } from "vuex";
import { fetchSearchValue } from "@/api/api";
import { connect, getToken, removeToken } from "@/utils/auth";

export default {
  components: { Logo, AppSearch },
  computed: {
    account() {
      return this.$store.state.account;
    },
    formatAccount() {
      const account = this.$store.state.account;
      if (account.length > 0) {
        return (
          account.substr(0, 10) + "...." + account.substr(account.length - 8, 8)
        );
      }
      return account;
    },
  },
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

    this.getAccount();

    // this.listen();
  },
  methods: {
    ...mapActions([
      "getAccount",
      "updateAccount",
      "updateChainId",
      "updateBalance",
      "claim",
    ]),
    ...mapMutations(["UPDATE_ACCOUNT", "UPDATE_BALANCE"]),
    async connectWallet() {
      connect();

      // await this.updateAccount();
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
    openTeeView() {
      this.$refs.search.openDialog();
    },
  },
};
</script>
<style lang="less" scoped></style>
