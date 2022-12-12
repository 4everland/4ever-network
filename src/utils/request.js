import axios from "axios";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 100000,
});

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (process.env.NODE_ENV == "mock") {
      return res;
    }
    if (res.code == "409") {
      return res;
    }
    if (res.code.toUpperCase() !== "SUCCESS") {
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
