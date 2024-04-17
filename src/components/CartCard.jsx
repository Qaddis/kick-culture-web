import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/useActions";

const CartCard = ({ title, price, discount, image }) => {
	const { toggleProduct } = useActions();

	return (
		<article className="cart-card">
			<div
				className={
					discount !== 0
						? "product-card__discount --show"
						: "product-card__discount"
				}
			>
				-{discount}%
			</div>
			<img src={image} className="cart-card__img" />
			<h3 className="cart-card__heading">{title}</h3>
			<p className="cart-card__price">
				{discount !== 0 ? (
					<>
						<span className="product__old-price">{price}</span>
						{price - Math.round(price * (discount / 100))}
					</>
				) : (
					price
				)}{" "}
				<span className="cart-card__currency">usd</span>
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
	discount: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
};

export default CartCard;
