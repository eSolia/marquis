/**
 * eSolia UI Color Tokens
 *
 * Semantic color definitions using Tailwind classes.
 * Use these tokens to maintain consistency across components.
 *
 * Colors are organized by semantic meaning, not by hue.
 * This allows palette changes without updating component code.
 *
 * All colors now support dark mode with combined light+dark classes.
 */

/**
 * Status colors for badges, alerts, and status indicators
 * Each status has light mode and dark mode variants
 */
export const statusColors = {
  success: {
    // Light mode
    bg: 'bg-emerald-50',
    bgStrong: 'bg-emerald-100',
    bgSolid: 'bg-emerald-500',
    text: 'text-emerald-700',
    textOnSolid: 'text-white',
    border: 'border border-emerald-200',
    ring: 'ring-1 ring-emerald-200',
    ringStrong: 'ring-2 ring-emerald-500',
    // Combined light+dark
    bgDual: 'bg-emerald-50 dark:bg-emerald-950',
    bgStrongDual: 'bg-emerald-100 dark:bg-emerald-900',
    bgSolidDual: 'bg-emerald-500 dark:bg-emerald-600',
    textDual: 'text-emerald-700 dark:text-emerald-400',
    borderDual: 'border border-emerald-200 dark:border-emerald-800',
    ringDual: 'ring-1 ring-emerald-200 dark:ring-emerald-800',
  },
  warning: {
    // Light mode
    bg: 'bg-amber-50',
    bgStrong: 'bg-amber-100',
    bgSolid: 'bg-amber-500',
    text: 'text-amber-700',
    textOnSolid: 'text-white',
    border: 'border border-amber-200',
    ring: 'ring-1 ring-amber-200',
    ringStrong: 'ring-2 ring-amber-500',
    // Combined light+dark
    bgDual: 'bg-amber-50 dark:bg-amber-950',
    bgStrongDual: 'bg-amber-100 dark:bg-amber-900',
    bgSolidDual: 'bg-amber-500 dark:bg-amber-600',
    textDual: 'text-amber-700 dark:text-amber-400',
    borderDual: 'border border-amber-200 dark:border-amber-800',
    ringDual: 'ring-1 ring-amber-200 dark:ring-amber-800',
  },
  error: {
    // Light mode
    bg: 'bg-red-50',
    bgStrong: 'bg-red-100',
    bgSolid: 'bg-red-500',
    text: 'text-red-700',
    textOnSolid: 'text-white',
    border: 'border border-red-200',
    ring: 'ring-1 ring-red-200',
    ringStrong: 'ring-2 ring-red-500',
    // Combined light+dark
    bgDual: 'bg-red-50 dark:bg-red-950',
    bgStrongDual: 'bg-red-100 dark:bg-red-900',
    bgSolidDual: 'bg-red-500 dark:bg-red-600',
    textDual: 'text-red-700 dark:text-red-400',
    borderDual: 'border border-red-200 dark:border-red-800',
    ringDual: 'ring-1 ring-red-200 dark:ring-red-800',
  },
  info: {
    // Light mode
    bg: 'bg-blue-50',
    bgStrong: 'bg-blue-100',
    bgSolid: 'bg-blue-500',
    text: 'text-blue-700',
    textOnSolid: 'text-white',
    border: 'border border-blue-200',
    ring: 'ring-1 ring-blue-200',
    ringStrong: 'ring-2 ring-blue-500',
    // Combined light+dark
    bgDual: 'bg-blue-50 dark:bg-blue-950',
    bgStrongDual: 'bg-blue-100 dark:bg-blue-900',
    bgSolidDual: 'bg-blue-500 dark:bg-blue-600',
    textDual: 'text-blue-700 dark:text-blue-400',
    borderDual: 'border border-blue-200 dark:border-blue-800',
    ringDual: 'ring-1 ring-blue-200 dark:ring-blue-800',
  },
} as const;

/**
 * Neutral colors for UI chrome, text, and backgrounds
 */
