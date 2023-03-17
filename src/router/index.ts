import { auth } from "@/firebase";
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("../views/BlogView.vue"),
    },
    {
      path: "/blog/:id",
      name: "blogEntry",
      component: () => import("../views/BlogEntryView.vue"),
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../views/AccountView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/AdminView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  let isAdmin = false;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth.currentUser) {
      auth.currentUser.getIdTokenResult().then((idTokenResult) => {
        isAdmin = idTokenResult.claims.role === "admin";
        if (isAdmin) {
          next();
        } else {
          next("/");
        }
      });
    } else {
      next("/");
    }
  } else {
    next();
  }
});
export default router;
