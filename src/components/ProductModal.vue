<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { cartStore } from "../stores/CartStore"
import { type ICard, siteDataStore } from "../stores/DataStore"
import GradientButton from "./ui/GradientButton.vue"

const siteData = siteDataStore()
const userCart = cartStore()

const product = ref<ICard | "Hide">("Hide")
const selectedSizes = ref<number[]>([])

const sizesInCart = computed<number[]>((): number[] => {
	if (product.value !== "Hide") {
		const cartSizes = userCart.cart.find(item => item.id === product.value.id)

		if (cartSizes) return cartSizes.sizes
		else return []
	} else return []
})

watch(
	() => sizesInCart.value,
	() => {
		selectedSizes.value = sizesInCart.value
	}
)

watch(
	() => siteData.modal,
	() => {
		product.value = siteData.modal

		if (siteData.modal !== "Hide") document.body.style.overflowY = "hidden"
		else document.body.style.overflowY = "scroll"
	}
)
</script>

<template>
	<div @click="siteData.closeModal" v-if="product !== `Hide`" class="overlay">
		<section @click="e => e.stopPropagation()" class="product-modal">
			<h2 class="product-modal__title">
				<span
					v-if="product.isPopular"
					title="This product is a bestseller"
					class="bestseller"
				>
					🏆
				</span>
				{{ product.title }}
			</h2>

			<p class="hint">Choose size:</p>

			<div class="product-modal__sizes">
				<div class="checkbox-container" v-for="size in product.sizes">
					<input
						class="checkbox"
						type="checkbox"
						name="size-cb"
						:id="`mcb-${size}`"
						:value="size"
						v-model="selectedSizes"
					/>
					<label class="size-badge" :for="`mcb-${size}`">{{ size }}</label>
				</div>
			</div>

			<div v-if="product.discount !== 0" class="product-modal__price">
				<span class="old_price">{{ product.price }}</span>
				<span class="current_price">
					{{
						(product.price - (product.price * product.discount) / 100).toFixed(
							2
						)
					}}
				</span>
				<span class="currency">usd</span>
			</div>

			<div v-else class="product-modal__price">
				<span class="current_price">{{ product.price }}</span>
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
		</section>
	</div>
</template>

<style scoped lang="scss">
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;

	width: 100%;
	height: 100%;
	background-color: rgba($color: #000, $alpha: 0.6);

	display: flex;
	justify-content: center;
	align-items: center;
}

.product-modal {
	background-color: var(--dark);
	border: 3px solid var(--violet);
	border-radius: 25px;
	padding: 50px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	&__title {
		font-size: 1.65rem;
		font-family: var(--header-font);
		text-transform: uppercase;
		color: var(--mint);

		.bestseller {
			filter: drop-shadow(0 0 8px #ffb02e);
			cursor: pointer;
		}
	}

	.hint {
		margin-top: 15px;
		color: var(--light);
	}

	&__sizes {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		column-gap: 20px;
		row-gap: 10px;
		margin-top: 8px;

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
			color: var(--light);
		}

		.checkbox {
			position: absolute;
			z-index: -1;

			&:checked + .size-badge {
				background-color: transparent;
			}
		}
	}

	&__price {
		margin: 20px 0 10px;

		.old_price {
			font-size: 1.35rem;
			color: var(--light);
			font-weight: bold;
			text-decoration: line-through;
			margin-right: 10px;
			opacity: 0.5;
		}

		.current_price {
			font-size: 1.35rem;
			color: var(--light);
			font-weight: bold;
		}

		.currency {
			text-transform: uppercase;
			color: var(--violet);
			font-weight: normal;
			font-size: 1.15rem;
			margin-left: 8px;
		}
	}
}
</style>
