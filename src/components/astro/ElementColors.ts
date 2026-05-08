export const ELEMENT_COLORS = {
  fogo: { primary: '#E63946', light: '#F4A4AB', dark: '#A02029' },
  terra: { primary: '#588157', light: '#A1C49C', dark: '#3A5A3A' },
  ar: { primary: '#FFB400', light: '#FFD66E', dark: '#B07F00' },
  agua: { primary: '#0077B6', light: '#5DA9CD', dark: '#04527E' },
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
