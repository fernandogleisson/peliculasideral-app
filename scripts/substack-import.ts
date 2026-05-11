import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import crypto from 'crypto';
import { db } from '@/db/client';
import { substackSubscribers } from '@/db/schema';

interface SubstackRow {
  email: string;
  type: string;
  plan?: string;
  expiry?: string;
  created_at?: string;
  name?: string;
}

const csvPath = process.argv[2];
if (!csvPath) {
  console.error('usage: tsx scripts/substack-import.ts <path-to-csv>');
  process.exit(1);
}

const content = readFileSync(csvPath, 'utf8');
const rows: SubstackRow[] = parse(content, { columns: true, skip_empty_lines: true });

console.log(`importing ${rows.length} subscribers...`);

let imported = 0;
for (const row of rows) {
  const substackId = crypto.createHash('sha256').update(row.email).digest('hex').slice(0, 16);
  const migrationToken = crypto.randomBytes(24).toString('hex');
  await db
    .insert(substackSubscribers)
    .values({
      substackId,
      email: row.email,
      displayName: row.name ?? null,
      plan: row.plan ?? (row.type === 'paid' ? 'monthly' : 'free'),
      status: 'active',
      migrationToken,
      subscribedAt: row.created_at ? new Date(row.created_at) : null,
    })
    .onConflictDoNothing();
  imported++;
}

console.log(`imported ${imported} subscribers`);
process.exit(0);
