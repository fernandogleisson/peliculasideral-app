/**
 * Generic HMAC-SHA256 webhook signature verification.
 *
 * Each provider sends a different header name and may use a different
 * encoding (hex vs base64). This helper handles hex/base64 + timing-safe
 * comparison + secret presence check.
 */
import crypto from 'crypto';

export type SignatureEncoding = 'hex' | 'base64';

export function verifyHmac(
  rawBody: string,
  signature: string | null | undefined,
  secret: string | undefined,
  encoding: SignatureEncoding = 'hex',
): boolean {
  if (!secret || !signature) return false;

  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest(encoding);

  // Some providers prefix with 'sha256=' — strip if present.
  const sig = signature.startsWith('sha256=') ? signature.slice(7) : signature;

  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
