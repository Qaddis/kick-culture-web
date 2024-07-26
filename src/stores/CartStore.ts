import { defineStore } from "pinia"
import { ref } from "vue"
import type { ICard } from "./DataStore"

type ICart = Pick<ICard, "id" | "sizes">

export const cartStore = defineStore("cart", () => {
	const cart = ref<ICart[]>([])

	function addToCart(product: number, sizes: number[]) {
		cart.value.push({ id: product, sizes: sizes.sort((a, b) => a - b) })
	}

	function removeFromCart(product: number) {
		const index = cart.value.findIndex(item => item.id === product)

		if (index > -1) cart.value.splice(index, 1)
	}

	function changeSizes(product: number, newSizes: number[]) {
		const index = cart.value.findIndex(item => item.id === product)

		if (index > -1) cart.value[index].sizes = newSizes.sort((a, b) => a - b)
	}

	function removeOneSize(product: number, size: number) {
		const target: ICart =
			cart.value[cart.value.findIndex(item => item.id === product)]

		target.sizes.splice(
			target.sizes.findIndex(item => item === size),
			1
		)
	}

	return { cart, addToCart, removeFromCart, changeSizes, removeOneSize }
})
