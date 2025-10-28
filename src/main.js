import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { autofocus, uppercase } from "./directives";

createApp(App)
  .use(router)
  .use(createPinia())
  .directive("autofocus", autofocus)
  .directive("uppercase", uppercase)
  .mount("#app");
