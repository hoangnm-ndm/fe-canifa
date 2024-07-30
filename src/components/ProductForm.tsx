import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductContext } from "@/contexts/ProductContext";
import productSchema from "@/utils/productSchema";
import instance from "@/api";
import { Product } from "@/interfaces/Product";
import { Category } from "@/interfaces/Category";
import ImageUploader from "./ImageUploader";

const ProductForm = () => {
	const { id } = useParams();
	const [categories, setCategories] = useState([] as Category[]);
	const { handleProduct } = useContext(ProductContext);
	const [cateSelected, setCateSelected] = useState({} as Category);
	const {
		handleSubmit,
		formState: { errors },
		reset,
		register,
	} = useForm<Product>({
		resolver: zodResolver(productSchema),
	});

	const [productImage, setProductImage] = useState<string>("");

	const handleImageChange = (newImage: string) => {
		setProductImage(newImage);
	};

	useEffect(() => {
		if (id) {
			(async () => {
				const { data } = await instance.get(`/products/${id}`);
				console.log(data);
				setCateSelected(data.data.category);
				reset(data.data);
			})();
		}
	}, [id, reset]);

	const onSubmit = async (product: Product) => {
		try {
			console.log(product);
			const updatedProduct = { ...product, thumbnail: productImage };
			handleProduct(updatedProduct);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			const { data } = await instance.get("/categories");
			setCategories(data.data);
		})();
	}, []);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>{id ? "Edit" : "Add"} product</h1>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input type="text" className="form-control" id="title" {...register("title", { required: true })} />
					{errors.title?.message && <p className="text-danger">{errors.title?.message}</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="price" className="form-label">
						Price
					</label>
					<input
						type="number"
						className="form-control"
						id="price"
						{...register("price", { required: true, valueAsNumber: true })}
					/>
					{errors.price?.message && <p className="text-danger">{errors.price?.message}</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input type="text" className="form-control" id="description" {...register("description")} />
					{errors.description?.message && <p className="text-danger">{errors.description?.message}</p>}
				</div>

				<div className="mb-3">
					<label htmlFor="category" className="form-label">
						Category
					</label>
					<select id="category" className="form-control" {...register("category")}>
						{categories.map((category) =>
							cateSelected._id == category._id ? (
								<option key={category._id} value={category._id} selected>
									{category.name}
								</option>
							) : (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							)
						)}
					</select>
				</div>

				<div className="mb-3">
					<ImageUploader initialImage={productImage} onImageChange={handleImageChange} />
				</div>

				{productImage && <img src={productImage} />}

				<div className="mb-3">
					<button className="btn btn-primary w-100" type="submit">
						{id ? "Edit" : "Add"} product
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;