export const neutralColors = {
  // Backgrounds - Light mode only
  bgPage: 'bg-slate-50',
  bgSurface: 'bg-white',
  bgMuted: 'bg-slate-100',
  bgSubtle: 'bg-slate-50',

  // Text - Light mode only
  textHeading: 'text-slate-900',
  textBody: 'text-slate-700',
  textMuted: 'text-slate-500',
  textSubtle: 'text-slate-400',

  // Borders - Light mode only
  border: 'border border-slate-200',
  borderStrong: 'border border-slate-300',
  borderSubtle: 'border border-slate-100',

  // Rings (for focus states, inset borders) - Light mode only
  ring: 'ring-1 ring-slate-200',
  ringStrong: 'ring-2 ring-slate-300',

  // Combined light+dark mode versions
  bgPageDual: 'bg-slate-50 dark:bg-slate-950',
  bgSurfaceDual: 'bg-white dark:bg-slate-900',
  bgMutedDual: 'bg-slate-100 dark:bg-slate-800',
  bgSubtleDual: 'bg-slate-50 dark:bg-slate-800/50',

  textHeadingDual: 'text-slate-900 dark:text-white',
  textBodyDual: 'text-slate-700 dark:text-slate-300',
  textMutedDual: 'text-slate-500 dark:text-slate-400',
  textSubtleDual: 'text-slate-400 dark:text-slate-500',

  borderDual: 'border border-slate-200 dark:border-slate-700',
  borderStrongDual: 'border border-slate-300 dark:border-slate-600',
  borderSubtleDual: 'border border-slate-100 dark:border-slate-800',

  ringDual: 'ring-1 ring-slate-200 dark:ring-slate-700',
  ringStrongDual: 'ring-2 ring-slate-300 dark:ring-slate-600',

  dividerDual: 'divide-slate-200 dark:divide-slate-700',
} as const;

/**
 * Interactive/Primary colors for buttons and links
 * Now with dark mode support
 */
export const interactiveColors = {
  primary: {
    // Light mode
    bg: 'bg-blue-600',
    bgHover: 'hover:bg-blue-700',
    bgActive: 'active:bg-blue-800',
    text: 'text-white',
    border: 'border border-blue-600',
    textColored: 'text-blue-600',
    textColoredHover: 'hover:text-blue-700',
    bgSubtle: 'bg-blue-50',
    bgSubtleHover: 'hover:bg-blue-100',
    // Dark mode variants
    bgDark: 'dark:bg-blue-500',
    bgHoverDark: 'dark:hover:bg-blue-400',
    bgActiveDark: 'dark:active:bg-blue-600',
    textColoredDark: 'dark:text-blue-400',
    textColoredHoverDark: 'dark:hover:text-blue-300',
    bgSubtleDark: 'dark:bg-blue-900/30',
    bgSubtleHoverDark: 'dark:hover:bg-blue-900/50',
    borderDark: 'dark:border-blue-500',
  },
  secondary: {
    // Light mode
    bg: 'bg-slate-100',
    bgHover: 'hover:bg-slate-200',
    bgActive: 'active:bg-slate-300',
    text: 'text-slate-700',
    border: 'border border-slate-300',
    // Dark mode variants
    bgDark: 'dark:bg-slate-800',
    bgHoverDark: 'dark:hover:bg-slate-700',
    bgActiveDark: 'dark:active:bg-slate-600',
    textDark: 'dark:text-slate-200',
    borderDark: 'dark:border-slate-600',
  },
  danger: {
    // Light mode
    bg: 'bg-red-600',
    bgHover: 'hover:bg-red-700',
    bgActive: 'active:bg-red-800',
    text: 'text-white',
    border: 'border border-red-600',
    textColored: 'text-red-600',
    textColoredHover: 'hover:text-red-700',
    bgSubtle: 'bg-red-50',
    bgSubtleHover: 'hover:bg-red-100',
    // Dark mode variants
    bgDark: 'dark:bg-red-500',
    bgHoverDark: 'dark:hover:bg-red-400',
    bgActiveDark: 'dark:active:bg-red-600',
    textColoredDark: 'dark:text-red-400',
    textColoredHoverDark: 'dark:hover:text-red-300',
    bgSubtleDark: 'dark:bg-red-900/30',
    bgSubtleHoverDark: 'dark:hover:bg-red-900/50',
    borderDark: 'dark:border-red-500',
  },
  success: {
    // Light mode
    bg: 'bg-emerald-600',
    bgHover: 'hover:bg-emerald-700',
    bgActive: 'active:bg-emerald-800',
    text: 'text-white',
    border: 'border border-emerald-600',
    textColored: 'text-emerald-600',
    textColoredHover: 'hover:text-emerald-700',
    bgSubtle: 'bg-emerald-50',
    bgSubtleHover: 'hover:bg-emerald-100',
    // Dark mode variants
    bgDark: 'dark:bg-emerald-500',
    bgHoverDark: 'dark:hover:bg-emerald-400',
    bgActiveDark: 'dark:active:bg-emerald-600',
    textColoredDark: 'dark:text-emerald-400',
    textColoredHoverDark: 'dark:hover:text-emerald-300',
    bgSubtleDark: 'dark:bg-emerald-900/30',
    bgSubtleHoverDark: 'dark:hover:bg-emerald-900/50',
    borderDark: 'dark:border-emerald-500',
  },
} as const;

/**
 * Focus ring styles for accessibility
 * Updated with dark mode support
 */
export const focusRing = {
  default:
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-slate-900',
  inset:
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset dark:focus-visible:ring-blue-400',
  none: 'focus:outline-none',
} as const;

/**
 * Draft/WIP status (special case - orange/yellow tone)
 */
