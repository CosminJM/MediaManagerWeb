<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> {{ currentAppTitle }} </q-toolbar-title>

        <div>Hello, {{ username }}</div>

        <q-btn
          v-if="isAuthenticated"
          flat
          color="white"
          icon="logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Apps </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          @on-selected-app="onSelectedApp"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-model="crtComponent" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Youtube channels",
    caption: "YT",
    icon: "music_video",
    link: "/yt-channels",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  data() {
    return {
      linksList,
      leftDrawerOpen: false,
      currentAppTitle: "",
      crtComponent: null,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.getters.username;
    },
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    onSelectedApp(appTitle) {
      this.currentAppTitle = appTitle;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
  created() {
    this.currentAppTitle = this.$route.meta.title;
  },
});
</script>
