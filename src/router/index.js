import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/home/index.vue"),
      },
      {
        path: "/explorer",
        name: "Explorer",
        component: () => import("../views/explorer/index.vue"),
      },
      {
        path: "/blockDetail",
        name: "BlockDetail",
        component: () => import("../views/BlockDetail.vue"),
      },
      {
        path: "/nodeDetail",
        name: "NodeDetail",
        component: () => import("../views/NodeDetail.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes,
});

export default router;
