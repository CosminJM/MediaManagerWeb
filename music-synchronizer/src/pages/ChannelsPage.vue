<template>
  <q-page>
    <search-input v-model="searchText" label="Search channels"></search-input>

    <q-dialog v-model="promptAddChannel" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add channel</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="Name"
            dense
            v-model="promptChannelName"
            autofocus
            @keyup.enter="prompt = false"
          />
          <q-input
            label="ID"
            dense
            v-model="promptChannelId"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Add channel"
            v-close-popup
            @click="confirmAddChannel"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <channel-item :channels="channels"></channel-item>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="pageNumber"
        :max="totalPages"
        input
        @update:model-value="nextPage"
      />
    </div>

    <q-page-sticky position="bottom-right" :offset="[50, 50]">
      <q-btn fab icon="add" color="accent" @click="addChannel" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import ChannelItem from "../components/youtube-channels/ChannelItem.vue";
import SearchInput from "../components/ui/SearchInput.vue";

export default defineComponent({
  name: "ChannelsPage",
  data() {
    return {
      promptAddChannel: false,
      promptChannelName: null,
      promptChannelId: null,
      searchText: "",
      pageNumber: 1,
      //hardcoded for now
      //TODO An UI control item must be implemented for user to change page size
      pageSize: 100,
    };
  },
  components: {
    ChannelItem,
    SearchInput,
  },
  computed: {
    channels() {
      return this.$store.getters["ytChannels/channels"].filter((c) =>
        c.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
    totalPages() {
      return this.$store.getters["ytChannels/totalPages"];
    },
  },
  created() {
    this.fetchChannels(this.pageNumber, this.pageSize);
  },
  methods: {
    addChannel() {
      this.promptAddChannel = true;
    },
    //TODO when I add a channel it won't have an id in the list, this means I can't delete it because it needs an id retrieved from DB
    async confirmAddChannel() {
      const name = this.promptChannelName;
      const identificator = this.promptChannelId;

      const channel = {
        name: name,
        channelIdentificator: identificator,
      };
      this.$q.loading.show();

      await this.$store.dispatch("ytChannels/addChannel", channel);

      this.$q.loading.hide();

      this.promptAddChannel = false;
      this.promptChannelName = null;
      this.promptChannelId = null;
    },
    async fetchChannels(pageNumber, pageSize) {
      this.$q.loading.show();
      await this.$store.dispatch("ytChannels/fetchChannels", {
        pageNumber,
        pageSize,
      });
      this.$q.loading.hide();
    },
    async nextPage(pageNumber) {
      this.pageNumber = pageNumber;
      await this.fetchChannels(this.pageNumber, this.pageSize);
    },
  },
});
</script>
