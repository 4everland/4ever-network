import vm from "@/main.js";
import { fetchUserNode } from "@/api/user.js";

export async function connect() {
  if (!window.ethereum) {
    window.open("https://metamask.io/download.html", "_blank");
    return vm.$dialog.error({
      text: "Please install MetaMask to use this app.",
      title: "Error",
    });
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
}

export async function getUserNode(address) {
  const { data } = await fetchUserNode(address);
  return data;
}
