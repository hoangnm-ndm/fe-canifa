import { useState } from "react";

type Props = {
	setThumbnailUrl: any;
	setThumbnailOption: any;
	thumbnailOption: string;
	register: any;
	errors: any;
};

const ImageUploader = ({ setThumbnailUrl, setThumbnailOption, thumbnailOption, register, errors }: Props) => {
	const [thumbnailFile, setThumbnailFile] = useState(null);

	const handleImageChange = (event: any) => {
		const file = event.target.files[0];
		setThumbnailFile(file);
		const reader = new FileReader();
		reader.onloadend = () => {
			setThumbnailUrl(reader.result);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="mb-3">
			<label htmlFor="thumbnailOption" className="form-label">
				Choose Thumbnail Option
			</label>
			<select
				className="form-control"
				id="thumbnailOption"
				value={thumbnailOption}
				onChange={(e) => setThumbnailOption(e.target.value)}
			>
				<option value="keep">Keep Current Thumbnail</option>
				<option value="link">Add Thumbnail from Link</option>
				<option value="upload">Upload Thumbnail from Local</option>
			</select>

			<label htmlFor="thumbnail" className="form-label">
				Thumbnail
			</label>
			{thumbnailOption === "link" && (
				<input type="text" className="form-control" id="thumbnail" {...register("thumbnail")} />
			)}
			{thumbnailOption === "upload" && (
				<input
					type="file"
					className="form-control"
					id="thumbnail"
					onChange={handleImageChange}
					{...register("thumbnail", { required: true })}
				/>
			)}
			{errors.thumbnail?.message && <p className="text-danger">{errors.thumbnail?.message}</p>}
		</div>
	);
};

export default ImageUploader;
