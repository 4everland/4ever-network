import axios from "axios";
import url from "./url";
console.log(url);
const service = axios.create({
  baseURL: url,
  timeout: 100000,
});
export default service;
