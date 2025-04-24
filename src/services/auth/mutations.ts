import { useMutation } from "@tanstack/react-query";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { refreshSession, signIn, signUp } from "./auth";
import { SignInValues, SignUpValues } from "@/pages/sign-portal/schema";

import useAuthV2 from "@/hooks/useAuthV2";
import { OnboardingValues } from "@/validation/schema";
import { toast } from "sonner";

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

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: SignInValues) => signIn(data),
    onSuccess: (data) => {
      console.log("Login Success");
      setTokens(data);
      setItem(data);
      navigate("/dashboard");
    },
    onError: () => {
      console.error("Sign-in failed.");
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

type SignUpParam = Omit<SignUpValues, "repassword"> & OnboardingValues;

export const useSignUp = () => {
  // const { setItem } = useLocalStorage("tokens");
  // const { setTokens } = useAuthV2();
  // const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: SignUpParam) => {
      console.log("Sending to /signup:", data);
      return signUp(data);
    },
    onSuccess: (data) => {
      console.log("Success", data);
      toast.success("Account created Successully")
    },
    onError: (error) => {
      console.error("Sign-up failed:", error);
      toast.error("An error occured", {
        description: error.message
      });
    },
  });
  return {
    ...mutation,
    signUp: mutation.mutate,
  };
};
