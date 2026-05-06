import { describe, it, expect, beforeAll, vi } from 'vitest';
import crypto from 'crypto';

const SECRET = 'test-paperclip-callback-secret';

beforeAll(() => {
  process.env.PAPERCLIP_CALLBACK_SECRET = SECRET;
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

async function loadRoute() {
  vi.resetModules();
  return await import('./route');
}

describe('POST /api/webhooks/paperclip', () => {
  it('returns 401 without signature', async () => {
    const { POST } = await loadRoute();
    const req = new Request('http://test/api/webhooks/paperclip', {
      method: 'POST',
      body: '{}',
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 200 with valid signature', async () => {
    const { POST } = await loadRoute();
    const body = '{"taskId":"abc","status":"done"}';
    const sig = crypto.createHmac('sha256', SECRET).update(body).digest('hex');
    const req = new Request('http://test/api/webhooks/paperclip', {
      method: 'POST',
      body,
      headers: { 'x-paperclip-signature': sig },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
