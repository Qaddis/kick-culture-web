import { motion } from "framer-motion";

const About = () => {
	return (
		<motion.section
			initial={{ y: "5%", opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: "-5%", opacity: 0, transition: { duration: 0.35 } }}
			transition={{ delay: 0.35 }}
			className="about wrapper"
		>
			<h2 className="about__heading">About Us</h2>
			<p>
				<b className="name">Kick Culture</b> is not a real store. This is a pet
				project made by{" "}
				<a href="https://github.com/qaddis" target="_blank">
					Qaddis
				</a>
				.
			</p>
			<p>
				In it I tried to implement an example of a real store using
				<b style={{ color: "#BD34FE" }}> Vite</b> +
				<b style={{ color: "#149ECA" }}> React</b>,
				<b style={{ color: "#593D88" }}> Redux Toolkit</b>,
				<b style={{ color: "#149ECA" }}> React Router</b>,
				<b style={{ color: "#F94DA3" }}> Framer Motion</b> and
				<b style={{ color: "#BF4080" }}> SCSS</b>. Product cards were generated
				by <b style={{ color: "#8966F8" }}>Leonardo AI</b>, the names were
				invented by myself, any resemblance to real brands is accidental.
			</p>
			<p>
				Fonts used: <b style={{ fontFamily: "Peralta, sans" }}>Peralta</b>,
				<b style={{ fontFamily: "Quicksand, sans-serif" }}> Quicksand</b>,
				<b> Work sans</b>.
			</p>
			<p>
				Icons taken from{" "}
				<a
					style={{ textShadow: "none", color: "var(--dark)" }}
					href="https://www.iconfinder.com/"
					target="_blank"
				>
					Iconfinder
				</a>{" "}
				(cart, left arrow, github, vk, telegram).
			</p>
		</motion.section>
	);
};

export default About;
