import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./utils/rem";
import "@/utils/global_styles/main.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/index.css";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.mount("#app");
