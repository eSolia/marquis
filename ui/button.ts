/**
 * Button Component
 *
 * Primary interactive element for triggering actions.
 *
 * @example
 * // Get classes for use in templates
 * <button class="{{ getButtonClasses({ variant: 'primary' }) }}">
 *   Save Changes
 * </button>
 *
 * // Create DOM element directly
 * const btn = createButton('Submit', { variant: 'primary', size: 'lg' });
 */

import { cn } from '../utils/cn.ts';
import { focusRing } from '../tokens/colors.ts';

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

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Semantic variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Variant styles
 *
 * Design notes:
 * - Primary uses solid blue (600 weight)
 * - Secondary uses subtle gray
 * - Ghost has no background until hover
 * - All have clear hover/active states
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-blue-600 text-white',
    'hover:bg-blue-700',
    'active:bg-blue-800',
    'shadow-sm',
  ].join(' '),

  secondary: [
    'bg-white text-slate-700',
    'border border-slate-300',
    'hover:bg-slate-50',
    'active:bg-slate-100',
    'shadow-sm',
  ].join(' '),

  ghost: [
    'bg-transparent text-slate-700',
    'hover:bg-slate-100',
    'active:bg-slate-200',
  ].join(' '),

  outline: [
    'bg-transparent text-blue-600',
    'border border-blue-300',
    'hover:bg-blue-50',
    'active:bg-blue-100',
  ].join(' '),

  danger: [
    'bg-red-600 text-white',
    'hover:bg-red-700',
    'active:bg-red-800',
    'shadow-sm',
  ].join(' '),

  success: [
    'bg-emerald-600 text-white',
    'hover:bg-emerald-700',
    'active:bg-emerald-800',
    'shadow-sm',
  ].join(' '),
};

/**
 * Size styles
 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
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
 * Get Tailwind classes for a button
 *
 * @param props - Button configuration
 * @returns Tailwind class string
 *
 * @example
 * <button class="{{ getButtonClasses({ variant: 'primary' }) }}">
 *   Click me
 * </button>
 */
export function getButtonClasses(props: ButtonProps = {}): string {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    class: className,
  } = props;

  return cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    disabled && disabledStyles,
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
    ...props
  } = options;

  const button = document.createElement('button');
  button.type = type;
  button.className = getButtonClasses({ ...props, disabled });

  if (disabled) {
    button.disabled = true;
  }

  // Add leading icon if provided
  if (icon) {
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

  // Add text
  const textSpan = document.createElement('span');
  textSpan.textContent = text;
  button.appendChild(textSpan);

  // Add trailing icon if provided
  if (iconAfter) {
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
  options: { gap?: 'sm' | 'md' | 'lg' } = {},
): HTMLDivElement {
  const { gap = 'md' } = options;

  const gapStyles: Record<string, string> = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const group = document.createElement('div');
  group.className = cn('inline-flex items-center', gapStyles[gap]);

  buttons.forEach((btn) => group.appendChild(btn));

  return group;
}

export default {
  getButtonClasses,
  createButton,
  createButtonGroup,
};
