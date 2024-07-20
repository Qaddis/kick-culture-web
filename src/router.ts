import { createRouter, createWebHistory } from "vue-router"

import AboutView from "./views/About.View.vue"
import CartView from "./views/CartView.vue"
import MainView from "./views/MainView.vue"
import ProductsView from "./views/ProductsView.vue"
import ProductView from "./views/ProductView.vue"

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "main",
			component: MainView
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
