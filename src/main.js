import './assets/main.css'
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue'
import router from './router'
import "./plugins/axios"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import "vue3-toastify/dist/index.css";

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
