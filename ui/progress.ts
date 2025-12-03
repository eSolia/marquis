/**
 * Progress Component
 *
 * Display progress of an operation or task.
 * Supports linear bar and circular variants.
 *
 * @example
 * // Linear progress bar
 * <div class="{{ getProgressClasses() }}">
 *   <div class="{{ getProgressBarClasses({ themeColor: 'violet' }) }}" style="width: 60%"></div>
 * </div>
 *
 * // Create progress element
 * const progress = createProgress({ value: 75, themeColor: 'teal' });
 */

import { cn } from '../utils/cn.ts';
import { getPrimaryClasses, type PrimaryColor } from '../tokens/theme.ts';

// =============================================================================
// TYPES
// =============================================================================

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'primary';

export interface ProgressProps {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Color variant */
  variant?: ProgressVariant;
  /** Custom theme color (for primary variant) */
  themeColor?: PrimaryColor;
  /** Enable dark mode support */
  darkMode?: boolean;
  /** Indeterminate state (animated, no specific value) */
  indeterminate?: boolean;
  /** Show value label */
  showLabel?: boolean;
  /** Custom label format */
  labelFormat?: (value: number, max: number) => string;
  /** Animated transition */
  animated?: boolean;
  /** Striped pattern */
  striped?: boolean;
  /** Additional classes */
  class?: string;
}

// =============================================================================
// SIZE STYLES
// =============================================================================

const sizeStyles: Record<ProgressSize, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

// =============================================================================
// VARIANT STYLES
// =============================================================================

function getVariantStyles(
  variant: ProgressVariant,
  themeColor: PrimaryColor = 'blue',
  darkMode: boolean = true,
): string {
  if (variant === 'primary') {
    const theme = getPrimaryClasses(themeColor);
    return theme.bgSolid;
  }

  const variants: Record<Exclude<ProgressVariant, 'primary'>, { light: string; dark: string }> = {
    default: {
      light: 'bg-blue-600',
      dark: 'dark:bg-blue-500',
    },
    success: {
      light: 'bg-emerald-500',
      dark: 'dark:bg-emerald-400',
    },
    warning: {
      light: 'bg-amber-500',
      dark: 'dark:bg-amber-400',
    },
    error: {
      light: 'bg-red-500',
      dark: 'dark:bg-red-400',
    },
  };

  const { light, dark } = variants[variant];
  return darkMode ? `${light} ${dark}` : light;
}

// =============================================================================
// CLASS GETTERS
// =============================================================================

/**
 * Get classes for progress container (track)
 */
export function getProgressClasses(
  props: Pick<ProgressProps, 'size' | 'darkMode' | 'class'> = {},
): string {
  const { size = 'md', darkMode = true, class: className } = props;

  return cn(
    'w-full rounded-full overflow-hidden',
    sizeStyles[size],
    darkMode ? 'bg-slate-200 dark:bg-slate-700' : 'bg-slate-200',
    className,
  );
}

/**
 * Get classes for progress bar (fill)
 */
export function getProgressBarClasses(
  props: Pick<
    ProgressProps,
    'variant' | 'themeColor' | 'darkMode' | 'animated' | 'striped' | 'indeterminate'
  > = {},
): string {
  const {
    variant = 'default',
    themeColor = 'blue',
    darkMode = true,
    animated = true,
    striped = false,
    indeterminate = false,
  } = props;

  return cn(
    'h-full rounded-full',
    getVariantStyles(variant, themeColor, darkMode),
    animated && !indeterminate && 'transition-all duration-300 ease-out',
    striped && 'bg-stripes',
    indeterminate && 'animate-progress-indeterminate',
  );
}

/**
 * Get CSS for striped and indeterminate animations
 */
