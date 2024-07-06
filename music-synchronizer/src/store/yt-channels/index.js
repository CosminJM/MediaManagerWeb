import { Notify } from "quasar";
import gql from "graphql-tag";
import { apolloClient } from "boot/apollo";
import {
  AddChannelMutation,
  DeleteChannelMutation,
  PaginatedChannelsQuery,
  UpdateChannelMutation,
} from "../../pages/channels/channelsPage-graphql.js";

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
      channels: [],
      pageInfo: {},
      totalCount: 0,
      pageCursors: {}, // Store cursors for each page
      currentPage: 1, // Track the current page
    };
  },
  mutations: {
    deleteChannel(state, payload) {
      const channelIndex = state.channels.findIndex(
        (c) => c.channelId === payload
      );
      state.channels.splice(channelIndex, 1);
    },
    addChannel(state, payload) {
      state.channels.push(payload);
    },
    setChannels(state, payload) {
      state.channels = payload;
    },
    setPageInfo(state, payload) {
      state.pageInfo = payload;
    },
    setTotalCount(state, payload) {
      state.totalCount = payload;
    },
    setPageCursors(state, payload) {
      if (!state.pageCursors[payload.page]) {
        state.pageCursors[payload.page] = {};
      }
      state.pageCursors[payload.page].endCursor = payload.endCursor;
      state.pageCursors[payload.page].startCursor = payload.startCursor;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload.page;
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
        const response = await apolloClient.mutate({
          mutation: DeleteChannelMutation,
          variables: {
            channelId: payload,
          },
        });

        if (response.data.deleteChannel.error != null) {
          notifyFailure();
          return;
        }
        context.commit("deleteChannel", payload);
        notifySuccess();
      } catch (error) {
        notifyFailure();
      }
    },
    async addChannel(context, payload) {
      try {
        const response = await apolloClient.mutate({
          mutation: AddChannelMutation,
          variables: {
            channelForCreationDto: payload,
          },
        });
        if (response.data.addChannel.error != null) {
          notifyFailure();
          return;
        }
        context.commit("addChannel", response.data.addChannel.data);
        notifySuccess("Channel added");
      } catch (error) {
        console.log(`Add channel error:  ${error}`);
        notifyFailure(error.response);
      }
    },
    async fetchChannels(context, payload) {
      try {
        const response = await apolloClient.query({
          query: PaginatedChannelsQuery,
          variables: {
            first: payload.pageSize,
            after: payload.afterCursor,
            before: payload.beforeCursor,
            search: payload.search,
          },
        });
        if (response.data.paginatedChannels.error != null) {
          notifyFailure();
          return;
        }
        console.log(response.data.paginatedChannels);
        console.log("page cursors", context.state.pageCursors);
        const channels = response.data.paginatedChannels.edges.map(
          (edge) => edge.node
        );
        const pageInfo = response.data.paginatedChannels.pageInfo;
        const totalCount = response.data.paginatedChannels.totalCount;
        context.commit("setChannels", channels);
        context.commit("setPageInfo", pageInfo);
        context.commit("setTotalCount", totalCount);
        context.commit("setPageCursors", {
          page: context.state.currentPage,
          endCursor: response.data.paginatedChannels.pageInfo.endCursor,
          startCursor: response.data.paginatedChannels.pageInfo.startCursor,
        });
        notifySuccess();
      } catch (e) {
        console.log(e);
        notifyFailure();
      }
    },
    async fetchCursorsToPage(context, payload) {
      let currentPage = 1;
      let after = null;

      while (currentPage < payload.targetPage) {
        const query = gql`
          query PaginatedChannels(
            $first: Int!
            $after: String
            $search: String
          ) {
            paginatedChannels(first: $first, after: $after, search: $search) {
              pageInfo {
                endCursor
                startCursor
              }
            }
          }
        `;

        try {
          const response = await apolloClient.query({
            query,
            variables: {
              first: payload.first,
              after,
            },
          });

          const endCursor = response.data.paginatedChannels.pageInfo.endCursor;
          const startCursor =
            response.data.paginatedChannels.pageInfo.startCursor;
          context.commit("setPageCursors", {
            page: currentPage,
            endCursor,
            startCursor,
          });

          after = endCursor;
          currentPage++;
        } catch (error) {
          console.log(error);
          break;
        }
      }
    },
    async updateChannel(context, payload) {
      try {
        const response = await apolloClient.mutate({
          mutation: UpdateChannelMutation,
          variables: { channelForUpdateDto: payload },
        });
        console.log(response.data);
        if (response.data.updateChannel.error != null) {
          notifyFailure();
          return;
        }
        context.commit("updateChannel", payload);
        notifySuccess();
      } catch (error) {
        console.log("Update channel error", error);
        notifyFailure();
      }
    },
  },
  getters: {
    channels(state) {
      return state.channels;
    },
    totalCount(state) {
      return state.totalCount;
    },
    pageInfo(state) {
      return state.pageInfo;
    },
    pageCursors(state) {
      return state.pageCursors;
    },
    currentPage(state) {
      return state.currentPage;
    },
  },
};
