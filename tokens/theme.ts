/**
 * Marquis Theme System
 *
 * Provides customizable color themes for different projects.
 * Instead of hardcoding blue as the primary color, projects can
 * choose their own brand color (teal, violet, rose, indigo, etc.).
 *
 * @example
 * // Use default theme (blue)
 * import { theme } from './tokens/theme.ts';
 *
 * // Create custom theme for a project
 * import { createTheme } from './tokens/theme.ts';
 * const myTheme = createTheme('violet');
 *
 * // Use theme colors in components
 * const buttonClasses = `${theme.primary.bg} ${theme.primary.text}`;
 */

/**
 * Available primary color palettes
 *
 * Choose based on brand identity:
 * - blue: Professional, trustworthy (eSolia default)
 * - violet: Creative, innovative
 * - indigo: Modern, tech-forward
 * - teal: Fresh, balanced
 * - cyan: Clean, digital
 * - emerald: Growth, sustainability
 * - rose: Warm, approachable
 * - amber: Energetic, attention-grabbing
 * - orange: Bold, friendly
 */
export type PrimaryColor =
  | 'blue'
  | 'violet'
  | 'indigo'
  | 'teal'
  | 'cyan'
  | 'emerald'
  | 'rose'
  | 'amber'
  | 'orange'
  | 'sky'
  | 'purple'
  | 'fuchsia'
  | 'pink';

/**
 * Theme mode for light/dark styling
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Color scale definition for a single color
 */
export interface ColorScale {
  /** Subtle background (50 weight) */
  bg: string;
  /** Slightly stronger background (100 weight) */
  bgStrong: string;
  /** Solid background (500-600 weight) */
  bgSolid: string;
  /** Hover state for solid bg */
  bgSolidHover: string;
  /** Active/pressed state */
  bgSolidActive: string;
  /** Primary text color on light bg */
  text: string;
  /** Text color on solid backgrounds */
  textOnSolid: string;
  /** Subtle border */
  border: string;
  /** Ring for focus/outline */
  ring: string;
  /** Strong ring */
  ringStrong: string;
  /** For ghost/outline variants */
  textColored: string;
  textColoredHover: string;
  bgSubtle: string;
  bgSubtleHover: string;
}

/**
 * Full theme definition
 */
export interface Theme {
  /** Primary brand color */
  primary: ColorScale;
  /** Dark mode variants for primary */
  primaryDark: ColorScale;
  /** Color name for reference */
  colorName: PrimaryColor;
}

/**
 * Primary color definitions with light and dark mode variants
 */
