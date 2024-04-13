import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/useActions";

const CartCard = ({ title, price, image }) => {
	const { toggleProduct } = useActions();

	return (
		<article className="cart-card">
			<img src={image} className="cart-card__img" />
			<h3 className="cart-card__heading">{title}</h3>
			<p className="cart-card__price">
				{price} <span className="cart-card__currency">usd</span>
			</p>
			<div>
				<Link to={`/product/${title}`} className="cart-card__button">
					More details
				</Link>
				<button
					title="remove from cart"
					className="cart-card__button"
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

CartCard.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
};

export default CartCard;
