import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type signInState = {
  isSignedIn: boolean;
  setIsSignedIn: (state: boolean) => void;
};

export const useSignInStore = create<signInState>()(
  immer((set) => ({
    isSignedIn: false,
    setIsSignedIn: (status) =>
      set((state) => {
        state.isSignedIn = status;
      }),
  })),
);
