import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register/index.vue")
  },
  {
    path: "/repassword",
    name: "RePassword",
    component: () => import("../views/RePassword/index.vue")
  }
];

const router = new VueRouter({
  routes,
});

export default router;
