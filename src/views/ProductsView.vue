<script setup lang="ts">
// Импорты
import ProductCard from "../components/ProductCard.vue"
import Heading from "../components/ui/Heading.vue"
import { siteDataStore } from "../stores/DataStore"

// Подключение в компонент хранилища (внутренние данные)
const store = siteDataStore()
</script>

<template>
	<div class="products">
		<div class="wrapper">
			<section class="products__best">
				<h2
					v-motion
					:initial="{ opacity: 0, y: 20 }"
					:visible-once="{ opacity: 1, y: 0 }"
					:duration="350"
				>
					<span>The best</span>
				</h2>

				<div class="cards">
					<product-card
						v-for="item in store.popularProducts"
						:id="item.id"
						:title="item.title"
						:image="item.image"
						:price="item.price"
						:discount="item.discount"
					/>
				</div>
			</section>

			<section class="products__all">
				<heading text="All products" />

				<div class="cards">
					<product-card
						v-for="item in store.products"
						:id="item.id"
						:title="item.title"
						:image="item.image"
						:price="item.price"
						:discount="item.discount"
					/>
				</div>
			</section>
		</div>
	</div>
</template>

<style scoped lang="scss">
.products {
	padding: 50px 25px;

	h2 {
		font-size: 1.92em;
		color: var(--dark);
		font-family: var(--header-font);
		text-align: center;
		margin-bottom: 15px;

		span {
			position: relative;

			&::before {
				content: "👑";
				position: absolute;
				top: -52%;
				left: 58%;
				font-size: 0.85em;
			}
		}
	}

	&__best {
		margin-bottom: 35px;
	}

	.cards {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 50px;
	}
}

.wrapper {
	max-width: 1140px;
	margin: 0 auto;
}
</style>
