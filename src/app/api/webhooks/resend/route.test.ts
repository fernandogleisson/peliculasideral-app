import { describe, it, expect, beforeAll, vi } from 'vitest';
import crypto from 'crypto';

const SECRET = 'test-resend-webhook-secret';

beforeAll(() => {
  process.env.RESEND_WEBHOOK_SECRET = SECRET;
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

async function loadRoute() {
  vi.resetModules();
  return await import('./route');
}

describe('POST /api/webhooks/resend', () => {
  it('returns 401 without signature', async () => {
    const { POST } = await loadRoute();
    const req = new Request('http://test/api/webhooks/resend', {
      method: 'POST',
      body: '{}',
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 200 with valid signature', async () => {
    const { POST } = await loadRoute();
    const body = '{"type":"email.delivered","data":{}}';
    const sig = crypto.createHmac('sha256', SECRET).update(body).digest('base64');
    const req = new Request('http://test/api/webhooks/resend', {
      method: 'POST',
      body,
      headers: { 'svix-signature': sig },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
