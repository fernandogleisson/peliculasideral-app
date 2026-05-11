'use client';
import { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';
import { cn } from '@/lib/utils';

export interface AudioTrack {
  src: string;
  title: string;
  signSymbol?: string;
}

export interface AudioPlayerProps {
  tracks: AudioTrack[];
  className?: string;
}

export function AudioPlayer({ tracks, className }: AudioPlayerProps) {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (tracks.length === 0) return null;
  const track = tracks[trackIdx];

  function toggle() {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else void audioRef.current.play();
    setPlaying(!playing);
  }

  return (
    <div className={cn('bg-surface-1 border border-border rounded-lg p-6', className)}>
      <audio ref={audioRef} src={track.src} onEnded={() => setPlaying(false)} />

      <div className="flex items-center gap-4 mb-4">
        {track.signSymbol && (
          <span className="font-serif text-4xl text-primary">{track.signSymbol}</span>
        )}
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] text-ink-3 uppercase">
            Faixa {trackIdx + 1} / {tracks.length}
          </p>
          <h3 className="font-serif text-xl text-ink">{track.title}</h3>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <IconButton
          aria-label="Faixa anterior"
          onClick={() => setTrackIdx((i) => Math.max(0, i - 1))}
          disabled={trackIdx === 0}
        >
          <SkipBack size={20} />
        </IconButton>
        <IconButton aria-label={playing ? 'Pausar' : 'Tocar'} onClick={toggle}>
          {playing ? <Pause size={24} /> : <Play size={24} />}
        </IconButton>
        <IconButton
          aria-label="Próxima faixa"
          onClick={() => setTrackIdx((i) => Math.min(tracks.length - 1, i + 1))}
          disabled={trackIdx === tracks.length - 1}
        >
          <SkipForward size={20} />
        </IconButton>
      </div>
    </div>
  );
}
