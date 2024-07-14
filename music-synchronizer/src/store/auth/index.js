import { api } from "../../boot/axios";
import { Notify } from "quasar";
import { apolloClient } from "boot/apollo";

const notifySuccess = (message = "Operation successful!") => {
  Notify.create({
    type: "positive",
    message: message,
    timeout: 2000,
  });
};

const notifyFailure = (message = "Operation failed!") => {
  Notify.create({
    type: "negative",
    message: message,
    timeout: 2000,
  });
};

export default {
  state() {
    return {
      userId: null,
      username: null,
      token: null,
      didAutoLogout: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.username = payload.username;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
    setTokenFromRefresh(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login(context, payload) {
      try {
        const response = await api.post("/auth/login", {
          username: payload.username,
          password: payload.password,
        });

        console.log(response.data);
        context.commit("setUser", {
          token: response.data.token,
          userId: response.data.id,
          username: response.data.username,
        });

        //API available in browser by default
        //Save user data in "Local Storage" of browser
        //Can be seen in Browser > F12 tools > Application tab > Local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("username", response.data.username);

        notifySuccess("Login successful!");
      } catch (error) {
        console.log(error);
        notifyFailure("Login unsuccessful!");
        throw error;
      }
    },
    tryLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const username = localStorage.getItem("username");

      if (token && userId && username) {
        context.commit("setUser", {
          token: token,
          userId: userId,
          username: username,
        });
      }
    },
    async register(context, payload) {
      try {
        const response = await api.post("/auth/register", {
          username: payload.username,
          email: payload.email,
          password: payload.password,
        });

        notifySuccess(response.data);
      } catch (error) {
        notifyFailure(error.response.data);
        throw error;
      }
    },
    async refreshToken(context) {
      try {
        const response = await api.post("/auth/refresh");
        const token = response.data.token;

        context.commit("setTokenFromRefresh", token);
        notifySuccess("Refresh token successful!");
      } catch (error) {
        const errorMsg = "Refresh token error";
        console.error(errorMsg, error);
        notifyFailure(errorMsg);
        throw error;
      }
    },
    async logout(context) {
      // clearTimeout(timer);
      //we must clear all store data about user, token, etc.
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      // Invalidate Apollo Client cache, so that when switching accounts graphql queries start fresh
      await apolloClient.clearStore();

      context.commit("setUser", {
        token: null,
        userId: null,
        username: null,
      });
    },
    autoLogout(context) {
      context.dispatch("logout");
      context.commit("setAutoLogout");
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    username(state) {
      return state.username;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token; // !! - turn the variable into a true boolean
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
};
