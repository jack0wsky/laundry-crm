import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    error?: Error | string;
  }
}ó
