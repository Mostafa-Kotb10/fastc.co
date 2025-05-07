import { createContext, useLayoutEffect, useState } from "react";
import { AxiosInstance } from "@/lib/axios";
import { AuthTokens } from "@/types/auth.types";
import { refreshSession } from "../../services/auth/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { FullScreenSpinner } from "@/components/Spinner";

interface AuthContextType {
  tokens: AuthTokens | null;
  setTokens: (data: AuthTokens | null) => void;
  isLoading: boolean; // Loading state for token refresh
  error: string | null; // Optional error state
}

const AuthContextV2 = createContext<AuthContextType | null>(null);

export const AuthProviderV2 = ({ children }: { children: React.ReactNode }) => {
  // Get the tokens from localStorage if they exist.
  const { getItem, setItem, removeItem } =
    useLocalStorage<AuthTokens>("tokens");
  const storedTokens = getItem();

  // Initialize state with the value from localStorage (or null if none)
  const [tokens, setTokens] = useState<AuthTokens | null>(storedTokens);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for token refresh
  const [error, setError] = useState<string | null>(null); // Error state for refresh failures

  // useLayoutEffect(() => {
  //   const storedTokens = getItem();

  //   const initialize = async () => {
  //     if (storedTokens && storedTokens.refreshToken) {
  //       try {
  //         setIsLoading(true);
  //         const response = await refreshSession(storedTokens.refreshToken);
  //         setTokens(response.data);
  //         setItem(response.data);
  //       } catch (err) {
  //         console.error("Failed to refresh session during init:", err);
  //         setTokens(null);
  //         setError("Session expired");
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   initialize();
  // }, []);

  // Add the Auth header to the upcoming requests.

  useLayoutEffect(() => {
    const authInterceptor = AxiosInstance.interceptors.request.use((config) => {
      config.withCredentials = true;
      config.headers.Authorization =
        !config._retry && tokens
          ? `Bearer ${tokens.accessToken}`
          : config.headers.Authorization;
      return config;
    });

    return () => AxiosInstance.interceptors.request.eject(authInterceptor);
  }, [tokens]);

  // Refresh logic. Listen to errors.
  useLayoutEffect(() => {
    const refreshInterceptor = AxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error?.response?.status === 401 &&
          error?.response?.data?.message === "Unauthorized"
        ) {
          try {
            setIsLoading(true); // Start loading state

            const response = await refreshSession(tokens?.refreshToken);
            setTokens(response); // Update tokens

            originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
            originalRequest._retry = true;
            setIsLoading(false); // End loading state
            return AxiosInstance(originalRequest);
          } catch (error) {
            setError("Failed to refresh session"); // Set error state
            console.log(error);
            setTokens(null); // Clear tokens on failure
            setIsLoading(false); // End loading state
          }

          return Promise.reject(error);
        }
      },
    );

    return () => {
      AxiosInstance.interceptors.response.eject(refreshInterceptor);
    };
  }, [tokens]);

  return (
    <AuthContextV2.Provider value={{ tokens, setTokens, isLoading, error }}>
      {isLoading ? <FullScreenSpinner size={32} /> : children}
    </AuthContextV2.Provider>
  );
};

export default AuthContextV2;
