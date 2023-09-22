import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: true,
		},
	},
});

const App = (): JSX.Element => {
	const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
};

export default App;
