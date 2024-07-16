import instance from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/interfaces/User";
import { schemaLogin, schemaRegister } from "@/utils/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Props = {
	isRegister?: boolean;
};

const AuthForm = ({ isRegister }: Props) => {
	const nav = useNavigate();
	const { login: contextLogin } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<User>({ resolver: zodResolver(isRegister ? schemaRegister : schemaLogin) });
	const onSubmit = async (user: User) => {
		try {
			if (isRegister) {
				const { data } = await instance.post("/auth/register", { email: user.email, password: user.password });
				console.log(data);
				alert(`Register success with email: ${data.email}`);
				nav("/login");
			} else {
				const { data } = await instance.post("/auth/login", user);
				console.log(data);
				contextLogin(data.token, data.user);
				nav(data.user.role === "admin" ? "/admin" : "/");
			}
		} catch (error: any) {
			console.log(error);
			alert(error.response.data.message);
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h1>{isRegister ? "Register" : "Login"}</h1>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						email
					</label>
					<input className="form-control" type="email" {...register("email")} />
					{errors.email && <p className="text-danger">{errors.email.message}</p>}
				</div>

				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						password
					</label>
					<input className="form-control" type="password" {...register("password")} />
					{errors.password && <p className="text-danger">{errors.password.message}</p>}
				</div>

				{isRegister && (
					<div className="mb-3">
						<label htmlFor="confirmPass" className="form-label">
							Confirm password
						</label>
						<input className="form-control" type="password" {...register("confirmPass")} />
						{errors.confirmPass && <p className="text-danger">{errors.confirmPass.message}</p>}
					</div>
				)}

				<div className="mb-3">
					<button type="submit" className="btn btn-primary w-100">
						{isRegister ? "Register" : "Login"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AuthForm;
