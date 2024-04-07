import PropTypes from "prop-types";

const ProductCard = ({ title, price, image }) => {
	return (
		<article className="card">
			<img src={image} className="card__img" />
			<h3 className="card__heading">{title}</h3>
			<p className="card__price">
				{price} <span className="card__currency">usd</span>
			</p>
			<button className="card__button">To cart</button>
		</article>
	);
};

ProductCard.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
};

export default ProductCard;
