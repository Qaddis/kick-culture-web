import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { cards } from "../data";

const Products = () => {
	const [popularProducts, setPopularProducts] = useState([]);

	const selectedProducts = () => {
		let products = [];
		for (let i = 0; i < cards.length; i++) {
			if (cards[i].isPopular) products.push(cards[i]);
		}

		return products;
	};

	useEffect(() => {
		setPopularProducts(selectedProducts);
	}, []);

	return (
		<div className="products wrapper">
			<h2 className="products__heading">The best</h2>
			<section className="products__best">
				{popularProducts.map((product) => (
					<ProductCard
						key={product.title}
						title={product.title}
						price={product.price}
						image={product.image}
					/>
				))}
			</section>
			<h2 className="products__heading">All products</h2>
			<section className="products__all">
				{cards.map((card) => (
					<ProductCard
						key={card.title}
						title={card.title}
						image={card.image}
						price={card.price}
					/>
				))}
			</section>
		</div>
	);
};

export default Products;
