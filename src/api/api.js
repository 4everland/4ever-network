import request from "../utils/request";
export function fetchNetworkInfo() {
  return request({
    url: "/network/info",
    method: "GET",
  });
}

export function fetchReport(data) {
  return request({
    url: `/report/${data}`,
    method: "GET",
  });
}

export function fetchReportList(params) {
  return request({
    url: "/report",
    method: "GET",
    params,
  });
}
export function fetchNodes() {
  return request({
    url: "/nodes",
    method: "GET",
  });
}
export function fetchNodeInfo(nodeId) {
  return request({
    url: `/node/${nodeId}`,
    method: "GET",
  });
}

export function fetchNodeDetail(nodeId, params) {
  return request({
    url: `/report/node/${nodeId}`,
    method: "GET",
    params,
  });
}

export function fetchSearchValue(value) {
  return request({
    url: `/search/${value}`,
    method: "GET",
  });
}
