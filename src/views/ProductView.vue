<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import ProductCard from "../components/ProductCard.vue"
import GradientButton from "../components/ui/GradientButton.vue"
import Heading from "../components/ui/Heading.vue"
import { cartStore } from "../stores/CartStore"
import type { ICard } from "../stores/DataStore"
import { siteDataStore } from "../stores/DataStore"

type StateType = ICard | "Loading" | "None"

const router = useRouter()
const route = useRoute()

const goBack = (): void => {
	router.push("/products")
}

const siteData = siteDataStore()
const userCart = cartStore()

const product = ref<StateType>("Loading")
const selectedSizes = ref<number[]>([])

const getProduct = (): void => {
	product.value = "Loading"

	const item = siteData.products.find(
		item => item.id.toString() === route.params.id
	)

	if (item) {
		product.value = item
	} else product.value = "None"
}

const sizesInCart = computed<number[]>((): number[] => {
	if (product.value !== "Loading" && product.value !== "None") {
		const cartSizes = userCart.cart.find(
			cartItem => cartItem.id === product.value.id
		)

		if (cartSizes) return cartSizes.sizes
		else return []
	} else return []
})

const similar = computed<ICard[]>((): ICard[] => {
	let similarProducts: ICard[] = []

	if (product.value !== "None" && product.value !== "Loading") {
		const shoeLine = product.value.title.split(" ")[1]

		for (let i = 0; i < siteData.products.length; i++) {
			let productsItem = siteData.products[i]

			if (
				productsItem.title.includes(shoeLine) &&
				productsItem !== product.value &&
				similarProducts.length < 3
			) {
				similarProducts.push(productsItem)
			}
		}

		for (let i = 0; i < siteData.popularProducts.length; i++) {
			let productsItem = siteData.popularProducts[i]

			if (
				productsItem !== product.value &&
				similarProducts.length < 3 &&
				!similarProducts.includes(productsItem)
			) {
				similarProducts.push(productsItem)
			}
		}
	}

	return similarProducts
})

watch(
	() => sizesInCart.value,
	() => {
		selectedSizes.value = sizesInCart.value
	}
)

watch(
	() => route.params.id,
	() => {
		getProduct()
	}
)

onMounted(getProduct)
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

			<article class="product-card">
				<span v-if="product.discount !== 0" class="sale_badge">
					-{{ product.discount }}%
				</span>

				<img :src="product.image" :alt="`${product.title} Banner`" />

				<div>
					<h2>
						<span
							v-if="product.isPopular"
							title="This product is a bestseller"
							class="bestseller"
						>
							🏆
						</span>
						{{ product.title }}
					</h2>
					<p>{{ product.description }}</p>
				</div>

				<div class="sizes">
					<div class="checkbox-container" v-for="size in product.sizes">
						<input
							class="checkbox"
							type="checkbox"
							name="size-cb"
							:id="`cb-${size}`"
							:value="size"
							v-model="selectedSizes"
						/>
						<label class="size-badge" :for="`cb-${size}`">{{ size }}</label>
					</div>
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
					v-if="sizesInCart.length === 0"
					@click="userCart.addToCart(product.id, selectedSizes)"
					label="Add to cart"
					:disabled="selectedSizes.length === 0"
				/>
				<GradientButton
					v-else-if="sizesInCart.length > 0 && selectedSizes.length === 0"
					@click="userCart.removeFromCart(product.id)"
					label="Remove from cart"
				/>
				<GradientButton
					v-else-if="
						sizesInCart.length > 0 &&
						selectedSizes.sort((a, b) => a - b) === sizesInCart
					"
					label="Now in cart"
					disabled
				/>
				<GradientButton
					v-else-if="
						sizesInCart.length > 0 &&
						selectedSizes.sort((a, b) => a - b) !== sizesInCart
					"
					@click="userCart.changeSizes(product.id, selectedSizes)"
					label="Change sizes"
				/>
			</article>

			<div class="similar">
				<Heading text="Maybe you'll like it 👀" />

				<div class="container">
					<ProductCard
						v-for="item in similar"
						:id="item.id"
						:title="item.title"
						:image="item.image"
						:price="item.price"
						:discount="item.discount"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.product {
	width: 100%;
	min-height: calc(100vh - 96px);
	padding: 50px 25px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.wrapper {
	max-width: 1140px;
	margin: 0 auto;
}

.loading {
	height: 100%;

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

.product-card {
	position: relative;
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

	.bestseller {
		filter: drop-shadow(0 0 8px #ffb02e);
		cursor: pointer;
	}

	.sizes {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		column-gap: 20px;
		row-gap: 10px;
		margin-top: 15px;

		.checkbox-container {
			position: relative;
			background: var(--gradient);
			padding: 1px;
			border-radius: 8px;
			transition: box-shadow 0.2s;

			&:hover {
				box-shadow: 0 0 5px var(--mint);
			}
		}

		.size-badge {
			display: inline-block;
			border-radius: 8px;
			text-align: center;
			background-color: var(--dark);
			width: 50px;
			font-size: 1.3rem;
			transition: background-color 0.25s;
		}

		.checkbox {
			position: absolute;
			z-index: -1;

			&:checked + .size-badge {
				background-color: transparent;
			}
		}
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

.sale_badge {
	position: absolute;
	top: 20px;
	left: 20px;

	font-size: 1.25rem;
	font-family: var(--header-font);
	color: var(--add);
	padding: 5px 10px;
	margin-right: 20px;
	background: var(--gradient);
	border-radius: 5px;
}

.currency {
	text-transform: uppercase;
	color: var(--violet);
	font-weight: normal;
	font-size: 1.15rem;
	margin-left: 8px;
}

.similar {
	margin-top: 25px;

	h2 {
		text-align: start;
		margin-bottom: 10px;
	}

	.container {
		display: flex;
		align-items: center;
		column-gap: 35px;
	}
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
