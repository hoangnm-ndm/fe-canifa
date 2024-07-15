import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import AuthForm from "./components/AuthForm";
import LayoutClient from "./components/LayoutClient";
import ProductDetail from "./pages/ProductDetail";
import PrivateRouter from "./components/PrivateRouter";
import LayoutAdmin from "./components/LayoutAdmin";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./components/ProductForm";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";

function App() {
	return (
		<>
			<Routes>
				<Route path="/register" element={<AuthForm isRegister />} />
				<Route path="/login" element={<AuthForm />} />

				<Route path="/" element={<LayoutClient />}>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Navigate to="/" />} />
					<Route path="/product-detail/:id" element={<ProductDetail />} />
				</Route>

				<Route path="/admin" element={<PrivateRouter />}>
					<Route path="/admin" element={<LayoutAdmin />}>
						<Route index element={<Dashboard />} />
						<Route path="/admin/product-add" element={<ProductForm />} />
						<Route path="/admin/product-edit/:id" element={<ProductForm />} />
					</Route>
				</Route>
				<Route path="*" element={<Notfound />} />
			</Routes>
		</>
	);
}

export default App;
