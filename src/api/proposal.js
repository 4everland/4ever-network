import request from "../utils/request";

export function fetchProposalList(params) {
  return request({
    url: "/proposals",
    method: "get",
    params,
  });
}
