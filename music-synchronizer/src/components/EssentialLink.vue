<template>
  <router-link :to="link" class="router-link">
    <q-item clickable tag="a" target="_blank" @click="selectApp">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </router-link>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  emits: ["on-selected-app"],
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },
  },
  methods: {
    selectApp() {
      this.$emit("on-selected-app", this.title);
    },
  },
});
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: black;
}

a.router-link-exact-active {
  color: red;
}
</style>
