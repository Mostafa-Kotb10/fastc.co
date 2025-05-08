// src/types/auth.ts

import { User } from "./user.types";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: number;
  refreshTokenExpiration: number;
}

export interface SignUpRequestValues {
  username: string;
  email: string;
  password: string;
  managedUser?: boolean;
}

type ErrorResponse = {
  error: string;
  message: string;
  timestamp: string;
  status: number;
};

export type SignUpResponse = { user: User; jwt: AuthTokens };
