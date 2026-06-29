export const Colors = {
  background:   '#151B2F',
  surface:      '#1A2440',
  surfaceLight: '#1E2D50',
  purple:       '#8B5CF6',
  pink:         '#FF7AC6',
  teal:         '#5EEAD4',
  amber:        '#FFD166',
  white:        '#F8FAFC',
  muted:        '#64748B',
  error:        '#FF6B6B',
} as const;

// ── Ombres des boutons (effet relief charte) ─
export const ButtonShadows = {
  pink:   '#C4428A',
  amber:  '#B8820A',
  teal:   '#2AAA90',
  purple: '#5B34C4',
  dark:   '#0D1526',
} as const;

export const Fonts = {
  display: 'FredokaOne',   // gros titres & boutons
  body:    'Nunito',       // tout le reste
} as const;

// ── Espacements ───────────────────────────────
export const Spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  24,
  xxl: 32,
} as const;

// ── Rayons de bordure ─────────────────────────
export const Radius = {
  sm:   10,
  md:   14,
  lg:   20,
  xl:   28,  // boutons principaux
  full: 999,
} as const;

// ── Typescale ─────────────────────────────────
export const FontSize = {
  xs:    9,
  sm:    11,
  base:  13,
  md:    15,
  lg:    17,
  xl:    22,
  xxl:   28,
  hero:  48,
} as const;
