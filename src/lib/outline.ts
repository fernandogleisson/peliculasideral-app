/**
 * Outline (KB) client.
 *
 * `verifyWebhookSignature` has a real HMAC implementation (used by webhook
 * route). `getDocument` / `listDocuments` are stubs awaiting Phase F1+ work.
 */
import crypto from 'crypto';
import { env } from './env';

export interface OutlineDocument {
  id: string;
  title: string;
  text: string;
  collectionId: string;
  updatedAt: string;
}

export async function getDocument(_id: string): Promise<OutlineDocument> {
  throw new Error('TODO Phase F1: Outline getDocument not yet implemented');
}

export async function listDocuments(_opts?: {
  collectionId?: string;
  limit?: number;
}): Promise<OutlineDocument[]> {
  throw new Error('TODO Phase F1: Outline listDocuments not yet implemented');
}

/**
 * HMAC-SHA256 signature verification for Outline webhooks.
 *
 * @param rawBody Raw POST body string (read with `req.text()`).
 * @param signature Hex digest from `x-outline-signature` header.
 */
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature || !env.OUTLINE_WEBHOOK_SECRET) return false;
  const expected = crypto
    .createHmac('sha256', env.OUTLINE_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');
  if (expected.length !== signature.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}
