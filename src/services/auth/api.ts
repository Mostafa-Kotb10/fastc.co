import { AxiosInstance, AxiosInstanceNoAuth } from "@/lib/axios";
import { SignInValues } from "@/pages/sign-portal/schema";
import {
  AuthTokens,
  SignUpRequestValues,
  SignUpResponse,
} from "@/types/auth.types";
import { User } from "@/types/user.types";

export const signIn = async (data: SignInValues) => {
  console.log("Sign Func", data);
  return (
    await AxiosInstanceNoAuth.post<AuthTokens>("/api/v1/auth/login", data)
  ).data;
};

export const getUser = async () => {
  return (await AxiosInstance.get<User>("/api/v1/auth/me")).data;
};

export const refreshSession = async (refreshToken: string | undefined) => {
  return (
    await AxiosInstance.post<AuthTokens>("/api/v1/auth/refresh", {
      refreshToken,
    })
  ).data;
};

export const signUp = async (data: SignUpRequestValues) => {
  return (await AxiosInstance.post<SignUpResponse>("/api/v1/auth/signup", data)).data;
};
