import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type SignUpData = {
  username: string;
  email: string;
  password: string;
};

type SignUpState = {
  data: SignUpData;
  setData: (data: SignUpData) => void;
  resetData: () => void;
};

export const useSignUpStore = create<SignUpState>()(
  persist(
    immer((set) => ({
      data: {
        username: "",
        email: "",
        password: "",
      },

      setData: (newData) =>
        set((state) => {
          state.data = newData;
        }),

      resetData: () =>
        set((state) => {
          state.data = {
            username: "",
            email: "",
            password: "",
          };
        }),
    })),
    {
      name: "sign-up-data", // localStorage key
      partialize: (state) => ({ data: state.data }), // only persist the data, not methods
    },
  ),
);
