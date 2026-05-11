import { describe, it, expect, beforeAll, vi } from 'vitest';
import crypto from 'crypto';

const SECRET = 'test-outline-webhook-secret';

beforeAll(() => {
  process.env.OUTLINE_WEBHOOK_SECRET = SECRET;
  // Silence the route's console.warn for valid events under test.
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

async function loadRoute() {
  // Re-import after env mutation (vitest module cache + env validator).
  vi.resetModules();
  return await import('./route');
}

describe('POST /api/webhooks/outline', () => {
  it('returns 401 without signature', async () => {
    const { POST } = await loadRoute();
    const req = new Request('http://test/api/webhooks/outline', {
      method: 'POST',
      body: '{}',
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 200 with valid signature', async () => {
    const { POST } = await loadRoute();
    const body = '{"event":"documents.update","payload":{}}';
    const sig = crypto.createHmac('sha256', SECRET).update(body).digest('hex');
    const req = new Request('http://test/api/webhooks/outline', {
      method: 'POST',
      body,
      headers: { 'x-outline-signature': sig },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
