// Placeholder SVG paths for traditional astrological aspect glyphs.
// All paths target viewBox "0 0 24 24" and are designed for stroke rendering.
// `major` flag determines weight: major aspects (0°, 60°, 90°, 120°, 180°)
// render with stroke 1.5; minor aspects render with stroke 1.

export type Aspect =
  | 'conjunction'
  | 'opposition'
  | 'trine'
  | 'square'
  | 'sextile'
  | 'semi_sextile'
  | 'semi_square'
  | 'sesquiquadrate'
  | 'quincunx';

export interface AspectPath {
  path: string;
  major: boolean;
}

export const ASPECT_PATHS: Record<Aspect, AspectPath> = {
  // Conjunction (0°): ☌ — circle with line through
  conjunction: {
    path: 'M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M16 8l4 -4',
    major: true,
  },
  // Opposition (180°): ☍ — circle, line, circle
  opposition: {
    path: 'M3 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0 M7 12h10 M17 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0',
    major: true,
  },
  // Trine (120°): △ — triangle
  trine: {
    path: 'M12 5l7 12h-14z',
    major: true,
  },
  // Square (90°): □ — square
  square: {
    path: 'M6 6h12v12h-12z',
    major: true,
  },
  // Sextile (60°): ✶ — six-pointed star (hexagram simplified)
  sextile: {
    path: 'M12 4v16 M5 8l14 8 M5 16l14 -8',
    major: true,
  },
  // Semi-sextile (30°): ⚺ — small dash with dot
  semi_sextile: {
    path: 'M12 4v16 M5 12h14',
    major: false,
  },
  // Semi-square (45°): ∠ — angle
  semi_square: {
    path: 'M6 18l12 -12 M6 18h6',
    major: false,
  },
  // Sesquiquadrate (135°): square + half — Q stylized
  sesquiquadrate: {
    path: 'M6 6h12v12h-12z M14 14l4 4',
    major: false,
  },
  // Quincunx (150°): ⚻ — Y shape
  quincunx: {
    path: 'M12 4v8 M6 20l6 -8l6 8',
    major: false,
  },
};
