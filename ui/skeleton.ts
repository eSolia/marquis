/**
 * Skeleton Component
 *
 * Loading placeholder that mimics content layout.
 * Supports various shapes and dark mode.
 *
 * @example
 * // Basic skeleton
 * <div class="{{ getSkeletonClasses() }}"></div>
 *
 * // Text skeleton
 * const skeleton = createTextSkeleton({ lines: 3 });
 *
 * // Card skeleton
 * const skeleton = createCardSkeleton();
 */

import { cn } from '../utils/cn.ts';

// =============================================================================
// TYPES
// =============================================================================

export type SkeletonVariant = 'text' | 'rectangular' | 'circular' | 'rounded';

export interface SkeletonProps {
  /** Shape variant */
  variant?: SkeletonVariant;
  /** Width (CSS value or Tailwind class) */
  width?: string;
  /** Height (CSS value or Tailwind class) */
  height?: string;
  /** Enable dark mode */
  darkMode?: boolean;
  /** Animate the skeleton */
  animate?: boolean;
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none';
  /** Additional classes */
  class?: string;
}

// =============================================================================
// ANIMATION CSS
// =============================================================================

/**
 * Get CSS for skeleton animations
 */
export function getSkeletonCSS(): string {
  return `
/* Skeleton pulse animation */
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-skeleton-pulse {
  animation: skeleton-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Skeleton wave animation */
@keyframes skeleton-wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.skeleton-wave {
  position: relative;
  overflow: hidden;
}

.skeleton-wave::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: skeleton-wave 1.5s infinite;
}

.dark .skeleton-wave::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
}
`.trim();
}

// =============================================================================
// CLASS GETTERS
// =============================================================================

/**
 * Get classes for a skeleton element
 */
export function getSkeletonClasses(props: SkeletonProps = {}): string {
  const {
    variant = 'text',
    darkMode = true,
    animate = true,
    animation = 'pulse',
    class: className,
  } = props;

  // Base color
  const baseColor = darkMode ? 'bg-slate-200 dark:bg-slate-700' : 'bg-slate-200';

  // Variant-specific styles
  const variantStyles: Record<SkeletonVariant, string> = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
    rounded: 'rounded-lg',
  };

  // Animation styles
  const animationStyles: Record<string, string> = {
    pulse: 'animate-skeleton-pulse',
    wave: 'skeleton-wave',
    none: '',
  };

  return cn(
    baseColor,
    variantStyles[variant],
    animate && animationStyles[animation],
    className,
  );
}

// =============================================================================
// CREATORS
// =============================================================================

/**
 * Create a single skeleton element
 *
 * @example
 * const skeleton = createSkeleton({ variant: 'circular', width: '48px', height: '48px' });
 */
export function createSkeleton(props: SkeletonProps = {}): HTMLDivElement {
  const { width, height, class: className, ...rest } = props;

  const skeleton = document.createElement('div');
  skeleton.className = getSkeletonClasses({ ...rest, class: className });

  // Apply width/height
  if (width) {
    if (width.includes('-') || width === 'full') {
      // Tailwind class
      skeleton.classList.add(`w-${width}`);
    } else {
      skeleton.style.width = width;
    }
  }

  if (height) {
    if (height.includes('-') || height === 'full') {
      skeleton.classList.add(`h-${height}`);
    } else {
      skeleton.style.height = height;
    }
  }

  return skeleton;
}

/**
 * Create a text skeleton (multiple lines)
 *
 * @example
 * const skeleton = createTextSkeleton({ lines: 3 });
 */
export function createTextSkeleton(
  props: {
    lines?: number;
    lastLineWidth?: string;
    gap?: 'sm' | 'md' | 'lg';
  } & Omit<SkeletonProps, 'variant'> = {},
): HTMLDivElement {
  const {
    lines = 3,
    lastLineWidth = '60%',
    gap = 'md',
    darkMode = true,
    animate = true,
    animation = 'pulse',
    class: className,
  } = props;

  const gapStyles: Record<string, string> = {
    sm: 'space-y-1',
    md: 'space-y-2',
    lg: 'space-y-3',
  };

  const container = document.createElement('div');
  container.className = cn(gapStyles[gap], className);

  for (let i = 0; i < lines; i++) {
    const line = createSkeleton({
      variant: 'text',
      darkMode,
      animate,
      animation,
    });

    // Make the last line shorter
    if (i === lines - 1 && lines > 1) {
      line.style.width = lastLineWidth;
    } else {
      line.classList.add('w-full');
    }

    container.appendChild(line);
  }

  return container;
}

/**
 * Create a card skeleton
 *
 * @example
 * const skeleton = createCardSkeleton({ showImage: true });
 */
