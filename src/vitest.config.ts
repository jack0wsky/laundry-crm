import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import { resolve } from "node:url";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    env: {
      NEXT_PUBLIC_SUPABASE_URL: "https://wsphrpbhhpjdhfeuwixi.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "ey12345",
    },
    globals: true,
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
