import request from "../utils/request";

export function fetchNodes() {
  return request({
    url: "/nodes",
    method: "GET",
  });
}
