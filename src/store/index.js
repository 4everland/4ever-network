import contracts from "@/contracts";
import { formart_rewards } from "@/utils/utils";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: "",
    chainId: "",
    balance: "0",
    holder: null,
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
    UPDATE_HOLDER(state, value) {
      state.holder = value;
    },
  },
  actions: {
    async getAccount({ commit, dispatch }) {
      let accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length !== 0) {
        commit("UPDATE_ACCOUNT", accounts[0]);
        // const isExists = await contracts.POSC.holderExists(accounts[0]);
        // commit("UPDATE_HOLDER", isExists);
        // if (!isExists) return commit("UPDATE_BALANCE", "-");
        // setInterval(() => {
        // 	dispatch("updateBalance");
        // }, 10000);
      }
    },
    async updateAccount({ state, commit, dispatch }) {
      if (state.chainId != 1 && state.chainId != 4)
        return Vue.prototype.$message.error(
          "Please select the correct network!"
        );
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      commit("UPDATE_ACCOUNT", accounts[0]);
      dispatch("updateBalance");
    },
    async updateChainId({ commit, dispatch }) {
      let chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      chainId = parseInt(chainId, 16);
      commit("UPDATE_CHAINID", chainId);
      if (chainId != 1 && chainId != 4)
        return Vue.prototype.$message.error(
          "Please select the correct network!"
        );
      dispatch("getAccount");
    },
    async updateBalance({ state, commit }) {
      // console.log("---------");
      // if (state.chainId !== 1 && state.chainId !== 4)
      // 	return Vue.prototype.$message.error(
      // 		"Please select the correct network!"
      // 	);

      // const isExists = await contracts.POSC.holderExists(state.account);
      // if (!isExists) return;
      const a = await contracts.POSC.holders(state.account);
      const reward = await contracts.POSC.reward(a.pid);
      // console.log(reward.toString(), "REWARD");
      commit("UPDATE_BALANCE", formart_rewards(reward.toString()));
      // commit("UPDATE_HOLDER", isExists);
    },
    async claim({ state, dispatch }) {
      const data = contracts.POSC.interface.encodeFunctionData("claim", [
        state.account,
      ]);
      const tx = await contracts.sendTransaction({
        to: contracts.contractAddress,
        data,
      });
      const receipt = tx.wait();
      return receipt;
      // console.log("receipt", receipt);
      // dispatch("updateBalance");
    },
  },
  modules: {},
});
