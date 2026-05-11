import { NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { db } from '@/db/client';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface HealthCheck {
  app: 'ok';
  db: 'ok' | 'fail' | 'unknown';
  timestamp: string;
}

export async function GET() {
  const checks: HealthCheck = {
    app: 'ok',
    db: 'unknown',
    timestamp: new Date().toISOString(),
  };

  try {
    await db.execute(sql`SELECT 1`);
    checks.db = 'ok';
  } catch {
    checks.db = 'fail';
  }

  const status = checks.db === 'ok' ? 200 : 503;
  return NextResponse.json(checks, { status });
}
