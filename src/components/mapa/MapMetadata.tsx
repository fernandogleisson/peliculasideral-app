import { Pencil } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
  const formattedDate = new Date(birthDate).toLocaleDateString('pt-BR');
  const location = [birthCity, birthState].filter(Boolean).join('/');
  const time = birthTime ?? '—';

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
