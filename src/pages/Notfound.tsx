import { Link } from "react-router-dom";

export default function Notfound() {
	return (
		<>
			<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<h1 className="text-base font-semibold text-indigo-600">404</h1>
					<h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h2>
					<p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link to="/" className="btn btn-primary">
							Go back home
						</Link>{" "}
						{"  "}
						<Link to="/admin" className="text-sm font-semibold text-gray-900">
							You are admin? <span aria-hidden="true">&rarr;</span>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}
