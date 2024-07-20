import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductContext } from "@/contexts/ProductContext";
import productSchema from "@/utils/productSchema";
import instance from "@/api";
import { Product } from "@/interfaces/Product";
import ImageUploader from "./ImageUploader";
import { Category } from "@/interfaces/Category";

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

const ProductForm = () => {
	const { id } = useParams();
	const [categories, setCategories] = useState([] as Category[]);
	const { handleProduct } = useContext(ProductContext);
	const [thumbnailUrl, setThumbnailUrl] = useState(null);

	// State để lưu trữ lựa chọn của người dùng
	const [thumbnailOption, setThumbnailOption] = useState("keep");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Product>({
		resolver: zodResolver(productSchema),
	});

	useEffect(() => {
		if (id) {
			(async () => {
				const { data } = await instance.get(`/products/${id}`);
				console.log(data);
				reset(data);
				setThumbnailUrl(data.thumbnail);
			})();
		}
	}, [id, reset]);

	const uploadImage = async (file: any) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", VITE_UPLOAD_PRESET);

		const response = await fetch(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`, {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		console.log(data);
		return data.secure_url;
	};

	const onSubmit = async (product: Product) => {
		try {
			let updatedProduct = { ...product };
			// Kiểm tra lựa chọn của admin và xử lý tương ứng
			switch (thumbnailOption) {
				case "upload":
					// Xử lý upload ảnh nếu admin chọn upload từ local
					if (product.thumbnail && product.thumbnail[0]) {
						const thumbnailUrl = await uploadImage(product.thumbnail[0]);
						updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl };
					}
					break;
				default:
				// Giữ nguyên ảnh cũ khi không thay đổi
				// Hoặc mặc định khi người dùng chọn "link ảnh online"
				// Tôi sử dụng switch case để dễ mở rộng cho các tình huống trong tương lai
			}

			handleProduct(updatedProduct);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			const { data } = await instance.get("/categories");
			console.log(data);
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
						category
					</label>
					<select name="category" id="category">
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<ImageUploader
					setThumbnailUrl={setThumbnailUrl}
					thumbnailOption={thumbnailOption}
					setThumbnailOption={setThumbnailOption}
					register={register}
					errors={errors}
				/>

				{thumbnailUrl && (
					<img src={thumbnailUrl} alt="Product Thumbnail" style={{ maxWidth: "200px", marginTop: "10px" }} />
				)}

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
