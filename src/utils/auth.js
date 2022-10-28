import vm from "@/main.js";
import Cookies from "js-cookie";
// import contracts from "@/contracts";
import store from "@/store";
import { fetchUserNode } from "@/api/user.js";

const TokenKey = "Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, expires) {
  return Cookies.set(TokenKey, token, { expires });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export async function connect() {
  let accounts;
  return new Promise((resolve, reject) => {
    if (!window.ethereum) {
      window.open("https://metamask.io/download.html", "_blank");
      return vm.$dialog.error({
        text: "Please install MetaMask to use this app.",
        title: "Error",
      });
    }
    (async () => {
      accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length == 0) {
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      }
      localStorage.setItem("address", accounts[0]);
      getUserNode(accounts[0]);
      resolve(accounts[0]);
    })();
  });
}

export function getUserNode(address) {
  fetchUserNode(address).then((res) => {
    localStorage.setItem("nodeId", res.data.id);
  });
}
