import { Routes, Route } from "react-router-dom";

import Layout from "./components/AppLayout";
import Home from "./pages/HomePage";
import Products from "./pages/ProductsPage";
import About from "./pages/AboutPage";
import Cart from "./pages/CartPage";
import NotFound from "./pages/NotFoundPage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/about" element={<About />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
