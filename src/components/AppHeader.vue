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
          <v-btn
            v-if="!myNodeId"
            class="text-capitalize"
            depressed
            plain
            text
            tile
            to="/node"
          >
            <span class="color-btn"> Run a Node </span>

            <v-img
              src="@/assets/imgs/header/fire.png"
              width="9"
              class="ml-1"
            ></v-img>
          </v-btn>
          <v-btn
            v-if="myNodeId"
            class="text-capitalize"
            depressed
            plain
            text
            tile
            :to="`/nodeDetail/${myNodeId}`"
            >My Node</v-btn
          >
          <v-btn
            v-if="showMyAccount"
            class="text-capitalize"
            depressed
            plain
            text
            tile
            :to="`/accountDetail`"
            >My Account</v-btn
          >
          <v-btn class="text-capitalize" depressed plain text tile to="/docs"
            >Docs</v-btn
          >
        </div>
        <AppSearch ref="search" />
      </v-container>
      <div class="text-center" v-if="account">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              elevation="1"
              color="#00A8F1"
              class="white--text"
              :outlined="$vuetify.theme.dark"
              v-bind="attrs"
              v-on="on"
              >{{ formatAccount(account) }}</v-btn
            >
          </template>
          <v-list>
            <!-- <v-list-item v-if="myNodeId">
              <v-list-item-title>
                <v-btn
                  text
                  plain
                  tile
                  style="width: 100%"
                  :to="`/nodeDetail/${myNodeId}`"
                  >My Node</v-btn
                >
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="showMyAccount">
              <v-list-item-title>
                <v-btn
                  text
                  plain
                  tile
                  style="width: 100%"
                  :to="`/accountDetail`"
                  >My Account</v-btn
                >
              </v-list-item-title>
            </v-list-item> -->
            <v-list-item>
              <v-list-item-title>
                <v-btn text plain tile style="width: 100%" @click="logout"
                  >Logout Node</v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
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
    </v-app-bar>
  </div>
</template>

<script>
import { formart_date } from "@/utils/utils";
import Logo from "../components/Logo.vue";
import AppSearch from "./AppSearch.vue";
import { mapActions, mapMutations } from "vuex";
import { fetchSearchValue } from "@/api/api";

export default {
  components: { Logo, AppSearch },
  computed: {
    account() {
      return this.$store.state.account;
    },
    myNodeId() {
      return this.$store.state.myNodeId;
    },
    showMyAccount() {
      return this.$store.state.showMyAccount && !this.$store.state.myNodeId;
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
    if (!this.account) {
      this.connectWallet();
    }
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
      await this.$store.dispatch("getConnect");
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
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
    formatAccount(account) {
      if (account.length > 0) {
        return (
          account.substr(0, 10) + "...." + account.substr(account.length - 8, 8)
        );
      }
      return account;
    },
  },
};
</script>
<style lang="less" scoped>
.color-btn {
  background: linear-gradient(90deg, #ffaedf 0%, #00cfff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
