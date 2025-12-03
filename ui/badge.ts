/**
 * Badge Component
 *
 * Display status, category, or label information in a compact,
 * visually distinct format. Supports dark mode and custom theme colors.
 *
 * @example
 * // Get classes for use in templates
 * <span class="{{ getBadgeClasses({ variant: 'success' }) }}">OK</span>
 *
 * // Create DOM element directly
 * const badge = createBadge('Active', { variant: 'success', size: 'sm' });
 *
 * // With custom theme color
 * const badge = createBadge('New', { variant: 'primary', themeColor: 'violet' });
 */

import { cn } from '../utils/cn.ts';
import { getPrimaryClasses, type PrimaryColor } from '../tokens/theme.ts';

/**
 * Badge variants map to semantic meaning, not colors.
 * This allows the color palette to evolve independently.
 */
export type BadgeVariant =
  | 'default' // Neutral, general labels
  | 'primary' // Brand/theme colored badge
  | 'success' // Positive: OK, Active, Complete, Healthy
  | 'warning' // Caution: Pending, Review, Attention
  | 'error' // Negative: Failed, Error, Disabled, Critical
  | 'info' // Informational: Note, Info, New
  | 'draft'; // Work-in-progress: Draft, Beta, Preview

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export type BadgeStyle = 'subtle' | 'solid' | 'outline';

export interface BadgeProps {
  /** Semantic variant determining color scheme */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Visual style */
  style?: BadgeStyle;
  /** Custom theme color (for primary variant) */
  themeColor?: PrimaryColor;
  /** Enable dark mode support (default: true) */
  darkMode?: boolean;
  /** Removable badge (shows X icon) */
  removable?: boolean;
  /** Dot indicator (no text, just colored dot) */
  dot?: boolean;
  /** Additional CSS classes to merge */
  class?: string;
}

/**
 * Get variant styles with dark mode support
 */
function getVariantStyles(
  variant: BadgeVariant,
  style: BadgeStyle = 'subtle',
  themeColor: PrimaryColor = 'blue',
  darkMode: boolean = true,
): string {
  // For primary variant, use theme color
  if (variant === 'primary') {
    const theme = getPrimaryClasses(themeColor);

    if (style === 'solid') {
      return darkMode
        ? `${theme.bgSolid} ${theme.textOnSolid} ring-1 ring-inset ring-white/10`
        : `bg-${themeColor}-600 text-white ring-1 ring-inset ring-${themeColor}-600/20`;
    }

    if (style === 'outline') {
      return darkMode
        ? `bg-transparent ${theme.textColored} ring-1 ring-inset ${theme.ring}`
        : `bg-transparent text-${themeColor}-600 ring-1 ring-inset ring-${themeColor}-600/20`;
    }

    // subtle (default)
    return darkMode
      ? `${theme.bg} ${theme.text} ring-1 ring-inset ${theme.ring}`
      : `bg-${themeColor}-50 text-${themeColor}-700 ring-1 ring-inset ring-${themeColor}-600/20`;
  }

  // Status variants with dark mode
  const statusVariants: Record<
    Exclude<BadgeVariant, 'primary'>,
    Record<BadgeStyle, { light: string; dark: string }>
  > = {
    default: {
      subtle: {
        light: 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200',
        dark: 'dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
      },
      solid: {
        light: 'bg-slate-600 text-white ring-1 ring-inset ring-slate-600/20',
        dark: 'dark:bg-slate-500 dark:text-white dark:ring-white/10',
      },
      outline: {
        light: 'bg-transparent text-slate-600 ring-1 ring-inset ring-slate-300',
        dark: 'dark:text-slate-400 dark:ring-slate-600',
      },
    },
    success: {
      subtle: {
        light: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
        dark: 'dark:bg-emerald-950 dark:text-emerald-400 dark:ring-emerald-500/20',
      },
      solid: {
        light: 'bg-emerald-500 text-white ring-1 ring-inset ring-emerald-600/20',
        dark: 'dark:bg-emerald-600 dark:text-white dark:ring-white/10',
      },
      outline: {
        light: 'bg-transparent text-emerald-600 ring-1 ring-inset ring-emerald-500',
        dark: 'dark:text-emerald-400 dark:ring-emerald-500/50',
      },
    },
    warning: {
      subtle: {
        light: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
        dark: 'dark:bg-amber-950 dark:text-amber-400 dark:ring-amber-500/20',
      },
      solid: {
        light: 'bg-amber-500 text-white ring-1 ring-inset ring-amber-600/20',
        dark: 'dark:bg-amber-600 dark:text-white dark:ring-white/10',
      },
      outline: {
        light: 'bg-transparent text-amber-600 ring-1 ring-inset ring-amber-500',
        dark: 'dark:text-amber-400 dark:ring-amber-500/50',
      },
    },
    error: {
      subtle: {
        light: 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20',
        dark: 'dark:bg-red-950 dark:text-red-400 dark:ring-red-500/20',
      },
      solid: {
        light: 'bg-red-500 text-white ring-1 ring-inset ring-red-600/20',
        dark: 'dark:bg-red-600 dark:text-white dark:ring-white/10',
      },
      outline: {
        light: 'bg-transparent text-red-600 ring-1 ring-inset ring-red-500',
        dark: 'dark:text-red-400 dark:ring-red-500/50',
      },
    },
    info: {
      subtle: {
        light: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20',
        dark: 'dark:bg-blue-950 dark:text-blue-400 dark:ring-blue-500/20',
      },
      solid: {
        light: 'bg-blue-500 text-white ring-1 ring-inset ring-blue-600/20',
        dark: 'dark:bg-blue-600 dark:text-white dark:ring-white/10',
      },
      outline: {
        light: 'bg-transparent text-blue-600 ring-1 ring-inset ring-blue-500',
        dark: 'dark:text-blue-400 dark:ring-blue-500/50',
      },
    },
    draft: {
      subtle: {
        light: 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20',
        dark: 'dark:bg-orange-950 dark:text-orange-400 dark:ring-orange-500/20',
      },
      solid: {
        light: 'bg-orange-500 text-white ring-1 ring-inset ring-orange-600/20',
        dark: 'dark:bg-orange-600 dark:text-white dark:ring-white/10',
      },
      outline: {
        light: 'bg-transparent text-orange-600 ring-1 ring-inset ring-orange-500',
        dark: 'dark:text-orange-400 dark:ring-orange-500/50',
      },
    },
  };

  const styles = statusVariants[variant][style];
  return darkMode ? `${styles.light} ${styles.dark}` : styles.light;
}

