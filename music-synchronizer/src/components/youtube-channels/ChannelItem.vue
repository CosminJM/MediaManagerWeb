<template>
  <div class="q-pa-md row items-center justify-center q-gutter-md">
    <q-dialog v-model="modifyChannelDialogShow" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Update channel</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="Name"
            dense
            v-model.trim="selectedChannel.name"
            autofocus
            @keyup.enter="prompt = false"
          />
          <q-input
            label="ID"
            dense
            v-model.trim="selectedChannel.channelIdentificator"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Update"
            v-close-popup
            @click="updateChannelConfirm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-card
      class="my-card"
      v-for="channel in channels"
      :key="channel.channelId"
    >
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ channel.name }}</div>
        <div class="text-subtitle2">{{ channel.channelIdentificator }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat @click="updateChannel(channel)">Update</q-btn>
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
      modifyChannelDialogShow: false,
      deleteChannelDialogShow: false,
      selectedChannel: null, // store the selected channel data
    };
  },
  methods: {
    deleteChannel(channelId) {
      this.$q
        .dialog({
          title: "Sure to delete?",
          cancel: true, // shows the cancel button
          ok: true, // shows the ok button
          focus: "none",
        })
        .onOk(async () => {
          this.$q.loading.show();
          await this.$store.dispatch("ytChannels/deleteChannel", channelId);
          this.$q.loading.hide();
        })
        .onCancel(() => {});
    },
    updateChannel(channel) {
      this.selectedChannel = { ...channel };
      this.modifyChannelDialogShow = true;
    },
    async updateChannelConfirm() {
      console.log(this.selectedChannel);
      this.$q.loading.show();
      await this.$store.dispatch("ytChannels/updateChannel", {
        channelId: this.selectedChannel.channelId,
        channelIdentificator: this.selectedChannel.channelIdentificator,
        name: this.selectedChannel.name,
      });
      this.$q.loading.hide();
      this.modifyChannelDialogShow = false;
      this.selectedChannel = null;
    },
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
