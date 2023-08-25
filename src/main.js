import { createApp } from 'vue'
import { createPinia } from "pinia"
import PrimeVue from 'primevue/config';

import Button from "primevue/button"
import InputText from "primevue/inputtext"

import './style.css'
import App from './App.vue'
import router from "./router/index.ts";

export const pinia = createPinia();

const app = createApp(App);

app.component('Button', Button);
app.component('InputText', InputText);

app.use(router);
app.use(pinia);
app.use(PrimeVue)
app.mount('#app');