export function createCardSkeleton(
  props: {
    showImage?: boolean;
    showActions?: boolean;
    imageHeight?: string;
  } & Pick<SkeletonProps, 'darkMode' | 'animate' | 'animation' | 'class'> = {},
): HTMLDivElement {
  const {
    showImage = true,
    showActions = false,
    imageHeight = '160px',
    darkMode = true,
    animate = true,
    animation = 'pulse',
    class: className,
  } = props;

  const card = document.createElement('div');
  card.className = cn(
    'rounded-lg border overflow-hidden',
    darkMode ? 'border-slate-200 dark:border-slate-700' : 'border-slate-200',
    className,
  );

  // Image placeholder
  if (showImage) {
    const image = createSkeleton({
      variant: 'rectangular',
      height: imageHeight,
      darkMode,
      animate,
      animation,
    });
    image.classList.add('w-full', 'rounded-none');
    card.appendChild(image);
  }

  // Content area
  const content = document.createElement('div');
  content.className = 'p-4 space-y-3';

  // Title
  const title = createSkeleton({
    variant: 'text',
    darkMode,
    animate,
    animation,
  });
  title.classList.add('w-3/4', 'h-5');
  content.appendChild(title);

  // Description lines
  const desc = createTextSkeleton({
    lines: 2,
    lastLineWidth: '80%',
    gap: 'sm',
    darkMode,
    animate,
    animation,
  });
  content.appendChild(desc);

  card.appendChild(content);

  // Actions
  if (showActions) {
    const actions = document.createElement('div');
    actions.className = cn(
      'px-4 py-3 flex gap-2 border-t',
      darkMode ? 'border-slate-200 dark:border-slate-700' : 'border-slate-200',
    );

    const button1 = createSkeleton({
      variant: 'rounded',
      darkMode,
      animate,
      animation,
    });
    button1.classList.add('w-20', 'h-8');

    const button2 = createSkeleton({
      variant: 'rounded',
      darkMode,
      animate,
      animation,
    });
    button2.classList.add('w-20', 'h-8');

    actions.appendChild(button1);
    actions.appendChild(button2);
    card.appendChild(actions);
  }

  return card;
}

/**
 * Create an avatar skeleton
 *
 * @example
 * const skeleton = createAvatarSkeleton({ size: 'lg' });
 */
export function createAvatarSkeleton(
  props: {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  } & Pick<SkeletonProps, 'darkMode' | 'animate' | 'animation' | 'class'> = {},
): HTMLDivElement {
  const {
    size = 'md',
    darkMode = true,
    animate = true,
    animation = 'pulse',
    class: className,
  } = props;

  const sizeMap: Record<string, string> = {
    xs: '24px',
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '64px',
  };

  return createSkeleton({
    variant: 'circular',
    width: sizeMap[size],
    height: sizeMap[size],
    darkMode,
    animate,
    animation,
    class: className,
  });
}

/**
 * Create a table row skeleton
 *
 * @example
 * const skeleton = createTableRowSkeleton({ columns: 4 });
 */
export function createTableRowSkeleton(
  props: {
    columns?: number;
    showCheckbox?: boolean;
    showActions?: boolean;
  } & Pick<SkeletonProps, 'darkMode' | 'animate' | 'animation' | 'class'> = {},
): HTMLTableRowElement {
  const {
    columns = 4,
    showCheckbox = false,
    showActions = false,
    darkMode = true,
    animate = true,
    animation = 'pulse',
  } = props;

  const row = document.createElement('tr');

  // Checkbox column
  if (showCheckbox) {
    const checkboxCell = document.createElement('td');
    checkboxCell.className = 'p-4';
    const checkbox = createSkeleton({
      variant: 'rounded',
      width: '16px',
      height: '16px',
      darkMode,
      animate,
      animation,
    });
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);
  }

  // Data columns
  for (let i = 0; i < columns; i++) {
    const cell = document.createElement('td');
    cell.className = 'p-4';

    const skeleton = createSkeleton({
      variant: 'text',
      darkMode,
      animate,
      animation,
    });
    skeleton.style.width = `${60 + Math.random() * 30}%`;
    cell.appendChild(skeleton);
    row.appendChild(cell);
  }

  // Actions column
  if (showActions) {
    const actionsCell = document.createElement('td');
    actionsCell.className = 'p-4';
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'flex gap-1';

    for (let i = 0; i < 2; i++) {
      const action = createSkeleton({
        variant: 'rounded',
        width: '32px',
        height: '32px',
        darkMode,
        animate,
        animation,
      });
      actionsContainer.appendChild(action);
    }

    actionsCell.appendChild(actionsContainer);
    row.appendChild(actionsCell);
  }

  return row;
}

/**
 * Create multiple table row skeletons
 */
export function createTableSkeleton(
  props: {
    rows?: number;
    columns?: number;
    showCheckbox?: boolean;
    showActions?: boolean;
  } & Pick<SkeletonProps, 'darkMode' | 'animate' | 'animation' | 'class'> = {},
): HTMLTableSectionElement {
  const { rows = 5, ...rest } = props;

  const tbody = document.createElement('tbody');

  for (let i = 0; i < rows; i++) {
    const row = createTableRowSkeleton(rest);
    tbody.appendChild(row);
  }

  return tbody;
}

export default {
  getSkeletonCSS,
  getSkeletonClasses,
  createSkeleton,
  createTextSkeleton,
  createCardSkeleton,
  createAvatarSkeleton,
  createTableRowSkeleton,
  createTableSkeleton,
};
