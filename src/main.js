import "./index.css"; //tailwind css
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as MdIcons from "oh-vue-icons/icons/md";

const Md = Object.values({ ...MdIcons });
addIcons(...Md);

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index"; // Import the Vuex store


createApp(App).mount('#app')


const app = createApp(App);
app.use(router);
app.use(store);
app.component("v-icon", OhVueIcon); // Use the Vuex store
app.mount("#app");
