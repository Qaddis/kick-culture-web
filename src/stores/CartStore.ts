// Импорты
import { defineStore } from "pinia"
import { ref } from "vue"
import type { ICard } from "./DataStore"

// Тип для экземпляра товара в корзине
type ICart = Pick<ICard, "id" | "sizes">

// Создание и экспорт хранилища (корзина)
export const cartStore = defineStore("cart", () => {
	// Объявление состояния для списка товаров в корзине
	const cart = ref<ICart[]>([])

	// Метод для добавления товара в корзину
	function addToCart(product: number, sizes: number[]) {
		cart.value.push({ id: product, sizes: sizes.sort((a, b) => a - b) })
	}

	// Метод для удаления товара из корзины
	function removeFromCart(product: number) {
		const index = cart.value.findIndex(item => item.id === product)

		if (index > -1) cart.value.splice(index, 1)
	}

	// Метод для замены размеров в корзине на новые
	function changeSizes(product: number, newSizes: number[]) {
		const index = cart.value.findIndex(item => item.id === product)

		if (index > -1) cart.value[index].sizes = newSizes.sort((a, b) => a - b)
	}

	// Метод для удаления из корзины одного размера
	function removeOneSize(product: number, size: number) {
		const index: number = cart.value.findIndex(item => item.id === product)
		const sizeIndex: number = cart.value[index].sizes.findIndex(
			item => item === size
		)

		if (index > -1 && sizeIndex > -1) {
			if (cart.value[index].sizes.length === 1) cart.value.splice(index, 1)
			else cart.value[index].sizes.splice(sizeIndex, 1)
		}
	}

	// "Экспорт" методов и состояний
	return { cart, addToCart, removeFromCart, changeSizes, removeOneSize }
})
