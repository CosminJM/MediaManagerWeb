<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Add Channel</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input label="Name" dense v-model="promptChannelName" autofocus />
        <q-input label="ID" dense v-model="promptChannelId" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Add" v-close-popup @click="addChannel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "AddChannelDialog",
  emits: ["add-channel"],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      promptChannelName: null,
      promptChannelId: null,
      showDialog: false, // Initialize showDialog to false
    };
  },
  watch: {
    show(newVal) {
      // Update showDialog when show prop changes
      this.showDialog = newVal;
    },
  },
  methods: {
    addChannel() {
      this.$emit("add-channel", {
        name: this.promptChannelName,
        channelId: this.promptChannelId,
      });
    },
  },
};
</script>
