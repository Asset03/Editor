import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import App from "./App.vue";
import { vuePinia } from "./pinia";

const pinia = vuePinia();

createApp(App).use(pinia).mount("#app");