const primaryColors: Record<PrimaryColor, { light: ColorScale; dark: ColorScale }> = {
  blue: {
    light: {
      bg: 'bg-blue-50',
      bgStrong: 'bg-blue-100',
      bgSolid: 'bg-blue-600',
      bgSolidHover: 'hover:bg-blue-700',
      bgSolidActive: 'active:bg-blue-800',
      text: 'text-blue-700',
      textOnSolid: 'text-white',
      border: 'border-blue-200',
      ring: 'ring-blue-200',
      ringStrong: 'ring-blue-500',
      textColored: 'text-blue-600',
      textColoredHover: 'hover:text-blue-700',
      bgSubtle: 'bg-blue-50',
      bgSubtleHover: 'hover:bg-blue-100',
    },
    dark: {
      bg: 'dark:bg-blue-950',
      bgStrong: 'dark:bg-blue-900',
      bgSolid: 'dark:bg-blue-500',
      bgSolidHover: 'dark:hover:bg-blue-400',
      bgSolidActive: 'dark:active:bg-blue-600',
      text: 'dark:text-blue-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-blue-800',
      ring: 'dark:ring-blue-800',
      ringStrong: 'dark:ring-blue-400',
      textColored: 'dark:text-blue-400',
      textColoredHover: 'dark:hover:text-blue-300',
      bgSubtle: 'dark:bg-blue-900/30',
      bgSubtleHover: 'dark:hover:bg-blue-900/50',
    },
  },
  violet: {
    light: {
      bg: 'bg-violet-50',
      bgStrong: 'bg-violet-100',
      bgSolid: 'bg-violet-600',
      bgSolidHover: 'hover:bg-violet-700',
      bgSolidActive: 'active:bg-violet-800',
      text: 'text-violet-700',
      textOnSolid: 'text-white',
      border: 'border-violet-200',
      ring: 'ring-violet-200',
      ringStrong: 'ring-violet-500',
      textColored: 'text-violet-600',
      textColoredHover: 'hover:text-violet-700',
      bgSubtle: 'bg-violet-50',
      bgSubtleHover: 'hover:bg-violet-100',
    },
    dark: {
      bg: 'dark:bg-violet-950',
      bgStrong: 'dark:bg-violet-900',
      bgSolid: 'dark:bg-violet-500',
      bgSolidHover: 'dark:hover:bg-violet-400',
      bgSolidActive: 'dark:active:bg-violet-600',
      text: 'dark:text-violet-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-violet-800',
      ring: 'dark:ring-violet-800',
      ringStrong: 'dark:ring-violet-400',
      textColored: 'dark:text-violet-400',
      textColoredHover: 'dark:hover:text-violet-300',
      bgSubtle: 'dark:bg-violet-900/30',
      bgSubtleHover: 'dark:hover:bg-violet-900/50',
    },
  },
  indigo: {
    light: {
      bg: 'bg-indigo-50',
      bgStrong: 'bg-indigo-100',
      bgSolid: 'bg-indigo-600',
      bgSolidHover: 'hover:bg-indigo-700',
      bgSolidActive: 'active:bg-indigo-800',
      text: 'text-indigo-700',
      textOnSolid: 'text-white',
      border: 'border-indigo-200',
      ring: 'ring-indigo-200',
      ringStrong: 'ring-indigo-500',
      textColored: 'text-indigo-600',
      textColoredHover: 'hover:text-indigo-700',
      bgSubtle: 'bg-indigo-50',
      bgSubtleHover: 'hover:bg-indigo-100',
    },
    dark: {
      bg: 'dark:bg-indigo-950',
      bgStrong: 'dark:bg-indigo-900',
      bgSolid: 'dark:bg-indigo-500',
      bgSolidHover: 'dark:hover:bg-indigo-400',
      bgSolidActive: 'dark:active:bg-indigo-600',
      text: 'dark:text-indigo-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-indigo-800',
      ring: 'dark:ring-indigo-800',
      ringStrong: 'dark:ring-indigo-400',
      textColored: 'dark:text-indigo-400',
      textColoredHover: 'dark:hover:text-indigo-300',
      bgSubtle: 'dark:bg-indigo-900/30',
      bgSubtleHover: 'dark:hover:bg-indigo-900/50',
    },
  },
  teal: {
    light: {
      bg: 'bg-teal-50',
      bgStrong: 'bg-teal-100',
      bgSolid: 'bg-teal-600',
      bgSolidHover: 'hover:bg-teal-700',
      bgSolidActive: 'active:bg-teal-800',
      text: 'text-teal-700',
      textOnSolid: 'text-white',
      border: 'border-teal-200',
      ring: 'ring-teal-200',
      ringStrong: 'ring-teal-500',
      textColored: 'text-teal-600',
      textColoredHover: 'hover:text-teal-700',
      bgSubtle: 'bg-teal-50',
      bgSubtleHover: 'hover:bg-teal-100',
    },
    dark: {
      bg: 'dark:bg-teal-950',
      bgStrong: 'dark:bg-teal-900',
      bgSolid: 'dark:bg-teal-500',
      bgSolidHover: 'dark:hover:bg-teal-400',
      bgSolidActive: 'dark:active:bg-teal-600',
      text: 'dark:text-teal-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-teal-800',
      ring: 'dark:ring-teal-800',
      ringStrong: 'dark:ring-teal-400',
      textColored: 'dark:text-teal-400',
      textColoredHover: 'dark:hover:text-teal-300',
      bgSubtle: 'dark:bg-teal-900/30',
      bgSubtleHover: 'dark:hover:bg-teal-900/50',
    },
  },
  cyan: {
    light: {
      bg: 'bg-cyan-50',
      bgStrong: 'bg-cyan-100',
      bgSolid: 'bg-cyan-600',
      bgSolidHover: 'hover:bg-cyan-700',
      bgSolidActive: 'active:bg-cyan-800',
      text: 'text-cyan-700',
      textOnSolid: 'text-white',
      border: 'border-cyan-200',
      ring: 'ring-cyan-200',
      ringStrong: 'ring-cyan-500',
      textColored: 'text-cyan-600',
      textColoredHover: 'hover:text-cyan-700',
      bgSubtle: 'bg-cyan-50',
      bgSubtleHover: 'hover:bg-cyan-100',
    },
    dark: {
      bg: 'dark:bg-cyan-950',
      bgStrong: 'dark:bg-cyan-900',
      bgSolid: 'dark:bg-cyan-500',
      bgSolidHover: 'dark:hover:bg-cyan-400',
      bgSolidActive: 'dark:active:bg-cyan-600',
      text: 'dark:text-cyan-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-cyan-800',
      ring: 'dark:ring-cyan-800',
      ringStrong: 'dark:ring-cyan-400',
      textColored: 'dark:text-cyan-400',
      textColoredHover: 'dark:hover:text-cyan-300',
      bgSubtle: 'dark:bg-cyan-900/30',
      bgSubtleHover: 'dark:hover:bg-cyan-900/50',
    },
  },
  emerald: {
    light: {
      bg: 'bg-emerald-50',
      bgStrong: 'bg-emerald-100',
      bgSolid: 'bg-emerald-600',
      bgSolidHover: 'hover:bg-emerald-700',
      bgSolidActive: 'active:bg-emerald-800',
      text: 'text-emerald-700',
      textOnSolid: 'text-white',
      border: 'border-emerald-200',
      ring: 'ring-emerald-200',
      ringStrong: 'ring-emerald-500',
      textColored: 'text-emerald-600',
      textColoredHover: 'hover:text-emerald-700',
      bgSubtle: 'bg-emerald-50',
      bgSubtleHover: 'hover:bg-emerald-100',
    },
    dark: {
      bg: 'dark:bg-emerald-950',
      bgStrong: 'dark:bg-emerald-900',
      bgSolid: 'dark:bg-emerald-500',
      bgSolidHover: 'dark:hover:bg-emerald-400',
      bgSolidActive: 'dark:active:bg-emerald-600',
      text: 'dark:text-emerald-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-emerald-800',
      ring: 'dark:ring-emerald-800',
      ringStrong: 'dark:ring-emerald-400',
      textColored: 'dark:text-emerald-400',
      textColoredHover: 'dark:hover:text-emerald-300',
      bgSubtle: 'dark:bg-emerald-900/30',
      bgSubtleHover: 'dark:hover:bg-emerald-900/50',
    },
  },
  rose: {
    light: {
      bg: 'bg-rose-50',
      bgStrong: 'bg-rose-100',
      bgSolid: 'bg-rose-600',
      bgSolidHover: 'hover:bg-rose-700',
      bgSolidActive: 'active:bg-rose-800',
      text: 'text-rose-700',
      textOnSolid: 'text-white',
      border: 'border-rose-200',
      ring: 'ring-rose-200',
      ringStrong: 'ring-rose-500',
      textColored: 'text-rose-600',
      textColoredHover: 'hover:text-rose-700',
      bgSubtle: 'bg-rose-50',
      bgSubtleHover: 'hover:bg-rose-100',
    },
    dark: {
      bg: 'dark:bg-rose-950',
      bgStrong: 'dark:bg-rose-900',
      bgSolid: 'dark:bg-rose-500',
      bgSolidHover: 'dark:hover:bg-rose-400',
      bgSolidActive: 'dark:active:bg-rose-600',
      text: 'dark:text-rose-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-rose-800',
      ring: 'dark:ring-rose-800',
      ringStrong: 'dark:ring-rose-400',
      textColored: 'dark:text-rose-400',
      textColoredHover: 'dark:hover:text-rose-300',
      bgSubtle: 'dark:bg-rose-900/30',
      bgSubtleHover: 'dark:hover:bg-rose-900/50',
    },
  },
  amber: {
    light: {
      bg: 'bg-amber-50',
      bgStrong: 'bg-amber-100',
      bgSolid: 'bg-amber-500',
      bgSolidHover: 'hover:bg-amber-600',
      bgSolidActive: 'active:bg-amber-700',
      text: 'text-amber-700',
      textOnSolid: 'text-white',
      border: 'border-amber-200',
      ring: 'ring-amber-200',
      ringStrong: 'ring-amber-500',
      textColored: 'text-amber-600',
      textColoredHover: 'hover:text-amber-700',
      bgSubtle: 'bg-amber-50',
      bgSubtleHover: 'hover:bg-amber-100',
    },
    dark: {
      bg: 'dark:bg-amber-950',
      bgStrong: 'dark:bg-amber-900',
      bgSolid: 'dark:bg-amber-500',
      bgSolidHover: 'dark:hover:bg-amber-400',
      bgSolidActive: 'dark:active:bg-amber-600',
      text: 'dark:text-amber-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-amber-800',
      ring: 'dark:ring-amber-800',
      ringStrong: 'dark:ring-amber-400',
      textColored: 'dark:text-amber-400',
      textColoredHover: 'dark:hover:text-amber-300',
      bgSubtle: 'dark:bg-amber-900/30',
      bgSubtleHover: 'dark:hover:bg-amber-900/50',
    },
  },
  orange: {
    light: {
      bg: 'bg-orange-50',
      bgStrong: 'bg-orange-100',
      bgSolid: 'bg-orange-600',
      bgSolidHover: 'hover:bg-orange-700',
      bgSolidActive: 'active:bg-orange-800',
      text: 'text-orange-700',
      textOnSolid: 'text-white',
      border: 'border-orange-200',
      ring: 'ring-orange-200',
      ringStrong: 'ring-orange-500',
      textColored: 'text-orange-600',
      textColoredHover: 'hover:text-orange-700',
      bgSubtle: 'bg-orange-50',
      bgSubtleHover: 'hover:bg-orange-100',
    },
    dark: {
      bg: 'dark:bg-orange-950',
      bgStrong: 'dark:bg-orange-900',
      bgSolid: 'dark:bg-orange-500',
      bgSolidHover: 'dark:hover:bg-orange-400',
      bgSolidActive: 'dark:active:bg-orange-600',
      text: 'dark:text-orange-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-orange-800',
      ring: 'dark:ring-orange-800',
      ringStrong: 'dark:ring-orange-400',
      textColored: 'dark:text-orange-400',
      textColoredHover: 'dark:hover:text-orange-300',
      bgSubtle: 'dark:bg-orange-900/30',
      bgSubtleHover: 'dark:hover:bg-orange-900/50',
    },
  },
  sky: {
    light: {
      bg: 'bg-sky-50',
      bgStrong: 'bg-sky-100',
      bgSolid: 'bg-sky-600',
      bgSolidHover: 'hover:bg-sky-700',
      bgSolidActive: 'active:bg-sky-800',
      text: 'text-sky-700',
      textOnSolid: 'text-white',
      border: 'border-sky-200',
      ring: 'ring-sky-200',
      ringStrong: 'ring-sky-500',
      textColored: 'text-sky-600',
      textColoredHover: 'hover:text-sky-700',
      bgSubtle: 'bg-sky-50',
      bgSubtleHover: 'hover:bg-sky-100',
    },
    dark: {
      bg: 'dark:bg-sky-950',
      bgStrong: 'dark:bg-sky-900',
      bgSolid: 'dark:bg-sky-500',
      bgSolidHover: 'dark:hover:bg-sky-400',
      bgSolidActive: 'dark:active:bg-sky-600',
      text: 'dark:text-sky-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-sky-800',
      ring: 'dark:ring-sky-800',
      ringStrong: 'dark:ring-sky-400',
      textColored: 'dark:text-sky-400',
      textColoredHover: 'dark:hover:text-sky-300',
      bgSubtle: 'dark:bg-sky-900/30',
      bgSubtleHover: 'dark:hover:bg-sky-900/50',
    },
  },
  purple: {
    light: {
      bg: 'bg-purple-50',
      bgStrong: 'bg-purple-100',
      bgSolid: 'bg-purple-600',
      bgSolidHover: 'hover:bg-purple-700',
      bgSolidActive: 'active:bg-purple-800',
      text: 'text-purple-700',
      textOnSolid: 'text-white',
      border: 'border-purple-200',
      ring: 'ring-purple-200',
      ringStrong: 'ring-purple-500',
      textColored: 'text-purple-600',
      textColoredHover: 'hover:text-purple-700',
      bgSubtle: 'bg-purple-50',
      bgSubtleHover: 'hover:bg-purple-100',
    },
    dark: {
      bg: 'dark:bg-purple-950',
      bgStrong: 'dark:bg-purple-900',
      bgSolid: 'dark:bg-purple-500',
      bgSolidHover: 'dark:hover:bg-purple-400',
      bgSolidActive: 'dark:active:bg-purple-600',
      text: 'dark:text-purple-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-purple-800',
      ring: 'dark:ring-purple-800',
      ringStrong: 'dark:ring-purple-400',
      textColored: 'dark:text-purple-400',
      textColoredHover: 'dark:hover:text-purple-300',
      bgSubtle: 'dark:bg-purple-900/30',
      bgSubtleHover: 'dark:hover:bg-purple-900/50',
    },
  },
  fuchsia: {
    light: {
      bg: 'bg-fuchsia-50',
      bgStrong: 'bg-fuchsia-100',
      bgSolid: 'bg-fuchsia-600',
      bgSolidHover: 'hover:bg-fuchsia-700',
      bgSolidActive: 'active:bg-fuchsia-800',
      text: 'text-fuchsia-700',
      textOnSolid: 'text-white',
      border: 'border-fuchsia-200',
      ring: 'ring-fuchsia-200',
      ringStrong: 'ring-fuchsia-500',
      textColored: 'text-fuchsia-600',
      textColoredHover: 'hover:text-fuchsia-700',
      bgSubtle: 'bg-fuchsia-50',
      bgSubtleHover: 'hover:bg-fuchsia-100',
    },
    dark: {
      bg: 'dark:bg-fuchsia-950',
      bgStrong: 'dark:bg-fuchsia-900',
      bgSolid: 'dark:bg-fuchsia-500',
      bgSolidHover: 'dark:hover:bg-fuchsia-400',
      bgSolidActive: 'dark:active:bg-fuchsia-600',
      text: 'dark:text-fuchsia-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-fuchsia-800',
      ring: 'dark:ring-fuchsia-800',
      ringStrong: 'dark:ring-fuchsia-400',
      textColored: 'dark:text-fuchsia-400',
      textColoredHover: 'dark:hover:text-fuchsia-300',
      bgSubtle: 'dark:bg-fuchsia-900/30',
      bgSubtleHover: 'dark:hover:bg-fuchsia-900/50',
    },
  },
  pink: {
    light: {
      bg: 'bg-pink-50',
      bgStrong: 'bg-pink-100',
      bgSolid: 'bg-pink-600',
      bgSolidHover: 'hover:bg-pink-700',
      bgSolidActive: 'active:bg-pink-800',
      text: 'text-pink-700',
      textOnSolid: 'text-white',
      border: 'border-pink-200',
      ring: 'ring-pink-200',
      ringStrong: 'ring-pink-500',
      textColored: 'text-pink-600',
      textColoredHover: 'hover:text-pink-700',
      bgSubtle: 'bg-pink-50',
      bgSubtleHover: 'hover:bg-pink-100',
    },
    dark: {
      bg: 'dark:bg-pink-950',
      bgStrong: 'dark:bg-pink-900',
      bgSolid: 'dark:bg-pink-500',
      bgSolidHover: 'dark:hover:bg-pink-400',
      bgSolidActive: 'dark:active:bg-pink-600',
      text: 'dark:text-pink-300',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-pink-800',
      ring: 'dark:ring-pink-800',
      ringStrong: 'dark:ring-pink-400',
      textColored: 'dark:text-pink-400',
      textColoredHover: 'dark:hover:text-pink-300',
      bgSubtle: 'dark:bg-pink-900/30',
      bgSubtleHover: 'dark:hover:bg-pink-900/50',
    },
  },
};

