import { AuthTokens } from "@/types/auth.types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type authState = {
  tokens: AuthTokens | null;
  setJwt: (tokens: AuthTokens | null) => void;
};

export const authStore = create<authState>()(
  immer((set) => ({
    tokens: null,
    setJwt: (tokens) =>
      set((state) => {
        state.tokens = tokens;
      }),
  })),
);