export const draftColors = {
  bg: 'bg-orange-50',
  bgStrong: 'bg-orange-100',
  text: 'text-orange-700',
  border: 'border border-orange-200',
  ring: 'ring-1 ring-orange-200',
  // Dark mode
  bgDual: 'bg-orange-50 dark:bg-orange-950',
  bgStrongDual: 'bg-orange-100 dark:bg-orange-900',
  textDual: 'text-orange-700 dark:text-orange-400',
  borderDual: 'border border-orange-200 dark:border-orange-800',
  ringDual: 'ring-1 ring-orange-200 dark:ring-orange-800',
} as const;

// Type exports for use in components
export type StatusColorKey = keyof typeof statusColors;
export type InteractiveColorKey = keyof typeof interactiveColors;

/**
 * Helper to get combined light+dark mode classes for a status color
 */
export function getStatusColorClasses(status: StatusColorKey) {
  const colors = statusColors[status];
  return {
    bg: colors.bgDual,
    bgStrong: colors.bgStrongDual,
    bgSolid: colors.bgSolidDual,
    text: colors.textDual,
    border: colors.borderDual,
    ring: colors.ringDual,
  };
}

/**
 * Helper to get combined light+dark mode classes for neutral colors
 */
export function getNeutralColorClasses() {
  return {
    bgPage: neutralColors.bgPageDual,
    bgSurface: neutralColors.bgSurfaceDual,
    bgMuted: neutralColors.bgMutedDual,
    bgSubtle: neutralColors.bgSubtleDual,
    textHeading: neutralColors.textHeadingDual,
    textBody: neutralColors.textBodyDual,
    textMuted: neutralColors.textMutedDual,
    textSubtle: neutralColors.textSubtleDual,
    border: neutralColors.borderDual,
    borderStrong: neutralColors.borderStrongDual,
    borderSubtle: neutralColors.borderSubtleDual,
    ring: neutralColors.ringDual,
    ringStrong: neutralColors.ringStrongDual,
    divider: neutralColors.dividerDual,
  };
}

/**
 * Helper to get combined light+dark mode classes for interactive colors
 */
export function getInteractiveColorClasses(variant: InteractiveColorKey) {
  if (variant === 'primary') {
    const primary = interactiveColors.primary;
    return {
      bg: `${primary.bg} ${primary.bgDark}`,
      bgHover: `${primary.bgHover} ${primary.bgHoverDark}`,
      bgActive: `${primary.bgActive} ${primary.bgActiveDark}`,
      text: primary.text,
      border: `${primary.border} ${primary.borderDark}`,
      textColored: `${primary.textColored} ${primary.textColoredDark}`,
      textColoredHover: `${primary.textColoredHover} ${primary.textColoredHoverDark}`,
      bgSubtle: `${primary.bgSubtle} ${primary.bgSubtleDark}`,
      bgSubtleHover: `${primary.bgSubtleHover} ${primary.bgSubtleHoverDark}`,
    };
  }

  if (variant === 'secondary') {
    const secondary = interactiveColors.secondary;
    return {
      bg: `${secondary.bg} ${secondary.bgDark}`,
      bgHover: `${secondary.bgHover} ${secondary.bgHoverDark}`,
      bgActive: `${secondary.bgActive} ${secondary.bgActiveDark}`,
      text: `${secondary.text} ${secondary.textDark}`,
      border: `${secondary.border} ${secondary.borderDark}`,
    };
  }

  if (variant === 'danger') {
    const danger = interactiveColors.danger;
    return {
      bg: `${danger.bg} ${danger.bgDark}`,
      bgHover: `${danger.bgHover} ${danger.bgHoverDark}`,
      bgActive: `${danger.bgActive} ${danger.bgActiveDark}`,
      text: danger.text,
      border: `${danger.border} ${danger.borderDark}`,
      textColored: `${danger.textColored} ${danger.textColoredDark}`,
      textColoredHover: `${danger.textColoredHover} ${danger.textColoredHoverDark}`,
      bgSubtle: `${danger.bgSubtle} ${danger.bgSubtleDark}`,
      bgSubtleHover: `${danger.bgSubtleHover} ${danger.bgSubtleHoverDark}`,
    };
  }

  // success
  const success = interactiveColors.success;
  return {
    bg: `${success.bg} ${success.bgDark}`,
    bgHover: `${success.bgHover} ${success.bgHoverDark}`,
    bgActive: `${success.bgActive} ${success.bgActiveDark}`,
    text: success.text,
    border: `${success.border} ${success.borderDark}`,
    textColored: `${success.textColored} ${success.textColoredDark}`,
    textColoredHover: `${success.textColoredHover} ${success.textColoredHoverDark}`,
    bgSubtle: `${success.bgSubtle} ${success.bgSubtleDark}`,
    bgSubtleHover: `${success.bgSubtleHover} ${success.bgSubtleHoverDark}`,
  };
}
