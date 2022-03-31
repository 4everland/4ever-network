import axios from "axios";
import url from "./url";
console.log(url);
const service = axios.create({
  baseURL: url,
  timeout: 100000,
});

service.interceptors.response.use(
  (response) => {
    if (response.data.code.toUpperCase() == "SUCCESS") {
      return response.data.data;
    } else {
      throw new Error(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
