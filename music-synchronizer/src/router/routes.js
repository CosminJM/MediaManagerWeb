const routes = [
  {
    path: "/",
    redirect: "/yt-channels",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/yt-channels",
        component: () => import("pages/channels/ChannelsPage.vue"),
        meta: { requiresAuth: true, title: "Youtube channels" },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/Auth/LoginPage.vue"),
    meta: { requiresAuth: false },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
