import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import { Product } from "@/interfaces/Product";

const ProductTable = () => {
	const { state, handleRemove } = useContext(ProductContext);
	console.log(state.products);

	return (
		<div>
			<h1>Hello, admin</h1>
			<Link to="/admin/product-add" className="btn btn-primary">
				Add new product
			</Link>
			<table className="table table-bordered table-striped text-center">
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Price</th>
						<th>Description</th>
						<th>Category</th>
						<th>Thumbnail</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{state.products.map((p: Product) => (
						<tr key={p._id}>
							<td>{p._id}</td>
							<td>{p.title}</td>
							<td>{p.price}</td>
							<td>{p.description || "Dang cap nhat"}</td>
							<td>{p.category || "Dang cap nhat"}</td>
							<td>{p.thumbnail ? <img src={p.thumbnail} alt="Dang cap nhat" /> : "Dang cap nhat"}</td>
							<td>
								<button className="btn btn-danger" onClick={() => handleRemove(p._id!)}>
									Delete
								</button>
								<Link to={`/admin/product-edit/${p._id}`} className="btn btn-warning">
									Edit
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductTable;
