export const ELEMENT_COLORS = {
  fogo: {
    primary: 'var(--color-fogo)',
    light: 'var(--color-fogo-light)',
    dark: 'var(--color-fogo-dark)',
  },
  terra: {
    primary: 'var(--color-terra)',
    light: 'var(--color-terra-light)',
    dark: 'var(--color-terra-dark)',
  },
  ar: {
    primary: 'var(--color-ar)',
    light: 'var(--color-ar-light)',
    dark: 'var(--color-ar-dark)',
  },
  agua: {
    primary: 'var(--color-agua)',
    light: 'var(--color-agua-light)',
    dark: 'var(--color-agua-dark)',
  },
} as const;

export const SIGN_TO_ELEMENT = {
  aries: 'fogo',
  leo: 'fogo',
  sagittarius: 'fogo',
  taurus: 'terra',
  virgo: 'terra',
  capricorn: 'terra',
  gemini: 'ar',
  libra: 'ar',
  aquarius: 'ar',
  cancer: 'agua',
  scorpio: 'agua',
  pisces: 'agua',
} as const;

export type Sign = keyof typeof SIGN_TO_ELEMENT;
export type Element = keyof typeof ELEMENT_COLORS;
