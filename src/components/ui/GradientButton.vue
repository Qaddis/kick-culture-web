<script setup lang="ts">
// Импорт типа для CSS-свойств
import type { CSSProperties } from "vue"

// Типизация пропсов
interface IButtonProps {
	label: string
	title?: string
	disabled?: boolean
	style?: CSSProperties
}

// Объявление пропсов и эмита @click
const props = defineProps<IButtonProps>()
const emits = defineEmits<{ click: [] }>()

// Обработка нажатия и вызов эмита
const handleClick = () => {
	emits("click")
}
</script>

<template>
	<button
		class="btn"
		:style="props.style"
		@click="handleClick"
		:disabled="props.disabled"
		:title="props.title"
	>
		{{ props.label }}
	</button>
</template>

<style scoped lang="scss">
.btn {
	display: inline-block;
	background: var(--gradient);
	border-radius: 8px;
	font-family: var(--header-font);
	font-size: 1.35rem;
	color: var(--add);
	padding: 10px 25px;
	transition-property: box-shadow, translate, opacity;
	transition-duration: 0.2s;

	&:hover {
		box-shadow: 0 0 10px var(--mint);
	}

	&:active {
		translate: 0 2px;
		opacity: 0.75;
	}

	&:disabled {
		cursor: not-allowed;
		filter: grayscale(50%);
		translate: none;
		opacity: 1;
		box-shadow: none;
	}
}
</style>
