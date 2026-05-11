import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroBanner } from './HeroBanner';

const slides = [
  { imageSrc: '/a.jpg', title: 'Slide A', href: '/a' },
  { imageSrc: '/b.jpg', title: 'Slide B', href: '/b' },
];

describe('HeroBanner', () => {
  it('renders first slide title', () => {
    render(<HeroBanner slides={slides} />);
    expect(screen.getByText('Slide A')).toBeInTheDocument();
  });

  it('renders link with first slide href', () => {
    render(<HeroBanner slides={slides} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/a');
  });

  it('renders dot indicators when carousel + multiple slides', () => {
    render(<HeroBanner slides={slides} />);
    expect(screen.getAllByRole('button', { name: /Slide \d/ })).toHaveLength(2);
  });

  it('hides dots when static variant', () => {
    render(<HeroBanner variant="static" slides={slides} />);
    expect(screen.queryByRole('button', { name: /Slide 1/ })).not.toBeInTheDocument();
  });

  it('renders meta when provided', () => {
    render(<HeroBanner slides={[{ ...slides[0], meta: 'CURSO' }]} />);
    expect(screen.getByText('CURSO')).toBeInTheDocument();
  });
});
