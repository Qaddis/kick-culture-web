// Импорт нужных модулей
import { createRouter, createWebHistory } from "vue-router"

// Импорт всех страниц
import AboutView from "./views/AboutView.vue"
import CartView from "./views/CartView.vue"
import HomeView from "./views/HomeView.vue"
import ProductsView from "./views/ProductsView.vue"
import ProductView from "./views/ProductView.vue"

// Создание и экспорт "роутера"
export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView
		},
		{
			path: "/products",
			name: "products",
			component: ProductsView
		},
		{
			path: "/about",
			name: "about",
			component: AboutView
		},
		{
			path: "/cart",
			name: "cart",
			component: CartView
		},
		{
			path: "/product/:id",
			name: "product",
			component: ProductView
		}
	]
})
