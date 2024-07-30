import { CategoryContext } from "@/contexts/CategoryContext";
import { Category } from "@/interfaces/Category";
import { useContext } from "react";
import { Link } from "react-router-dom";

const CategoryTable = () => {
	const { state, onRemove } = useContext(CategoryContext);
	console.log(state.categories);

	return (
		<div>
			<Link to={`/admin/category-add`} className="btn btn-primary">
				Thêm mới danh mục
			</Link>
			<table className="table table-bordered table-striped text-center">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{state.categories.map((p: Category) => (
						<tr key={p._id}>
							<td>{p._id}</td>
							<td>{p.name}</td>
							<td>{p.description || "Dang cap nhat"}</td>
							<td>
								<button className="btn btn-danger" onClick={() => onRemove(p._id!)}>
									Delete
								</button>
								<Link to={`/admin/category-edit/${p._id}`} className="btn btn-warning">
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

export default CategoryTable;
