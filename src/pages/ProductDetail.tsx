import instance from "@/api";
import { Product } from "@/interfaces/Product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState<Product>({} as Product);
	useEffect(() => {
		(async () => {
			const { data } = await instance.get(`/products/${id}`);
			setProduct(data);
		})();
	}, [id]);
	return (
		<div>
			<h1>Product Detail</h1>
			<img src={product.thumbnail} alt="" />
			<h1>{product.title}</h1>
		</div>
	);
};

export default ProductDetail;
