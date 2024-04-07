import { useParams } from "react-router-dom";
import { cards } from "../data";

const Product = () => {
	const params = useParams();
	const product = cards.find((card) => card.title === params.title);

	return (
		<section className="product wrapper">
			<button>Back</button>
			<div className="product__card">
				<div className="product__card-content">
					<div className="product__info">
						<h2 className="product__title">{product.title}</h2>
						<p className="product__about">Lorem ipsum dolor sit amet.</p>
						<p className="product__price">
							{product.price}
							<span className="product__currency"> usd</span>
						</p>
					</div>
					<img src={product.image} className="product__image" />
				</div>
			</div>
			<button>To cart</button>
		</section>
	);
};

export default Product;
