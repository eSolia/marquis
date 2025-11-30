/**
 * Icon Button Component
 *
 * Square buttons containing only an icon, used for row actions
 * like view, edit, delete. Designed to work in groups.
 *
 * @example
 * // In templates
 * <button class="{{ getIconButtonClasses({ variant: 'info' }) }}" title="View">
 *   <svg>...</svg>
 * </button>
 *
 * // Create action group
 * const actions = createActionGroup([
 *   { icon: viewIcon, variant: 'info', title: 'View', onClick: handleView },
 *   { icon: editIcon, variant: 'warning', title: 'Edit', onClick: handleEdit },
 *   { icon: deleteIcon, variant: 'danger', title: 'Delete', onClick: handleDelete },
 * ]);
 */

import { cn } from '../utils/cn.ts';
import { focusRing } from '../tokens/colors.ts';

/**
 * Icon button variants - mapped to action types
 */
export type IconButtonVariant =
  | 'default' // Neutral action
  | 'info' // View, inspect (blue)
  | 'warning' // Edit, modify (amber)
  | 'danger' // Delete, remove (red)
  | 'success'; // Approve, confirm (green)

export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  class?: string;
}

/**
 * Variant styles
 *
 * Design notes:
 * - Softer background colors (not fully saturated)
 * - Strong icon colors for clarity
 * - Subtle hover lift effect
 */
const variantStyles: Record<IconButtonVariant, string> = {
  default: [
    'bg-slate-100 text-slate-600',
    'hover:bg-slate-200 hover:text-slate-700',
  ].join(' '),

  info: [
    'bg-blue-100 text-blue-600',
    'hover:bg-blue-200 hover:text-blue-700',
  ].join(' '),

  warning: [
    'bg-amber-100 text-amber-600',
    'hover:bg-amber-200 hover:text-amber-700',
  ].join(' '),

  danger: [
    'bg-red-100 text-red-600',
    'hover:bg-red-200 hover:text-red-700',
  ].join(' '),

  success: [
    'bg-emerald-100 text-emerald-600',
    'hover:bg-emerald-200 hover:text-emerald-700',
  ].join(' '),
};

/**
 * Size styles - square dimensions
 */
const sizeStyles: Record<IconButtonSize, string> = {
  sm: 'w-7 h-7', // 28px
  md: 'w-8 h-8', // 32px
  lg: 'w-10 h-10', // 40px
};

/**
 * Icon size within button
 */
const iconSizeStyles: Record<IconButtonSize, string> = {
  sm: '[&>svg]:w-3.5 [&>svg]:h-3.5', // 14px
  md: '[&>svg]:w-4 [&>svg]:h-4', // 16px
  lg: '[&>svg]:w-5 [&>svg]:h-5', // 20px
};

/**
 * Base styles
 */
const baseStyles = [
  'inline-flex',
  'items-center',
  'justify-center',
  'rounded-md',
  'transition-all',
  'duration-150',
  'ease-in-out',
  // Hover lift effect
  'hover:-translate-y-0.5',
  'hover:shadow-md',
  'active:translate-y-0',
  'active:shadow-sm',
  focusRing.default,
].join(' ');

const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';

/**
 * Get Tailwind classes for an icon button
 */
export function getIconButtonClasses(props: IconButtonProps = {}): string {
  const {
    variant = 'default',
    size = 'md',
    disabled = false,
    class: className,
  } = props;

  return cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    iconSizeStyles[size],
    disabled && disabledStyles,
    className,
  );
}

export interface CreateIconButtonOptions extends IconButtonProps {
  /** Icon as SVG string or element */
  icon: string | HTMLElement;
  /** Accessible title (shows on hover, used for aria-label) */
  title: string;
  /** Click handler */
  onClick?: (event: MouseEvent) => void;
}

/**
 * Create an icon button DOM element
 */
export function createIconButton(options: CreateIconButtonOptions): HTMLButtonElement {
  const { icon, title, onClick, disabled, ...props } = options;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = getIconButtonClasses({ ...props, disabled });
  button.title = title;
  button.setAttribute('aria-label', title);

  if (disabled) {
    button.disabled = true;
  }

  // Add icon
  if (typeof icon === 'string') {
    button.innerHTML = icon;
  } else {
    button.appendChild(icon.cloneNode(true));
  }

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}

export interface ActionDefinition {
  icon: string | HTMLElement;
  variant: IconButtonVariant;
  title: string;
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
}

/**
 * Create an action button group (view, edit, delete pattern)
 *
 * @param actions - Array of action definitions
 * @param size - Size for all buttons in group
 * @returns HTMLDivElement containing action buttons
 *
 * @example
 * const actions = createActionGroup([
 *   { icon: EYE_ICON, variant: 'info', title: 'View', onClick: () => view(id) },
 *   { icon: PENCIL_ICON, variant: 'warning', title: 'Edit', onClick: () => edit(id) },
 *   { icon: TRASH_ICON, variant: 'danger', title: 'Delete', onClick: () => del(id) },
 * ]);
 */
export function createActionGroup(
  actions: ActionDefinition[],
  size: IconButtonSize = 'md',
): HTMLDivElement {
  const group = document.createElement('div');
  group.className = 'inline-flex items-center gap-1.5';

  actions.forEach((action) => {
    const button = createIconButton({
      ...action,
      size,
    });
    group.appendChild(button);
  });

  return group;
}

/**
 * Common icon SVGs (16x16 viewBox)
 *
 * These are Heroicons (MIT license) for convenience.
 * Replace with your preferred icon set.
 */
export const icons = {
  eye:
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`,

  pencil:
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>`,

  trash:
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>`,

  check:
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>`,

  x: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>`,

  plus:
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`,
};

export default {
  getIconButtonClasses,
  createIconButton,
  createActionGroup,
  icons,
};
