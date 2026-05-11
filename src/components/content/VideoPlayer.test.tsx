import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

interface MockMuxPlayerProps {
  playbackId?: string;
  metadata?: { video_title?: string };
  [key: string]: unknown;
}

vi.mock('@mux/mux-player-react', () => ({
  default: ({ playbackId, metadata, ...props }: MockMuxPlayerProps) => (
    <div
      data-testid="mux-player"
      data-playback-id={playbackId}
      data-title={metadata?.video_title}
      {...props}
    />
  ),
}));

import { VideoPlayer } from './VideoPlayer';

describe('VideoPlayer', () => {
  it('renders MuxPlayer with playbackId', () => {
    render(<VideoPlayer playbackId="abc123" />);
    expect(screen.getByTestId('mux-player')).toHaveAttribute('data-playback-id', 'abc123');
  });

  it('passes metadata title', () => {
    render(<VideoPlayer playbackId="x" metadataVideoTitle="My Video" />);
    expect(screen.getByTestId('mux-player')).toHaveAttribute('data-title', 'My Video');
  });
});
