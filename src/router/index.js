import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout/index.vue";
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

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
        path: "/nodeDetail/:id",
        name: "NodeDetail",
        component: () => import("../views/explorer/nodeDetail.vue"),
      },
      {
        path: "/accountDetail",
        name: "AccountDetail",
        component: () => import("../views/explorer/accountDetail.vue"),
      },
      {
        path: "/voting",
        name: "Voting",
        component: () => import("../views/voting/index.vue"),
      },
      {
        path: "/governance",
        name: "Governance",
        component: () => import("../views/governance/index.vue"),
      },
      {
        path: "/proposalDetail/:id",
        name: "ProposalDetail",
        component: () => import("../views/governance/proposalDetail.vue"),
      },
      {
        path: "/node",
        name: "Node",
        component: () => import("../views/node/index.vue"),
      },
      // {
      //   path: "/blockDetail",
      //   name: "BlockDetail",
      //   component: () => import("../views/BlockDetail.vue"),
      // },
      // {
      //   path: "/nodeDetail",
      //   name: "NodeDetail",
      //   component: () => import("../views/NodeDetail.vue"),
      // },
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
