import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { AudioPlayer } from './AudioPlayer';

const tracks = [
  { src: '/a.mp3', title: 'Áries', signSymbol: '♈' },
  { src: '/b.mp3', title: 'Touro', signSymbol: '♉' },
  { src: '/c.mp3', title: 'Gêmeos' },
];

describe('AudioPlayer', () => {
  it('renders first track title', () => {
    render(<AudioPlayer tracks={tracks} />);
    expect(screen.getByText('Áries')).toBeInTheDocument();
  });

  it('renders sign symbol when present', () => {
    render(<AudioPlayer tracks={tracks} />);
    expect(screen.getByText('♈')).toBeInTheDocument();
  });

  it('renders Faixa 1 / 3', () => {
    render(<AudioPlayer tracks={tracks} />);
    expect(screen.getByText(/Faixa 1 \/ 3/)).toBeInTheDocument();
  });

  it('skip back disabled on first track', () => {
    render(<AudioPlayer tracks={tracks} />);
    expect(screen.getByRole('button', { name: 'Faixa anterior' })).toBeDisabled();
  });

  it('advances track on next click', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer tracks={tracks} />);
    await user.click(screen.getByRole('button', { name: 'Próxima faixa' }));
    expect(screen.getByText('Touro')).toBeInTheDocument();
    expect(screen.getByText(/Faixa 2 \/ 3/)).toBeInTheDocument();
  });
});
