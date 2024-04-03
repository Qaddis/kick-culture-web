import styles from "./ProductCard.module.css";

const ProductCard = () => {
	return (
		<article className={styles.card}>
			<img src="/li_sneakers.png" className={styles.card__img} />
			<h3 className={styles.card__header}>YoStep air 3</h3>
			<p className={styles.card__price}>
				8990 <span className={styles.card__currency}>руб.</span>
			</p>
			<button className={styles.card__button}>To cart</button>
		</article>
	);
};

export default ProductCard;
