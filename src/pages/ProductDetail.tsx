import instance from "@/api";
import { CartContext } from "@/contexts/CartContext";
import { Product } from "@/interfaces/Product";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
	const { id } = useParams();
	const [quantity, setQuantity] = useState(1);
	const [product, setProduct] = useState<Product>({} as Product);
	useEffect(() => {
		(async () => {
			const { data } = await instance.get(`/products/${id}`);
			setProduct(data.data);
		})();
	}, [id]);
	const { addToCart } = useContext(CartContext);
	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuantity(Number(e.target.value));
	};

	const handleAddToCart = () => {
		addToCart(product, quantity);
		alert("Add to cart successfully");
	};
	return (
		<div>
			<h1>Product Detail</h1>
			<img src={product.thumbnail} alt="" />
			<h1>{product.title}</h1>
			<p>{product.price}</p>
			<input type="number" value={quantity} min="1" onChange={handleQuantityChange} />
			<button className="btn btn-danger" onClick={handleAddToCart}>
				Add to cart
			</button>
		</div>
	);
};

export default ProductDetail;
