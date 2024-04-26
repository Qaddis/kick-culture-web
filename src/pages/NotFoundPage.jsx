import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
	document.title = "Not Found | Kick Culture";

	return (
		<motion.section
			className="not-found wrapper"
			initial={{ y: "5%", opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: "-5%", opacity: 0, transition: { duration: 0.35 } }}
			transition={{ delay: 0.35 }}
		>
			<h2>Ooopsie... 404</h2>
			<h3>Page not found 🤔</h3>
			<Link to="/">Oh no, go back!</Link>
		</motion.section>
	);
};

export default NotFound;
