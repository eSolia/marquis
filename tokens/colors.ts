/**
 * eSolia UI Color Tokens
 *
 * Semantic color definitions using Tailwind classes.
 * Use these tokens to maintain consistency across components.
 *
 * Colors are organized by semantic meaning, not by hue.
 * This allows palette changes without updating component code.
 */

/**
 * Status colors for badges, alerts, and status indicators
 */
export const statusColors = {
  success: {
    bg: 'bg-emerald-50',
    bgStrong: 'bg-emerald-100',
    bgSolid: 'bg-emerald-500',
    text: 'text-emerald-700',
    textOnSolid: 'text-white',
    border: 'border-emerald-200',
    ring: 'ring-emerald-200',
    ringStrong: 'ring-emerald-500',
  },
  warning: {
    bg: 'bg-amber-50',
    bgStrong: 'bg-amber-100',
    bgSolid: 'bg-amber-500',
    text: 'text-amber-700',
    textOnSolid: 'text-white',
    border: 'border-amber-200',
    ring: 'ring-amber-200',
    ringStrong: 'ring-amber-500',
  },
  error: {
    bg: 'bg-red-50',
    bgStrong: 'bg-red-100',
    bgSolid: 'bg-red-500',
    text: 'text-red-700',
    textOnSolid: 'text-white',
    border: 'border-red-200',
    ring: 'ring-red-200',
    ringStrong: 'ring-red-500',
  },
  info: {
    bg: 'bg-blue-50',
    bgStrong: 'bg-blue-100',
    bgSolid: 'bg-blue-500',
    text: 'text-blue-700',
    textOnSolid: 'text-white',
    border: 'border-blue-200',
    ring: 'ring-blue-200',
    ringStrong: 'ring-blue-500',
  },
} as const;

/**
 * Neutral colors for UI chrome, text, and backgrounds
 */
export const neutralColors = {
  // Backgrounds
  bgPage: 'bg-slate-50',
  bgSurface: 'bg-white',
  bgMuted: 'bg-slate-100',
  bgSubtle: 'bg-slate-50',

  // Text
  textHeading: 'text-slate-900',
  textBody: 'text-slate-700',
  textMuted: 'text-slate-500',
  textSubtle: 'text-slate-400',

  // Borders
  border: 'border-slate-200',
  borderStrong: 'border-slate-300',
  borderSubtle: 'border-slate-100',

  // Rings (for focus states, inset borders)
  ring: 'ring-slate-200',
  ringStrong: 'ring-slate-300',
} as const;

/**
 * Interactive/Primary colors for buttons and links
 */
export const interactiveColors = {
  primary: {
    bg: 'bg-blue-600',
    bgHover: 'hover:bg-blue-700',
    bgActive: 'active:bg-blue-800',
    text: 'text-white',
    border: 'border-blue-600',
    // For outlined/ghost variants
    textColored: 'text-blue-600',
    textColoredHover: 'hover:text-blue-700',
    bgSubtle: 'bg-blue-50',
    bgSubtleHover: 'hover:bg-blue-100',
  },
  secondary: {
    bg: 'bg-slate-100',
    bgHover: 'hover:bg-slate-200',
    bgActive: 'active:bg-slate-300',
    text: 'text-slate-700',
    border: 'border-slate-300',
  },
  danger: {
    bg: 'bg-red-600',
    bgHover: 'hover:bg-red-700',
    bgActive: 'active:bg-red-800',
    text: 'text-white',
    border: 'border-red-600',
    // For outlined/ghost variants
    textColored: 'text-red-600',
    textColoredHover: 'hover:text-red-700',
    bgSubtle: 'bg-red-50',
    bgSubtleHover: 'hover:bg-red-100',
  },
  success: {
    bg: 'bg-emerald-600',
    bgHover: 'hover:bg-emerald-700',
    bgActive: 'active:bg-emerald-800',
    text: 'text-white',
    border: 'border-emerald-600',
    textColored: 'text-emerald-600',
    textColoredHover: 'hover:text-emerald-700',
    bgSubtle: 'bg-emerald-50',
    bgSubtleHover: 'hover:bg-emerald-100',
  },
} as const;

/**
 * Focus ring styles for accessibility
 */
export const focusRing = {
  default:
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
  inset:
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset',
  none: 'focus:outline-none',
} as const;

/**
 * Draft/WIP status (special case - orange/yellow tone)
 */
export const draftColors = {
  bg: 'bg-orange-50',
  bgStrong: 'bg-orange-100',
  text: 'text-orange-700',
  border: 'border-orange-200',
  ring: 'ring-orange-200',
} as const;

// Type exports for use in components
export type StatusColorKey = keyof typeof statusColors;
export type InteractiveColorKey = keyof typeof interactiveColors;
