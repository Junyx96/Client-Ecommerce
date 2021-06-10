import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "semantic-ui-css/semantic.css"
import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';



createApp(App).use(store).use(router).mount('#app');