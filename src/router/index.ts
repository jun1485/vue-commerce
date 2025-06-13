import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/PageMain.vue"),
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/pages/PageProducts.vue"),
    },
    {
      path: "/products/:slug",
      name: "product-detail",
      component: () => import("@/pages/PageProductDetail.vue"),
    },
  ],
});

export default router;
