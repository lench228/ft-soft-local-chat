import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import stringHash from "string-hash";
// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    css: {
        modules: {
            generateScopedName: (name, css) => {
                if (name === "dark")
                    return "dark";
                const i = css.indexOf(`.${name}`);
                const lineNumber = css.substr(0, i).split(/[\r\n]/).length;
                const hash = stringHash(css).toString(36).substr(0, 5);
                return `_${name}_${hash}_${lineNumber}`;
            },
        },
    },
    resolve: {
        alias: {
            features: "/src/features",
            pages: "/src/pages",
            entities: "/src/entities",
            shared: "/src/shared",
            app: "/src/app",
            widgets: "/src/widgets",
        },
    },
});
