import instance from "@/api";
import React, { createContext, useState, useEffect } from "react";

export type AuthContextType = {
	isAuthenticated: boolean;
	user: any;
	register: (email: string, password: string, username: string) => void;
	login: (email: string, password: string) => void;
	logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

type Props = {
	children: React.ReactNode;
};

const AuthContextProvider = ({ children }: Props) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					// Dùng cách này khi đã có api/endpoint để kiểm tra token
					const { data } = await instance.get("/me", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					// Dùng cách này khi chưa có api/endpoint để kiểm tra token
					// const { data } = await instance.get("/660/users/4", {
					// 	headers: {
					// 		Authorization: `Bear ${token}`,
					// 	},
					// });

					setUser(data);
					setIsAuthenticated(true);
				} catch (error) {
					console.error(error);
					setIsAuthenticated(false);
					setUser(null);
				}
			}
		};
		checkAuth();
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const { data } = await instance.post("/auth/login", { email, password });
			localStorage.setItem("token", data.accessToken);
			setUser(data.user);
			setIsAuthenticated(true);
		} catch (error) {
			console.error(error);
			setIsAuthenticated(false);
			setUser(null);
		}
	};

	const register = async (email: string, password: string, username: string) => {
		try {
			const { data } = await instance.post("/auth/register", { email, password, username });
			localStorage.setItem("token", data.accessToken);
			setUser(data.user);
			setIsAuthenticated(true);
		} catch (error) {
			console.error(error);
			setIsAuthenticated(false);
			setUser(null);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, register, login, logout }}>{children}</AuthContext.Provider>
	);
};

export default AuthContextProvider;
