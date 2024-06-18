import { clientDB } from "@/modules/services/laundry.db";
import { JWT } from "next-auth/jwt";
import { parseJwt } from "@/lib/auth/parse-jwt";
import { JWTPayload } from "@/lib/auth/email-provider";

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const { data } = await clientDB.auth.refreshSession({
      refresh_token: token.refreshToken as string,
    });

    if (!data?.session?.access_token)
      throw new Error("No auth token in response");

    const parsedToken = parseJwt<JWTPayload>(data.session.access_token);
    if (!parsedToken) throw new Error("Invalid auth token");

    return {
      ...token,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token ?? token.refreshToken,
      accessTokenExpires: (parsedToken.exp ?? 0) - 10,
    };
  } catch (error) {
    return {
      ...token,
      accessToken: undefined,
      refreshToken: undefined,
      accessTokenExpires: 0,
      error: new Error("Failed to refresh access token", { cause: error }),
    };
  }
}
