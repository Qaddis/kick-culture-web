<script setup lang="ts">
import { RouterView } from "vue-router"
import Footer from "./components/AppFooter.vue"
import Header from "./components/AppHeader.vue"
import ProductModal from "./components/ProductModal.vue"
</script>

<template>
	<Header />

	<main class="main">
		<RouterView />
	</main>

	<ProductModal />

	<Footer />
</template>

<style scoped>
.main {
	width: 100%;
	min-height: calc(100vh - 96px);
}
</style>
