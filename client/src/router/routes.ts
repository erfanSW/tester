import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "main", component: () => import("pages/Index.vue") },
      { path: "signup", component: () => import("pages/SignUp.vue") },
      { path: "login", component: () => import("pages/Login.vue") },
      {
        path: "validate_signup",
        component: () => import("pages/ValidateSignUp.vue")
      },
      {
        path: "validate_login",
        component: () => import("pages/ValidateLogin.vue")
      },
      {
        path: "documents",
        component: () => import("pages/DocumentList.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
