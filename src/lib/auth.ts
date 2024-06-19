import NextAuth, { Session } from "next-auth";
import { encode, decode } from "@/lib/auth/utils";
import { AUTH_JWT_AGE } from "@/lib/auth/config";
import { emailProvider } from "@/lib/auth/email-provider";
import { JWT } from "next-auth/jwt";

export const AUTH_SECRET = "changeme";
export const COOKIE_PREFIX = "laundry-crm__";

export const AUTH_URL = "http://localhost:3000/api/auth";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  session: { strategy: "jwt", maxAge: AUTH_JWT_AGE },
  jwt: {
    encode,
    decode,
  },
  secret: AUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `${COOKIE_PREFIX}session`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        maxAge: AUTH_JWT_AGE,
        path: "/",
        secure: AUTH_URL.startsWith("https://"),
      },
    },
    callbackUrl: {
      name: `${COOKIE_PREFIX}callback`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: AUTH_URL.startsWith("https://"),
      },
    },
    csrfToken: {
      name: `${COOKIE_PREFIX}csrf`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: AUTH_URL?.startsWith("https://"),
      },
    },
    pkceCodeVerifier: {
      name: `${COOKIE_PREFIX}pkce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: AUTH_URL?.startsWith("https://"),
        maxAge: 900,
      },
    },
    state: {
      name: `${COOKIE_PREFIX}state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: AUTH_URL?.startsWith("https://"),
        maxAge: 900,
      },
    },
    nonce: {
      name: `${COOKIE_PREFIX}nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: AUTH_URL?.startsWith("https://"),
      },
    },
  },
  providers: [emailProvider],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token?: JWT }) {
      if (!token) return session;

      session.user = {
        id: token.sub,
        email: token.email,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
});