/**
 * Size styles
 *
 * Design notes:
 * - xs: For very compact displays
 * - sm: For dense tables and lists
 * - md: Default, works in most contexts
 * - lg: For emphasis, page headers
 */
const sizeStyles: Record<BadgeSize, string> = {
  xs: 'px-1 py-0.5 text-[10px]',
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

/**
 * Dot size styles
 */
const dotSizeStyles: Record<BadgeSize, string> = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

/**
 * Base styles applied to all badges
 */
const baseStyles = [
  'inline-flex',
  'items-center',
  'gap-1',
  'font-medium',
  'rounded-full', // Pill shape
  'whitespace-nowrap', // Prevent wrapping
].join(' ');

/**
 * Get Tailwind classes for a badge
 *
 * Use this when you're building HTML in templates (Vento, etc.)
 * or constructing class strings.
 *
 * @param props - Badge configuration
 * @returns Tailwind class string
 *
 * @example
 * // In a Vento template
 * <span class="{{ getBadgeClasses({ variant: 'success' }) }}">
 *   {{ status }}
 * </span>
 *
 * @example
 * // With custom theme color
 * <span class="{{ getBadgeClasses({ variant: 'primary', themeColor: 'violet' }) }}">
 *   New Feature
 * </span>
 */
export function getBadgeClasses(props: BadgeProps = {}): string {
  const {
    variant = 'default',
    size = 'md',
    style = 'subtle',
    themeColor = 'blue',
    darkMode = true,
    dot = false,
    class: className,
  } = props;

  if (dot) {
    return cn(
      'inline-block rounded-full',
      dotSizeStyles[size],
      getDotColorClasses(variant, themeColor, darkMode),
      className,
    );
  }

  return cn(
    baseStyles,
    getVariantStyles(variant, style, themeColor, darkMode),
    sizeStyles[size],
    className,
  );
}

/**
 * Get dot color classes
 */
function getDotColorClasses(
  variant: BadgeVariant,
  themeColor: PrimaryColor = 'blue',
  darkMode: boolean = true,
): string {
  if (variant === 'primary') {
    return darkMode ? `bg-${themeColor}-500 dark:bg-${themeColor}-400` : `bg-${themeColor}-500`;
  }

  const colorMap: Record<Exclude<BadgeVariant, 'primary'>, string> = {
    default: darkMode ? 'bg-slate-400 dark:bg-slate-500' : 'bg-slate-400',
    success: darkMode ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-emerald-500',
    warning: darkMode ? 'bg-amber-500 dark:bg-amber-400' : 'bg-amber-500',
    error: darkMode ? 'bg-red-500 dark:bg-red-400' : 'bg-red-500',
    info: darkMode ? 'bg-blue-500 dark:bg-blue-400' : 'bg-blue-500',
    draft: darkMode ? 'bg-orange-500 dark:bg-orange-400' : 'bg-orange-500',
  };

  return colorMap[variant];
}

/**
 * Create a badge DOM element
 *
 * Use this when building UI imperatively in vanilla JS.
 *
 * @param text - Badge content
 * @param props - Badge configuration
 * @returns HTMLSpanElement
 *
 * @example
 * const badge = createBadge('OK', { variant: 'success' });
 * row.querySelector('.status-cell').appendChild(badge);
 */
export function createBadge(text: string, props: BadgeProps = {}): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = getBadgeClasses(props);

  if (props.dot) {
    // Dot badges are just colored circles
    span.setAttribute('aria-label', text);
    span.setAttribute('role', 'status');
  } else {
    span.textContent = text;

    // Add remove button if removable
    if (props.removable) {
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = cn(
        'ml-0.5 -mr-0.5 p-0.5 rounded-full',
        'hover:bg-black/10 dark:hover:bg-white/10',
        'focus:outline-none focus:ring-1 focus:ring-inset',
      );
      removeBtn.setAttribute('aria-label', `Remove ${text}`);
      removeBtn.innerHTML = '<i class="ph ph-x text-[10px]"></i>';
      span.appendChild(removeBtn);
    }
  }

  return span;
}