/**
 * Neutral colors with dark mode support
 */
export const neutralColors = {
  light: {
    bgPage: 'bg-slate-50',
    bgSurface: 'bg-white',
    bgMuted: 'bg-slate-100',
    bgSubtle: 'bg-slate-50',
    textHeading: 'text-slate-900',
    textBody: 'text-slate-700',
    textMuted: 'text-slate-500',
    textSubtle: 'text-slate-400',
    border: 'border-slate-200',
    borderStrong: 'border-slate-300',
    borderSubtle: 'border-slate-100',
    ring: 'ring-slate-200',
    ringStrong: 'ring-slate-300',
    divider: 'divide-slate-200',
  },
  dark: {
    bgPage: 'dark:bg-slate-950',
    bgSurface: 'dark:bg-slate-900',
    bgMuted: 'dark:bg-slate-800',
    bgSubtle: 'dark:bg-slate-800/50',
    textHeading: 'dark:text-white',
    textBody: 'dark:text-slate-300',
    textMuted: 'dark:text-slate-400',
    textSubtle: 'dark:text-slate-500',
    border: 'dark:border-slate-700',
    borderStrong: 'dark:border-slate-600',
    borderSubtle: 'dark:border-slate-800',
    ring: 'dark:ring-slate-700',
    ringStrong: 'dark:ring-slate-600',
    divider: 'dark:divide-slate-700',
  },
} as const;

