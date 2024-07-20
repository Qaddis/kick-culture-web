<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import GradientButton from "../components/ui/GradientButton.vue"
import type { ICard } from "../stores/DataStore"
import { siteDataStore } from "../stores/DataStore"

type StateType = ICard | "Loading" | "None"

const router = useRouter()
const route = useRoute()
const store = siteDataStore()

const product = ref<StateType>("Loading")

const goBack = (): void => {
	router.push("/products")
}

onMounted(() => {
	const item = store.products.find(item => item.title === route.params.id)

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
			<h2>
				Product
				<span>"{{ route.params.id.toString().toUpperCase() }}"</span> not found
			</h2>

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

				<GradientButton label="Add to cart" />
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.product {
	width: 100%;
	height: calc(100vh - 96px);
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

		span {
			color: var(--violet);
		}
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
		margin-top: 25px;
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
