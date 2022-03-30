import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
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
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes,
});

export default router;
