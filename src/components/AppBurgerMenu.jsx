import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useActions } from "../hooks/useActions";

export const BurgerMenu = () => {
	const path = useLocation().pathname;
	const navigate = useNavigate();
	const isBurgerVisible = useSelector((state) => state.burger).value;
	const [isAnimationPlay, setIsAnimationPlay] = useState(isBurgerVisible);
	const { toggleBurger } = useActions();

	useEffect(() => {
		setIsAnimationPlay(isBurgerVisible);
	}, [isBurgerVisible, setIsAnimationPlay]);

	const toggleBurgerVisible = () => {
		setIsAnimationPlay(!isAnimationPlay);
		setTimeout(() => toggleBurger(), 350);
	};

	const goToPage = (page) => {
		if (page !== path) {
			setIsAnimationPlay(!isAnimationPlay);
			setTimeout(() => {
				toggleBurger();
				navigate(page);
			}, 300);
		}
	};

	return (
		<motion.div
			style={{ display: isBurgerVisible ? "flex" : "none" }}
			animate={{ opacity: isAnimationPlay ? 1 : 0 }}
			transition={{ duration: 0.35, delay: 0.01 }}
			className="burger-menu"
			onClick={toggleBurgerVisible}
		>
			<motion.section
				animate={{ x: isAnimationPlay ? 0 : "100%" }}
				transition={{ duration: 0.35, delay: 0.01, type: "spring" }}
				className="burger-menu__content"
				onClick={(evt) => evt.stopPropagation()}
			>
				<h2 className="burger-menu__heading">Kick Culture</h2>

				<nav className="burger-menu__nav">
					<button
						className={path === "/" ? "active" : ""}
						onClick={() => goToPage("/")}
					>
						Home
					</button>
					<button
						className={path === "/products" ? "active" : ""}
						onClick={() => goToPage("/products")}
					>
						Products
					</button>
					<button
						className={path === "/about" ? "active" : ""}
						onClick={() => goToPage("/about")}
					>
						About us
					</button>
					<button
						className={path === "/cart" ? "active" : ""}
						onClick={() => goToPage("/cart")}
					>
						Cart
					</button>
				</nav>
			</motion.section>
		</motion.div>
	);
};
