import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { verifyHmac } from '@/lib/webhook-hmac';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('x-paperclip-signature');
  if (!verifyHmac(body, sig, env.PAPERCLIP_CALLBACK_SECRET)) {
    return new NextResponse('invalid signature', { status: 401 });
  }

  // Phase F1: dispatch interpretation-task callbacks
  console.warn('[paperclip] event received');
  return new NextResponse('ok');
}
