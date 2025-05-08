import { AxiosInstance } from "@/lib/axios";
import { User } from "@/types/user.types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { AuthTokens } from "@/types/auth.types";

type AuthState = {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
};

type AuthActions = {
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  refresh: () => Promise<string | null>;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = create<AuthState & AuthActions>()(
  immer((set, get) => ({
    accessToken: null,
    user: null,
    loading: true,

    setAccessToken: (token) =>
      set((state) => {
        state.accessToken = token;
      }),

    setUser: (user) =>
      set((state) => {
        state.user = user;
      }),

    setLoading: (loading) =>
      set((state) => {
        state.loading = loading;
      }),

    refresh: async () => {
      try {
        const res = await AxiosInstance.post<AuthTokens>("/api/refresh");
        const newToken = res.data.accessToken;

        set((state) => {
          state.accessToken = newToken;
        });

        return newToken;
      } catch (error) {
        console.error("Error occurred while refreshing the token:", error);
        set((state) => {
          state.accessToken = null;
          state.user = null;
        });
        return null;
      }
    },

    fetchUser: async () => {
      const token = get().accessToken;
      if (!token) return;

      const res = await AxiosInstance.get<User>("/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => {
        state.user = res.data;
      });
    },

    logout: async () => {
      await AxiosInstance.post("/api/logout");
      set((state) => {
        state.accessToken = null;
        state.user = null;
      });
    },
  }))
);
