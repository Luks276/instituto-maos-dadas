import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
	base: "./",
	build: {
		rollupOptions: {
			input: {
				index: resolve(projectRoot, "index.html"),
				inicio: resolve(projectRoot, "html/inicio.html"),
				projetos: resolve(projectRoot, "html/projetos.html"),
				cadastro: resolve(projectRoot, "html/cadastro.html"),
			},
		},
	},
});
