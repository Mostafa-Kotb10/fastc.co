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

// export const useSignIn = () => {
//   const navigate = useNavigate();
//   const { setItem } = useLocalStorage("tokens");
//   const { setTokens } = useAuthV2();

//   const mutation = useMutation({
//     mutationFn: (data: SignInValues) => signIn(data),
//     onSuccess: async (response) => {
//       const tokens = response.data;
//       setTokens(tokens);
//       setItem(tokens);
//       navigate("/dashboard");
//     },
//     onError: () => {
//       console.error("Sign-in failed.");
//     },
//   });

//   return {
//     ...mutation,
//     signIn: mutation.mutate,
//     tokens: mutation.data?.data,
//   };
// };

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
    onError: () => {
      console.log("Error occurred while refreshing the token");
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
    },
    onError: (error) => {
      console.error("Sign-up failed:", error);

      // Safely access error data
      const errorMessage =
        error?.data?.message || error?.message || "Something went wrong";

      toast.error("An error occurred", {
        description: errorMessage,
      });
    },
  });
  return {
    signUp: mutate,
    isSigningIn: isPending,
    error,
  };
};
