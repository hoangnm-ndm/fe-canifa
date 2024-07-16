import { User } from "@/interfaces/User";
import axios from "axios";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export const getProtectedData = (token: string) =>
	instance.get("/protected", { headers: { Authorization: `Bearer ${token}` } });

export default instance;
