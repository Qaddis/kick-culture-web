<script setup lang="ts">
import { RouterView } from "vue-router"
import Footer from "./components/AppFooter.vue"
import Header from "./components/AppHeader.vue"
</script>

<template>
	<Header />

	<main class="main">
		<div class="wrapper">
			<RouterView />
		</div>
	</main>

	<Footer />
</template>

<style scoped>
.main {
	margin: 35px 0;
	padding: 0 25px;
}

.wrapper {
	max-width: 1140px;
	margin: 0 auto;
}
</style>
