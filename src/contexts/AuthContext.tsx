// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
	user: any;
	login: (token: string, user: any) => void;
	logout: () => void;
	isAdmin: boolean;
}

interface Props {
	children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<any>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			// Lấy thông tin người dùng từ token
			const user = JSON.parse(atob(token.split(".")[1]));
			setUser(user);
		}
	}, []);

	const login = (token: string, user: any) => {
		localStorage.setItem("accessToken", token);
		localStorage.setItem("user", JSON.stringify(user));
		setUser(user);
		navigate(user.role === "admin" ? "/admin" : "/");
	};

	const logout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("user");
		setUser(null);
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === "admin" }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