/**
 * Create a dot badge (status indicator)
 *
 * @param variant - Color variant
 * @param props - Badge configuration
 * @returns HTMLSpanElement
 *
 * @example
 * const statusDot = createDotBadge('success');
 * cell.appendChild(statusDot);
 */
export function createDotBadge(
  variant: BadgeVariant = 'default',
  props: Omit<BadgeProps, 'variant' | 'dot'> = {},
): HTMLSpanElement {
  return createBadge('', { ...props, variant, dot: true });
}

/**
 * Convenience function to create multiple badges
 *
 * @param items - Array of [text, variant] tuples
 * @param props - Shared badge props
 * @returns DocumentFragment containing badges
 *
 * @example
 * const badges = createBadges([
 *   ['Active', 'success'],
 *   ['Featured', 'info'],
 * ]);
 * container.appendChild(badges);
 */
export function createBadges(
  items: Array<[string, BadgeVariant?]>,
  props: Omit<BadgeProps, 'variant'> = {},
): DocumentFragment {
  const fragment = document.createDocumentFragment();

  items.forEach(([text, variant], index) => {
    if (index > 0) {
      // Add small gap between badges
      const spacer = document.createElement('span');
      spacer.className = 'inline-block w-1';
      fragment.appendChild(spacer);
    }
    fragment.appendChild(createBadge(text, { ...props, variant }));
  });

  return fragment;
}

/**
 * Create a badge with an icon
 *
 * @param text - Badge content
 * @param icon - Icon HTML string
 * @param props - Badge configuration
 * @returns HTMLSpanElement
 *
 * @example
 * const badge = createBadgeWithIcon('Live', '<i class="ph ph-circle-fill"></i>', {
 *   variant: 'success'
 * });
 */
export function createBadgeWithIcon(
  text: string,
  icon: string,
  props: BadgeProps = {},
): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = getBadgeClasses(props);

  // Add icon
  const iconSpan = document.createElement('span');
  iconSpan.className = 'w-3 h-3 -ml-0.5';
  iconSpan.innerHTML = icon;
  span.appendChild(iconSpan);

  // Add text
  const textNode = document.createTextNode(text);
  span.appendChild(textNode);

  return span;
}

export default {
  getBadgeClasses,
  createBadge,
  createDotBadge,
  createBadges,
  createBadgeWithIcon,
};
