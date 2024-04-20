import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import CartCard from "../components/CartCard";
import { cards } from "../data.js";
import { Link } from "react-router-dom";

const Cart = () => {
	const cart = useSelector((state) => state.cart);

	let userCart;
	let totalPrice = 0;
	let fullPrice = 0;
	if (cart.length !== 0) {
		userCart = [];
		cart.forEach((product) => {
			let matchingProduct = cards.find((i) => i.title === product);
			if (matchingProduct) {
				userCart.push(matchingProduct);

				if (matchingProduct.discount !== 0) {
					totalPrice += Math.round(
						matchingProduct.price -
							matchingProduct.price * (matchingProduct.discount / 100)
					);
					fullPrice += matchingProduct.price;
				} else {
					totalPrice += matchingProduct.price;
					fullPrice += matchingProduct.price;
				}
			}
		});
	} else userCart = "null";

	return (
		<motion.section
			className="cart wrapper"
			initial={{ y: "5%", opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: "-5%", opacity: 0, transition: { duration: 0.35 } }}
			transition={{ delay: 0.35 }}
		>
			<h2 className="cart__h2">Cart Page</h2>
			<div className="cart__cards">
				{userCart === "null" ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.25 }}
						className="container"
					>
						<h3 className="cart__h3">It&apos;s empty here for now ☹️</h3>
						<Link className="cart__btn" to="/products">
							To fix this!
						</Link>
					</motion.div>
				) : (
					userCart.map((product) => (
						<CartCard
							key={product.title}
							title={product.title}
							price={product.price}
							discount={product.discount}
							image={product.image}
						/>
					))
				)}
			</div>
			{userCart === "null" ? (
				""
			) : (
				<div className="whole-price">
					{totalPrice !== fullPrice ? (
						<p className="whole-price__discount">
							<span>Total discount: </span>
							<span className="percents">
								{100 - Math.round((totalPrice / fullPrice) * 100)}%
							</span>
						</p>
					) : (
						""
					)}
					<p className="whole-price__total">
						<span>Total price: </span>
						<span className="currency">
							{fullPrice !== totalPrice ? (
								<b className="old">{fullPrice}</b>
							) : (
								""
							)}{" "}
							{totalPrice} <i>usd</i>
						</span>
					</p>
				</div>
			)}
		</motion.section>
	);
};

export default Cart;
