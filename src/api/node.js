import request from "../utils/request";

export function fetchNodeDetail(nodeId) {
  return request({
    url: `/nodes/${nodeId}`,
    method: "get",
  });
}

export function fetchNodeBalance(nodeId) {
  return request({
    url: `/nodes/${nodeId}/balance`,
    method: "get",
  });
}

export function fetchRewardLog(params) {
  return request({
    url: "/rewards",
    method: "get",
    params,
  });
}

export function fetchNodeWithdraw(nodeId, params) {
  return request({
    url: `/nodes/${nodeId}/withdrawals`,
    method: "get",
    params,
  });
}

export function fetchNodeVoters(nodeId, params) {
  return request({
    url: `/nodes/${nodeId}/voters`,
    method: "get",
    params,
  });
}

export function fetchNodeSlash(nodeId, params) {
  return request({
    url: `/nodes/${nodeId}/slashes`,
    method: "get",
    params,
  });
}

export function fetchNodeReport(nodeId, params) {
  return request({
    url: `/report/node/${nodeId}`,
    method: "get",
    params,
  });
}
