import contracts from "@/contracts";
import { formart_rewards } from "@/utils/utils";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: "",
    chainId: "",
    balance: 0,
  },
  mutations: {
    UPDATE_ACCOUNT(state, value) {
      state.account = value;
    },
    UPDATE_CHAINID(state, value) {
      state.chainId = value;
    },
    UPDATE_BALANCE(state, value) {
      state.balance = value;
    },
  },
  actions: {
    async getAccount(context) {
      console.log(context);
      let accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length !== 0) {
        context.commit("UPDATE_ACCOUNT", accounts[0]);
        context.dispatch("updateBalance");
      }
    },
    async updateAccount(context) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      context.commit("UPDATE_ACCOUNT", accounts[0]);
      context.dispatch("updateBalance");
    },
    async updateChainId(context) {
      let chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      chainId = parseInt(chainId, 16);
      // if (chainId != 1 && chainId != 4) return;
      context.commit("UPDATE_CHAINID", chainId);
    },
    async updateBalance({ state, commit }) {
      if (state.chainId !== 1 && state.chainId !== 4) return;
      console.log(state.account, "account");
      const isExists = await contracts.POSC.holderExists(state.account);
      console.log("isExists", isExists);
      const a = await contracts.POSC.holders(state.account);
      const reward = await contracts.POSC.reward(a.pid);
      console.log(reward.toString(), "REWARD");
      commit("UPDATE_BALANCE", formart_rewards(reward.toString()));
    },
  },
  modules: {},
});
