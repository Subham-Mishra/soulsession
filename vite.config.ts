import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr({
			exportAsDefault: true,
		}),
	],
	build: {
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, "index.html"),
			},
		},
		outDir: "build",
	},
	server: {
		host: true,
		strictPort: true,
		port: 3000,
		open: true,
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		css: true,
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "src"),
		}
	},
});
