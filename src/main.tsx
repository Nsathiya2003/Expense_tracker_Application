import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./context/AppProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/apiClient.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* We can create client provider for all main...*/}
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>
);
