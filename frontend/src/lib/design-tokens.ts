/**
 * Aurora Nexus Design Tokens
 * Centralized design system values for use in TypeScript/JavaScript
 */

export const colors = {
  // Semantic colors
  primary: 'hsl(221.2 83.2% 53.3%)',
  primaryForeground: 'hsl(210 40% 98%)',
  secondary: 'hsl(210 40% 96.1%)',
  secondaryForeground: 'hsl(222.2 47.4% 11.2%)',
  destructive: 'hsl(0 84.2% 60.2%)',
  destructiveForeground: 'hsl(210 40% 98%)',
  success: 'hsl(142 71% 45%)',
  warning: 'hsl(38 92% 50%)',
  info: 'hsl(199 89% 48%)',

  // Base colors
  background: 'hsl(0 0% 100%)',
  foreground: 'hsl(0 0% 3.9%)',
  muted: 'hsl(210 40% 96.1%)',
  mutedForeground: 'hsl(215.4 16.3% 46.9%)',
  border: 'hsl(214.3 31.8% 91.4%)',
  input: 'hsl(214.3 31.8% 91.4%)',
  ring: 'hsl(221.2 83.2% 53.3%)',
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
} as const;

export const fontSize = {
  xs: '0.64rem',    // ~10px
  sm: '0.8rem',     // ~13px
  base: '1rem',     // 16px
  lg: '1.25rem',    // 20px
  xl: '1.563rem',   // ~25px
  '2xl': '1.953rem', // ~31px
  '3xl': '2.441rem', // ~39px
  '4xl': '3.052rem', // ~49px
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const borderRadius = {
  sm: '0.25rem',   // 4px
  default: '0.5rem',  // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  full: '9999px',  // circular
} as const;

export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  none: 'none',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
} as const;

export const transitions = {
  fast: '150ms ease-out',
  base: '200ms ease-out',
  slow: '300ms ease-out',
  none: 'none',
} as const;

// Component-specific tokens
export const components = {
  button: {
    height: {
      sm: '2rem',      // 32px
      default: '2.5rem', // 40px
      lg: '3rem',      // 48px
    },
    padding: {
      sm: '0.75rem',   // 12px
      default: '1rem', // 16px
      lg: '2rem',      // 32px
    },
  },
  input: {
    height: '2.5rem',  // 40px
    padding: '0.5rem 0.75rem', // 8px 12px
  },
  card: {
    padding: '1.5rem', // 24px
  },
  container: {
    maxWidth: '1440px',
    padding: {
      mobile: '1rem',   // 16px
      tablet: '1.5rem', // 24px
      desktop: '3rem',  // 48px
    },
  },
} as const;

// Status badge variants
export const statusVariants = {
  active: 'default',
  pending: 'secondary',
  error: 'destructive',
  inactive: 'outline',
  success: 'default', // You can create custom variant
  warning: 'secondary',
} as const;

// Icon sizes
export const iconSizes = {
  xs: '0.75rem',   // 12px
  sm: '1rem',      // 16px
  base: '1.25rem', // 20px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
} as const;

// Animation durations (respects prefers-reduced-motion)
export const animations = {
  button: transitions.fast,
  card: transitions.base,
  modal: transitions.base,
  page: transitions.slow,
} as const;

// Common patterns
export const patterns = {
  // Grid gaps
  gridGap: {
    tight: spacing[4],
    default: spacing[6],
    relaxed: spacing[8],
  },

  // Focus ring
  focusRing: {
    width: '2px',
    offset: '2px',
    color: colors.ring,
  },

  // Common gradients
  gradients: {
    primary: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)',
    subtle: 'linear-gradient(to bottom, transparent, hsl(var(--muted) / 0.5))',
  },
} as const;

// Export everything as default for convenience
export default {
  colors,
  spacing,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
  boxShadow,
  breakpoints,
  zIndex,
  transitions,
  components,
  statusVariants,
  iconSizes,
  animations,
  patterns,
} as const;

// Type exports for TypeScript users
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type BorderRadius = typeof borderRadius;
export type BoxShadow = typeof boxShadow;
export type Breakpoints = typeof breakpoints;
export type ZIndex = typeof zIndex;
export type Transitions = typeof transitions;
