import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { validateEnvironmentVariables } from "./utils/validateEnv";

// Validate environment variables on app startup
validateEnvironmentVariables();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
