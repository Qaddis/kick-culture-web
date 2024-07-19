<script setup lang="ts">
import { CSSProperties } from "vue"

interface IProps {
	text: string
	style?: CSSProperties
}

const props = defineProps<IProps>()
</script>

<template>
	<h2 :style="props.style" class="heading">{{ props.text }}</h2>
</template>

<style scoped lang="scss">
.heading {
	font-size: 1.8rem;
	color: var(--dark);
	font-family: var(--header-font);
	text-align: center;
}
</style>
