<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()

const goToCartPage = (): void => {
	router.push("/cart")
}
</script>

<template>
	<header class="header">
		<div class="wrapper">
			<h1 class="logo">
				<RouterLink title='Go to the "Home" page' to="/"
					>Kick Culture</RouterLink
				>
			</h1>

			<nav class="nav">
				<RouterLink
					:class="{
						'nav-link': true,
						'nav-link--active': route.fullPath === '/'
					}"
					to="/"
					title='Go to the "Home" page'
					>Home</RouterLink
				>
				<RouterLink
					:class="{
						'nav-link': true,
						'nav-link--active': route.fullPath === '/products'
					}"
					to="/products"
					title='Go to the "Products" page'
					>Products</RouterLink
				>
				<RouterLink
					:class="{
						'nav-link': true,
						'nav-link--active': route.fullPath === '/about'
					}"
					title='Go to the "About" page'
					to="/about"
				>
					About
				</RouterLink>

				<button
					@click="goToCartPage"
					title='Go to the "Cart" page'
					class="cart-button"
				>
					<svg>
						<use xlink:href="#cart-svg"></use>
					</svg>
				</button>
			</nav>
		</div>
	</header>
</template>

<style scoped lang="scss">
.header {
	width: 100%;
	padding: 0 25px;
	background-color: var(--dark);
	border-bottom: 3px solid var(--add);
}

.wrapper {
	max-width: 1140px;
	padding: 20px 0;
	margin: 0 auto;

	display: flex;
	align-items: center;
	justify-content: space-between;
}

.logo {
	display: block;
	font-size: 2rem;
	font-family: "Peralta", serif;
	background: var(--gradient);
	background-clip: text;
	transition-property: opacity, filter, translate;
	transition-duration: 0.25s;

	a {
		color: transparent;
	}

	&:hover {
		filter: drop-shadow(0 0 5px var(--mint));
	}

	&:active {
		opacity: 0.75;
		translate: 0 3px;
	}
}

.nav {
	display: flex;
	align-items: center;
	column-gap: 20px;
}

.nav-link {
	position: relative;
	font-size: 1.15rem;
	color: var(--light);
	transition-property: scale, color;
	transition-duration: 0.2s;

	&:hover {
		color: var(--violet);
	}

	&:active {
		scale: 0.95;
	}

	&::after {
		position: absolute;
		left: 0;
		bottom: -2px;

		content: "";
		display: block;
		background: var(--gradient);
		border-radius: 2px;
		width: 100%;
		height: 2px;

		opacity: 0;
		transition: opacity 0.2s;
	}
}

.nav-link--active {
	&::after {
		opacity: 1;
	}

	&:hover {
		color: var(--light);
	}

	&:active {
		scale: 1;
	}
}

.cart-button {
	background: var(--gradient);
	padding: 5px 8px;
	border-radius: 50%;
	margin-left: 15px;
	transition-property: box-shadow, translate, opacity;
	transition-duration: 0.2s;

	svg {
		width: 42px;
		height: 42px;
	}

	&:hover {
		box-shadow: 0 0 10px var(--mint);
	}

	&:active {
		translate: 0 3px;
		opacity: 0.75;
	}
}
</style>