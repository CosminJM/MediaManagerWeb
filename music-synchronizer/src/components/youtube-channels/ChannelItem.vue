<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card
      class="my-card"
      v-for="channel in channels"
      :key="channel.channelId"
    >
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ channel.name }}</div>
        <div class="text-subtitle2">{{ channel.channelId }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat @click="modifyChannel(channel)">Modify</q-btn>
        <q-btn flat @click="deleteChannel(channel.channelId)">Delete</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "ChannelItem",
  props: {
    channels: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      channelDialogShow: false,
      dialogAction: "", // add a data property to indicate action
      selectedChannel: null, // store the selected channel data
    };
  },
  methods: {
    deleteChannel(channelId) {
      this.$store.dispatch("ytChannels/deleteChannel", {
        channelId: channelId,
      });
    },
    modifyChannel(channel) {
      // Set selected channel data and show dialog for modification
      console.log("modify");

      this.selectedChannel = channel;
      this.dialogAction = "modify";
      this.channelDialogShow = true;
      console.log(this.selectedChannel);
      console.log(this.dialogAction);
      console.log(this.channelDialogShow);
    },
    onDialogChannelModified(channel) {
      //TODO
      //modify the channel
      console.log("onDialogChannelModified");
    },
    onAddChannel(channel) {},
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
