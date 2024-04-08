import { motion } from "framer-motion";

const About = () => {
	<motion.section
		initial={{ y: "5%", opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		exit={{ y: "-5%", opacity: 0, transition: { duration: 0.35 } }}
		transition={{ delay: 0.35 }}
	>
		<h2>About Page</h2>
	</motion.section>;
};

export default About;
