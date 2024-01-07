import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue'
import router from './router'
import "./plugins/axios"


import "vue3-toastify/dist/index.css";
// import './assets/main.css'

const app = createApp(App)
app.config.globalProperties.$dataTheme = app.config.globalProperties.$dataTheme || { currentTheme: 'dark' };

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, BiBootstrap } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill, BiBootstrap);

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(router)
app.use(VueAxios, axios)
app.component("v-icon", OhVueIcon)
app.mount('#app')
