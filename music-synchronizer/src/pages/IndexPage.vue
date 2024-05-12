<template>
  <q-page padding>
    <div class="row q-mb-lg">
      <q-input v-model="newTask" placeholder="Add new task" class="col" />
      <q-btn color="primary" size="sm" label="Add" @click="addTask" />
    </div>

    <div class="row q-mb-lg">
      <q-list bordered separator class="col">
        <q-item-label header>Task list</q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="(task, index) in tasks"
          :key="index"
          @click="moveToDone(index)"
        >
          <q-item-section>
            <q-item-label>{{ task }}</q-item-label>
          </q-item-section>
          <q-avatar color="teal" text-color="white" icon="check" />
        </q-item>
      </q-list>
    </div>

    <div class="row q-mb-lg">
      <q-list bordered separator class="col">
        <q-item-label header>Done</q-item-label>

        <q-item
          clickable
          v-ripple
          v-for="(task, index) in done"
          :key="index"
          @click="removeDoneTask(index)"
        >
          <q-item-section>
            <q-item-label>{{ task }}</q-item-label>
          </q-item-section>
          <q-avatar color="red" text-color="white" icon="close" />
        </q-item>
      </q-list>
    </div>

    <q-dialog v-model="alert" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Delete?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes"
            color="primary"
            v-close-popup
            @click="deleteDoneTask"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <ul>
      <li v-for="channel in channels" :key="channel.channelId">
        {{ channel.name }}
      </li>
    </ul>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      tasks: [],
      done: [],
      newTask: "",
      alert: false,
      doneDeleteIndex: null,
    };
  },
  computed: {
    channels() {
      return this.$store.getters["ytChannels/channels"];
    },
  },
  methods: {
    addTask() {
      this.tasks.push(this.newTask);
      this.newTask = "";
    },
    moveToDone(index) {
      this.done.push(this.tasks[index]);
      this.tasks.splice(index, 1);
    },
    removeDoneTask(index) {
      this.doneDeleteIndex = index;
      this.alert = true;
    },
    deleteDoneTask() {
      this.done.splice(this.doneDeleteIndex, 1);
      this.doneDeleteIndex = null;
    },
  },
});
</script>
