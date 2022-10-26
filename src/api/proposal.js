import request from "../utils/request";

export function fetchProposalList(params) {
  return request({
    url: "/proposals",
    method: "get",
    params,
  });
}

export function fetchProposalOverview() {
  return request({
    url: "/proposals/overview",
    method: "get",
  });
}

export function fetchProposalDetail(id, params) {
  return request({
    url: `/proposals/${id}`,
    method: "get",
    params,
  });
}
