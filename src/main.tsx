import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage";
import "./styles/index.css";
import "./styles/tailwind.css";

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<ErrorBoundary FallbackComponent={ErrorPage}>
				<Theme accentColor="purple">
					<App />
					<Toaster position="bottom-center" />
				</Theme>
			</ErrorBoundary>
		</React.StrictMode>
	);
}
