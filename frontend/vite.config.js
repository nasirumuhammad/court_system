import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: { chunkSizeWarningLimit: 1000 },
  plugins: [tailwindcss()],
});
