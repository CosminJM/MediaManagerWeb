import { createStore } from "vuex";
import channelsModule from "src/store/yt-channels/index.js";
import authModule from "src/store/auth/index.js";

const store = createStore({
  modules: {
    ytChannels: channelsModule,
    authModule,
  },
});

export default store;
