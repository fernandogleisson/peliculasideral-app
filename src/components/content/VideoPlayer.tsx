'use client';
import MuxPlayer from '@mux/mux-player-react';
import { cn } from '@/lib/utils';

export interface VideoPlayerProps {
  playbackId: string;
  metadataVideoTitle?: string;
  thumbnailTime?: number;
  className?: string;
}

export function VideoPlayer({
  playbackId,
  metadataVideoTitle,
  thumbnailTime,
  className,
}: VideoPlayerProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{ video_title: metadataVideoTitle }}
      thumbnailTime={thumbnailTime}
      style={
        {
          '--media-primary-color': 'var(--color-primary)',
          '--media-secondary-color': 'var(--color-ink-2)',
          '--media-accent-color': 'var(--color-primary-light)',
          aspectRatio: '16/9',
          borderRadius: 'var(--rounded-md, 8px)',
        } as React.CSSProperties
      }
      className={cn('w-full', className)}
    />
  );
}
