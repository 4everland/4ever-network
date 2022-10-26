import request from "../utils/request";

export function fetchNodeDetail(nodeId) {
  return request({
    url: `/nodes/${nodeId}`,
    method: "get",
  });
}
