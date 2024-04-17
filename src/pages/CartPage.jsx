import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import CartCard from "../components/CartCard";
import { cards } from "../data.js";
import { Link } from "react-router-dom";

const Cart = () => {
	const cart = useSelector((state) => state.cart);

	let userCart;
	if (cart.length !== 0) {
		userCart = [];
		cart.forEach((product) => {
			let matchingProduct = cards.find((i) => i.title === product);
			if (matchingProduct) {
				userCart.push(matchingProduct);
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
					<div className="container">
						<h3 className="cart__h3">It&apos;s empty here for now ☹️</h3>
						<Link className="cart__btn" to="/products">
							To fix this!
						</Link>
					</div>
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
		</motion.section>
	);
};

export default Cart;
