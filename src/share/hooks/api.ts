import axios from "axios";

const api = axios.create({
  baseURL: "http://172.28.3.75:8081",
  timeout: 30000,
});

export default api;

