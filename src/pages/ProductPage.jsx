import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useActions } from "../hooks/useActions";

import Button from "../components/UI/GradientButton";
import ProductCard from "../components/ProductCard";
import { cards } from "../data";

const Product = () => {
	const navigate = useNavigate();
	const params = useParams();
	const { toggleProduct } = useActions();
	const cart = useSelector((state) => state.cart);
	const product = cards.find((card) => card.title === params.title);

	const [similar, setSimilar] = useState([]);
	const [ifExist, setIfExist] = useState(false);

	useEffect(() => {
		if (!product) {
			navigate("/not-found");
		} else {
			document.title = `${params.title.toUpperCase()} | Kick Culture`;
			let simProducts = [];
			for (let i = 0; i < cards.length; i++) {
				if (
					product.title.split(" ")[1] === cards[i].title.split(" ")[1] &&
					cards[i] !== product
				) {
					simProducts.push(cards[i]);
				}
			}

			for (let i = 0; i < cards.length; i++) {
				if (
					cards[i].isPopular &&
					cards[i] !== product &&
					!simProducts.includes(cards[i])
				) {
					simProducts.push(cards[i]);
				}
			}
			simProducts.length = 3;
			setSimilar(simProducts);
			setIfExist(cart.some((i) => i === product.title));
		}
	}, [product, navigate, cart, params]);

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
				{product ? (
					<div className="product__card-content">
						<div className="product__info">
							<h2 className="product__title">
								<span className="product__name">{product.title}</span>
								{product.discount !== 0 ? (
									<span className="product__discount">
										-{product.discount}%
									</span>
								) : (
									""
								)}
							</h2>
							<p className="product__about">{product.description}</p>
							<div className="product__price">
								<Button
									onClick={() => {
										toggleProduct(product.title);
									}}
									style={{
										fontSize: "0.85em",
										marginRight: 20,
										color: "var(--light)",
									}}
								>
									{ifExist ? "Remove from cart" : "Add to cart"}
								</Button>
								<p>
									{product.discount !== 0 ? (
										<>
											<span className="product__old-price">
												{product.price}
											</span>
											{Math.round(
												product.price - product.price * (product.discount / 100)
											)}
										</>
									) : (
										product.price
									)}
									<span className="product__currency"> usd</span>
								</p>
							</div>
						</div>
						<img src={product.image} className="product__image" />
					</div>
				) : (
					<h2>None</h2>
				)}
			</div>

			<h3 className="product__heading">Maybe you&apos;ll like it</h3>
			<div className="product__recommended">
				{product ? (
					similar.map((card) => (
						<ProductCard
							key={card.title}
							title={card.title}
							price={card.price}
							discount={card.discount}
							image={card.image}
						/>
					))
				) : (
					<h2>None</h2>
				)}
			</div>
		</motion.section>
	);
};

export default Product;
