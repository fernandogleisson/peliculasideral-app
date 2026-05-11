/**
 * Re-export of Outline webhook HMAC verification.
 *
 * Source of truth lives in `src/lib/outline.ts`. This module exists so route
 * handlers can import from the domain-specific name (`@/lib/outline-webhook`)
 * without pulling the full Outline client surface.
 */
export { verifyWebhookSignature as verifyOutlineSignature } from './outline';
