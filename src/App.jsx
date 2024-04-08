import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./components/AppLayout";
import Home from "./pages/HomePage";
import Products from "./pages/ProductsPage";
import Product from "./pages/ProductPage";
import About from "./pages/AboutPage";
import Cart from "./pages/CartPage";
import NotFound from "./pages/NotFoundPage";

const App = () => {
	const location = useLocation();

	return (
		<AnimatePresence>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/product/:title" element={<Product />} />
					<Route path="/about" element={<About />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</AnimatePresence>
	);
};

export default App;
