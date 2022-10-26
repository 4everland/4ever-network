import request from "../utils/request";

export function fetchVoteList(params) {
  return request({
    url: "/votes",
    method: "get",
    params,
  });
}

export function fetchVoteRank(params) {
  return request({
    url: "/votes/rank",
    method: "get",
    params,
  });
}
