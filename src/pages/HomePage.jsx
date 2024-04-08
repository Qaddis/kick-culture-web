import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.35 } }}
			transition={{ delay: 0.35 }}
		>
			<div className="landing">
				<div className="wrapper">
					<div className="short_info">
						<h2 className="landing__h1">Kick Culture</h2>
						<p className="landing__p">
							Walk in
							<i style={{ fontStyle: "normal", color: "#F06D58" }}> style</i>,
							breathe in
							<i style={{ fontStyle: "normal", color: "#FCED76" }}> culture</i>:
							<br />
							<i
								style={{
									fontStyle: "normal",
									color: "var(--light)",
									textShadow: "0 0 5px var(--violet)",
								}}
							>
								Kick Culture
							</i>{" "}
							- in every pair, there&apos;s a history!
						</p>
						<Link to="/products" className="landing__button">
							Shop now!
						</Link>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Home;
