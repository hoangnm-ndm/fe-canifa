import axios from "axios";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API || "http://localhost:8888/api",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);

export const getProtectedData = (token: string) =>
	instance.get("/protected", { headers: { Authorization: `Bearer ${token}` } });

export default instance;
