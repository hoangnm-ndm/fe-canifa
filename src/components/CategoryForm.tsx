import instance from "@/api";
import { CategoryContext } from "@/contexts/CategoryContext";
import { Category } from "@/interfaces/Category";
import categorySchema from "@/utils/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const CategoryForm = () => {
	const { id } = useParams();
	const { handleCategory } = useContext(CategoryContext);
	const {
		handleSubmit,
		formState: { errors },
		reset,
		register,
	} = useForm<Category>({
		resolver: zodResolver(categorySchema),
	});

	useEffect(() => {
		if (id) {
			(async () => {
				const { data } = await instance.get(`/categories/${id}`);
				reset(data.data);
			})();
		}
	}, [id, reset]);

	return (
		<div>
			<form onSubmit={handleSubmit((data) => handleCategory({ ...data, _id: id }))}>
				<h1>{id ? "Edit" : "Add"} Category</h1>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input type="text" className="form-control" id="name" {...register("name", { required: true })} />
					{errors.name?.message && <p className="text-danger">{errors.name?.message}</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input type="text" className="form-control" id="description" {...register("description")} />
					{errors.description?.message && <p className="text-danger">{errors.description?.message}</p>}
				</div>

				<div className="mb-3">
					<button className="btn btn-primary w-100" type="submit">
						{id ? "Edit" : "Add"} Category
					</button>
				</div>
			</form>
		</div>
	);
};

export default CategoryForm;
