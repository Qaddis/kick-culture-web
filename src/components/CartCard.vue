<script setup lang="ts">
import { cartStore } from "../stores/CartStore"

interface ICardProps {
	id: number
	title: string
	image: string
	price: number
	discount: number
	size: number
}

const props = defineProps<ICardProps>()

const userCart = cartStore()
</script>

<template>
	<article class="cart-card">
		<span class="cart-card__discount" v-if="props.discount !== 0">
			-{{ props.discount }}%
		</span>

		<img
			class="cart-card__image"
			:src="props.image"
			:alt="`${props.title} Banner`"
		/>

		<div class="text-info">
			<h3 class="cart-card__heading">{{ props.title }}</h3>
			<p class="cart-card__size">
				Size: <span>{{ props.size }}</span>
			</p>
			<p class="cart-card__price">
				{{
					props.discount !== 0
						? (props.price - (props.price * props.discount) / 100).toFixed(2)
						: props.price
				}}
				<span className="cart-card__currency">usd</span>
			</p>
			<div class="cart-card__buttons">
				<RouterLink
					class="btn"
					:to="`product/${props.id}`"
					title="Go to this product page"
				>
					More Details
				</RouterLink>
				<button
					class="btn"
					@click="userCart.removeOneSize(props.id, props.size)"
					title="Remove this product from cart"
				>
					✕
				</button>
			</div>
		</div>
	</article>
</template>

<style scoped lang="scss">
.cart-card {
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
		height: 50%;
		background: var(--gradient);

		position: absolute;
		transition: 0.35s all;
	}

	&__discount {
		position: absolute;
		top: 20px;
		left: 20px;
		background-color: var(--add);
		padding: 5px 10px;
		border-radius: 25px;
		color: var(--light);
		font-family: var(--header-font);
	}

	&__image {
		position: relative;
		height: 45%;
		margin: 2.5% auto;
		width: auto;
		transition: 0.35s all;
	}

	.text-info {
		width: 100%;
		height: 50%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	&__heading {
		position: relative;
		color: var(--light);
		font-weight: 700;
	}

	&__size {
		text-transform: none;
		font-size: 1rem;
		color: var(--light);
		margin-bottom: 5px;

		span {
			color: var(--violet);
		}
	}

	&__price {
		position: relative;
		font-size: 24px;
		color: var(--mint);
		margin-bottom: 10px;
	}

	&__currency {
		font-size: 1.05rem;
		color: var(--light);
	}

	&__buttons {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;

		.btn {
			font-family: var(--header-font);
			color: var(--light);
			text-transform: inherit;
			padding: 10px 20px;
			background: var(--gradient);
			border-radius: 30px;
			transition: all 0.2s;

			&:hover {
				filter: drop-shadow(0 0 10px var(--mint));
			}

			&:active {
				opacity: 0.8;
				transform: translateY(1px);
			}
		}
	}
}
</style>
