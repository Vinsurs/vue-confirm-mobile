import Vue from "vue";
import App from "./App.vue";
import { VConfirm } from "./packages/VConfirm";
Vue.config.productionTip = false;
// Vue.use(VConfirm);
Vue.component(VConfirm.name, VConfirm);
new Vue({
  render: h => h(App)
}).$mount("#app");
