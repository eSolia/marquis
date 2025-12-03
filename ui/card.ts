/**
 * Card Components
 *
 * Container components for grouping related content.
 * Includes base Card and specialized StatCard for dashboard metrics.
 * Supports dark mode and custom theme colors.
 *
 * @example
 * // Basic card
 * <div class="{{ getCardClasses({ variant: 'elevated' }) }}">
 *   <h3>Card Title</h3>
 *   <p>Card content...</p>
 * </div>
 *
 * // Stat card for dashboards
 * const stat = createStatCard({
 *   value: '42',
 *   label: 'Active Users',
 *   variant: 'success'
 * });
 */

import { cn } from '../utils/cn.ts';
import { getPrimaryClasses, type PrimaryColor } from '../tokens/theme.ts';

// =============================================================================
// CARD COMPONENT
// =============================================================================

export type CardVariant =
  | 'default' // White bg, subtle border and shadow
  | 'elevated' // Stronger shadow
  | 'outline' // Border only, no shadow
  | 'ghost' // No border or shadow
  | 'filled'; // Solid background (uses muted color)

export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  /** Enable dark mode support (default: true) */
  darkMode?: boolean;
  /** Hover effect */
  hoverable?: boolean;
  /** Make card clickable/interactive */
  interactive?: boolean;
  class?: string;
}

/**
 * Card variant styles with dark mode
 */
function getCardVariantStyles(variant: CardVariant, darkMode: boolean = true): string {
  const variants: Record<CardVariant, { light: string; dark: string }> = {
    default: {
      light: 'bg-white border border-slate-200 shadow-sm',
      dark: 'dark:bg-slate-900 dark:border-slate-700',
    },
    elevated: {
      light: 'bg-white border border-slate-200 shadow-md',
      dark: 'dark:bg-slate-900 dark:border-slate-700 dark:shadow-slate-900/50',
    },
    outline: {
      light: 'bg-white border border-slate-200',
      dark: 'dark:bg-slate-900 dark:border-slate-700',
    },
    ghost: {
      light: 'bg-transparent',
      dark: '',
    },
    filled: {
      light: 'bg-slate-50 border border-slate-100',
      dark: 'dark:bg-slate-800/50 dark:border-slate-800',
    },
  };

  const { light, dark } = variants[variant];
  return darkMode ? `${light} ${dark}` : light;
}

const cardPaddingStyles: Record<CardPadding, string> = {
  none: '',
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const cardBaseStyles = 'rounded-lg';

/**
 * Hover styles for interactive cards
 */
const hoverStyles = {
  light: 'hover:shadow-md hover:border-slate-300 transition-shadow duration-200',
  dark: 'dark:hover:border-slate-600',
};

const interactiveStyles = {
  light:
    'cursor-pointer hover:shadow-md hover:border-slate-300 active:shadow-sm transition-all duration-200',
  dark: 'dark:hover:border-slate-600 dark:active:bg-slate-800',
};

/**
 * Get Tailwind classes for a card
 */
export function getCardClasses(props: CardProps = {}): string {
  const {
    variant = 'default',
    padding = 'md',
    darkMode = true,
    hoverable = false,
    interactive = false,
    class: className,
  } = props;

  return cn(
    cardBaseStyles,
    getCardVariantStyles(variant, darkMode),
    cardPaddingStyles[padding],
    hoverable && `${hoverStyles.light} ${darkMode ? hoverStyles.dark : ''}`,
    interactive && `${interactiveStyles.light} ${darkMode ? interactiveStyles.dark : ''}`,
    className,
  );
}

/**
 * Create a card DOM element
 */
export function createCard(
  content: string | HTMLElement | HTMLElement[],
  props: CardProps = {},
): HTMLDivElement {
  const card = document.createElement('div');
  card.className = getCardClasses(props);

  if (typeof content === 'string') {
    card.innerHTML = content;
  } else if (Array.isArray(content)) {
    content.forEach((el) => card.appendChild(el));
  } else {
    card.appendChild(content);
  }

  return card;
}

// =============================================================================
// CARD HEADER / BODY / FOOTER
// =============================================================================

export interface CardSectionProps {
  darkMode?: boolean;
  class?: string;
}

/**
 * Get classes for card header section
 */
export function getCardHeaderClasses(props: CardSectionProps = {}): string {
  const { darkMode = true, class: className } = props;

  return cn(
    'px-6 py-4 border-b',
    darkMode ? 'border-slate-200 dark:border-slate-700' : 'border-slate-200',
    className,
  );
}

/**
 * Get classes for card body section
 */
export function getCardBodyClasses(props: CardSectionProps = {}): string {
  const { class: className } = props;
  return cn('p-6', className);
}

/**
 * Get classes for card footer section
 */
export function getCardFooterClasses(props: CardSectionProps = {}): string {
  const { darkMode = true, class: className } = props;

  return cn(
    'px-6 py-4 border-t',
    darkMode
      ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
      : 'border-slate-200 bg-slate-50',
    'rounded-b-lg',
    className,
  );
}

// =============================================================================
// STAT CARD COMPONENT
// =============================================================================

export type StatCardVariant =
  | 'default' // Neutral
  | 'primary' // Theme colored
  | 'success' // Green tint (healthy, positive)
  | 'warning' // Amber tint (attention needed)
  | 'error'; // Red tint (problems, alerts)

export interface StatCardProps {
  /** The main metric value */
  value: string | number;
  /** Label describing the metric */
  label: string;
  /** Color variant */
  variant?: StatCardVariant;
  /** Theme color for primary variant */
  themeColor?: PrimaryColor;
  /** Enable dark mode support */
  darkMode?: boolean;
  /** Optional icon (SVG string or element) */
  icon?: string | HTMLElement;
  /** Trend indicator */
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    positive?: boolean; // Whether up is good (defaults based on direction)
  };
  /** Additional classes */
  class?: string;
}

