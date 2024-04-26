import { Outlet, useLocation } from "react-router-dom";

import Header from "./AppHeader";
import Footer from "./AppFooter";
import { BurgerMenu } from "./AppBurgerMenu";

const Layout = () => {
	const path = useLocation().pathname;

	return (
		<>
			<Header />

			<main
				style={path !== "/" ? { paddingTop: 50 } : { paddingTop: 0 }}
				className="main"
			>
				<Outlet />
			</main>

			<BurgerMenu />

			<Footer />
		</>
	);
};

export default Layout;
