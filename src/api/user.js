import request from "../utils/request";

export function fetchUserNode(address) {
  return request({
    url: `/nodes/owner/${address}`,
    method: "get",
  });
}