/**
 * Stat card variant styles with dark mode
 */
function getStatCardVariantStyles(
  variant: StatCardVariant,
  themeColor: PrimaryColor = 'blue',
  darkMode: boolean = true,
): { container: string; value: string; label: string } {
  if (variant === 'primary') {
    const theme = getPrimaryClasses(themeColor);
    return {
      container: darkMode
        ? `${theme.bg} ${theme.border} border`
        : `bg-${themeColor}-50 border border-${themeColor}-200`,
      value: darkMode ? theme.text : `text-${themeColor}-700`,
      label: darkMode ? 'text-slate-500 dark:text-slate-400' : 'text-slate-500',
    };
  }

  const variants: Record<
    Exclude<StatCardVariant, 'primary'>,
    { container: { light: string; dark: string }; value: { light: string; dark: string } }
  > = {
    default: {
      container: {
        light: 'bg-white border-slate-200',
        dark: 'dark:bg-slate-900 dark:border-slate-700',
      },
      value: {
        light: 'text-slate-900',
        dark: 'dark:text-white',
      },
    },
    success: {
      container: {
        light: 'bg-gradient-to-b from-emerald-50 to-emerald-100/50 border-emerald-200',
        dark: 'dark:from-emerald-950 dark:to-emerald-900/50 dark:border-emerald-800',
      },
      value: {
        light: 'text-emerald-700',
        dark: 'dark:text-emerald-400',
      },
    },
    warning: {
      container: {
        light: 'bg-gradient-to-b from-amber-50 to-amber-100/50 border-amber-200',
        dark: 'dark:from-amber-950 dark:to-amber-900/50 dark:border-amber-800',
      },
      value: {
        light: 'text-amber-700',
        dark: 'dark:text-amber-400',
      },
    },
    error: {
      container: {
        light: 'bg-gradient-to-b from-red-50 to-red-100/50 border-red-200',
        dark: 'dark:from-red-950 dark:to-red-900/50 dark:border-red-800',
      },
      value: {
        light: 'text-red-700',
        dark: 'dark:text-red-400',
      },
    },
  };

  const style = variants[variant];
  return {
    container: darkMode
      ? `${style.container.light} ${style.container.dark}`
      : style.container.light,
    value: darkMode ? `${style.value.light} ${style.value.dark}` : style.value.light,
    label: darkMode ? 'text-slate-500 dark:text-slate-400' : 'text-slate-500',
  };
}

/**
 * Get Tailwind classes for stat card container
 */
export function getStatCardClasses(
  variant: StatCardVariant = 'default',
  themeColor: PrimaryColor = 'blue',
  darkMode: boolean = true,
): string {
  const styles = getStatCardVariantStyles(variant, themeColor, darkMode);

  return cn(
    // Base
    'rounded-lg border p-6',
    'shadow-sm',
    'flex flex-col items-center justify-center',
    'min-h-[120px]',
    // Variant
    styles.container,
  );
}

/**
 * Get Tailwind classes for stat card value
 */
export function getStatCardValueClasses(
  variant: StatCardVariant = 'default',
  themeColor: PrimaryColor = 'blue',
  darkMode: boolean = true,
): string {
  const styles = getStatCardVariantStyles(variant, themeColor, darkMode);

  return cn(
    'text-3xl font-mono font-semibold tracking-tight',
    styles.value,
  );
}

/**
 * Get Tailwind classes for stat card label
 */
