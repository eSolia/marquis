/**
 * Card Components
 *
 * Container components for grouping related content.
 * Includes base Card and specialized StatCard for dashboard metrics.
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

// =============================================================================
// CARD COMPONENT
// =============================================================================

export type CardVariant =
  | 'default' // White bg, subtle border and shadow
  | 'elevated' // Stronger shadow
  | 'outline' // Border only, no shadow
  | 'ghost'; // No border or shadow

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  class?: string;
}

const cardVariantStyles: Record<CardVariant, string> = {
  default: [
    'bg-white',
    'border border-slate-200',
    'shadow-sm',
  ].join(' '),

  elevated: [
    'bg-white',
    'border border-slate-200',
    'shadow-md',
  ].join(' '),

  outline: [
    'bg-white',
    'border border-slate-200',
  ].join(' '),

  ghost: [
    'bg-transparent',
  ].join(' '),
};

const cardPaddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const cardBaseStyles = 'rounded-lg';

/**
 * Get Tailwind classes for a card
 */
export function getCardClasses(props: CardProps = {}): string {
  const {
    variant = 'default',
    padding = 'md',
    class: className,
  } = props;

  return cn(
    cardBaseStyles,
    cardVariantStyles[variant],
    cardPaddingStyles[padding],
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
// STAT CARD COMPONENT
// =============================================================================

export type StatCardVariant =
  | 'default' // Neutral
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
  /** Optional icon (SVG string or element) */
  icon?: string | HTMLElement;
  /** Additional classes */
  class?: string;
}

/**
 * Stat card variant styles
 *
 * Design notes:
 * - Subtle gradient backgrounds for color variants
 * - Maintains readability with dark text
 * - Default is clean white with no color coding
 */
const statCardVariantStyles: Record<StatCardVariant, { container: string; value: string }> = {
  default: {
    container: 'bg-white border-slate-200',
    value: 'text-slate-900',
  },
  success: {
    container: 'bg-gradient-to-b from-emerald-50 to-emerald-100/50 border-emerald-200',
    value: 'text-emerald-700',
  },
  warning: {
    container: 'bg-gradient-to-b from-amber-50 to-amber-100/50 border-amber-200',
    value: 'text-amber-700',
  },
  error: {
    container: 'bg-gradient-to-b from-red-50 to-red-100/50 border-red-200',
    value: 'text-red-700',
  },
};

/**
 * Get Tailwind classes for stat card container
 */
export function getStatCardClasses(variant: StatCardVariant = 'default'): string {
  return cn(
    // Base
    'rounded-lg border p-6',
    'shadow-sm',
    'flex flex-col items-center justify-center',
    'min-h-[120px]',
    // Variant
    statCardVariantStyles[variant].container,
  );
}

/**
 * Get Tailwind classes for stat card value
 */
export function getStatCardValueClasses(variant: StatCardVariant = 'default'): string {
  return cn(
    'text-3xl font-mono font-semibold tracking-tight',
    statCardVariantStyles[variant].value,
  );
}

/**
 * Get Tailwind classes for stat card label
 */
export function getStatCardLabelClasses(): string {
  return 'text-sm font-medium text-slate-500 uppercase tracking-wide mt-1';
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
 *   variant: 'success'
 * });
 */
export function createStatCard(props: StatCardProps): HTMLDivElement {
  const {
    value,
    label,
    variant = 'default',
    icon,
    class: className,
  } = props;

  const card = document.createElement('div');
  card.className = cn(getStatCardClasses(variant), className);

  // Optional icon
  if (icon) {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'mb-2 text-slate-400';

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
  valueEl.className = getStatCardValueClasses(variant);
  valueEl.textContent = String(value);
  card.appendChild(valueEl);

  // Label
  const labelEl = document.createElement('div');
  labelEl.className = getStatCardLabelClasses();
  labelEl.textContent = label;
  card.appendChild(labelEl);

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
  options: { gap?: 'sm' | 'md' | 'lg' } = {},
): HTMLDivElement {
  const { gap = 'md' } = options;

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  const row = document.createElement('div');
  row.className = cn(
    'grid',
    `grid-cols-${stats.length}`,
    gapStyles[gap],
  );

  // Fallback for dynamic grid-cols (Tailwind needs static classes)
  row.style.gridTemplateColumns = `repeat(${stats.length}, minmax(0, 1fr))`;

  stats.forEach((stat) => {
    row.appendChild(createStatCard(stat));
  });

  return row;
}

export default {
  // Card
  getCardClasses,
  createCard,
  // Stat Card
  getStatCardClasses,
  getStatCardValueClasses,
  getStatCardLabelClasses,
  createStatCard,
  createStatCardRow,
};
