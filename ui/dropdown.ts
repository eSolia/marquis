/**
 * Dropdown Component
 *
 * A CSS-only dropdown menu that works with hover and focus-within.
 * No JavaScript required for basic functionality.
 *
 * @example
 * // Get CSS for dropdown functionality (add to page head)
 * <style>${getDropdownCSS()}</style>
 *
 * // Create dropdown HTML
 * const dropdown = createDropdown({
 *   trigger: '<span>Menu</span>',
 *   items: [
 *     { label: 'Profile', href: '/profile' },
 *     { label: 'Settings', href: '/settings' },
 *     { divider: true },
 *     { label: 'Logout', href: '/logout', variant: 'danger' }
 *   ]
 * });
 */

import { cn } from '../utils/cn.ts';

/**
 * Dropdown variants for styling context
 */
export type DropdownVariant = 'default' | 'header';

/**
 * Dropdown alignment
 */
export type DropdownAlign = 'left' | 'right';

/**
 * Item variant for special styling
 */
export type DropdownItemVariant = 'default' | 'danger' | 'active';

/**
 * Dropdown menu item
 */
export interface DropdownItem {
  /** Item label text */
  label?: string;
  /** Item href (makes it a link) */
  href?: string;
  /** Icon HTML or class (e.g., '<i class="ph ph-user"></i>') */
  icon?: string;
  /** Whether this item is a divider */
  divider?: boolean;
  /** Section header text (makes this a non-clickable header) */
  header?: string;
  /** Item variant for special styling */
  variant?: DropdownItemVariant;
  /** Additional CSS classes */
  class?: string;
  /** onClick handler name (for JavaScript integration) */
  onclick?: string;
}

/**
 * Dropdown props
 */
export interface DropdownProps {
  /** Unique identifier for the dropdown (used for CSS targeting) */
  id?: string;
  /** Dropdown variant */
  variant?: DropdownVariant;
  /** Menu alignment */
  align?: DropdownAlign;
  /** Additional CSS classes for the container */
  class?: string;
  /** Additional CSS classes for the menu */
  menuClass?: string;
}

/**
 * Full dropdown configuration
 */
export interface CreateDropdownOptions extends DropdownProps {
  /** HTML content for the trigger element */
  trigger: string;
  /** Menu items */
  items: DropdownItem[];
  /** Trigger button additional classes */
  triggerClass?: string;
}

/**
 * CSS required for dropdown functionality.
 * Add this to your page's <style> or stylesheet.
 *
 * Design notes:
 * - Uses hover and focus-within for accessibility
 * - No JavaScript required for basic show/hide
 * - Works with keyboard navigation (tabindex on trigger)
 */
export function getDropdownCSS(): string {
  return `
/* Dropdown base styles */
.marquis-dropdown-menu {
  display: none;
  position: absolute;
  z-index: 50;
}

.marquis-dropdown:hover .marquis-dropdown-menu,
.marquis-dropdown:focus-within .marquis-dropdown-menu {
  display: block;
}
`.trim();
}

/**
 * Base container styles
 */
const containerStyles = 'relative';

/**
 * Menu container styles
 */
const menuBaseStyles = [
  'marquis-dropdown-menu',
  'top-full',
  'mt-2',
  'bg-white',
  'rounded-lg',
  'shadow-lg',
  'min-w-[200px]',
  'overflow-hidden',
  'border',
  'border-slate-200',
].join(' ');

/**
 * Menu alignment styles
 */
const alignStyles: Record<DropdownAlign, string> = {
  left: 'left-0',
  right: 'right-0',
};

/**
 * Trigger base styles for header variant (transparent on dark background)
 */
const headerTriggerStyles = [
  'flex',
  'items-center',
  'gap-2',
  'py-1.5',
  'px-3',
  'bg-white/10',
  'border',
  'border-white/20',
  'rounded-md',
  'text-white',
  'cursor-pointer',
  'text-sm',
  'transition-colors',
  'hover:bg-white/20',
].join(' ');

/**
 * Trigger base styles for default variant
 */
const defaultTriggerStyles = [
  'flex',
  'items-center',
  'gap-2',
  'py-2',
  'px-3',
  'bg-white',
  'border',
  'border-slate-300',
  'rounded-md',
  'text-slate-700',
  'cursor-pointer',
  'text-sm',
  'transition-colors',
  'hover:bg-slate-50',
  'shadow-sm',
].join(' ');

/**
 * Menu item base styles
 */
const itemBaseStyles = [
  'flex',
  'items-center',
  'gap-2',
  'py-2.5',
  'px-4',
  'text-sm',
  'no-underline',
  'transition-colors',
  'cursor-pointer',
].join(' ');

/**
 * Item variant styles
 */
const itemVariantStyles: Record<DropdownItemVariant, string> = {
  default: 'text-slate-700 hover:bg-slate-50',
  danger: 'text-red-600 hover:bg-red-50',
  active: 'bg-blue-50 text-blue-700',
};

/**
 * Divider styles
 */
const dividerStyles = 'border-t border-slate-200 my-1';

/**
 * Section header styles
 */
const headerStyles = [
  'py-2',
  'px-4',
  'border-b',
  'border-slate-200',
  'bg-slate-50',
  'text-xs',
  'text-slate-500',
  'uppercase',
  'tracking-wide',
  'font-medium',
].join(' ');

/**
 * Get classes for dropdown container
 */
export function getDropdownClasses(props: DropdownProps = {}): string {
  const { class: className } = props;
  return cn('marquis-dropdown', containerStyles, className);
}

