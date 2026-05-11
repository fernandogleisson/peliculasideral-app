import { describe, it, expect, beforeAll, vi } from 'vitest';
import crypto from 'crypto';

const SECRET = 'test-asaas-webhook-secret';

beforeAll(() => {
  process.env.ASAAS_WEBHOOK_SECRET = SECRET;
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

async function loadRoute() {
  vi.resetModules();
  return await import('./route');
}

describe('POST /api/webhooks/asaas', () => {
  it('returns 401 without signature', async () => {
    const { POST } = await loadRoute();
    const req = new Request('http://test/api/webhooks/asaas', {
      method: 'POST',
      body: '{}',
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 200 with valid signature', async () => {
    const { POST } = await loadRoute();
    const body = '{"event":"PAYMENT_CONFIRMED"}';
    const sig = crypto.createHmac('sha256', SECRET).update(body).digest('hex');
    const req = new Request('http://test/api/webhooks/asaas', {
      method: 'POST',
      body,
      headers: { 'asaas-access-token': sig },
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
