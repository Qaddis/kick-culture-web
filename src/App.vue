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

	<transition name="product-modal" mode="default">
		<product-modal />
	</transition>

	<app-footer />
</template>

<style scoped>
.main {
	width: 100%;
	min-height: calc(100vh - 96px);
}

/* Page transitions */
.route-enter-from,
.route-leave-to {
	opacity: 0;
}

.route-enter-active {
	transition: opacity 0.5s ease-out;
}

.route-modal-leave-active {
	transition: opacity 0.5s ease-in;
}

/* Product modal transitions */
.product-modal-enter-from,
.product-modal-leave-to {
	opacity: 0;
}

.product-modal-enter-active {
	transition: opacity 0.25s ease-out;
}

.product-modal-leave-active {
	transition: opacity 0.25s ease-in;
}
</style>
