<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import GradientButton from "../components/ui/GradientButton.vue"
import { cartStore } from "../stores/CartStore"
import type { ICard } from "../stores/DataStore"
import { siteDataStore } from "../stores/DataStore"

type StateType = ICard | "Loading" | "None"

const router = useRouter()
const route = useRoute()

const siteData = siteDataStore()
const userCart = cartStore()

const product = ref<StateType>("Loading")
const inCart = computed<boolean>((): boolean => {
	if (product.value !== "Loading" && product.value !== "None") {
		return userCart.cart.some(cartItem => cartItem === product.value.id)
	} else return false
})

const goBack = (): void => {
	router.push("/products")
}

onMounted(() => {
	const item = siteData.products.find(
		item => item.id.toString() === route.params.id
	)

	if (item) product.value = item
	else product.value = "None"
})
</script>

<template>
	<section class="product">
		<div v-if="product === 'Loading'" class="wrapper loading">
			<svg>
				<use xlink:href="#loading-svg"></use>
			</svg>

			<h2>Loading...<br />Please, wait</h2>
		</div>

		<div v-else-if="product === 'None'" class="wrapper productNotFound">
			<h2>Product not found</h2>

			<GradientButton @click="goBack" label="Go back" />
		</div>

		<div v-else class="wrapper productFound">
			<button @click="goBack" class="back-btn">
				<svg>
					<use xlink:href="#back-svg"></use>
				</svg>
				<span>Go back</span>
			</button>

			<div class="card">
				<img :src="product.image" :alt="`${product.title} Banner`" />

				<div>
					<h2>{{ product.title }}</h2>
					<p>{{ product.description }}</p>
				</div>

				<div style="margin-top: 10px" v-if="product.discount !== 0">
					<span class="old_price">{{ product.price }}</span>
					<span class="current_price">
						{{
							(
								product.price -
								(product.price * product.discount) / 100
							).toFixed(2)
						}}
					</span>
					<span class="currency">usd</span>
				</div>

				<div style="margin-top: 10px" v-else>
					<span class="current_price">
						{{ product.price }}
					</span>
					<span class="currency">usd</span>
				</div>

				<GradientButton
					v-if="inCart"
					@click="userCart.toCart('remove', product.id)"
					label="Remove from cart"
				/>
				<GradientButton
					v-else
					@click="userCart.toCart('add', product.id)"
					label="Add to cart"
				/>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.product {
	width: 100%;
	min-height: calc(100vh - 96px);
	padding: 50px 25px;
}

.wrapper {
	max-width: 1140px;
	margin: 0 auto;
}

.loading {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 15px;

	svg {
		width: 150px;
		height: 150px;
		animation: loading 1.5s cubic-bezier(0.5, 0.3, 0.35, 0.75) infinite;
	}

	h2 {
		font-size: 1.5rem;
		text-align: center;
		font-weight: 600;
		line-height: 0.95;
	}
}

.productNotFound {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 15px;

	h2 {
		font-family: var(--header-font);
		font-size: 2rem;
	}
}

.back-btn {
	display: flex;
	align-items: center;
	column-gap: 10px;
	padding: 0 10px;
	color: var(--violet);
	border: 2px solid var(--violet);
	border-radius: 10px;
	transition-property: translate, opacity, background-color;
	transition-duration: 0.25s;
	margin-bottom: 25px;

	svg {
		width: 50px;
		height: 50px;
		fill: var(--violet);
		transition: fill 0.25s;
	}

	span {
		transition: color 0.25s;
		font-weight: 600;
	}

	&:hover {
		background-color: var(--violet);

		svg {
			fill: var(--light);
		}

		span {
			color: var(--light);
		}
	}

	&:active {
		opacity: 0.75;
		translate: 0 3px;
	}
}

.card {
	padding: 25px;
	border: 3px solid var(--violet);
	border-radius: 20px;
	background-color: var(--dark);
	color: var(--light);

	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		width: 55vh;
		height: auto;
	}

	h2 {
		font-size: 1.65rem;
		font-family: var(--header-font);
		font-weight: 600;
		color: var(--mint);
		text-align: center;
		text-transform: uppercase;
		margin: 25px 0 5px;
	}

	p {
		text-align: center;
	}

	button {
		margin-top: 15px;
	}
}

.current_price {
	font-size: 1.35rem;
	color: var(--light);
	font-weight: bold;
}

.old_price {
	font-size: 1.35rem;
	color: var(--light);
	font-weight: bold;
	text-decoration: line-through;
	margin-right: 10px;
	opacity: 0.5;
}

.currency {
	text-transform: uppercase;
	color: var(--violet);
	font-weight: normal;
	font-size: 1.15rem;
	margin-left: 8px;
}

@keyframes loading {
	from {
		rotate: 125deg;
	}

	to {
		rotate: 485deg;
	}
}
</style>
