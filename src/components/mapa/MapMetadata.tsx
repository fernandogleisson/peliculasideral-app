import { Pencil } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function formatBirthDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  const [, y, m, d] = match;
  return `${d}/${m}/${y}`;
}

export interface MapMetadataProps {
  birthDate: string;
  birthTime?: string | null;
  birthCity: string;
  birthState?: string;
  rateLimited?: boolean;
  rateLimitMessage?: string;
  onEdit?: () => void;
}

export function MapMetadata({
  birthDate,
  birthTime,
  birthCity,
  birthState,
  rateLimited,
  rateLimitMessage,
  onEdit,
}: MapMetadataProps) {
  // Parse manual de YYYY-MM-DD pra evitar hydration mismatch:
  // `new Date('1993-12-01')` é interpretado como UTC midnight, que vira
  // 30/11 no client em UTC-3 e 01/12 no server em UTC.
  const formattedDate = formatBirthDate(birthDate);
  const location = [birthCity, birthState].filter(Boolean).join('/');
  const time = birthTime ? birthTime.slice(0, 5) : '—';

  return (
    <Card variant="default" className="flex items-center justify-between gap-4">
      <div>
        <p className="font-mono text-[11px] font-semibold tracking-[0.3em] text-ink-3 uppercase mb-1">
          Nascimento
        </p>
        <p className="font-serif text-base text-ink">
          {formattedDate} · {time} · {location}
        </p>
      </div>

      <Button variant="secondary" onClick={onEdit} disabled={rateLimited}>
        <Pencil size={14} />
        Alterar
      </Button>

      {rateLimited && rateLimitMessage && (
        <p className="font-serif text-xs text-ink-3 italic">{rateLimitMessage}</p>
      )}
    </Card>
  );
}
