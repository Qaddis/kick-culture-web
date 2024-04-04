import styles from "./ProductsPage.module.css";

import ProductCard from "../components/ProductCard";
import { cards } from "../data";

const Products = () => {
	return (
		<div className={styles.wrapper}>
			<h2 className={styles.h2}>The best</h2>
			<section className={styles.best}></section>
			<h2 className={styles.h2}>All products</h2>
			<section className={styles.products}>
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
