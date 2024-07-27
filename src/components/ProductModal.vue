<script setup lang="ts">
// Импорты
import { computed, ref, watch } from "vue"
import { cartStore } from "../stores/CartStore"
import { type ICard, siteDataStore } from "../stores/DataStore"
import GradientButton from "./ui/GradientButton.vue"

// Подключение в компонент хранилищ (внутренние данные и корзина)
const siteData = siteDataStore()
const userCart = cartStore()

// Объявление состояний (товар (статус модального окна) и выбранные размеры)
const product = ref<ICard | "Hide">("Hide")
const selectedSizes = ref<number[]>([])

// Получение списка добавленных в корзину размеров этого товара
const sizesInCart = computed<number[]>((): number[] => {
	if (product.value !== "Hide") {
		const cartSizes = userCart.cart.find(item => item.id === product.value.id)

		if (cartSizes) return cartSizes.sizes
		else return []
	} else return []
})

// Функция для удаления/добавления товара или изменения выбранных размеров этого товара в корзине с последующим закрытием модального окна
function handleButtonClick(action: "add" | "remove" | "change"): void {
	if (product.value !== "Hide") {
		if (action === "add")
			userCart.addToCart(product.value.id, selectedSizes.value)
		else if (action === "change")
			userCart.changeSizes(product.value.id, selectedSizes.value)
		else userCart.removeFromCart(product.value.id)
	}

	siteData.closeModal()
}

// Наблюдение за изменением списка размеров этого товара в корзине и обновление списка выбранных пользователем товаров
watch(
	() => sizesInCart.value,
	() => {
		selectedSizes.value = sizesInCart.value
	}
)

// Наблюдение за изменением статуса модального окна в хранилище и обновление статуса модального окна внутри компонента
watch(
	() => siteData.modal,
	() => {
		product.value = siteData.modal

		// Выключение вертикального скролла на странице если модальное окно открыто и включение скролла, если модальное окно закрыто
		if (siteData.modal !== "Hide") document.body.style.overflowY = "hidden"
		else document.body.style.overflowY = "scroll"
	}
)
</script>

<template>
	<!-- Оверлей, перекрывающий весь доступный экран -->
	<div @click="siteData.closeModal" v-if="product !== `Hide`" class="overlay">
		<!-- Кнопка для закрытия модального окна -->
		<button
			class="close-btn"
			@click="siteData.closeModal"
			title="Close the size selection window"
		>
			✕
		</button>

		<!-- Модальное окно -->
		<section @click="e => e.stopPropagation()" class="product-modal">
			<!-- Название продукта -->
			<h2 class="product-modal__title">
				<!-- Значок "Популярный товар" -->
				<span
					v-if="product.isPopular"
					title="This product is a bestseller"
					class="bestseller"
				>
					🏆
				</span>
				{{ product.title }}
			</h2>

			<!-- Подсказка (выбор размеров) -->
			<p class="hint">Choose size:</p>

			<!-- Список все доступных размеров -->
			<div class="product-modal__sizes">
				<div class="checkbox-container" v-for="size in product.sizes">
					<input
						class="checkbox"
						type="checkbox"
						name="size-mcb"
						:id="`mcb-${size}`"
						:value="size"
						v-model="selectedSizes"
					/>
					<label
						title="Select this size"
						class="size-badge"
						:for="`mcb-${size}`"
					>
						{{ size }}
					</label>
				</div>
			</div>

			<!-- Цена на товар (если есть скидка) -->
			<div v-if="product.discount !== 0" class="product-modal__price">
				<!-- Старая цена (цена без скидки) -->
				<span class="old_price">{{ product.price }}</span>

				<!-- Цена со скидкой -->
				<span class="current_price">
					{{
						(product.price - (product.price * product.discount) / 100).toFixed(
							2
						)
					}}
				</span>
				<span class="currency">usd</span>
			</div>

			<!-- Цена на товар (если скидки нет) -->
			<div v-else class="product-modal__price">
				<span class="current_price">{{ product.price }}</span>
				<span class="currency">usd</span>
			</div>

			<!-- Кнопка для добавления товара в корзину -->
			<gradient-button
				v-if="sizesInCart.length === 0"
				@click="handleButtonClick('add')"
				label="Add to cart"
				:title="
					selectedSizes.length !== 0
						? 'Add selected sizes to cart'
						: 'First you need to choose the size(s)'
				"
				:disabled="selectedSizes.length === 0"
			/>

			<!-- Кнопка для удаления товара из корзины -->
			<gradient-button
				v-else-if="sizesInCart.length > 0 && selectedSizes.length === 0"
				@click="handleButtonClick('remove')"
				label="Remove from cart"
				title="Remove this pair from cart"
			/>

			<!-- Неактивная кнопка (если товар уже есть в корзине и выбранные пользователем размеры совпадают с размерами в корзине) -->
			<gradient-button
				v-else-if="
					sizesInCart.length > 0 &&
					selectedSizes.sort((a, b) => a - b) === sizesInCart
				"
				label="Now in cart"
				title="The selected sizes are already in the basket"
				disabled
			/>

			<!-- Кнопка для изменения выбранных размеров товара в корзине -->
			<gradient-button
				v-else-if="
					sizesInCart.length > 0 &&
					selectedSizes.sort((a, b) => a - b) !== sizesInCart
				"
				@click="handleButtonClick('change')"
				label="Change sizes"
				title="Change sizes already added to cart"
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

	.close-btn {
		position: absolute;
		top: 20px;
		right: 20px;
		z-index: 11;

		font-size: 2rem;
		color: var(--light);
		padding: 0 10px 3px;
		border-radius: 50%;

		transition-property: filter, translate, opacity;
		transition-duration: 0.25s;

		&:hover {
			filter: drop-shadow(0 0 5px var(--light));
		}

		&:active {
			opacity: 0.75;
			translate: 0 2px;
		}
	}
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
