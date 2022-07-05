import { createApp } from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import App from "./App.vue";
import store from "./store/index";
import router from "./router";

const app = createApp(App);
app.use(VueSweetalert2);
app.use(router);
app.use(store);
app.mount("#app");
