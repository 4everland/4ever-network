import request from "../utils/request";

export function fetchUserNode(address) {
  return request({
    url: `/nodes/owner/${address}`,
    method: "get",
  });
}

export function fetchUserAccounts(address) {
  return request({
    url: `/accounts/${address}`,
    method: "get",
  });
}
