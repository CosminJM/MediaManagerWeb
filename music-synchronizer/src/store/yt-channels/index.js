export default {
  namespaced: true,
  state() {
    return {
      channels: [
        {
          name: "Alesso",
          channelId: "qweasdzxc",
        },
        {
          name: "Alex Velea",
          channelId: "qweasdzxc1",
        },
        {
          name: "Roxen",
          channelId: "qweasd135235235zxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1",
        },
        {
          name: "Lil Wayne",
          channelId: "qweas4356456745745745dzxc1235",
        },
      ],
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
  },
  actions: {
    deleteChannel(context, payload) {
      context.commit("deleteChannel", payload);
    },
    addChannel(context, payload) {
      context.commit("addChannel", payload);
    },
  },
  getters: {
    channels(state) {
      return state.channels;
    },
  },
};
