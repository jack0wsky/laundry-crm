import { hkdf } from "@panva/hkdf";

/**
 * Key derivation function (KDF)
 * @param {Parameters<typeof hkdf>[1]} keyMaterial - key material
 * @param {Parameters<typeof hkdf>[2]} salt - salt
 * @returns {Promise<Buffer>} derived encryption key
 */

export async function getDerivedEncryptionKey(
  enc: string,
  keyMaterial: Parameters<typeof hkdf>[1],
  salt: Parameters<typeof hkdf>[2],
) {
  let length: number;
  switch (enc) {
    case "A256CBC-HS512":
      length = 64;
      break;
    case "A256GCM":
      length = 32;
      break;
    default:
      throw new Error("Unsupported JWT content encryption algorithm");
  }
  return hkdf("sha256", keyMaterial, salt, `elympics`, length);
}
