/**
 * Badge Component
 *
 * Display status, category, or label information in a compact,
 * visually distinct format.
 *
 * @example
 * // Get classes for use in templates
 * <span class="{{ getBadgeClasses({ variant: 'success' }) }}">OK</span>
 *
 * // Create DOM element directly
 * const badge = createBadge('Active', { variant: 'success', size: 'sm' });
 */

import { cn } from '../utils/cn.ts';

/**
 * Badge variants map to semantic meaning, not colors.
 * This allows the color palette to evolve independently.
 */
export type BadgeVariant =
  | 'default' // Neutral, general labels
  | 'success' // Positive: OK, Active, Complete, Healthy
  | 'warning' // Caution: Pending, Review, Attention
  | 'error' // Negative: Failed, Error, Disabled, Critical
  | 'info' // Informational: Note, Info, New
  | 'draft'; // Work-in-progress: Draft, Beta, Preview

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  /** Semantic variant determining color scheme */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Additional CSS classes to merge */
  class?: string;
}

/**
 * Variant styles using Tailwind classes
 *
 * Design notes:
 * - Backgrounds use 50 weight (very subtle)
 * - Text uses 700 weight (strong but not black)
 * - Ring provides subtle border definition without heaviness
 */
const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 ring-slate-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  error: 'bg-red-50 text-red-700 ring-red-600/20',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  draft: 'bg-orange-50 text-orange-700 ring-orange-600/20',
};

/**
 * Size styles
 *
 * Design notes:
 * - sm: For dense tables and lists
 * - md: Default, works in most contexts
 * - lg: For emphasis, page headers
 */
const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

/**
 * Base styles applied to all badges
 */
const baseStyles = [
  'inline-flex',
  'items-center',
  'font-medium',
  'rounded-full', // Pill shape
  'ring-1', // Subtle border
  'ring-inset', // Border inside the element
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
 * // In TypeScript
 * const classes = getBadgeClasses({ variant: 'error', size: 'sm' });
 * element.className = classes;
 */
export function getBadgeClasses(props: BadgeProps = {}): string {
  const {
    variant = 'default',
    size = 'md',
    class: className,
  } = props;

  return cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
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
  span.textContent = text;
  return span;
}

/**
 * Convenience function to create multiple badges
 *
 * @param items - Array of [text, variant] tuples
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
): DocumentFragment {
  const fragment = document.createDocumentFragment();

  items.forEach(([text, variant], index) => {
    if (index > 0) {
      // Add small gap between badges
      const spacer = document.createElement('span');
      spacer.className = 'inline-block w-1';
      fragment.appendChild(spacer);
    }
    fragment.appendChild(createBadge(text, { variant }));
  });

  return fragment;
}

export default {
  getBadgeClasses,
  createBadge,
  createBadges,
};
