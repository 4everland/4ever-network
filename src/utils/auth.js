import vm from "@/main.js";
import Cookies from "js-cookie";
// import contracts from "@/contracts";
import store from "@/store";
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

export async function connect(callBack) {
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
  localStorage.setItem("address", accounts[0]);

  // exchangeCode(accounts[0]).then((res) => {
  //   sign(res.data.nonce, callBack);
  // });
}

// export async function sign(nonce, callBack) {
//   try {
//     const msg = nonce;
//     const sig = await contracts.signer.signMessage(msg);
//     const account = store.state.account.toLowerCase();
//     login(account, sig).then((res) => {
//       setToken(res.data.token, new Date(res.data.expiresIn));
//       if (callBack) {
//         callBack();
//       } else {
//         window.location.reload();
//       }
//     });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     console.log("finsh");
//   }
// }
