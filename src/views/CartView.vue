<script setup lang="ts">
import { computed } from "vue"
import CartCard from "../components/CartCard.vue"
import GradientButton from "../components/ui/GradientButton.vue"
import Heading from "../components/ui/Heading.vue"
import router from "../router"
import { cartStore } from "../stores/CartStore"
import { type ICard, siteDataStore } from "../stores/DataStore"

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

			<div v-if="cart.length > 0" class="bill"></div>
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
</style>
