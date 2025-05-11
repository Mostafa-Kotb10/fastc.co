import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from "./App.tsx";
import { AuthProviderV2 } from "./components/auth/AuthProviderV2.tsx";
import { queryClient } from "./queryClient.tsx";

import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviderV2>
        <App />
      </AuthProviderV2>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Toaster
        position="top-center"
        icons={{
          success: <FaCheckCircle className="size-4 text-green-500" />, //
          error: <FaExclamationCircle className="size-4 text-red-500" />, //
          warning: <FaExclamationTriangle className="size-4 text-yellow-500" />,
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
);
