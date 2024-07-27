<script setup lang="ts">
// Импорты
import { computed } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"
import { cartStore } from "../stores/CartStore"

// Получение текущего роута и подключение в компонент "роутера"
const route = useRoute()
const router = useRouter()

// Подключение в компонент хранилища (корзина)
const userCart = cartStore()

// Получение количества товаров в корзине
const cartSize = computed<number>((): number => {
	let size: number = 0
	userCart.cart.forEach(cartItem => {
		size += cartItem.sizes.length
	})

	return size
})

// Функция для перехода на страницу корзины
const goToCartPage = (): void => {
	router.push("/cart")
}
</script>

<template>
	<header class="header">
		<div class="wrapper">
			<!-- Логотип сайта (название) -->
			<h1 class="logo">
				<router-link title='Go to "Home" page' to="/">
					Kick Culture
				</router-link>
			</h1>

			<!-- Панель навигации по сайту -->
			<nav class="nav">
				<router-link
					:class="{
						'nav-link': true,
						'nav-link--active': route.fullPath === '/'
					}"
					to="/"
					title='Go to "Home" page'
					>Home</router-link
				>
				<router-link
					:class="{
						'nav-link': true,
						'nav-link--active': route.fullPath === '/products'
					}"
					to="/products"
					title='Go to "Products" page'
					>Products</router-link
				>
				<router-link
					:class="{
						'nav-link': true,
						'nav-link--active': route.fullPath === '/about'
					}"
					title='Go to "About" page'
					to="/about"
				>
					About
				</router-link>

				<!-- Кнопка для перехода в корзину -->
				<button
					@click="goToCartPage"
					title='Go to "Cart" page'
					class="cart-button"
				>
					<svg>
						<use xlink:href="#cart-svg"></use>
					</svg>

					<!-- Значок с кол-вом товаров в корзине -->
					<transition mode="default" name="cart-badge">
						<span v-if="cartSize > 0" class="cart-size-badge">
							{{ cartSize }}
						</span>
					</transition>
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
	position: relative;
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

	.cart-size-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.65rem;
		height: 1.65rem;
		background-color: var(--add);
		border-radius: 50%;
		font-size: 1rem;
		color: var(--light);

		position: absolute;
		bottom: -0.35rem;
		right: -0.35rem;
	}
}

/* Cart badge transition */
.cart-badge-enter-from,
.cart-badge-leave-to {
	opacity: 0;
}

.cart-badge-enter-active {
	transition: opacity 0.15s ease-out;
}

.cart-badge-leave-active {
	transition: opacity 0.15s ease-in;
}
</style>
