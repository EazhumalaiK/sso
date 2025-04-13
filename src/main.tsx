import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig.ts";

const msalInstance = new PublicClientApplication(msalConfig);

// Initialize the MSAL instance and handle redirect promise
msalInstance.initialize().then(() => {
  msalInstance
    .handleRedirectPromise()
    .then((response) => {
      if (response) {
        console.log("Login successful:", response);
      }
    })
    .catch((error) => {
      console.error("Error during redirect handling:", error);
    });

  // Render the React app after MSAL initialization
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </StrictMode>
  );
});
