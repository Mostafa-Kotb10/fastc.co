import { useMutation } from "@tanstack/react-query";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { refreshSession, signIn, signUp } from "./api";
import { SignInValues } from "@/pages/sign-portal/schema";

import useAuthV2 from "@/hooks/useAuthV2";

import { toast } from "sonner";
import { SignUpRequestValues } from "@/types/auth.types";
import axios from "axios";
import { useSignInStore } from "@/store/signInStore";

import { User } from "@/types/user.types";
import { Pharmacy } from "@/pages/dashboard/pharmacy/pharmacy.types";

export const useSignUp = () => {
  const { setItem } = useLocalStorage("tokens");
  const { setTokens } = useAuthV2();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: SignUpRequestValues) => signUp(data),
    onSuccess: (data) => {
      console.log("response-data: ", data);
      setItem(data.jwt);
      setTokens(data.jwt);
      navigate("sign-portal?portal=sign-up");
      toast.success("Account created successfully!");
    },
    onError: (error) => {
      console.error("Sign-up failed:", error);

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

export const useSignIn = () => {
  const { setTokens } = useAuthV2();
  const { setItem, removeItem } = useLocalStorage("tokens");
  const { setIsSignedIn } = useSignInStore();

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: async (data) => {
      const SignInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.accessToken}`,
        },
      });

      try {
        const user: User = (await SignInstance.get("/api/v1/auth/me")).data;

        if (user.role === "EMPLOYEE") {
          toast("Unauthorized");
          return null;
        }

        if (user.role === "MANAGER") {
          const pharmacies: Pharmacy[] = (
            await SignInstance.get("/api/v1/users/pharmacy")
          ).data;
          navigate(`/dashboard/${pharmacies[0].id}`);
        }

        if (user.role === "OWNER") {
          navigate("/pick-pharmacy");
        }

        toast.success("Welcome");
        setTokens(data);
        setItem(data);
        setIsSignedIn(true);
      } catch (error) {
        console.log(error);
        setTokens(null);
        removeItem();
        setIsSignedIn(false);
      }
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

export const useSignOut = () => {
  const { removeItem } = useLocalStorage("tokens");
  const navigate = useNavigate();

  const signOut = () => {
    navigate("/");
    removeItem();
  };

  return { signOut };
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