export function getProgressCSS(): string {
  return `
/* Progress bar striped pattern */
.bg-stripes {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  animation: progress-stripes 1s linear infinite;
}

@keyframes progress-stripes {
  from { background-position: 1rem 0; }
  to { background-position: 0 0; }
}

/* Indeterminate progress animation */
@keyframes progress-indeterminate {
  0% {
    width: 30%;
    margin-left: 0%;
  }
  50% {
    width: 30%;
    margin-left: 70%;
  }
  100% {
    width: 30%;
    margin-left: 0%;
  }
}

.animate-progress-indeterminate {
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}
`.trim();
}

// =============================================================================
// CREATORS
// =============================================================================

/**
 * Create a progress bar element
 *
 * @example
 * const progress = createProgress({ value: 75, variant: 'success' });
 *
 * @example
 * // With custom theme color
 * const progress = createProgress({ value: 50, themeColor: 'violet' });
 */
export function createProgress(props: ProgressProps = {}): HTMLDivElement {
  const {
    value = 0,
    max = 100,
    size = 'md',
    variant = 'default',
    themeColor = 'blue',
    darkMode = true,
    indeterminate = false,
    showLabel = false,
    labelFormat,
    animated = true,
    striped = false,
    class: className,
  } = props;

  const container = document.createElement('div');
  container.className = cn('flex flex-col gap-1', className);

  // Label row (if showing)
  if (showLabel && !indeterminate) {
    const labelRow = document.createElement('div');
    labelRow.className = cn(
      'flex justify-between text-sm',
      darkMode ? 'text-slate-600 dark:text-slate-400' : 'text-slate-600',
    );

    const percent = Math.round((value / max) * 100);
    const labelText = labelFormat ? labelFormat(value, max) : `${percent}%`;

    labelRow.innerHTML = `<span>${labelText}</span>`;
    container.appendChild(labelRow);
  }

  // Progress track
  const track = document.createElement('div');
  track.className = getProgressClasses({ size, darkMode });
  track.setAttribute('role', 'progressbar');
  track.setAttribute('aria-valuenow', String(value));
  track.setAttribute('aria-valuemin', '0');
  track.setAttribute('aria-valuemax', String(max));

  // Progress bar
  const bar = document.createElement('div');
  bar.className = getProgressBarClasses({
    variant,
    themeColor,
    darkMode,
    animated,
    striped,
    indeterminate,
  });

  if (!indeterminate) {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));
    bar.style.width = `${percent}%`;
  }

  track.appendChild(bar);
  container.appendChild(track);

  return container;
}

/**
 * Create a simple progress bar without container
 *
 * @example
 * const bar = createSimpleProgress(75, { themeColor: 'teal' });
 */
export function createSimpleProgress(
  value: number,
  props: Omit<ProgressProps, 'value' | 'showLabel'> = {},
): HTMLDivElement {
  const {
    max = 100,
    size = 'md',
    variant = 'default',
    themeColor = 'blue',
    darkMode = true,
    indeterminate = false,
    animated = true,
    striped = false,
    class: className,
  } = props;

  const track = document.createElement('div');
  track.className = cn(getProgressClasses({ size, darkMode }), className);
  track.setAttribute('role', 'progressbar');
  track.setAttribute('aria-valuenow', String(value));
  track.setAttribute('aria-valuemin', '0');
  track.setAttribute('aria-valuemax', String(max));

  const bar = document.createElement('div');
  bar.className = getProgressBarClasses({
    variant,
    themeColor,
    darkMode,
    animated,
    striped,
    indeterminate,
  });

  if (!indeterminate) {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));
    bar.style.width = `${percent}%`;
  }

  track.appendChild(bar);
  return track;
}

// =============================================================================
// CIRCULAR PROGRESS
// =============================================================================

export interface CircularProgressProps {
  /** Progress value (0-100) */
  value?: number;
  /** Size in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Color variant */
  variant?: ProgressVariant;
  /** Custom theme color */
  themeColor?: PrimaryColor;
  /** Enable dark mode */
  darkMode?: boolean;
  /** Show value in center */
  showLabel?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Additional classes */
  class?: string;
}

