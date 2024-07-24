<script setup lang="ts">
import { computed } from "vue"
import CartCard from "../components/CartCard.vue"
import GradientButton from "../components/ui/GradientButton.vue"
import Heading from "../components/ui/Heading.vue"
import router from "../router"
import { cartStore } from "../stores/CartStore"
import { type ICard, siteDataStore } from "../stores/DataStore"

type PricesType = {
	totalPrice: number
	fullPrice: number
	totalDiscount: number
}

const userCart = cartStore()
const siteData = siteDataStore()

const cart = computed<ICard[]>((): ICard[] => {
	let cartItems: ICard[] = []

	for (let i = 0; i < userCart.cart.length; i++) {
		let item = siteData.products.find(
			product => product.id === userCart.cart[i]
		)

		if (item) cartItems.push(item)
		else userCart.toCart("remove", userCart.cart[i])
	}

	return cartItems
})

const prices = computed<PricesType>((): PricesType => {
	let price: PricesType = { totalPrice: 0, fullPrice: 0, totalDiscount: 0 }

	for (let i = 0; i < cart.value.length; i++) {
		let cartItem = cart.value[i]

		if (cartItem.discount !== 0) {
			price.fullPrice += cartItem.price
			price.totalPrice += +(
				cartItem.price -
				(cartItem.price * cartItem.discount) / 100
			).toFixed(2)
		} else {
			price.fullPrice += cartItem.price
			price.totalPrice += cartItem.price
		}
	}

	if (price.totalPrice !== price.fullPrice) {
		price.totalDiscount =
			100 - Math.round((price.totalPrice / price.fullPrice) * 100)
	}

	return price
})
</script>

<template>
	<section class="cart">
		<Heading text="Cart 🛒" />

		<div :class="{ wrapper: true, '--empty': cart.length == 0 }">
			<div v-if="cart.length > 0" class="cards">
				<CartCard
					v-for="item in cart"
					:id="item.id"
					:title="item.title"
					:image="item.image"
					:discount="item.discount"
					:price="item.price"
				/>
			</div>
			<div v-else class="empty">
				<h3>It's empty here for now... 😭</h3>

				<GradientButton
					@click="router.push('/products')"
					label="Let's fix this!"
				/>
			</div>

			<div v-if="cart.length > 0" class="bill">
				<div class="row">
					<p class="basket-size">
						Products in cart: <span>{{ cart.length }}</span>
					</p>
					<p class="total-price">
						Total:
						<span
							v-if="prices.fullPrice !== prices.totalPrice"
							class="full-price"
						>
							{{ prices.fullPrice }}
						</span>
						<span class="value">{{ prices.totalPrice }}</span>
						<span class="currency"> usd</span>
					</p>
				</div>
				<div
					v-if="prices.fullPrice !== prices.totalPrice"
					class="total-discount"
				>
					<p>
						Total discount: <span>-{{ prices.totalDiscount }}%</span>
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.cart {
	width: 100%;
	height: 100%;
	padding: 50px 25px;

	h2 {
		margin-bottom: 25px;
	}
}

.wrapper {
	max-width: 1140px;
	margin: 0 auto;

	&.--empty {
		height: 50vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
}

.cards {
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 50px;
}

.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: 35px;

	h3 {
		font-family: var(--header-font);
		font-size: 1.5rem;
		color: var(--add);
		opacity: 0.8;
	}
}

.bill {
	width: 100%;
	margin-top: 35px;
	padding: 25px;
	background-color: var(--dark);
	border: 3px solid var(--violet);
	border-radius: 20px;
	color: var(--light);
	font-size: 1.2rem;

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.basket-size span {
		color: var(--mint);
		font-weight: 600;
	}

	.total-price {
		.value {
			color: var(--mint);
			font-weight: 600;
		}

		.currency {
			text-transform: uppercase;
			font-size: 1rem;
			color: var(--violet);
		}
	}

	.full-price {
		font-weight: 600;
		color: var(--mint);
		text-decoration: line-through;
		opacity: 0.6;
		margin-right: 0.45rem;
		margin-left: 0.5rem;
	}

	.total-discount {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: 5px;

		span {
			color: var(--mint);
			font-weight: 600;
		}
	}
}
</style>
