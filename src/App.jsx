import { Routes, Route } from "react-router-dom";

import Layout from "./components/AppLayout";
import Home from "./pages/HomePage";
import Products from "./pages/ProductsPage";
import About from "./pages/AboutPage";
import NotFound from "./pages/NotFoundPage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
