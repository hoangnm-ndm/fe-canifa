import axios from "axios";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

instance.interceptors.request.use((config: any) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default instance;
