import { useLayoutEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { refreshSession } from "@/services/auth/api";
import { AuthTokens } from "@/types/auth.types";

export const useSilentRefresh = (
  setTokens: (data: AuthTokens | null) => void
) => {
  const { getItem, setItem, removeItem } = useLocalStorage("tokens");
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  useLayoutEffect(() => {
    const run = async () => {
      const savedTokens = getItem();

      if (!savedTokens || !savedTokens.refreshToken) {
        // No tokens, nothing to refresh
        setIsBootstrapped(true);
        return;
      }

      try {
        // Try refreshing the session with saved refreshToken
        const response = await refreshSession(savedTokens.refreshToken);
        const freshTokens = response.data;

        setTokens(freshTokens);
        setItem(freshTokens);
      } catch {
        // Refresh failed — clean up
        removeItem();
        setTokens(null);
      } finally {
        // Mark bootstrap complete
        setIsBootstrapped(true);
      }
    };

    run();
  }, []);

  return {
    isBootstrapped,
  };
};
