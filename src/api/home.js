import request from "../utils/request";

export function fetchHomeOverview() {
  return request({
    url: "/overview/homepage",
    method: "get",
  });
}

export function fetchStakesLinechart(params) {
  return request({
    url: "/stakes/linechart",
    method: "get",
    params,
  });
}

export function fetchNodeMapChart() {
  return request({
    url: "/nodes/mapchart",
    method: "get",
  });
}

export function fetchNodeList(params) {
  return request({
    url: "/nodes",
    method: "get",
    params,
  });
}

export function fetchAccuracyRateLineChart(params) {
  return request({
    url: "/linechart/homepage/accuracy",
    method: "get",
    params,
  });
}
