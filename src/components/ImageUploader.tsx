// components/ImageUploader.tsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
	initialImage: string;
	onImageChange: (newImage: string) => void;
}

const { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } = import.meta.env;

const ImageUploader: React.FC<ImageUploaderProps> = ({ initialImage, onImageChange }) => {
	const [image, setImage] = useState<string>(initialImage);
	const [onlineImage, setOnlineImage] = useState<string>("");
	const [uploadMethod, setUploadMethod] = useState<"keep" | "online" | "local">("keep");

	const onDrop = async (acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", VITE_UPLOAD_PRESET);

		const response = await fetch(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`, {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		console.log(data);
		setImage(data.secure_url);
		return data.secure_url;
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const handleOnlineImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const url = e.target.value;
		setOnlineImage(url);
		setImage(url);
		onImageChange(url);
	};

	return (
		<div>
			<label>
				<input
					type="radio"
					name="uploadMethod"
					value="keep"
					checked={uploadMethod === "keep"}
					onChange={() => setUploadMethod("keep")}
				/>
				Giữ nguyên ảnh cũ
			</label>
			<br />
			<label>
				<input
					type="radio"
					name="uploadMethod"
					value="online"
					checked={uploadMethod === "online"}
					onChange={() => setUploadMethod("online")}
				/>
				Sử dụng link ảnh online
			</label>
			{uploadMethod === "online" && (
				<input type="text" placeholder="Link ảnh online" value={onlineImage} onChange={handleOnlineImageChange} />
			)}
			<br />
			<label>
				<input
					type="radio"
					name="uploadMethod"
					value="local"
					checked={uploadMethod === "local"}
					onChange={() => setUploadMethod("local")}
				/>
				Upload ảnh từ local
			</label>
			{uploadMethod === "local" && (
				<div {...getRootProps()} style={{ border: "2px dashed #cccccc", padding: "20px", textAlign: "center" }}>
					<input {...getInputProps()} />
					<p>Kéo và thả file tại đây, hoặc nhấp để chọn file</p>
				</div>
			)}
			<br />
			{image && (
				<div>
					<p>Ảnh đã chọn:</p>
					<img src={image} alt="Selected" style={{ maxWidth: "100%", height: "auto" }} />
				</div>
			)}
		</div>
	);
};

export default ImageUploader;
