import { NavLink, Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<div className="wrapper">
				<h1 className="logo" title="Go to home page">
					<Link to="/">Kick Culture</Link>
				</h1>

				<nav className="header-nav">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/products">Products</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink title="Go to cart" to="/cart">
						<svg fill="var(--light)">
							<use xlinkHref="#cart-svg"></use>
						</svg>
					</NavLink>
				</nav>
			</div>
		</header>
	);
};

export default Header;
