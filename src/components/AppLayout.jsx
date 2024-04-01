import { Outlet } from "react-router-dom";

import Header from "./AppHeader";
import Footer from "./AppFooter";

const Layout = () => {
	return (
		<>
			<Header />

			<main className="main">
				<Outlet />
			</main>

			<Footer />
		</>
	);
};

export default Layout;
