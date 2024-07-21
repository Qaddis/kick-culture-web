import { defineStore } from "pinia"
import { ref } from "vue"

export const cartStore = defineStore("cart", () => {
	const cart = ref<number[]>([])

	function toCart(action: "remove" | "add", product: number) {
		if (action === "add") cart.value.push(product)
		else {
			const index = cart.value.findIndex(item => item === product)
			cart.value.splice(index, 1)
		}
	}

	return { cart, toCart }
})
