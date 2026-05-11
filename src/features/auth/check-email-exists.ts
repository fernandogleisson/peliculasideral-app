'use server';

import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '@/db/client';
import { authUsers } from '@/db/schema';

const emailSchema = z.string().email();

export async function checkEmailExists(email: string): Promise<{ exists: boolean }> {
  const parse = emailSchema.safeParse(email);
  if (!parse.success) return { exists: false };

  const rows = await db
    .select({ id: authUsers.id })
    .from(authUsers)
    .where(eq(authUsers.email, parse.data.toLowerCase()))
    .limit(1);

  return { exists: rows.length > 0 };
}