/**
 * Status colors with dark mode support
 */
export const statusColors = {
  success: {
    light: {
      bg: 'bg-emerald-50',
      bgStrong: 'bg-emerald-100',
      bgSolid: 'bg-emerald-500',
      text: 'text-emerald-700',
      textOnSolid: 'text-white',
      border: 'border-emerald-200',
      ring: 'ring-emerald-200',
    },
    dark: {
      bg: 'dark:bg-emerald-950',
      bgStrong: 'dark:bg-emerald-900',
      bgSolid: 'dark:bg-emerald-600',
      text: 'dark:text-emerald-400',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-emerald-800',
      ring: 'dark:ring-emerald-800',
    },
  },
  warning: {
    light: {
      bg: 'bg-amber-50',
      bgStrong: 'bg-amber-100',
      bgSolid: 'bg-amber-500',
      text: 'text-amber-700',
      textOnSolid: 'text-white',
      border: 'border-amber-200',
      ring: 'ring-amber-200',
    },
    dark: {
      bg: 'dark:bg-amber-950',
      bgStrong: 'dark:bg-amber-900',
      bgSolid: 'dark:bg-amber-600',
      text: 'dark:text-amber-400',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-amber-800',
      ring: 'dark:ring-amber-800',
    },
  },
  error: {
    light: {
      bg: 'bg-red-50',
      bgStrong: 'bg-red-100',
      bgSolid: 'bg-red-500',
      text: 'text-red-700',
      textOnSolid: 'text-white',
      border: 'border-red-200',
      ring: 'ring-red-200',
    },
    dark: {
      bg: 'dark:bg-red-950',
      bgStrong: 'dark:bg-red-900',
      bgSolid: 'dark:bg-red-600',
      text: 'dark:text-red-400',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-red-800',
      ring: 'dark:ring-red-800',
    },
  },
  info: {
    light: {
      bg: 'bg-blue-50',
      bgStrong: 'bg-blue-100',
      bgSolid: 'bg-blue-500',
      text: 'text-blue-700',
      textOnSolid: 'text-white',
      border: 'border-blue-200',
      ring: 'ring-blue-200',
    },
    dark: {
      bg: 'dark:bg-blue-950',
      bgStrong: 'dark:bg-blue-900',
      bgSolid: 'dark:bg-blue-600',
      text: 'dark:text-blue-400',
      textOnSolid: 'dark:text-white',
      border: 'dark:border-blue-800',
      ring: 'dark:ring-blue-800',
    },
  },
} as const;

