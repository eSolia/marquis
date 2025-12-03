/**
 * Button Component
 *
 * Primary interactive element for triggering actions.
 * Supports custom theme colors and dark mode.
 *
 * @example
 * // Get classes for use in templates
 * <button class="{{ getButtonClasses({ variant: 'primary' }) }}">
 *   Save Changes
 * </button>
 *
 * // Create DOM element directly
 * const btn = createButton('Submit', { variant: 'primary', size: 'lg' });
 *
 * // Use custom theme color
 * const btn = createButton('Submit', { variant: 'primary', themeColor: 'violet' });
 */

import { cn } from '../utils/cn.ts';
import { focusRing } from '../tokens/colors.ts';
import { getPrimaryClasses, type PrimaryColor } from '../tokens/theme.ts';

/**
 * Button variants - semantic meaning, not visual
 */
export type ButtonVariant =
  | 'primary' // Main CTA, draws attention
  | 'secondary' // Secondary actions
  | 'ghost' // Minimal, for toolbars
  | 'outline' // Bordered, no fill
  | 'danger' // Destructive actions
  | 'success'; // Positive/confirmation actions

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  /** Semantic variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Theme color (for primary/outline variants) */
  themeColor?: PrimaryColor;
  /** Enable dark mode support */
  darkMode?: boolean;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Get variant styles based on theme color and dark mode
 */
function getVariantStyles(
  variant: ButtonVariant,
  themeColor: PrimaryColor = 'blue',
  darkMode: boolean = true,
): string {
  const theme = getPrimaryClasses(themeColor);

  const variants: Record<ButtonVariant, string> = {
    primary: darkMode
      ? [
        theme.bgSolid,
        theme.bgSolidHover,
        theme.bgSolidActive,
        theme.textOnSolid,
        'shadow-sm',
      ].join(' ')
      : [
        `bg-${themeColor}-600 text-white`,
        `hover:bg-${themeColor}-700`,
        `active:bg-${themeColor}-800`,
        'shadow-sm',
      ].join(' '),

    secondary: darkMode
      ? [
        'bg-white dark:bg-slate-800',
        'text-slate-700 dark:text-slate-200',
        'border border-slate-300 dark:border-slate-600',
        'hover:bg-slate-50 dark:hover:bg-slate-700',
        'active:bg-slate-100 dark:active:bg-slate-600',
        'shadow-sm',
      ].join(' ')
      : [
        'bg-white text-slate-700',
        'border border-slate-300',
        'hover:bg-slate-50',
        'active:bg-slate-100',
        'shadow-sm',
      ].join(' '),

    ghost: darkMode
      ? [
        'bg-transparent',
        'text-slate-700 dark:text-slate-200',
        'hover:bg-slate-100 dark:hover:bg-slate-800',
        'active:bg-slate-200 dark:active:bg-slate-700',
      ].join(' ')
      : [
        'bg-transparent text-slate-700',
        'hover:bg-slate-100',
        'active:bg-slate-200',
      ].join(' '),

    outline: darkMode
      ? [
        'bg-transparent',
        theme.textColored,
        theme.border,
        theme.bgSubtleHover,
        `active:bg-${themeColor}-100 dark:active:bg-${themeColor}-900/70`,
      ].join(' ')
      : [
        'bg-transparent',
        `text-${themeColor}-600`,
        `border border-${themeColor}-300`,
        `hover:bg-${themeColor}-50`,
        `active:bg-${themeColor}-100`,
      ].join(' '),

    danger: darkMode
      ? [
        'bg-red-600 dark:bg-red-500',
        'text-white',
        'hover:bg-red-700 dark:hover:bg-red-400',
        'active:bg-red-800 dark:active:bg-red-600',
        'shadow-sm',
      ].join(' ')
      : [
        'bg-red-600 text-white',
        'hover:bg-red-700',
        'active:bg-red-800',
        'shadow-sm',
      ].join(' '),

    success: darkMode
      ? [
        'bg-emerald-600 dark:bg-emerald-500',
        'text-white',
        'hover:bg-emerald-700 dark:hover:bg-emerald-400',
        'active:bg-emerald-800 dark:active:bg-emerald-600',
        'shadow-sm',
      ].join(' ')
      : [
        'bg-emerald-600 text-white',
        'hover:bg-emerald-700',
        'active:bg-emerald-800',
        'shadow-sm',
      ].join(' '),
  };

  return variants[variant];
}

/**
 * Size styles
 */
const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

/**
 * Base styles for all buttons
 */
const baseStyles = [
  'inline-flex',
  'items-center',
  'justify-center',
  'gap-2',
  'font-medium',
  'rounded-md',
  'transition-all',
  'duration-150',
  'ease-in-out',
  focusRing.default,
].join(' ');

/**
 * Disabled styles
 */
const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

/**
 * Loading styles
 */
const loadingStyles = 'cursor-wait';

/**
 * Get Tailwind classes for a button
 *
 * @param props - Button configuration
 * @returns Tailwind class string
 *
 * @example
 * <button class="{{ getButtonClasses({ variant: 'primary' }) }}">
 *   Click me
 * </button>
 *
 * @example
 * // With custom theme color
 * <button class="{{ getButtonClasses({ variant: 'primary', themeColor: 'violet' }) }}">
 *   Violet Button
 * </button>
 */
