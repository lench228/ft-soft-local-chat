import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "node:path";
import { packageDirectorySync } from "pkg-dir";
import stringHash from "string-hash";

const packageRoot = packageDirectorySync();

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: (name, css) => {
        if (name === "dark") return "dark";
        const i = css.indexOf(`.${name}`);
        const lineNumber = css.substr(0, i).split(/[\r\n]/).length;
        const hash = stringHash(css).toString(36).substr(0, 5);

        return `_${name}_${hash}_${lineNumber}`;
      },
    },
  },
  resolve: {
    alias: {
      features: path.resolve(packageRoot, "./src/features"),

      pages: path.resolve(packageRoot, "./src/pages"),
      entities: path.resolve(packageRoot, "./src/entities"),
      shared: path.resolve(packageRoot, "./src/shared"),
      app: path.resolve(packageRoot, "./src/app"),
      widgets: path.resolve(packageRoot, "./src/widgets"),
    },
  },
});
