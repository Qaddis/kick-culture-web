import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../components/UI/GradientButton";
import ProductCard from "../components/ProductCard";
import { cards } from "../data";

const Home = () => {
	let salesProducts = [];
	for (let i = 0; i < cards.length; i++)
		if (cards[i].discount !== 0) salesProducts.push(cards[i]);
	salesProducts.length = 3;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.35 } }}
			transition={{ delay: 0.35 }}
		>
			<section className="landing">
				<div className="wrapper">
					<h2 className="landing__h2">Kick Culture</h2>
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
					<Link to="/products">
						<Button style={{ fontSize: "1.5em", opacity: 1 }}>Shop now!</Button>
					</Link>
				</div>
			</section>

			{/* eslint-disable-next-line react/no-unknown-property */}
			<marquee scrollamount="8" behavior="scroll" direction="right">
				🤩 Discounts up to 20%! 🤩
			</marquee>

			<section className="sales wrapper">
				<h2 className="page-heading">
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
				<Link to="/products">
					<Button style={{ marginTop: "20px", padding: "15px 30px" }}>
						More Products
					</Button>
				</Link>
			</section>

			<section className="advantages wrapper">
				<h2 className="page-heading">Why Us?</h2>

				<ul className="advantages__ul">
					<motion.li
						className="advantages__li"
						initial={{ rotateX: 90 }}
						whileInView={{ rotateX: 0 }}
						transition={{ type: "spring", duration: 0.55, delay: 0.2 }}
					>
						<h3 className="advantages__h3">Quality</h3>
						<p className="advantages__p">
							All our products are original and of the highest quality. Each
							pair is carefully checked by experts.
						</p>
					</motion.li>
				</ul>
			</section>
		</motion.div>
	);
};

export default Home;
