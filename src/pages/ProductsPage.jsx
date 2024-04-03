import styles from "./ProductsPage.module.css";

import ProductCard from "../components/ProductCard";

const Products = () => {
	return (
		<div className={styles.wrapper}>
			<h2 className={styles.h2}>The best</h2>
			<section className={styles.best}>
				<ProductCard />
			</section>
			<h2 className={styles.h2}>All products</h2>
			<section className={styles.products}></section>
		</div>
	);
};

export default Products;
