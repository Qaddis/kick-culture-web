import { createMemoryHistory, createRouter } from "vue-router"

import AboutView from "./views/About.View.vue"
import CartView from "./views/CartView.vue"
import MainView from "./views/MainView.vue"
import ProductsView from "./views/ProductsView.vue"

export default createRouter({
	history: createMemoryHistory(),
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
		}
	]
})
