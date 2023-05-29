import { defineConfig } from "vite";
import { dirname } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

// I refactored the vite config from here: https://github.com/Shopify/shopify-app-template-node/tree/main
// might just use this instead: https://medium.com/@fredimanuelb/how-to-develop-a-react-and-express-application-using-vite-a493f3e844f5
const proxyOptions = {
  target: `http://127.0.0.1:8080`,
  changeOrigin: false,
  secure: true,
  ws: false,
};

const hmrConfig = {
  protocol: "ws",
  host: "localhost",
  port: 64999,
  clientPort: 64999,
};


// https://vitejs.dev/config/
export default defineConfig({
  root: dirname(fileURLToPath(import.meta.url)),
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: "localhost",
    port: 5172,
    hmr: hmrConfig,
    proxy: {
      "^/(\\?.*)?$": proxyOptions,
      "^/jobs(/|(\\?.*)?$)": proxyOptions,
    },
  },
})