/**
 * Get CSS for circular progress animation
 */
export function getCircularProgressCSS(): string {
  return `
@keyframes circular-progress-rotate {
  100% { transform: rotate(360deg); }
}

@keyframes circular-progress-dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

.circular-progress-indeterminate {
  animation: circular-progress-rotate 2s linear infinite;
}

.circular-progress-indeterminate circle {
  animation: circular-progress-dash 1.5s ease-in-out infinite;
}
`.trim();
}

/**
 * Get stroke color for circular progress
 */
function getCircularStrokeColor(
  variant: ProgressVariant,
  themeColor: PrimaryColor = 'blue',
  darkMode: boolean = true,
): string {
  if (variant === 'primary') {
    // Return the raw color value for stroke
    return darkMode ? `${themeColor}-500` : `${themeColor}-600`;
  }

  const colors: Record<Exclude<ProgressVariant, 'primary'>, { light: string; dark: string }> = {
    default: { light: 'blue-600', dark: 'blue-500' },
    success: { light: 'emerald-500', dark: 'emerald-400' },
    warning: { light: 'amber-500', dark: 'amber-400' },
    error: { light: 'red-500', dark: 'red-400' },
  };

  return darkMode ? colors[variant].dark : colors[variant].light;
}

/**
 * Create a circular progress element
 *
 * @example
 * const circle = createCircularProgress({ value: 75 });
 */
export function createCircularProgress(props: CircularProgressProps = {}): HTMLDivElement {
  const {
    value = 0,
    size = 48,
    strokeWidth = 4,
    variant = 'default',
    themeColor = 'blue',
    darkMode = true,
    showLabel = false,
    indeterminate = false,
    class: className,
  } = props;

  const container = document.createElement('div');
  container.className = cn('relative inline-flex items-center justify-center', className);
  container.style.width = `${size}px`;
  container.style.height = `${size}px`;

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const strokeColor = getCircularStrokeColor(variant, themeColor, darkMode);
  const trackColor = darkMode ? 'stroke-slate-200 dark:stroke-slate-700' : 'stroke-slate-200';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  if (indeterminate) {
    svg.setAttribute('class', 'circular-progress-indeterminate');
  }

  // Track circle
  const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  track.setAttribute('cx', String(size / 2));
  track.setAttribute('cy', String(size / 2));
  track.setAttribute('r', String(radius));
  track.setAttribute('fill', 'none');
  track.setAttribute('stroke-width', String(strokeWidth));
  track.setAttribute('class', trackColor);
  svg.appendChild(track);

  // Progress circle
  const progress = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  progress.setAttribute('cx', String(size / 2));
  progress.setAttribute('cy', String(size / 2));
  progress.setAttribute('r', String(radius));
  progress.setAttribute('fill', 'none');
  progress.setAttribute('stroke-width', String(strokeWidth));
  progress.setAttribute('stroke-linecap', 'round');
  progress.setAttribute('class', `stroke-${strokeColor}`);
  progress.style.transform = 'rotate(-90deg)';
  progress.style.transformOrigin = 'center';

  if (!indeterminate) {
    progress.style.strokeDasharray = `${circumference}`;
    progress.style.strokeDashoffset = `${offset}`;
    progress.style.transition = 'stroke-dashoffset 0.3s ease';
  }

  svg.appendChild(progress);
  container.appendChild(svg);

  // Label
  if (showLabel && !indeterminate) {
    const label = document.createElement('span');
    label.className = cn(
      'absolute text-sm font-medium',
      darkMode ? 'text-slate-700 dark:text-slate-300' : 'text-slate-700',
    );
    label.textContent = `${Math.round(value)}%`;
    container.appendChild(label);
  }

  return container;
}

export default {
  getProgressClasses,
  getProgressBarClasses,
  getProgressCSS,
  getCircularProgressCSS,
  createProgress,
  createSimpleProgress,
  createCircularProgress,
};
