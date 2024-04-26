import { motion } from "framer-motion";

import ProductCard from "../components/ProductCard";
import { cards } from "../data";

const Products = () => {
	document.title = "Products | Kick Culture";

	let popularProducts = [];
	for (let i = 0; i < cards.length; i++)
		if (cards[i].isPopular) popularProducts.push(cards[i]);

	return (
		<motion.div
			className="products wrapper"
			initial={{ y: "3%", opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: "-3%", opacity: 0, transition: { duration: 0.35 } }}
			transition={{ delay: 0.35 }}
		>
			<h2 className="products__heading">
				<span>The best</span>
			</h2>

			<section className="products__best">
				{popularProducts.map((product) => (
					<ProductCard
						key={product.title}
						title={product.title}
						price={product.price}
						discount={product.discount}
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
						discount={card.discount}
						price={card.price}
					/>
				))}
			</section>
		</motion.div>
	);
};

export default Products;
