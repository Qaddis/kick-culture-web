import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import ProductCard from "../components/ProductCard";
import { cards } from "../data";

const Home = () => {
	let salesProducts = [];
	for (let i = 0; i < cards.length; i++)
		if (cards[i].discount !== 0) salesProducts.push(cards[i]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.35 } }}
			transition={{ delay: 0.35 }}
		>
			<section className="landing">
				<div className="wrapper">
					<h2 className="landing__h1">Kick Culture</h2>
					<p className="landing__p">
						Walk in
						<span style={{ color: "#F06D58" }}> style</span>, breathe in
						<span style={{ color: "#FCED76" }}> culture</span>:
						<br />
						<span style={{ textShadow: "0 0 5px var(--violet)" }}>
							Kick Culture
						</span>{" "}
						- in every pair, there&apos;s a history!
					</p>
					<Link to="/products" className="landing__button">
						Shop now!
					</Link>
				</div>
			</section>

			{/* eslint-disable-next-line react/no-unknown-property */}
			<marquee scrollamount="8" behavior="scroll" direction="right">
				🤩 Discounts up to 20%! 🤩
			</marquee>

			<section className="sales wrapper">
				<h2 className="sales__h2">
					<span>Sales</span>
				</h2>
				<div className="cards">
					{salesProducts.map((product) => (
						<ProductCard
							key={product.title}
							title={product.title}
							price={product.price}
							discount={product.discount}
							image={product.image}
						/>
					))}
				</div>
			</section>
		</motion.div>
	);
};

export default Home;
