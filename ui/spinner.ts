/**
 * Spinner Component
 *
 * Loading indicators for async operations.
 *
 * @example
 * // Get CSS for spinner animation (add to page head)
 * <style>${getSpinnerCSS()}</style>
 *
 * // Use spinner classes
 * <i class="ph ph-spinner {{ getSpinnerClasses() }}"></i>
 *
 * // Or create spinner HTML
 * const spinner = createSpinner({ size: 'lg' });
 */

import { cn } from '../utils/cn.ts';

/**
 * Spinner size
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Spinner variant
 */
export type SpinnerVariant =
  | 'default' // Slate/gray
  | 'primary' // Blue
  | 'white' // White (for dark backgrounds)
  | 'current'; // Inherit current text color

/**
 * Spinner speed
 */
export type SpinnerSpeed = 'slow' | 'normal' | 'fast';

/**
 * Spinner props
 */
export interface SpinnerProps {
  /** Spinner size */
  size?: SpinnerSize;
  /** Spinner variant */
  variant?: SpinnerVariant;
  /** Animation speed */
  speed?: SpinnerSpeed;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Get CSS required for spinner animation.
 * Add this to your page's <style> or stylesheet.
 */
export function getSpinnerCSS(): string {
  return `
/* Spinner animation */
@keyframes marquis-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.marquis-spin {
  animation: marquis-spin 1s linear infinite;
}

.marquis-spin-slow {
  animation: marquis-spin 1.5s linear infinite;
}

.marquis-spin-fast {
  animation: marquis-spin 0.6s linear infinite;
}

/* Phosphor Icons compatibility */
.ph-spin {
  animation: marquis-spin 1s linear infinite;
}
`.trim();
}

/**
 * Size styles
 */
const sizeStyles: Record<SpinnerSize, string> = {
  xs: 'w-3 h-3 text-xs',
  sm: 'w-4 h-4 text-sm',
  md: 'w-5 h-5 text-base',
  lg: 'w-6 h-6 text-lg',
  xl: 'w-8 h-8 text-xl',
};

/**
 * Variant styles (color)
 */
const variantStyles: Record<SpinnerVariant, string> = {
  default: 'text-slate-500',
  primary: 'text-blue-600',
  white: 'text-white',
  current: '', // Inherit from parent
};

/**
 * Speed classes
 */
const speedClasses: Record<SpinnerSpeed, string> = {
  slow: 'marquis-spin-slow',
  normal: 'marquis-spin',
  fast: 'marquis-spin-fast',
};

/**
 * Base styles for spinner container
 */
const baseStyles = 'inline-flex items-center justify-center';

/**
 * Get spinner animation class
 *
 * @param speed - Animation speed
 * @returns CSS class for animation
 *
 * @example
 * <i class="ph ph-spinner {{ getSpinnerAnimationClass() }}"></i>
 */
export function getSpinnerAnimationClass(speed: SpinnerSpeed = 'normal'): string {
  return speedClasses[speed];
}

/**
 * Get Tailwind classes for a spinner
 *
 * @param props - Spinner configuration
 * @returns Tailwind class string
 *
 * @example
 * <div class="{{ getSpinnerClasses({ size: 'lg' }) }}">
 *   <i class="ph ph-spinner"></i>
 * </div>
 */
export function getSpinnerClasses(props: SpinnerProps = {}): string {
  const {
    size = 'md',
    variant = 'default',
    speed = 'normal',
    class: className,
  } = props;

  return cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    speedClasses[speed],
    className,
  );
}

/**
 * Get just the icon spin class (for adding to existing icons)
 *
 * @param props - Spinner configuration
 * @returns CSS classes to add spinning animation
 *
 * @example
 * <i class="ph ph-spinner {{ getSpinIconClasses() }}"></i>
 */
export function getSpinIconClasses(props: Pick<SpinnerProps, 'speed'> = {}): string {
  const { speed = 'normal' } = props;
  return speedClasses[speed];
}

/**
 * Create spinner HTML string using Phosphor Icons
 *
 * @param props - Spinner configuration
 * @returns HTML string for the spinner
 *
 * @example
 * const html = createSpinner({ size: 'lg', variant: 'primary' });
 */
export function createSpinner(props: SpinnerProps = {}): string {
  const classes = getSpinnerClasses(props);
  return `<i class="ph ph-spinner ${classes}" aria-hidden="true"></i>`;
}

/**
 * Create a spinner with label
 *
 * @param label - Loading text
 * @param props - Spinner configuration
 * @returns HTML string
 *
 * @example
 * const html = createSpinnerWithLabel('Loading...', { size: 'sm' });
 */
export function createSpinnerWithLabel(
  label: string,
  props: SpinnerProps & { labelPosition?: 'left' | 'right' } = {},
): string {
  const { labelPosition = 'right', ...spinnerProps } = props;
  const spinner = createSpinner(spinnerProps);
  const labelHtml = `<span>${label}</span>`;

  const containerClasses = cn('inline-flex items-center gap-2', props.class);

  if (labelPosition === 'left') {
    return `<span class="${containerClasses}">${labelHtml}${spinner}</span>`;
  }

  return `<span class="${containerClasses}">${spinner}${labelHtml}</span>`;
}

/**
 * Create a full-container loading overlay
 *
 * @param label - Optional loading text
 * @param props - Spinner configuration
 * @returns HTML string
 *
 * @example
 * const html = createLoadingOverlay('Loading data...');
 */
export function createLoadingOverlay(
  label?: string,
  props: SpinnerProps = {},
): string {
  const spinnerHtml = label
    ? createSpinnerWithLabel(label, { ...props, size: props.size || 'lg' })
    : createSpinner({ ...props, size: props.size || 'lg' });

  return `
<div class="flex items-center justify-center p-8">
  ${spinnerHtml}
</div>`.trim();
}

/**
 * Create a button loading state replacement
 *
 * Use this to replace button content during loading.
 *
 * @param originalText - Original button text
 * @param loadingText - Loading text (optional, defaults to original + '...')
 * @returns HTML string
 *
 * @example
 * button.innerHTML = createButtonLoading('Save', 'Saving...');
 */
export function createButtonLoading(
  originalText: string,
  loadingText?: string,
): string {
  const text = loadingText || `${originalText}...`;
  return `<i class="ph ph-spinner marquis-spin" aria-hidden="true"></i> ${text}`;
}

export default {
  getSpinnerCSS,
  getSpinnerAnimationClass,
  getSpinnerClasses,
  getSpinIconClasses,
  createSpinner,
  createSpinnerWithLabel,
  createLoadingOverlay,
  createButtonLoading,
};
