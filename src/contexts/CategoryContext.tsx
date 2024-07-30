import React, { createContext, useEffect, useReducer } from "react";
import instance from "@/api";
import { Category } from "@/interfaces/Category";
import { useNavigate } from "react-router-dom";
import categoryReducer from "@/reducers/categoryReducer";

export type CategoryContextType = {
	state: { categories: Category[] };
	dispatch: React.Dispatch<any>;
	handleCategory: (category: Category) => void;
	onRemove: (_id: string) => void;
};

export const CategoryContext = createContext({} as CategoryContextType);

const CategoryContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(categoryReducer, { categories: [] });
	const nav = useNavigate();

	useEffect(() => {
		(async () => {
			const { data } = await instance.get("/categories");
			console.log(data);
			dispatch({ type: "SET_CATEGORIES", payload: data.data });
		})();
	}, []);

	const handleCategory = async (category: Category) => {
		try {
			if (category._id) {
				const { data } = await instance.patch(`/categories/${category._id}`, category);
				dispatch({ type: "UPDATE_CATEGORY", payload: data.data });
			} else {
				const { data } = await instance.post("/categories", category);
				dispatch({ type: "ADD_CATEGORY", payload: data.data });
			}
			nav("/admin");
		} catch (error) {
			console.log(error);
		}
	};

	const onRemove = async (_id: string) => {
		try {
			await instance.delete(`/categories/${_id}`);
			dispatch({ type: "DELETE_CATEGORY", payload: _id });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<CategoryContext.Provider value={{ state, dispatch, handleCategory, onRemove }}>
			{children}
		</CategoryContext.Provider>
	);
};

export default CategoryContextProvider;
