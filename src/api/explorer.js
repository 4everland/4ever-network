import request from "../utils/request";

export function fetchTeeReportList(params) {
  return request({
    url: `/report`,
    method: "get",
    params,
  });
}

export function fetchReportDetail(height, params) {
  return request({
    url: `/report/${height}`,
    method: "get",
    params,
  });
}

export function fetchSlashesList(params) {
  return request({
    url: `/slashes`,
    method: "get",
    params,
  });
}
