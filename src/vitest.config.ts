import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    env: {
      NEXT_PUBLIC_SUPABASE_URL: "https://wsphrpbhhpjdhfeuwixi.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzcGhycGJoaHBqZGhmZXV3aXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5MjIzODgsImV4cCI6MjAxNjQ5ODM4OH0.HRIhWRzNbJUa8Dk_BWDSjqoBgzz-17J2ynW0Zrf7NFM",
    },
    globals: true,
  },
  resolve: {
    alias: {
      "@/*": path.resolve(__dirname, "./src/*"),
      "@/modules/*": path.resolve(__dirname, "./src/modules/*"),
    },
  },
});
