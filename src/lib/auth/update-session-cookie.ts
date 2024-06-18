import { AUTH_URL, COOKIE_PREFIX } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { handleUnauthorizedRequest } from "@/lib/auth/utils";
import { AUTH_JWT_AGE } from "@/lib/auth/config";

export function updateSessionCookie(
  sessionToken: string | null,
  request: NextRequest,
  response: NextResponse,
  errorRedirectUrl?: string | URL,
): NextResponse<unknown> {
  const rewrite = response.headers.get("x-middleware-rewrite");

  if (sessionToken) {
    const size = 3933; // maximum size of each chunk in bytes
    const tokenChunks = sessionToken.match(
      new RegExp(".{1," + size + "}", "g"),
    );

    if (tokenChunks && tokenChunks.length > 1) {
      tokenChunks.forEach((tokenChunk, index) => {
        request.cookies.set(`${COOKIE_PREFIX}session.${index}`, tokenChunk);
      });
      response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
      request.cookies.getAll().forEach((cookie) => {
        if (cookie.name === `${COOKIE_PREFIX}session`) {
          response.cookies.delete(cookie.name);
        }
      });
      tokenChunks.forEach((tokenChunk, index) => {
        response.cookies.set(`${COOKIE_PREFIX}session.${index}`, tokenChunk, {
          httpOnly: true,
          maxAge: AUTH_JWT_AGE,
          path: "/",
          sameSite: "lax",
          secure: AUTH_URL?.startsWith("https://"),
        });
      });
    } else {
      const currentChunks = request.cookies
        .getAll()
        .filter((cookie) =>
          cookie.name.match(new RegExp(`${COOKIE_PREFIX}session\\.\\d+`)),
        );
      const chunkSize = Math.ceil(sessionToken.length / currentChunks.length);
      if (currentChunks.length > 0) {
        for (let i = 0; i < currentChunks.length; i++) {
          const start = i * chunkSize;
          const end = start + chunkSize;
          const tokenChunk = sessionToken.slice(start, end);
          request.cookies.set(`${COOKIE_PREFIX}session.${i}`, tokenChunk);
        }
      } else {
        request.cookies.set(`${COOKIE_PREFIX}session`, sessionToken);
      }
      response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
      if (currentChunks.length > 0) {
        for (let i = 0; i < currentChunks.length; i++) {
          const start = i * chunkSize;
          const end = start + chunkSize;
          const tokenChunk = sessionToken.slice(start, end);
          response.cookies.set(`${COOKIE_PREFIX}session.${i}`, tokenChunk, {
            httpOnly: true,
            maxAge: AUTH_JWT_AGE,
            path: "/",
            sameSite: "lax",
            secure: AUTH_URL?.startsWith("https://"),
          });
        }
      } else {
        response.cookies.set(`${COOKIE_PREFIX}session`, sessionToken, {
          httpOnly: true,
          maxAge: AUTH_JWT_AGE,
          path: "/",
          sameSite: "lax",
          secure: AUTH_URL?.startsWith("https://"),
        });
      }
    }
  } else {
    const url = errorRedirectUrl
      ? errorRedirectUrl
      : new URL("/login", request.url);
    return handleUnauthorizedRequest(request, url);
  }

  if (rewrite) {
    response.headers.set("x-middleware.ts-rewrite", rewrite);
  }

  return response;
}