export function getStatCardLabelClasses(darkMode: boolean = true): string {
  return cn(
    'text-sm font-medium uppercase tracking-wide mt-1',
    darkMode ? 'text-slate-500 dark:text-slate-400' : 'text-slate-500',
  );
}

/**
 * Get Tailwind classes for trend indicator
 */
export function getTrendClasses(
  direction: 'up' | 'down' | 'neutral',
  positive: boolean,
  darkMode: boolean = true,
): string {
  const baseClasses = 'flex items-center gap-1 text-sm font-medium mt-2';

  if (direction === 'neutral') {
    return cn(
      baseClasses,
      darkMode ? 'text-slate-500 dark:text-slate-400' : 'text-slate-500',
    );
  }

  const isGood = direction === 'up' ? positive : !positive;

  if (isGood) {
    return cn(
      baseClasses,
      darkMode ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-600',
    );
  }

  return cn(
    baseClasses,
    darkMode ? 'text-red-600 dark:text-red-400' : 'text-red-600',
  );
}

/**
 * Create a stat card DOM element
 *
 * @example
 * const card = createStatCard({
 *   value: 6,
 *   label: 'Total Checks',
 *   variant: 'default'
 * });
 *
 * const healthyCard = createStatCard({
 *   value: 6,
 *   label: 'Healthy',
 *   variant: 'success',
 *   trend: { direction: 'up', value: '+12%', positive: true }
 * });
 */
export function createStatCard(props: StatCardProps): HTMLDivElement {
  const {
    value,
    label,
    variant = 'default',
    themeColor = 'blue',
    darkMode = true,
    icon,
    trend,
    class: className,
  } = props;

  const card = document.createElement('div');
  card.className = cn(getStatCardClasses(variant, themeColor, darkMode), className);

  // Optional icon
  if (icon) {
    const iconContainer = document.createElement('div');
    iconContainer.className = darkMode
      ? 'mb-2 text-slate-400 dark:text-slate-500'
      : 'mb-2 text-slate-400';

    if (typeof icon === 'string') {
      iconContainer.innerHTML = icon;
      // Style the SVG
      const svg = iconContainer.querySelector('svg');
      if (svg) {
        svg.classList.add('w-6', 'h-6');
      }
    } else {
      icon.classList.add('w-6', 'h-6');
      iconContainer.appendChild(icon);
    }

    card.appendChild(iconContainer);
  }

  // Value
  const valueEl = document.createElement('div');
  valueEl.className = getStatCardValueClasses(variant, themeColor, darkMode);
  valueEl.textContent = String(value);
  card.appendChild(valueEl);

  // Label
  const labelEl = document.createElement('div');
  labelEl.className = getStatCardLabelClasses(darkMode);
  labelEl.textContent = label;
  card.appendChild(labelEl);

  // Trend indicator
  if (trend) {
    const trendEl = document.createElement('div');
    const isPositive = trend.positive ?? (trend.direction === 'up');
    trendEl.className = getTrendClasses(trend.direction, isPositive, darkMode);

    // Trend icon
    const trendIcon = document.createElement('span');
    if (trend.direction === 'up') {
      trendIcon.innerHTML = '<i class="ph ph-trend-up"></i>';
    } else if (trend.direction === 'down') {
      trendIcon.innerHTML = '<i class="ph ph-trend-down"></i>';
    } else {
      trendIcon.innerHTML = '<i class="ph ph-minus"></i>';
    }
    trendEl.appendChild(trendIcon);

    // Trend value
    const trendValue = document.createElement('span');
    trendValue.textContent = trend.value;
    trendEl.appendChild(trendValue);

    card.appendChild(trendEl);
  }

  return card;
}

/**
 * Create a row of stat cards
 *
 * @example
 * const stats = createStatCardRow([
 *   { value: 6, label: 'Total Checks' },
 *   { value: 6, label: 'Healthy', variant: 'success' },
 *   { value: 0, label: 'Alerts', variant: 'error' },
 * ]);
 */
export function createStatCardRow(
  stats: StatCardProps[],
  options: { gap?: 'sm' | 'md' | 'lg'; columns?: number } = {},
): HTMLDivElement {
  const { gap = 'md', columns } = options;

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  const row = document.createElement('div');
  row.className = cn(
    'grid',
    gapStyles[gap],
  );

  // Set grid columns
  const cols = columns || stats.length;
  row.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

  stats.forEach((stat) => {
    row.appendChild(createStatCard(stat));
  });

  return row;
}

export default {
  // Card
  getCardClasses,
  createCard,
  getCardHeaderClasses,
  getCardBodyClasses,
  getCardFooterClasses,
  // Stat Card
  getStatCardClasses,
  getStatCardValueClasses,
  getStatCardLabelClasses,
  getTrendClasses,
  createStatCard,
  createStatCardRow,
};
