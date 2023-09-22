import type { RouteObject } from "react-router-dom";
import ProtectedRoutes from "~/features/Authentication/ProtectedRoute";
import AuthPage from "../features/Authentication";
import ErrorPage from "../pages/ErrorPage";

export const publicRoutes: Array<RouteObject> = [
	{
		path: "/",
		element: <ProtectedRoutes type="public" />,
		children: [
			{
				index: true,
				element: <AuthPage role="coach"/>,
			},
			{ path: "/patient", element: <AuthPage role="patient" /> },
			{
				path: "*",
				element: <ErrorPage />,
			},
		],
	},
];
