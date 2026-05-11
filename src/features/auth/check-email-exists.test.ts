import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/db/client', () => ({
  db: {
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(),
        })),
      })),
    })),
  },
}));

import { checkEmailExists } from './check-email-exists';
import { db } from '@/db/client';

describe('checkEmailExists', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('retorna exists=true quando user existe em auth.users', async () => {
    const limit = vi.fn().mockResolvedValue([{ id: 'abc-123' }]);
    (db.select as ReturnType<typeof vi.fn>).mockReturnValue({
      from: () => ({ where: () => ({ limit }) }),
    });

    const result = await checkEmailExists('existe@x.com');
    expect(result).toEqual({ exists: true });
  });

  it('retorna exists=false quando user não existe', async () => {
    const limit = vi.fn().mockResolvedValue([]);
    (db.select as ReturnType<typeof vi.fn>).mockReturnValue({
      from: () => ({ where: () => ({ limit }) }),
    });

    const result = await checkEmailExists('novo@x.com');
    expect(result).toEqual({ exists: false });
  });

  it('rejeita emails inválidos com exists=false (sem query)', async () => {
    const result = await checkEmailExists('not-an-email');
    expect(result).toEqual({ exists: false });
    expect(db.select).not.toHaveBeenCalled();
  });
});
