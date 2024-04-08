import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { cards } from "../data";

const Product = () => {
	const params = useParams();
	const product = cards.find((card) => card.title === params.title);

	return (
		<motion.section
			className="product wrapper"
			initial={{ y: "5%", opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: "-5%", opacity: 0, transition: { duration: 0.35 } }}
			transition={{ delay: 0.35 }}
		>
			<Link to="/products" className="product__back-btn">
				<svg fill="var(--mint)">
					<use xlinkHref="#arrow-svg"></use>
				</svg>
			</Link>
			<div className="product__card">
				<div className="product__card-content">
					<div className="product__info">
						<h2 className="product__title">{product.title}</h2>
						<p className="product__about">Lorem ipsum dolor sit amet.</p>
						<p className="product__price">
							<button className="product__cart-btn">To cart</button>
							{product.price}
							<span className="product__currency"> usd</span>
						</p>
					</div>
					<img src={product.image} className="product__image" />
				</div>
			</div>
		</motion.section>
	);
};

export default Product;
