import { defineStore } from "pinia"
import { computed, ref } from "vue"

export interface ICard {
	id: number
	title: string
	description: string
	image: string
	price: number
	discount: number
	isPopular: boolean
	sizes: number[]
}

interface IAdvantages {
	briefly: string
	details: string
}

const cards: ICard[] = [
	{
		id: 1,
		image: "/card_1.png",
		title: "yostep air 3",
		description:
			"Enjoy unparalleled comfort and style with the Yostep Air 3 sneakers. Designed for optimal performance and support, these shoes are perfect for your active lifestyle.",
		price: 79.99,
		discount: 20,
		isPopular: false,
		sizes: [38, 39, 40, 41, 42, 43]
	},
	{
		id: 2,
		image: "/card_2.png",
		title: "yostep contrastmoon",
		description:
			"Elevate your look with the Yostep Contrastmoon sneakers. Featuring a unique design with a blend of colors, these shoes are a statement piece that combines fashion and functionality.",
		price: 82.5,
		discount: 10,
		isPopular: false,
		sizes: [36, 37, 38, 39, 40, 41]
	},
	{
		id: 3,
		image: "/card_3.png",
		title: "yostep ego",
		description:
			"Step out in confidence with the Yostep Ego sneakers. These shoes exude charisma and personality, making them a must-have for those who want to stand out from the crowd.",
		price: 89.5,
		discount: 0,
		isPopular: false,
		sizes: [37, 38, 39, 40, 41, 42]
	},
	{
		id: 4,
		image: "/card_4.png",
		title: "yostep typhoon",
		description:
			"Embrace the power of the elements with the Yostep Typhoon sneakers. With a sturdy build and rugged appeal, these shoes are ready to weather any storm.",
		price: 85.0,
		discount: 5,
		isPopular: true,
		sizes: [36, 37, 38, 39, 40, 41, 42]
	},
	{
		id: 5,
		image: "/card_5.png",
		title: "yostep ego 2",
		description:
			"The Yostep Ego 2 sneakers redefine style and comfort. Experience luxury on your feet with these high-quality shoes that offer both elegance and performance.",
		price: 92.0,
		discount: 0,
		isPopular: true,
		sizes: [39, 40, 41, 42, 43]
	},
	{
		id: 6,
		image: "/card_6.png",
		title: "yostep sunstroke",
		description:
			"Make a bold statement with the Yostep Sunstroke sneakers. Bright and vibrant, these shoes radiate energy and confidence, perfect for those who want to shine bright",
		price: 88.0,
		discount: 0,
		isPopular: true,
		sizes: [36, 37, 38, 39, 40, 41, 42]
	},
	{
		id: 7,
		image: "/card_7.png",
		title: "yostep air 2",
		description:
			"Glide through your day with ease in the Yostep Air 2 sneakers. Lightweight and breathable, these shoes provide maximum support without compromising on style.",
		price: 78.5,
		discount: 0,
		isPopular: false,
		sizes: [36, 37, 38, 39, 40, 41]
	},
	{
		id: 8,
		image: "/card_8.png",
		title: "yostep air",
		description:
			"Experience the ultimate in athletic footwear with the Yostep Air sneakers. Designed for those who demand the best, these shoes combine cutting-edge technology with a sleek and modern design.",
		price: 75.0,
		discount: 0,
		isPopular: false,
		sizes: [36, 37, 38, 39, 40, 41, 42]
	}
]

const adv: IAdvantages[] = [
	{
		briefly: "Quality",
		details:
			"All our products are original and of the highest quality. Each pair is carefully checked by experts."
	},
	{
		briefly: "Speed",
		details:
			"We have 520+ warehouses and distribution centers around the world, which guarantees fast delivery."
	},
	{
		briefly: "Omnipresence",
		details:
			"520+ warehouses and distribution centers around the world: we deliver to over 120 countries!"
	}
]

export const siteDataStore = defineStore("siteData", () => {
	const products = ref<ICard[]>(cards)
	const advantages = ref<IAdvantages[]>(adv)
	const modal = ref<"Hide" | ICard>("Hide")

	const salesProducts = computed(() =>
		products.value.filter(product => product.discount !== 0)
	)

	const popularProducts = computed(() =>
		products.value.filter(product => product.isPopular)
	)

	function closeModal() {
		modal.value = "Hide"
	}

	function setModal(id: number) {
		const product = products.value.find(item => item.id === id)

		if (product) modal.value = product
	}

	return {
		products,
		advantages,
		salesProducts,
		popularProducts,
		modal,
		closeModal,
		setModal
	}
})
