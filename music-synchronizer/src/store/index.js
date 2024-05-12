import { createStore } from "vuex";
import channelsModule from "src/store/yt-channels/index.js";

const store = createStore({
  modules: {
    ytChannels: channelsModule,
  },
});

export default store;