/**
 * Focus ring styles with dark mode support
 */
export const focusRing = {
  default: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  inset: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset',
  none: 'focus:outline-none',
} as const;

/**
 * Create a theme with a specific primary color
 *
 * @example
 * // For Periodic - use teal
 * const periodicTheme = createTheme('teal');
 *
 * // For another project - use violet
 * const brandTheme = createTheme('violet');
 */
export function createTheme(primaryColor: PrimaryColor = 'blue'): Theme {
  const colors = primaryColors[primaryColor];
  return {
    primary: colors.light,
    primaryDark: colors.dark,
    colorName: primaryColor,
  };
}

/**
 * Get primary color classes that work in both light and dark mode
 *
 * @example
 * const colors = getPrimaryClasses('violet');
 * // colors.bgSolid = 'bg-violet-600 dark:bg-violet-500'
 */
export function getPrimaryClasses(primaryColor: PrimaryColor = 'blue') {
  const { light, dark } = primaryColors[primaryColor];

  return {
    bg: `${light.bg} ${dark.bg}`,
    bgStrong: `${light.bgStrong} ${dark.bgStrong}`,
    bgSolid: `${light.bgSolid} ${dark.bgSolid}`,
    bgSolidHover: `${light.bgSolidHover} ${dark.bgSolidHover}`,
    bgSolidActive: `${light.bgSolidActive} ${dark.bgSolidActive}`,
    text: `${light.text} ${dark.text}`,
    textOnSolid: `${light.textOnSolid} ${dark.textOnSolid}`,
    border: `${light.border} ${dark.border}`,
    ring: `${light.ring} ${dark.ring}`,
    ringStrong: `${light.ringStrong} ${dark.ringStrong}`,
    textColored: `${light.textColored} ${dark.textColored}`,
    textColoredHover: `${light.textColoredHover} ${dark.textColoredHover}`,
    bgSubtle: `${light.bgSubtle} ${dark.bgSubtle}`,
    bgSubtleHover: `${light.bgSubtleHover} ${dark.bgSubtleHover}`,
  };
}

