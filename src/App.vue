<script setup lang="ts">
import { RouterView } from "vue-router"
import AppFooter from "./components/AppFooter.vue"
import AppHeader from "./components/AppHeader.vue"
import ProductModal from "./components/ProductModal.vue"
</script>

<template>
	<app-header />

	<main class="main">
		<router-view v-slot="{ Component }">
			<transition name="route" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</main>

	<product-modal />

	<app-footer />
</template>

<style scoped>
.main {
	width: 100%;
	min-height: calc(100vh - 96px);
}

/* Route transitions */
.route-enter-from,
.route-leave-to {
	opacity: 0;
}

.route-enter-active {
	transition: opacity 0.5s ease-out;
}

.router-leave-active {
	transition: opacity 0.5s ease-in;
}
</style>
