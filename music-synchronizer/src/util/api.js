import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7000/api",
  timeout: 2000,
});

export default instance;
