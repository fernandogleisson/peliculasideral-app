import { NextResponse } from 'next/server';
import { verifyHmac } from '@/lib/webhook-hmac';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('svix-signature') ?? req.headers.get('x-resend-signature');
  if (!verifyHmac(body, sig, process.env.RESEND_WEBHOOK_SECRET, 'base64')) {
    return new NextResponse('invalid signature', { status: 401 });
  }

  // Phase F1: dispatch deliverability events (bounce / complaint / delivered)
  console.warn('[resend] event received');
  return new NextResponse('ok');
}
