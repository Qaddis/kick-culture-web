import styles from "./ProductCard.module.css";
import PropTypes from "prop-types";

const ProductCard = ({ title, price, image }) => {
	return (
		<article className={styles.card}>
			<img src={image} className={styles.card__img} />
			<h3 className={styles.card__header}>{title}</h3>
			<p className={styles.card__price}>
				{price} <span className={styles.card__currency}>usd</span>
			</p>
			<button className={styles.card__button}>To cart</button>
		</article>
	);
};

ProductCard.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
};

export default ProductCard;
