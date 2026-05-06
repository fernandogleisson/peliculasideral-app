import { NextResponse } from 'next/server';
import { verifyOutlineSignature } from '@/lib/outline-webhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface OutlineEvent {
  event?: string;
  payload?: unknown;
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('x-outline-signature');

  if (!verifyOutlineSignature(body, sig)) {
    return new NextResponse('invalid signature', { status: 401 });
  }

  let event: OutlineEvent;
  try {
    event = JSON.parse(body);
  } catch {
    return new NextResponse('invalid json', { status: 400 });
  }

  // Phase 2: dispatch by event.event (documents.update / .publish / .delete)
  // Intentionally noisy in dev — replaced with structured logger later.
  console.warn('[outline] event received', event.event ?? '<unknown>');

  return new NextResponse('ok');
}
