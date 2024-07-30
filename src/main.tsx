import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.js";
import { CartProvider } from "./contexts/CartContext.js";
import CategoryContextProvider from "./contexts/CategoryContext.js";
import ProductContextProvider from "./contexts/ProductContext.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ProductContextProvider>
					<CategoryContextProvider>
						<CartProvider>
							<App />
						</CartProvider>
					</CategoryContextProvider>
				</ProductContextProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
