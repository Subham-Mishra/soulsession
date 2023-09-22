import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "~/lib/constants";

const ProtectedRoutes: React.FC<{ type?: "private" | "public" }> = ({
	type = "private",
}) => {
	const location = useLocation();

	const isLoggedIn = !!localStorage.getItem(ACCESS_TOKEN_KEY);

	if (type === "public") {
		return isLoggedIn ? (
			<Navigate to="/dashboard" replace state={{ from: location }} />
		) : (
			<Outlet />
		);
	}

	return isLoggedIn ? (
		<Outlet />
	) : (
		<Navigate to="/" replace state={{ from: location }} />
	);
};

export default ProtectedRoutes;
