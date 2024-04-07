import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ title, price, image }) => {
	return (
		<article className="card">
			<img src={image} className="card__img" />
			<h3 className="card__heading">{title}</h3>
			<p className="card__price">
				{price} <span className="card__currency">usd</span>
			</p>
			<div>
				<Link to={`/product/${title}`} className="card__button">
					More details
				</Link>
				<button title="add to cart" className="card__button">
					+
				</button>
			</div>
		</article>
	);
};

ProductCard.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
};

export default ProductCard;
