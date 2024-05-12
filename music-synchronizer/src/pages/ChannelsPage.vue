<template>
  <q-page>
    <q-toolbar class="bg-primary text-white">
      <q-input
        label="Search channels"
        color="white"
        dark
        borderless
        v-model="searchText"
        input-class="text-middle"
        class="q-ml-md"
      >
        <template #append>
          <q-icon v-if="searchText === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchText = ''"
          />
        </template>
      </q-input>
    </q-toolbar>

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

    <channels-list :channels="channels"></channels-list>

    <q-page-sticky position="bottom-right" :offset="[50, 50]">
      <q-btn fab icon="add" color="accent" @click="addChannel" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import ChannelsList from "../components/youtube-channels/ChannelItem.vue";

export default defineComponent({
  name: "ChannelsPage",
  data() {
    return {
      promptAddChannel: false,
      promptChannelName: null,
      promptChannelId: null,
      searchText: "",
    };
  },
  components: {
    ChannelsList,
  },
  computed: {
    channels() {
      return this.$store.getters["ytChannels/channels"].filter((c) =>
        c.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
  created() {
    this.channelsList = this.channels;
  },
  methods: {
    addChannel() {
      this.promptAddChannel = true;
    },
    confirmAddChannel() {
      const name = this.promptChannelName;
      const id = this.promptChannelId;

      const channel = {
        name: name,
        channelId: id,
      };

      this.$store.dispatch("ytChannels/addChannel", channel);

      this.promptAddChannel = false;
      this.promptChannelName = null;
      this.promptChannelId = null;
    },
  },
});
</script>
