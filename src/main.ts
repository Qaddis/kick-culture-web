import { createPinia } from "pinia"
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"

import "./globals.scss"

createApp(App).use(router).use(createPinia()).mount("#app")
