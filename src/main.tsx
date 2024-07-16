import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";
import ProductContextProvider from "./contexts/ProductContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ProductContextProvider>
					<App />
				</ProductContextProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
