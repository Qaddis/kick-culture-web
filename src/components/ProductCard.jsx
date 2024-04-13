import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/useActions";

const ProductCard = ({ title, price, image }) => {
	const cart = useSelector((state) => state.cart);
	const ifExist = cart.some((i) => i === title);

	const { toggleProduct } = useActions();

	return (
		<article className="product-card">
			<img src={image} className="product-card__img" />
			<h3 className="product-card__heading">{title}</h3>
			<p className="product-card__price">
				{price} <span className="product-card__currency">usd</span>
			</p>
			<div>
				<Link to={`/product/${title}`} className="product-card__button">
					More details
				</Link>
				<button
					title="add to cart"
					className={
						ifExist ? "product-card__button in-cart" : "product-card__button"
					}
					onClick={() => {
						toggleProduct(title);
					}}
				>
					<span>+</span>
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
