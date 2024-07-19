<script setup lang="ts">
import { useRouter } from "vue-router"
import GradientButton from "../components/ui/GradientButton.vue"

const router = useRouter()

const goTo = (to: string): void => {
	router.push(to)
}
</script>

<template>
	<section class="landing">
		<div class="wrapper">
			<h2 class="landing__h2">Kick Culture</h2>
			<p class="landing__p">
				Walk in <span>style</span>, breathe in <span>culture</span>:
				<br />
				<span>Kick Culture</span> - in every pair, there&apos;s a history!
			</p>

			<GradientButton
				@click="goTo('/products')"
				style="font-size: 1.5rem; z-index: 3; padding: 10px 25px"
				label="Shop now!"
			/>
		</div>
	</section>
</template>

<style scoped lang="scss">
.landing {
	position: relative;
	height: calc(100vh - 98px);
	width: 100%;
	padding: 0 25px;

	background-image: url("../assets/landing_image.jpg");
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

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
			color: var(--violet);
			text-shadow: 0 0 5px var(--violet);
		}
	}
}

.wrapper {
	max-width: 1140px;
	height: 100%;
	margin: 0 auto;
	padding: 50px 0;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 3;
}
</style>
