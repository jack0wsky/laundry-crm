import { getDerivedEncryptionKey } from "@/lib/auth/get-derived-encryption-key";
import {
  base64url,
  calculateJwkThumbprint,
  EncryptJWT,
  jwtDecrypt,
} from "jose";
import type { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_PREFIX } from "@/lib/auth";
import { ALG, AUTH_JWT_AGE, ENC } from "@/lib/auth/config";

type Digest = Parameters<typeof calculateJwkThumbprint>[1];
/**
 * Function for encoding a JWT payload
 * @param {JWT} [token] - JWT token to encode
 * @param {string} secret - secret key
 * @param {number} [maxAge] - maximum age of the token
 * @param {string} salt - salt for the encryption key
 * @returns {Promise<string>} encoded JWT token
 */

export async function encode(params: JWTEncodeParams): Promise<string> {
  const { token = {}, secret, maxAge = AUTH_JWT_AGE, salt } = params;
  const now = () => (Date.now() / 1000) | 0;
  const secrets = Array.isArray(secret) ? secret : [secret];
  const encryptionSecret = await getDerivedEncryptionKey(
    ENC,
    secrets[0],
    salt as string,
  );

  const thumbprint = await calculateJwkThumbprint(
    { kty: "oct", k: base64url.encode(encryptionSecret) },
    `sha${encryptionSecret.byteLength << 3}` as Digest,
  );
  const encoded = await new EncryptJWT(token)
    .setProtectedHeader({ alg: ALG, enc: ENC, kid: thumbprint })
    .setIssuedAt()
    .setExpirationTime(now() + maxAge)
    .setJti(crypto.randomUUID())
    .encrypt(encryptionSecret);
  return encoded;
}

/**
 * Function for decoding a JWT token
 * @param {string} [token] - JWT token to decode
 * @param {string} secret - secret key
 * @param {string} salt - salt for the encryption key
 * @returns {Promise<JWT | null>} decoded JWT token
 */
export async function decode(params: JWTDecodeParams): Promise<JWT | null> {
  const { token, secret, salt } = params;
  if (!token) return null;
  const secrets = Array.isArray(secret) ? secret : [secret];
  try {
    const { payload } = await jwtDecrypt(
      token,
      async ({ kid, enc }) => {
        for (const secret of secrets) {
          const encryptionSecret = await getDerivedEncryptionKey(
            enc,
            secret,
            salt as string,
          );
          if (kid === undefined) return encryptionSecret;

          const thumbprint = await calculateJwkThumbprint(
            { kty: "oct", k: base64url.encode(encryptionSecret) },
            `sha${encryptionSecret.byteLength << 3}` as Digest,
          );
          if (kid === thumbprint) return encryptionSecret;
        }

        throw new Error("No matching decryption secret");
      },
      {
        clockTolerance: 15,
        keyManagementAlgorithms: [ALG],
        contentEncryptionAlgorithms: [ENC, "A256GCM"],
      },
    );
    return payload as JWT;
  } catch (error) {
    return null;
  }
}

export function handleUnauthorizedRequest(
  request: NextRequest,
  unauthorizedUrl: string | URL,
): NextResponse {
  const response = NextResponse.redirect(unauthorizedUrl);
  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.startsWith(`${COOKIE_PREFIX}session`))
      response.cookies.delete(cookie.name);
  });
  return response;
}

export function isTokenExpired(expires?: number): boolean {
  if (!expires) return true;
  const timestamp = Math.floor(Date.now() / 1000);
  return timestamp >= expires;
}
