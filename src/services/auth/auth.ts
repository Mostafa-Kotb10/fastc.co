import { AxiosInstance, AxiosInstanceNoAuth } from "@/lib/axios";
import { SignInValues, SignUpValues } from "@/pages/sign-portal/schema";
import {
  AuthTokens,
  SignUpRequest,
  SignUpRequestValues,
  SignUpResponse,
} from "@/types/auth.types";
import { User } from "@/types/user.types";
import { OnboardingValues } from "@/validation/schema";

// 🔐 Sign-in
export const signIn = async (data: SignInValues) => {
  console.log("Sign Func", data);
  return (
    await AxiosInstanceNoAuth.post<AuthTokens>("/api/v1/auth/login", data)
  ).data;
};

// 👤 Get user info
export const getUser = async () => {
  return await AxiosInstance.get<User>("/api/v1/auth/me");
};

// 🔁 Refresh tokens using refreshToken in request body
export const refreshSession = async (refreshToken: string) => {
  return (
    await AxiosInstance.post<AuthTokens>("/api/v1/auth/refresh", {
      refreshToken,
    })
  )?.data;
};
// 🔐 Sign-UP

export const signUp = async (data: SignUpRequestValues) => {
  return await AxiosInstance.post<SignUpResponse>("/api/v1/auth/signup", data);
};
