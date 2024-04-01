import { NavLink, Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<div className="wrapper">
				<h1 className="logo">
					<Link to="/">Kick Culture</Link>
				</h1>

				<nav className="header-nav">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/products">Products</NavLink>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/basket">
						<svg fill="var(--light)">
							<use xlinkHref="#basket-svg"></use>
						</svg>
					</NavLink>
				</nav>
			</div>
		</header>
	);
};

export default Header;
