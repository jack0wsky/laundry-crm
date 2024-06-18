import { NextRequest } from "next/server";
import { COOKIE_PREFIX } from "@/lib/auth";

export function getChunkedTokenFromRequest(request: NextRequest): string {
  let cookieToken = "";
  const sessionCookies = request.cookies
    .getAll()
    .filter((cookie) => cookie.name.startsWith(`${COOKIE_PREFIX}session`));
  sessionCookies
    .sort((a, b) => {
      const aIndex = parseInt(a.name.split(".")[2] || "0");
      const bIndex = parseInt(b.name.split(".")[2] || "0");
      return aIndex - bIndex;
    })
    .forEach((cookie) => {
      cookieToken += cookie.value;
    });
  return cookieToken;
}
