// src/types/auth.ts

import { User } from "./user.types";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: number;
  refreshTokenExpiration: number;
}

export interface SignUpResponse {
  user: User;
  jwt: AuthTokens;
}
