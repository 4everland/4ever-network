import Vue from "vue";
import Vuex from "vuex";
import { connect, getUserNode } from "@/utils/auth";
import {
  getBalance,
  getMyStake,
  getMyReward,
  getStakeApproved,
  getVoteApproved,
  stakeApprove,
  voteApprove,
} from "@/utils/contracts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: "",
    chainId: "",
    balance: "0",
    isStakeApproved: false,
    isVoteApproved: false,
    myNodeId: null,
    showMyAccount: false,
    myStake: "",
    myNodeStake: 0,
    myReward: 0,
  },
  mutations: {
    UPDATE_ACCOUNT(state, account) {
      state.account = account;
    },
    UPDATE_CHAINID(state, chainId) {
      state.chainId = chainId;
    },
    UPDATE_BALANCE(state, balance) {
      state.balance = balance;
    },
    UPDATE_STAKEAPPROVED(state, isStakeApproved) {
      state.isStakeApproved = isStakeApproved;
    },
    UPDATE_VOTEAPPROVED(state, isVoteApproved) {
      state.isVoteApproved = isVoteApproved;
    },
    UPDATE_MYNODEID(state, myNodeId) {
      state.myNodeId = myNodeId;
    },
    UPDATE_SHOWMYACCOUNT(state, showMyAccount) {
      state.showMyAccount = showMyAccount;
    },
    UPDATE_MYSTAKE(state, myStake) {
      state.myStake = myStake;
    },
    UPDATE_MYNODESTAKE(state, myNodeStake) {
      state.myNodeStake = myNodeStake;
    },
    UPDATE_MYREWARD(state, myReward) {
      state.myReward = myReward;
    },
  },
  actions: {
    async getConnect({ commit, dispatch }) {
      const account = await connect();
      if (account) {
        const info = await getUserNode(account);
        console.log(info);
        commit("UPDATE_ACCOUNT", account);
        commit("UPDATE_MYNODEID", info.id);
        commit("UPDATE_SHOWMYACCOUNT", info.hasData);
        commit("UPDATE_MYSTAKE", info.stake);
        dispatch("updateChainId");
        dispatch("updateStakeApproved");
        dispatch("updateVoteApproved");
        dispatch("updateBalance");
        dispatch("updateMyNodeStake");
        dispatch("updateMyReward");
      }
    },
    async getAccount({ commit, dispatch }) {
      try {
        if (!window.ethereum) {
          return;
        }
        let accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length == 0) {
          accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
        }
        return accounts[0];
      } catch (error) {
        return null;
      }
    },
    async updateBalance({ commit, state, dispatch }) {
      const account = state.account;
      if (account) {
        const balance = await getBalance(account);
        commit("UPDATE_BALANCE", balance.toString());
      }
    },
    async updateStakeApproved({ commit, state, dispatch }) {
      const account = state.account;
      if (account) {
        const isStakeApproved = await getStakeApproved(account);
        commit("UPDATE_STAKEAPPROVED", isStakeApproved);
      }
    },
    async updateVoteApproved({ commit, state, dispatch }) {
      const account = state.account;
      if (account) {
        const isVoteApproved = await getVoteApproved(account);
        commit("UPDATE_VOTEAPPROVED", isVoteApproved);
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
    },
    async updateStakeApprove({ commit, state, dispatch }) {
      stakeApprove().then((res) => {
        // dispatch("updateStakeApproved");
        commit("UPDATE_STAKEAPPROVED", true);
      });
    },
    async updateVoteApprove({ commit, state, dispatch }) {
      const receipt = await voteApprove();
      if (receipt) {
        await commit("UPDATE_VOTEAPPROVED", true);
        return receipt;
      }
    },
    async updateMyNodeStake({ commit, state, dispatch }) {
      const myNodeId = state.myNodeId;
      const account = state.account;
      if (myNodeId) {
        const myNodeStake = await getMyStake(account);
        commit("UPDATE_MYNODESTAKE", myNodeStake);
      }
    },
    async updateMyReward({ commit, state, dispatch }) {
      const myNodeId = state.myNodeId;
      const account = state.account;
      if (myNodeId) {
        const myReward = await getMyReward(account);
        commit("UPDATE_MYREWARD", myReward);
      }
    },
    async logout({ commit, state, dispatch }) {
      commit("UPDATE_ACCOUNT", "");
      commit("UPDATE_CHAINID", "");
      commit("UPDATE_BALANCE", "");
      commit("UPDATE_STAKEAPPROVED", false);
      commit("UPDATE_VOTEAPPROVED", false);
      commit("UPDATE_MYNODEID", null);
      commit("UPDATE_SHOWMYACCOUNT", false);
      commit("UPDATE_MYSTAKE", "");
    },
  },
  modules: {},
});
