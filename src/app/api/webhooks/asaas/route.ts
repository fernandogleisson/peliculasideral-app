import { NextResponse } from 'next/server';
import { verifyHmac } from '@/lib/webhook-hmac';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('asaas-access-token') ?? req.headers.get('x-asaas-signature');
  // Asaas does not strictly use HMAC — historically they verify by access-token
  // header equality. Until the real flow is wired up, we still gate via HMAC
  // helper so the endpoint can't be fired anonymously in dev/staging.
  if (!verifyHmac(body, sig, process.env.ASAAS_WEBHOOK_SECRET)) {
    return new NextResponse('invalid signature', { status: 401 });
  }

  // Phase F2: dispatch payment events
  console.warn('[asaas] event received');
  return new NextResponse('ok');
}
