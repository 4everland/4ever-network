import request from "../utils/request";

export function fetchVoteList(params) {
  return request({
    url: "/votes",
    method: "get",
    params,
  });
}

export function fetchVoteOverview() {
  return request({
    url: "/votes/overview",
    method: "get",
  });
}

export function fetchVoteRank(params) {
  return request({
    url: "/votes/rank",
    method: "get",
    params,
  });
}

export function fetchVotedList(address, params) {
  return request({
    url: `/votes/${address}`,
    method: "get",
    params,
  });
}

export function fetchBeforeVote(data) {
  return request({
    url: "/votes",
    method: "post",
    data,
  });
}
