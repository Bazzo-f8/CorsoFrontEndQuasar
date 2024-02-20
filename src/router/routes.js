import {useSessionStore} from "stores/useSessionStore";
import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from "src/App.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia()
const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
const session = useSessionStore();
const isLogged = session.isLogged();

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter(to, from, next){
      if ( to.name !== 'login' && !isLogged){
        next({
          path: 'login',
          replace: true
        })
      } else {
        next()
      }
    },
    children: [
      { name: "home", path: "", component: () => import("pages/IndexPage.vue") },
      { name: "posts", path: "posts", component: () => import("pages/PostsPage.vue") },
      {
        name: "post-detail",
        path: "posts/:postId",
        component: () => import("pages/PostDetailPage.vue"),
      },{
        name: "login",
        path: "login",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
