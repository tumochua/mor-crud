import TableVue from "./table/Table.vue";
import AddPostVue from "./table/AddPost.vue";
import DetailPostVue from "./table/DetailPost.vue";
import EditPostVue from "./table/EditPost.vue";
import NotFound from "./table/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: TableVue },
  { path: "/add-post", component: AddPostVue },
  { path: "/detail/:id", component: DetailPostVue },
  { path: "/edit/:id", component: EditPostVue },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
