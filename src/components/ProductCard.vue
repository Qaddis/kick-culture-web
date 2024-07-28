<script setup lang="ts">
// Импорты
import { RouterLink } from "vue-router"
import { siteDataStore } from "../stores/DataStore"

// Типизация пропсов
interface ICardProps {
	id: number
	title: string
	image: string
	price: number
	discount: number
}

// Объявление пропсов
const props = defineProps<ICardProps>()

// Подключение в компонент хранилища (внутренние данные)
const siteData = siteDataStore()

// Функция для открытия модального окна с этим товаром
const toCart = (): void => {
	siteData.setModal(props.id)
}
</script>

<template>
	<article class="card" v-motion-fade-visible-once>
		<span class="discount" v-if="props.discount !== 0">
			-{{ props.discount }}%
		</span>

		<img :src="props.image" :alt="`${props.title} Banner`" class="image" />

		<h3 class="heading">{{ props.title }}</h3>

		<p class="price">
			{{
				props.discount !== 0
					? (props.price - (props.price * props.discount) / 100).toFixed(2)
					: props.price
			}}
			<span class="currency">usd</span>
		</p>

		<div class="buttons">
			<router-link
				class="btn"
				:to="`/product/${props.id}`"
				title="Go to this product page"
			>
				More Details
			</router-link>

			<button title="Add this product to cart" @click="toCart" class="btn">
				+
			</button>
		</div>
	</article>
</template>

<style scoped lang="scss">
.card {
	width: 320px;
	height: 320px;
	background-color: var(--add);
	border-radius: 20px;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 1px;
	box-shadow: 3px 3px 10px rgba($color: #000000, $alpha: 0.6);

	position: relative;
	overflow: hidden;

	&::before {
		content: "";
		display: block;
		width: 100%;
		height: 100%;
		background: var(--gradient);
		transform: skewY(345deg);

		position: absolute;
		top: -50%;
		transition: 0.35s all;
	}

	&:hover {
		.image {
			height: 120px;
			margin-top: 30px;
		}

		.btn {
			transform: none;
		}
	}

	&:hover::before {
		transform: skewY(360deg);
	}
}

.discount {
	position: absolute;
	top: 20px;
	left: 20px;
	background-color: var(--add);
	padding: 5px 10px;
	border-radius: 25px;
	color: var(--light);
	font-family: var(--header-font);
}

.image {
	position: relative;
	margin: 60px 0 25px;
	width: auto;
	height: 145px;
	transition: 0.35s all;
}

.heading {
	position: relative;
	margin-bottom: 10px;
	font-weight: 700;
	color: var(--light);
}

.price {
	position: relative;
	font-size: 24px;
	margin-bottom: 15px;
	color: var(--mint);
}

.currency {
	font-size: 18px;
	color: var(--light);
}

.buttons {
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn {
	font-family: var(--header-font);
	color: var(--light);
	text-transform: inherit;
	padding: 10px 20px;
	background: var(--gradient);
	border-radius: 30px;
	transform: translateY(50%);
	transition: all 0.2s;

	&:hover {
		filter: drop-shadow(0 0 10px var(--mint));
	}

	&:active {
		opacity: 0.8;
		transform: translateY(1px) !important;
	}

	&:last-child {
		position: absolute;
		right: 20px;
		padding: 10px 16px;
	}
}
</style>