/**
 * Get neutral color classes that work in both light and dark mode
 */
export function getNeutralClasses() {
  const { light, dark } = neutralColors;

  return {
    bgPage: `${light.bgPage} ${dark.bgPage}`,
    bgSurface: `${light.bgSurface} ${dark.bgSurface}`,
    bgMuted: `${light.bgMuted} ${dark.bgMuted}`,
    bgSubtle: `${light.bgSubtle} ${dark.bgSubtle}`,
    textHeading: `${light.textHeading} ${dark.textHeading}`,
    textBody: `${light.textBody} ${dark.textBody}`,
    textMuted: `${light.textMuted} ${dark.textMuted}`,
    textSubtle: `${light.textSubtle} ${dark.textSubtle}`,
    border: `${light.border} ${dark.border}`,
    borderStrong: `${light.borderStrong} ${dark.borderStrong}`,
    borderSubtle: `${light.borderSubtle} ${dark.borderSubtle}`,
    ring: `${light.ring} ${dark.ring}`,
    ringStrong: `${light.ringStrong} ${dark.ringStrong}`,
    divider: `${light.divider} ${dark.divider}`,
  };
}

/**
 * Get status color classes that work in both light and dark mode
 */
export function getStatusClasses(status: 'success' | 'warning' | 'error' | 'info') {
  const colors = statusColors[status];

  return {
    bg: `${colors.light.bg} ${colors.dark.bg}`,
    bgStrong: `${colors.light.bgStrong} ${colors.dark.bgStrong}`,
    bgSolid: `${colors.light.bgSolid} ${colors.dark.bgSolid}`,
    text: `${colors.light.text} ${colors.dark.text}`,
    textOnSolid: `${colors.light.textOnSolid} ${colors.dark.textOnSolid}`,
    border: `${colors.light.border} ${colors.dark.border}`,
    ring: `${colors.light.ring} ${colors.dark.ring}`,
  };
}

// Default theme (blue - backwards compatible)
export const theme = createTheme('blue');

// Export for convenience
export { primaryColors };

export type StatusColorKey = keyof typeof statusColors;
