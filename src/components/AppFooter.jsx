import { NavLink } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="wrapper">
				<ul className="socials">
					<li>
						<a href="https://github.com/qaddis" target="_blank">
							<svg>
								<use xlinkHref="#github-svg"></use>
							</svg>
						</a>
					</li>
					<li>
						<a href="https://t.me/qaddis" target="_blank">
							<svg>
								<use xlinkHref="#telegram-svg"></use>
							</svg>
						</a>
					</li>
					<li>
						<a href="https://vk.com/qaddis" target="_blank">
							<svg>
								<use xlinkHref="#vk-svg"></use>
							</svg>
						</a>
					</li>
				</ul>
				<p className="copyright">
					© 2024 Святослав &quot;Qaddis&quot; Барсуков
				</p>
				<nav className="footer-nav">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/products">Products</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/basket">Basket</NavLink>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
