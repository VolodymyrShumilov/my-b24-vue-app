import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BlogsView from "@/views/BlogsView.vue";
import PostDetail from "@/components/PostDetail.vue";
import ContactsView from "@/views/ContactsView.vue";
import LoginView from "@/views/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import TodoView from "@/views/TodoView.vue";
import ButtonView from "@/views/ButtonView.vue";
import TemplateRefsView from "@/views/TemplateRefsView.vue";

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
  {
    path: "/blogs",
    name: "blogs",
    component: BlogsView,
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore();

      if (!auth.isLoggedIn) {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  { path: "/post/:id", component: PostDetail },
  { path: "/contacts", name: "contacts", component: ContactsView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/todos", name: "todos", component: TodoView },
  { path: "/button", name: "button", component: ButtonView },
  { path: "/template-refs", name: "templateRefs", component: TemplateRefsView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
