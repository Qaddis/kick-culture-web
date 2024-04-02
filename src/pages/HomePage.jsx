import { Link } from "react-router-dom";

import styles from "./HomePage.module.css";

const Home = () => {
	return (
		<>
			<div className={styles.landing}>
				<div className={styles.wrapper}>
					<div className={styles.short_info}>
						<h2 className={styles.landing__h1}>Kick Culture</h2>
						<p className={styles.landing__p}>
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
						<Link to="/products" className={styles.landing__button}>
							Shop now!
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
