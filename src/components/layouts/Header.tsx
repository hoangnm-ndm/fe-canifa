import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header() {
	const { user, logout } = useContext(AuthContext) as AuthContextType;
	console.log(user);
	return (
		<header>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/products">Shop</Link>
				</li>
				{user ? (
					<>
						<li>
							<span>Welcome, {user?.email}</span>
						</li>
						<li>
							<button onClick={logout}>Logout</button>
						</li>
						<li>
							<Link to="/admin">You are admin?</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login">Login</Link>
							{"/"}
							<Link to="/register">Register</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}
