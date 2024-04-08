import { useParams, Link } from "react-router-dom";
import { cards } from "../data";

const Product = () => {
	const params = useParams();
	const product = cards.find((card) => card.title === params.title);

	return (
		<section className="product wrapper">
			<Link to="/products" className="product__back-btn">
				Back
			</Link>
			<div className="product__card">
				<div className="product__card-content">
					<div className="product__info">
						<h2 className="product__title">{product.title}</h2>
						<p className="product__about">Lorem ipsum dolor sit amet.</p>
						<p className="product__price">
							<button className="product__cart-btn">To cart</button>
							{product.price}
							<span className="product__currency"> usd</span>
						</p>
					</div>
					<img src={product.image} className="product__image" />
				</div>
			</div>
		</section>
	);
};

export default Product;
