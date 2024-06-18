/**
 * Returns a object representation of a Javascript Web Token (JWT)
 *
 * @template T expected shape of the parsed token
 * @param {string} token a Javascript Web Token in base64 encoded, `.` separated form
 * @returns {(T | undefined)} an object-representation of the token
 */
export function parseJwt<T extends object = { [k: string]: string | number }>(
  token: string,
): T | undefined {
  try {
    //eslint-disable-next-line
    return JSON.parse(Buffer.from(token.split(".")[1]!, "base64").toString());
  } catch {
    return undefined;
  }
}