/**
 * Get classes for dropdown trigger
 */
export function getDropdownTriggerClasses(
  props: Pick<DropdownProps, 'variant'> & { class?: string } = {},
): string {
  const { variant = 'default', class: className } = props;
  const baseStyles = variant === 'header' ? headerTriggerStyles : defaultTriggerStyles;
  return cn(baseStyles, className);
}

/**
 * Get classes for dropdown menu
 */
export function getDropdownMenuClasses(props: DropdownProps = {}): string {
  const { align = 'left', menuClass } = props;
  return cn(menuBaseStyles, alignStyles[align], menuClass);
}

/**
 * Get classes for dropdown item
 */
export function getDropdownItemClasses(
  props: Pick<DropdownItem, 'variant' | 'class'> = {},
): string {
  const { variant = 'default', class: className } = props;
  return cn(itemBaseStyles, itemVariantStyles[variant], className);
}

/**
 * Get classes for dropdown divider
 */
export function getDropdownDividerClasses(): string {
  return dividerStyles;
}

/**
 * Get classes for dropdown section header
 */
export function getDropdownHeaderClasses(): string {
  return headerStyles;
}

/**
 * Create dropdown HTML string
 *
 * @param options - Dropdown configuration
 * @returns HTML string for the dropdown
 *
 * @example
 * const html = createDropdown({
 *   trigger: '<span>John Doe</span><i class="ph ph-caret-down"></i>',
 *   variant: 'header',
 *   align: 'right',
 *   items: [
 *     { header: 'Account' },
 *     { label: 'Profile', href: '/profile', icon: '<i class="ph ph-user"></i>' },
 *     { label: 'Settings', href: '/settings', icon: '<i class="ph ph-gear"></i>' },
 *     { divider: true },
 *     { label: 'Logout', href: '/logout', variant: 'danger', icon: '<i class="ph ph-sign-out"></i>' }
 *   ]
 * });
 */
export function createDropdown(options: CreateDropdownOptions): string {
  const { trigger, items, triggerClass, ...props } = options;

  const containerClasses = getDropdownClasses(props);
  const triggerClasses = getDropdownTriggerClasses({ variant: props.variant, class: triggerClass });
  const menuClasses = getDropdownMenuClasses(props);

  const menuItems = items
    .map((item) => {
      // Divider
      if (item.divider) {
        return `<div class="${getDropdownDividerClasses()}"></div>`;
      }

      // Section header
      if (item.header) {
        return `<div class="${getDropdownHeaderClasses()}">${item.header}</div>`;
      }

      // Regular item
      const itemClasses = getDropdownItemClasses({ variant: item.variant, class: item.class });
      const iconHtml = item.icon
        ? `<span class="w-4 h-4 flex items-center">${item.icon}</span>`
        : '';
      const onclick = item.onclick ? ` onclick="${item.onclick}"` : '';

      if (item.href) {
        return `<a href="${item.href}" class="${itemClasses}"${onclick}>${iconHtml}${
          item.label || ''
        }</a>`;
      }

      return `<div class="${itemClasses}"${onclick}>${iconHtml}${item.label || ''}</div>`;
    })
    .join('\n        ');

  return `
<div class="${containerClasses}">
  <div class="${triggerClasses}" tabindex="0">
    ${trigger}
  </div>
  <div class="${menuClasses}">
    ${menuItems}
  </div>
</div>`.trim();
}

/**
 * Create a user dropdown for headers
 *
 * Convenience function for common user menu pattern.
 *
 * @example
 * const dropdown = createUserDropdown({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   settingsHref: '/settings',
 *   logoutHref: '/logout',
 *   labels: { settings: 'Settings', logout: 'Logout' }
 * });
 */
export interface UserDropdownOptions {
  /** User display name */
  name: string;
  /** User email */
  email: string;
  /** Settings page href */
  settingsHref?: string;
  /** Logout href */
  logoutHref?: string;
  /** Custom labels */
  labels?: {
    settings?: string;
    logout?: string;
  };
  /** Avatar initials (defaults to first 2 chars of name) */
  initials?: string;
}

export function createUserDropdown(options: UserDropdownOptions): string {
  const {
    name,
    email,
    settingsHref = '/settings',
    logoutHref = '/logout',
    labels = {},
    initials,
  } = options;

  const userInitials = initials || name.substring(0, 2).toUpperCase();
  const settingsLabel = labels.settings || 'Settings';
  const logoutLabel = labels.logout || 'Logout';

  const items: DropdownItem[] = [
    {
      header: `<div>
        <strong class="block text-slate-700 text-sm">${name}</strong>
        <small class="text-slate-500 text-xs">${email}</small>
      </div>`,
    },
    { label: settingsLabel, href: settingsHref, icon: '<i class="ph ph-gear text-slate-500"></i>' },
    { divider: true },
    {
      label: logoutLabel,
      href: logoutHref,
      variant: 'danger',
      icon: '<i class="ph ph-sign-out text-red-600"></i>',
    },
  ];

  // Custom header item rendering for user info
  const trigger = `
    <div class="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center font-semibold text-xs">${userInitials}</div>
    <i class="ph ph-caret-down"></i>
  `;

  return createDropdown({
    trigger,
    items,
    variant: 'header',
    align: 'right',
  });
}

export default {
  getDropdownCSS,
  getDropdownClasses,
  getDropdownTriggerClasses,
  getDropdownMenuClasses,
  getDropdownItemClasses,
  getDropdownDividerClasses,
  getDropdownHeaderClasses,
  createDropdown,
  createUserDropdown,
};
