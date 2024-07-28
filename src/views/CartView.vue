<script setup lang="ts">
// Импорты
import { computed } from "vue"
import CartCard from "../components/CartCard.vue"
import GradientButton from "../components/ui/GradientButton.vue"
import Heading from "../components/ui/Heading.vue"
import router from "../router"
import { cartStore } from "../stores/CartStore"
import { type ICard, siteDataStore } from "../stores/DataStore"

// Тип для объекта итоговых цен и скидок
type PricesType = {
	totalPrice: number
	fullPrice: number
	totalDiscount: number
}

// Тип для товара в корзине
type ICart = {
	size: number
} & ICard

// Подключение в компонент хранилищ (корзина и внутренние данные)
const userCart = cartStore()
const siteData = siteDataStore()

// Получение всех товаров в корзине (с учётом, что каждый размер - отдельный товар со своим размером)
const cart = computed<ICart[]>((): ICart[] => {
	let cartItems: ICart[] = []

	for (let i = 0; i < userCart.cart.length; i++) {
		// Получаем каждый товар в корзине
		let item = siteData.products.find(
			product => product.id === userCart.cart[i].id
		)

		// Каждый выбранный размер товара делаем отдельным продуктом
		if (item)
			userCart.cart[i].sizes.forEach(size =>
				cartItems.push({ ...item, size: size })
			)
		else userCart.removeFromCart(userCart.cart[i].id)
	}

	return cartItems
})

// Получение полной цены, цены со всеми скидками и итоговой скидки
const prices = computed<PricesType>((): PricesType => {
	let price: PricesType = { totalPrice: 0, fullPrice: 0, totalDiscount: 0 }

	for (let i = 0; i < cart.value.length; i++) {
		let cartItem = cart.value[i]

		// Если скидка есть - высчитываем её и записываем в поле "итоговая цена", а полную цену записываем в поле "полная цена"
		if (cartItem.discount !== 0) {
			price.fullPrice += cartItem.price
			price.totalPrice += +(
				cartItem.price -
				(cartItem.price * cartItem.discount) / 100
			).toFixed(2)
		} else {
			// Если скидки нет - записываем полную цену и в поле "итоговая цена", и в поле "полная цена"
			price.fullPrice += cartItem.price
			price.totalPrice += cartItem.price
		}
	}

	// Высчитываем процент итоговой скидки
	if (price.totalPrice !== price.fullPrice) {
		price.totalDiscount =
			100 - Math.round((price.totalPrice / price.fullPrice) * 100)
	}

	return price
})
</script>

<template>
	<section class="cart">
		<heading text="Cart 🛒" />

		<div :class="{ wrapper: true, '--empty': cart.length == 0 }">
			<div v-if="cart.length > 0" class="cards">
				<cart-card
					v-for="item in cart"
					:id="item.id"
					:title="item.title"
					:image="item.image"
					:discount="item.discount"
					:price="item.price"
					:size="item.size"
				/>
			</div>

			<div v-else class="empty">
				<h3>It's empty here for now... 😭</h3>

				<gradient-button
					@click="router.push('/products')"
					label="Let's fix this!"
					title='Go to "Products" page'
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
