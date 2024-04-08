import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

import ProductCard from "../components/ProductCard";
import { cards } from "../data";

const Product = () => {
	const params = useParams();
	const product = cards.find((card) => card.title === params.title);

	const similar = [];
	for (let i = 0; i < cards.length; i++) {
		if (
			product.title.split(" ")[1] === cards[i].title.split(" ")[1] &&
			cards[i] !== product
		) {
			similar.push(cards[i]);
		}
	}

	for (let i = 0; i < cards.length; i++) {
		if (
			cards[i].isPopular &&
			cards[i] !== product &&
			!similar.includes(cards[i])
		) {
			similar.push(cards[i]);
		}
	}
	similar.length = 3;

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

			<h3 className="product__heading">Maybe you&apos;ll like it</h3>
			<div className="product__recommended">
				{similar.map((card) => (
					<ProductCard
						key={card.title}
						title={card.title}
						price={card.price}
						image={card.image}
					/>
				))}
			</div>
		</motion.section>
	);
};

export default Product;
