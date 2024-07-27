// Импорт нужных библиотек
import { MotionPlugin } from "@vueuse/motion"
import { createPinia } from "pinia"
import { createApp } from "vue"

import App from "./App.vue" // Импорт корневого компонента
import "./globals.scss" // Импорт глобальных стилей
import router from "./router" // Импорт "роутера" (модуль навигации)

// Создание приложения
const app = createApp(App)

app.use(router) // Подключение навигации
app.use(createPinia()) // Подключение state-менеджера
app.use(MotionPlugin) // Подключение анимаций

// Запуск приложения
app.mount("#app")
