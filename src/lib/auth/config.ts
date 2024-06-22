export const ALG = "dir";
export const ONE_DAY = 60 * 60 * 24;
export const ENC = "A256CBC-HS512";

export const AUTH_JWT_AGE: number =
  parseInt(process.env.AUTH_JWT_AGE!) || ONE_DAY;
