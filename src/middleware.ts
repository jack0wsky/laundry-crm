import {
  decode,
  encode,
  isTokenExpired,
  handleUnauthorizedRequest,
} from "@/lib/auth/utils";
import { AUTH_JWT_AGE } from "@/lib/auth/config";
import { getChunkedTokenFromRequest } from "@/lib/auth/get-chunked-request";
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_PREFIX, AUTH_SECRET } from "@/lib/auth";
import { updateSessionCookie } from "@/lib/auth/update-session-cookie";
import { refreshAccessToken } from "@/lib/auth/refresh-access-token";
import { JWT } from "next-auth/jwt";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { clientDB, db } from "@/modules/services/laundry.db";
import { updateSession } from "@/lib/auth/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

/*
export default async function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const isApiRoute = request.nextUrl.pathname.startsWith("/api");

  const unauthorizedUrl = new URL("/login", request.nextUrl.origin);

  if (!isApiRoute) {
    const baseRoutes = ["/"];

    const isGuestRoute = ["/login"].some((route) =>
      request.nextUrl.pathname.includes(route),
    );

    if (!baseRoutes.includes(request.nextUrl.pathname) && !isGuestRoute) {
      const paramsUrl = new URL(
        request.nextUrl.pathname,
        process.env.NEXT_PUBLIC_APP_URI,
      );
      unauthorizedUrl.searchParams.set("callbackUrl", paramsUrl.href);
    }

    const code = searchParams.get("code");
    if (code) {
      unauthorizedUrl.searchParams.set("code", code);
    }

    const cookieToken = getChunkedTokenFromRequest(request);

    if (!cookieToken && !isGuestRoute) {
      return handleUnauthorizedRequest(request, unauthorizedUrl);
    }

    const token = await decode({
      token: cookieToken,
      secret: AUTH_SECRET,
      salt: `${COOKIE_PREFIX}session`,
    });

    if (!token?.accessToken && !isGuestRoute) {
      return handleUnauthorizedRequest(request, unauthorizedUrl);
    }

    if (isGuestRoute && token) {
      const redirectUrl = new URL(request.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }

    const isAccessTokenExpired =
      token?.accessToken && isTokenExpired(token.exp);

    let response = NextResponse.next();

    let newSessionToken = null;
    let refreshedToken = null;

    if (isAccessTokenExpired) {
      try {
        refreshedToken = await refreshAccessToken(token);
        newSessionToken = await encode({
          secret: AUTH_SECRET,
          token: refreshedToken,
          maxAge: AUTH_JWT_AGE,
          salt: `${COOKIE_PREFIX}session`,
        });
      } catch (error) {
        newSessionToken = null;
      }
    }

    if (newSessionToken) {
      try {
        response = updateSessionCookie(
          newSessionToken,
          request,
          response,
          unauthorizedUrl,
        );
      } catch (error) {
        return handleUnauthorizedRequest(request, unauthorizedUrl);
      }
    }

    if (!newSessionToken && isAccessTokenExpired) {
      return handleUnauthorizedRequest(request, unauthorizedUrl);
    }

    return response;
  } else {
    const cookieToken = getChunkedTokenFromRequest(request);

    if (!cookieToken) {
      return handleUnauthorizedRequest(request, unauthorizedUrl);
    }

    const token = await decode({
      token: cookieToken,
      secret: AUTH_SECRET,
      salt: `${COOKIE_PREFIX}session`,
    });

    if (!token?.accessToken) {
      return handleUnauthorizedRequest(request, unauthorizedUrl);
    }

    const isDeveloperTokenExpired =
      token.accessToken && isTokenExpired(token.exp);
    const rewriteUrl = new URL(
      "/v2" + request.nextUrl.pathname,
      process.env.NEXT_PUBLIC_API_URI,
    );
    request.nextUrl.searchParams.forEach((value, key) => {
      rewriteUrl.searchParams.append(key, value);
    });

    let response = NextResponse.rewrite(rewriteUrl, {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
      },
    });

    let newSessionToken = null;
    let refreshedToken = null;

    if (isDeveloperTokenExpired) {
      try {
        refreshedToken = await refreshAccessToken(token);
        newSessionToken = await encode({
          secret: AUTH_SECRET,
          token: refreshedToken?.accessToken as unknown as JWT,
          maxAge: AUTH_JWT_AGE,
          salt: `${COOKIE_PREFIX}session`,
        });
      } catch (error) {
        newSessionToken = null;
      }
    }

    if (newSessionToken) {
      response.headers.set(
        "authorization",
        `Bearer ${refreshedToken?.accessToken}`,
      );
      try {
        response = updateSessionCookie(
          newSessionToken,
          request,
          response,
          unauthorizedUrl,
        );
      } catch (error) {
        return handleUnauthorizedRequest(request, unauthorizedUrl);
      }
    }

    if (!newSessionToken && isDeveloperTokenExpired) {
      return handleUnauthorizedRequest(request, unauthorizedUrl);
    }
    return response;
  }
}

 */

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
};
