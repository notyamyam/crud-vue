import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import  store  from './store/index'; // Import the Vuex store
import './index.css' //tailwind css

const app = createApp(App);
app.use(router);
app.use(store); // Use the Vuex store
app.mount('#app');