export function getButtonClasses(props: ButtonProps = {}): string {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    loading = false,
    themeColor = 'blue',
    darkMode = true,
    class: className,
  } = props;

  return cn(
    baseStyles,
    getVariantStyles(variant, themeColor, darkMode),
    sizeStyles[size],
    fullWidth && 'w-full',
    disabled && disabledStyles,
    loading && loadingStyles,
    className,
  );
}

export interface CreateButtonOptions extends ButtonProps {
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: (event: MouseEvent) => void;
  /** Icon element to prepend */
  icon?: HTMLElement | string;
  /** Icon element to append */
  iconAfter?: HTMLElement | string;
  /** ID attribute */
  id?: string;
  /** Aria label for accessibility */
  ariaLabel?: string;
}

/**
 * Create a button DOM element
 *
 * @param text - Button label
 * @param options - Button configuration
 * @returns HTMLButtonElement
 *
 * @example
 * const btn = createButton('Save', {
 *   variant: 'primary',
 *   onClick: () => handleSave()
 * });
 *
 * @example
 * // With custom theme
 * const btn = createButton('Submit', {
 *   variant: 'primary',
 *   themeColor: 'violet',
 * });
 */
export function createButton(
  text: string,
  options: CreateButtonOptions = {},
): HTMLButtonElement {
  const {
    type = 'button',
    onClick,
    icon,
    iconAfter,
    disabled,
    loading,
    id,
    ariaLabel,
    ...props
  } = options;

  const button = document.createElement('button');
  button.type = type;
  button.className = getButtonClasses({ ...props, disabled, loading });

  if (id) {
    button.id = id;
  }

  if (ariaLabel) {
    button.setAttribute('aria-label', ariaLabel);
  }

  if (disabled) {
    button.disabled = true;
  }

  if (loading) {
    button.setAttribute('aria-busy', 'true');
  }

  // Add leading icon if provided
  if (icon && !loading) {
    if (typeof icon === 'string') {
      const iconSpan = document.createElement('span');
      iconSpan.innerHTML = icon;
      iconSpan.className = 'w-4 h-4 flex-shrink-0';
      button.appendChild(iconSpan);
    } else {
      icon.classList.add('w-4', 'h-4', 'flex-shrink-0');
      button.appendChild(icon);
    }
  }

  // Add loading spinner
  if (loading) {
    const spinnerSpan = document.createElement('span');
    spinnerSpan.innerHTML = '<i class="ph ph-spinner marquis-spin"></i>';
    spinnerSpan.className = 'w-4 h-4 flex-shrink-0';
    button.appendChild(spinnerSpan);
  }

  // Add text
  const textSpan = document.createElement('span');
  textSpan.textContent = text;
  button.appendChild(textSpan);

  // Add trailing icon if provided
  if (iconAfter && !loading) {
    if (typeof iconAfter === 'string') {
      const iconSpan = document.createElement('span');
      iconSpan.innerHTML = iconAfter;
      iconSpan.className = 'w-4 h-4 flex-shrink-0';
      button.appendChild(iconSpan);
    } else {
      iconAfter.classList.add('w-4', 'h-4', 'flex-shrink-0');
      button.appendChild(iconAfter);
    }
  }

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}

/**
 * Create a button group container
 *
 * @param buttons - Array of button elements
 * @param options - Group options
 * @returns HTMLDivElement containing buttons
 */
export function createButtonGroup(
  buttons: HTMLButtonElement[],
  options: { gap?: 'xs' | 'sm' | 'md' | 'lg'; vertical?: boolean } = {},
): HTMLDivElement {
  const { gap = 'md', vertical = false } = options;

  const gapStyles: Record<string, string> = {
    xs: 'gap-0.5',
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const group = document.createElement('div');
  group.className = cn(
    vertical ? 'flex flex-col' : 'inline-flex items-center',
    gapStyles[gap],
  );

  buttons.forEach((btn) => group.appendChild(btn));

  return group;
}

/**
 * Create an icon-only button
 *
 * @param icon - Icon HTML string or element
 * @param options - Button options plus aria-label (required for accessibility)
 * @returns HTMLButtonElement
 *
 * @example
 * const closeBtn = createIconOnlyButton('<i class="ph ph-x"></i>', {
 *   ariaLabel: 'Close',
 *   variant: 'ghost',
 *   size: 'sm',
 * });
 */
export function createIconOnlyButton(
  icon: string | HTMLElement,
  options: CreateButtonOptions & { ariaLabel: string },
): HTMLButtonElement {
  const { ariaLabel, size = 'md', ...rest } = options;

  const sizeMap: Record<ButtonSize, string> = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  };

  const iconSizeMap: Record<ButtonSize, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  const button = document.createElement('button');
  button.type = rest.type || 'button';
  button.className = cn(
    getButtonClasses({ ...rest, size }),
    sizeMap[size],
    '!px-0', // Override padding for icon-only
  );
  button.setAttribute('aria-label', ariaLabel);

  if (rest.disabled) {
    button.disabled = true;
  }

  if (typeof icon === 'string') {
    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = icon;
    iconSpan.className = iconSizeMap[size];
    button.appendChild(iconSpan);
  } else {
    icon.classList.add(...iconSizeMap[size].split(' '));
    button.appendChild(icon);
  }

  if (rest.onClick) {
    button.addEventListener('click', rest.onClick);
  }

  return button;
}

export default {
  getButtonClasses,
  createButton,
  createButtonGroup,
  createIconOnlyButton,
};
