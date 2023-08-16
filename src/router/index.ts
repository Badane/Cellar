import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";

// Components lazy loading
const Dinosaur = () => import('../components/Dino.vue')

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/:dinosaur",
    name: "Dinosaur",
    component: Dinosaur,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;