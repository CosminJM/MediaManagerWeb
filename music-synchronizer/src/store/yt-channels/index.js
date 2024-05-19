import api from "../../util/api.js";
import { Notify } from "quasar";

const notifySuccess = () => {
  Notify.create({
    type: "positive",
    message: "Operation successful!",
    timeout: 1000,
  });
};

const notifyFailure = () => {
  Notify.create({
    type: "negative",
    message: "Operation failed!",
    timeout: 1000,
  });
};

export default {
  namespaced: true,
  state() {
    return {
      channels: [],
    };
  },
  mutations: {
    deleteChannel(state, payload) {
      const channelIndex = state.channels.findIndex(
        (c) => c.channelId === payload.channelId
      );
      state.channels.splice(channelIndex, 1);
    },
    addChannel(state, payload) {
      state.channels.push(payload);
    },
    setChannels(state, payload) {
      state.channels = payload;
    },
    updateChannel(state, payload) {
      var indexToReplace = state.channels.findIndex(
        (c) => c.channelId === payload.channelId
      );
      state.channels[indexToReplace] = payload;
    },
  },
  actions: {
    async deleteChannel(context, payload) {
      try {
        await api.delete(
          `https://localhost:7000/api/channels/${payload.channelId}`
        );

        context.commit("deleteChannel", payload);
        notifySuccess();
      } catch (error) {
        console.log(`Fetch channels error:  ${error}`);
        notifyFailure();
      }
    },
    async addChannel(context, payload) {
      try {
        await api.post("https://localhost:7000/api/channels", payload);

        context.commit("addChannel", payload);
        notifySuccess();
      } catch (error) {
        console.log(`Add channel error:  ${error}`);
        notifyFailure();
      }
    },
    async fetchChannels(context) {
      try {
        const response = await api.get("https://localhost:7000/api/channels");

        const responseData = response.data;

        context.commit("setChannels", responseData);
        notifySuccess();
      } catch (error) {
        console.log(`Fetch channels error:  ${error}`);
        notifyFailure();
      }
    },
    async updateChannel(context, payload) {
      try {
        await api.put(
          `https://localhost:7000/api/channels/${payload.channelId}`,
          {
            channelIdentificator: payload.channelIdentificator,
            name: payload.name,
          }
        );

        context.commit("updateChannel", payload);
        notifySuccess();
      } catch (error) {
        console.log(`Fetch channels error:  ${error}`);
        notifyFailure();
      }
    },
  },
  getters: {
    channels(state) {
      return state.channels;
    },
  },
};
