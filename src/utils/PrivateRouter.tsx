// src/utils/PrivateRoute.tsx
import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute: React.FC<any> = () => {
	const { user } = useAuth();
	if (!user || user.role !== "admin") {
		return <h1>Access denied. You are not an admin.</h1>;
	}

	return <Outlet />;
};

export default PrivateRoute;
