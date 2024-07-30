import { ProductContext, ProductContextType } from "@/contexts/ProductContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
function Home() {
	const { state } = useContext<ProductContextType>(ProductContext);
	return (
		<>
			<h1>Danh sach san pham</h1>
			{state.products.map((product) => (
				<div key={product._id} className="card">
					<Link to={`/product-detail/${product._id}`}>
						<img src={product.thumbnail} alt="" />
					</Link>
					<Link to={`/product-detail/${product._id}`}>
						<h2>{product.title}</h2>
					</Link>
					<p>${product.price}</p>
					<p>{product.description}</p>
					<Link to={`/product-detail/${product._id}`} className="btn btn-danger">
						Xem chi tiet
					</Link>
				</div>
			))}
		</>
	);
}

export default Home;
