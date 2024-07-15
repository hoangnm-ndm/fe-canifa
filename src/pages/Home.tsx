import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
function Home() {
	const { state } = useContext<ProductContextType>(ProductContext);
	return (
		<>
			<h1>Danh sach san pham</h1>
			{state.products.map((product) => (
				<div key={product.id} className="card">
					<Link to={`/product-detail/${product.id}`}>
						<img src={product.thumbnail} alt="" />
					</Link>
					<Link to={`/product-detail/${product.id}`}>
						<h2>{product.title}</h2>
					</Link>
					<p>${product.price}</p>
					<p>{product.description}</p>
					<button className="btn btn-danger">Add to cart</button>
				</div>
			))}
		</>
	);
}

export default Home;