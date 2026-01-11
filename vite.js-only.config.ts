/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "/src/tests/setup.ts",
  },
  define: {
    "process.env": {},
  },
  build: {
    lib: {
      entry: "./src/main.tsx",
      name: "ButtonPaymentWidget",
      fileName: "widget",
      formats: ["umd"],
    },
  },
});
