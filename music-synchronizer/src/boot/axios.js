import { boot } from "quasar/wrappers";
import axios from "axios";
import store from "../store/index.js";

// Create an Axios instance with custom configuration
const api = axios.create({
  baseURL: "https://localhost:7000/api", // Your API base URL
  // withCredentials: true, // Ensure cookies are sent with requests
});

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  // something to do

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;

  // Example: Add a request interceptor
  api.interceptors.request.use(
    (config) => {
      const token = store.getters.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //Redirect to login page if unathorized response
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // If the request returns a 401 Unauthorized response
      if (error.response.status === 401) {
        store.dispatch("logout");
        router.push("/login");
      }

      // Forward other errors
      return Promise.reject(error);
    }
  );
});

export { api };
