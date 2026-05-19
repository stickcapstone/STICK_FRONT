import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      "Content-Security-Policy": "connect-src 'self' http://43.203.78.189:8081"
    }
  }
});
