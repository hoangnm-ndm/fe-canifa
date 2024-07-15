import React, { createContext, useEffect, useReducer } from "react";
import instance from "@/api";
import productReducer from "@/reducers/productReducer";
import { Product } from "@/interfaces/Product";

export type ProductContextType = {
	state: { products: Product[] };
	dispatch: React.Dispatch<any>;
};

export const ProductContext = createContext({} as ProductContextType);

type Props = {
	children: React.ReactNode;
};

const ProductContextProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(productReducer, { products: [] });

	useEffect(() => {
		(async () => {
			const { data } = await instance.get("/products");
			dispatch({ type: "SET_PRODUCTS", payload: data });
		})();
	}, []);

	return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

export default ProductContextProvider;
