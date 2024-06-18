import Credentials from "next-auth/providers/credentials";
import { db } from "@/modules/services/laundry.db";
import { parseJwt } from "@/lib/auth/parse-jwt";
import { AxiosError } from "axios";

export interface JWTPayload {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  email: string;
  phone: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {};
  role: string;
  aal: string;
  amr: { method: string; timestamp: number }[];
  session_id: string;
  is_anonymous: boolean;
}

export const emailProvider = Credentials({
  type: "credentials",
  credentials: {
    email: {},
    password: {},
  },
  async authorize(credentials) {
    try {
      const { user, session } = await db.auth.login(
        credentials?.email as string,
        credentials?.password as string,
      );

      if (!user || !session) throw new Error(`HTTP Error: login`);

      if (!session?.access_token) throw new Error("No auth token in response");

      const parsedToken = parseJwt<JWTPayload>(session.access_token);

      if (!parsedToken) throw new Error("Invalid auth token");

      return {
        id: parsedToken.sub ?? "",
        expiresAt: parsedToken.exp,
        email: parsedToken.email ?? "",
        userMetadata: parsedToken.user_metadata,
        refreshToken: session.refresh_token,
        accessToken: session.access_token,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Email or password is incorrect");
      }
    }
    throw new Error("Unknown error");
  },
});
