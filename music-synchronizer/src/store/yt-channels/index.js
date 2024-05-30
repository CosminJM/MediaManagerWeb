import { api } from "../../boot/axios";
import { Notify } from "quasar";

const notifySuccess = (message = "Operation successful!") => {
  Notify.create({
    type: "positive",
    message: message,
    timeout: 1000,
  });
};

const notifyFailure = (message = "Operation failed!") => {
  Notify.create({
    type: "negative",
    message: message,
    timeout: 1000,
  });
};

export default {
  namespaced: true,
  state() {
    return {
      channels: {
        totalPages: 1,
        items: [],
      },
    };
  },
  mutations: {
    deleteChannel(state, payload) {
      const channelIndex = state.channels.items.findIndex(
        (c) => c.channelId === payload.channelId
      );
      state.channels.items.splice(channelIndex, 1);
    },
    addChannel(state, payload) {
      state.channels.push(payload);
    },
    setChannels(state, payload) {
      state.channels.items = payload.responseData;
      state.channels.totalPages = payload.totalPages;
    },
    updateChannel(state, payload) {
      var indexToReplace = state.channels.items.findIndex(
        (c) => c.channelId === payload.channelId
      );
      state.channels.items[indexToReplace] = payload;
    },
  },
  actions: {
    async deleteChannel(context, payload) {
      try {
        await api.delete(`channels/${payload.channelId}`);

        context.commit("deleteChannel", payload);
        notifySuccess();
      } catch (error) {
        notifyFailure();
      }
    },
    async addChannel(context, payload) {
      try {
        await api.post("channels", payload);

        context.commit("addChannel", payload);
        notifySuccess("Channel added");
      } catch (error) {
        console.log(`Add channel error:  ${error}`);
        notifyFailure(error.response.data);
      }
    },
    async fetchChannels(context, payload) {
      try {
        const response = await api.get(
          `/channels?pageNumber=${payload.pageNumber}&pageSize=${payload.pageSize}`
        );

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
        await api.put(`channels/${payload.channelId}`, {
          channelIdentificator: payload.channelIdentificator,
          name: payload.name,
        });

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
      return state.channels.items;
    },
    totalPages(state) {
      return state.channels.totalPages;
    },
  },
};
