<script setup lang="ts">
// Импорты
import { useRouter } from "vue-router"
import ProductCard from "../components/ProductCard.vue"
import GradientButton from "../components/ui/GradientButton.vue"
import Heading from "../components/ui/Heading.vue"
import { siteDataStore } from "../stores/DataStore"

// Подключение в компонент "роутера"
const router = useRouter()

// Подключение в компонент хранилища (внутренние данные)
const store = siteDataStore()

// Функция для перехода к другой странице
const goTo = (to: string): void => {
	router.push(to)
}

// Получение 3х товаров со скидкой
const sales = store.salesProducts
sales.length = 3
</script>

<template>
	<div>
		<section class="landing">
			<div class="wrapper">
				<h2 class="landing__h2">Kick Culture</h2>

				<p class="landing__p">
					Walk in <span>style</span>, breathe in <span>culture</span>:
					<br />
					<span>Kick Culture</span> - in every pair, there&apos;s a history!
				</p>

				<gradient-button
					@click="goTo('/products')"
					label="Shop now!"
					title='Go to "Products" page'
					style="font-size: 1.5rem; z-index: 3; padding: 10px 25px"
				/>
			</div>
		</section>

		<marquee
			class="ticker"
			scrollamount="8"
			behavior="scroll"
			direction="right"
		>
			🤩 Discounts up to 20%! 🤩
		</marquee>

		<section class="sales">
			<div class="wrapper">
				<heading text="Sales" />

				<div class="cards">
					<product-card
						v-for="item in sales"
						:id="item.id"
						:title="item.title"
						:image="item.image"
						:price="item.price"
						:discount="item.discount"
					/>
				</div>

				<gradient-button
					@click="goTo('/products')"
					label="More Products"
					title='Go to "Products" page'
				/>
			</div>
		</section>

		<section class="advantages">
			<div class="wrapper">
				<heading text="Why us?" />

				<ul class="advantages__ul">
					<li
						v-for="item in store.advantages"
						class="advantages__li"
						v-motion
						:initial="{ rotateX: '90deg' }"
						:visible="{ rotateX: '0deg' }"
						:duration="350"
					>
						<h3>{{ item.briefly }}</h3>
						<p>{{ item.details }}</p>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<style scoped lang="scss">
.landing {
	position: relative;
	height: calc(100vh - 96px);
	width: 100%;
	padding: 0 25px;

	background-image: url("../assets/landing_image.jpg");
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		z-index: 3;
		padding: 50px 0;
	}

	&:after {
		content: "";
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.65);
	}

	&__h2 {
		font-family: "Peralta", serif;
		font-size: 2.8rem;
		text-align: center;
		background: var(--gradient);
		background-clip: text;
		color: transparent;
		line-height: 0.8;
		z-index: inherit;
	}

	&__p {
		font-size: 1.1rem;
		margin: 10px 0 25px;
		color: var(--light);
		text-align: center;
		z-index: 3;

		span:first-child {
			color: #f06d58;
		}

		span:nth-child(2) {
			color: #fced76;
		}

		span:last-child {
			font-family: "Peralta", serif;
			color: var(--mint);
		}
	}
}

.wrapper {
	max-width: 1140px;
	height: 100%;
	margin: 0 auto;
}

.ticker {
	width: 100%;
	padding: 15px 0;
	background: linear-gradient(45deg, var(--mint) 20%, var(--violet));
	font-family: var(--header-font);
	font-size: 1.8em;
	color: var(--add);
}

.sales {
	width: 100%;
	padding: 50px 25px 25px;

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h2 {
		position: relative;

		&::before {
			content: "✨";
			font-size: 0.6em;
			position: absolute;
			bottom: -5%;
			left: -32%;
			transform: rotate(180deg);
		}

		&::after {
			content: "✨";
			position: absolute;
			font-size: 0.6em;
			top: -5%;
			right: -32%;
		}
	}
}

.cards {
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 50px;
	flex-wrap: wrap;
	margin: 20px 0 35px;
}

.advantages {
	width: 100%;
	padding: 25px 25px 50px;

	h2 {
		margin-bottom: 20px;
	}

	&__ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 25px;
	}

	&__li {
		width: 100%;
		padding: 20px;
		background-color: var(--dark);
		border: 3px solid var(--violet);
		border-radius: 20px;

		h3 {
			font-family: var(--header-font);
			font-size: 1.5em;
			color: var(--mint);
			margin-bottom: 5px;
		}

		p {
			color: var(--light);
		}
	}
}
</style>
