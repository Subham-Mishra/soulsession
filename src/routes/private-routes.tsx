import type { RouteObject } from "react-router-dom";
import Dashboard from "~/pages/Dashboard";

export const privateRoutes: Array<RouteObject> = [
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
];
