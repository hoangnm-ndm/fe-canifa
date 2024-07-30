import React, { createContext, useEffect, useReducer } from "react";
import instance from "@/api";
import productReducer from "@/reducers/productReducer";
import { Product } from "@/interfaces/Product";
import { useNavigate } from "react-router-dom";

export type ProductContextType = {
	state: { products: Product[] };
	dispatch: React.Dispatch<any>;
	handleProduct: (product: Product) => void;
	handleRemove: (id: string) => void;
};

export const ProductContext = createContext({} as ProductContextType);

type Props = {
	children: React.ReactNode;
};

const ProductContextProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(productReducer, { products: [] });
	const nav = useNavigate();

	useEffect(() => {
		(async () => {
			const { data } = await instance.get("/products");
			console.log(data);
			dispatch({ type: "SET_PRODUCTS", payload: data.data });
		})();
	}, []);

	const handleProduct = async (product: Product) => {
		try {
			if (product._id) {
				const { data } = await instance.patch(`/products/${product._id}`, product);
				dispatch({ type: "UPDATE_PRODUCT", payload: data.data });
			} else {
				const { data } = await instance.post("/products", product);
				dispatch({ type: "ADD_PRODUCT", payload: data.data });
			}
			nav("/admin");
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemove = async (id: string) => {
		try {
			await instance.delete(`/products/${id}`);
			dispatch({ type: "DELETE_PRODUCT", payload: id });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ProductContext.Provider value={{ state, dispatch, handleProduct, handleRemove }}>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductContextProvider;
