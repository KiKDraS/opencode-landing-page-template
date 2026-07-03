import path from "node:path";
import { defineConfig } from "vite";

const folderName = path.basename(process.cwd());

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? `/${folderName}` : "/",
    publicDir: "public",
    build: {
      outDir: "dist",
    },
    css: {
      transformer: "lightningcss",
    },
  };
});
