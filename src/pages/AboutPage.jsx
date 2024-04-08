import { motion } from "framer-motion";

const About = () => {
	<motion.section
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0, transition: { duration: 0.35 } }}
		transition={{ delay: 0.35 }}
	>
		<h2>About Page</h2>
	</motion.section>;
};

export default About;
