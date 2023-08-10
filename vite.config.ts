/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/starwars-list/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTest.ts",
  },
});
