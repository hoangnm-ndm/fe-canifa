import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import AuthForm from "./components/AuthForm";
import LayoutClient from "./components/LayoutClient";
import ProductDetail from "./pages/ProductDetail";
import LayoutAdmin from "./components/LayoutAdmin";
import ProductForm from "./components/ProductForm";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import ProductTable from "./pages/admin/ProductTable";
import CategoryTable from "./pages/admin/CategoryTable";
import CategoryForm from "./components/CategoryForm";
import CartPage from "./pages/CartPage";

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
					<Route path="/cart" element={<CartPage />} />
				</Route>

				<Route path="/admin" element={<LayoutAdmin />}>
					<Route index element={<h1>Hello Admin</h1>} />
					<Route path="/admin/products" element={<ProductTable />} />
					<Route path="/admin/product-add" element={<ProductForm />} />
					<Route path="/admin/product-edit/:id" element={<ProductForm />} />

					<Route path="/admin/categories" element={<CategoryTable />} />
					<Route path="/admin/category-add" element={<CategoryForm />} />
					<Route path="/admin/category-edit/:id" element={<ProductForm />} />
				</Route>

				<Route path="*" element={<Notfound />} />
			</Routes>
		</>
	);
}

export default App;
