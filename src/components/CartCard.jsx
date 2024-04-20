import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { motion } from "framer-motion";

const CartCard = ({ title, price, discount, image }) => {
	const [isVisible, setIsVisible] = useState(true);
	const { toggleProduct } = useActions();

	const removeFromCart = (product) => {
		setIsVisible(false);
		setTimeout(() => {
			toggleProduct(product);
		}, 350);
	};

	return (
		<motion.article
			className="cart-card"
			animate={{
				opacity: isVisible ? 1 : 0,
				translateY: isVisible ? 0 : "20%",
			}}
			transition={{ duration: 0.25 }}
		>
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
						{Math.round(price - price * (discount / 100))}
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
						removeFromCart(title);
					}}
				>
					<span>+</span>
				</button>
			</div>
		</motion.article>
	);
};

CartCard.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	discount: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
};

export default CartCard;
