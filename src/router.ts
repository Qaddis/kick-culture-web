import { createMemoryHistory, createRouter } from "vue-router"

import MainView from "./views/MainView.vue"

export default createRouter({
	history: createMemoryHistory(),
	routes: [
		{
			path: "/",
			name: "main",
			component: MainView
		}
	]
})
