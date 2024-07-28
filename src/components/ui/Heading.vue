<script setup lang="ts">
// Импорт типа для CSS-свойств
import type { CSSProperties } from "vue"

// Типизация пропсов
interface IProps {
	text: string
	style?: CSSProperties
}

// Объявление пропсов
const props = defineProps<IProps>()
</script>

<template>
	<h2
		class="heading"
		:style="props.style"
		v-motion
		:initial="{ opacity: 0, y: 20 }"
		:visible-once="{ opacity: 1, y: 0 }"
		:duration="350"
	>
		{{ props.text }}
	</h2>
</template>

<style scoped lang="scss">
.heading {
	font-size: 1.8rem;
	color: var(--dark);
	font-family: var(--header-font);
	text-align: center;
}
</style>
