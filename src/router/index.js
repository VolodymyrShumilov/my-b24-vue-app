import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BlogsView from "@/views/BlogsView.vue";
import PostDetail from "@/components/PostDetail.vue";
import ContactsView from "@/views/ContactsView.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  { path: "/blogs", name: "blogs", component: BlogsView },
  { path: "/post/:id", component: PostDetail },
  { path: "/contacts", name: "contacts", component: ContactsView },
  { path: "/login", name: "login", component: LoginView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.path === "/blogs" && !auth.isLoggedIn) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
