// Vite settings: the tool that runs the dev server and builds the React app.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // During development, any request to /api/... is forwarded to our Express server.
    // This means we can write axios.get("/api/tasks") with no CORS problems.
    proxy: {
      "/api": "http://localhost:3010",
    },
  },
});
