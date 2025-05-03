import { useMutation } from "@tanstack/react-query";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { refreshSession, signIn, signUp } from "./auth";
import { SignInValues } from "@/pages/sign-portal/schema";

import useAuthV2 from "@/hooks/useAuthV2";

import { toast } from "sonner";
import { SignUpRequestValues } from "@/types/auth.types";
import axios from "axios";
import { useSignInStore } from "@/store/signInStore";

export const useSignOut = () => {
  const { removeItem } = useLocalStorage("tokens");
  const navigate = useNavigate();

  const signOut = () => {
    navigate("/");
    removeItem();
  };

  return { signOut };
};

export const useSignInV2 = () => {
  const { setTokens } = useAuthV2();
  const { setItem } = useLocalStorage("tokens");
  const { setIsSignedIn } = useSignInStore();

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: (data) => {
      toast.success("Welcome!");
      setTokens(data);
      setItem(data);
      setIsSignedIn(true);
      navigate("/pick-pharmacy");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Unknown error";
        toast.error(`Couldn't login: ${errorMessage}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  return {
    signIn: mutate,
    isPending,
    error,
  };
};

export const useRefreshToken = () => {
  const { tokens, setTokens } = useAuthV2();
  const { setItem } = useLocalStorage("tokens");

  const {
    mutate: refresh,
    isPending: isRefreshing,
    error,
  } = useMutation({
    mutationFn: () => {
      if (!tokens?.refreshToken) {
        return Promise.reject(new Error("No refresh token available"));
      }

      return refreshSession(tokens.refreshToken);
    },
    onSuccess: (tokens) => {
      console.log("new-tokens: ", tokens);
      setTokens(tokens);
      setItem(tokens);
      return tokens;
    },
    onError: (error) => {
      console.log("Error occurred while refreshing the token", error);
      setTokens(null);
      setTokens(null);
    },
  });

  return {
    refresh,
    isRefreshing,
    error,
  };
};

export const useSignUp = () => {
  // const { setItem } = useLocalStorage("tokens");
  // const { setTokens } = useAuthV2();
  // const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: SignUpRequestValues) => signUp(data),
    onSuccess: (data) => {
      console.log("response-data: ", data);
      toast.success("Account created successfully!");
    },
    onError: (error) => {
      console.error("Sign-up failed:", error);

      // Properly handle Axios errors
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
        const errorMessage =
          errorResponse?.message || "An error occurred during sign up";
        toast.error("Sign up failed", {
          description: errorMessage,
        });
      } else {
        toast.error("Sign up failed", {
          description: "An unexpected error occurred",
        });
      }
    },
  });
  return {
    signUp: mutate,
    isSigningIn: isPending,
    error,
  };
};
