import { count, sql } from 'drizzle-orm';
import { db } from '@/db/client';
import { substackSubscribers } from '@/db/schema';

export const dynamic = 'force-dynamic';

export default async function MigracaoSubstackPage() {
  const [total] = await db.select({ count: count() }).from(substackSubscribers);
  const [migrated] = await db
    .select({ count: count() })
    .from(substackSubscribers)
    .where(sql`migrated_at IS NOT NULL`);
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Migração Substack</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card label="Total importados" value={total.count} />
        <Card label="Migrados pro app" value={migrated.count} />
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded border p-4">
      <div className="text-muted-foreground text-sm">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
