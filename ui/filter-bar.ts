/**
 * Filter Bar Component
 *
 * Container for filter controls like dropdowns, search inputs, and action buttons.
 * Provides consistent styling for filter UI patterns.
 *
 * @example
 * <div class="{{ getFilterBarClasses() }}">
 *   <label class="{{ getFilterLabelClasses() }}">Client:</label>
 *   <select class="{{ getFilterSelectClasses() }}">...</select>
 *   <button class="{{ getFilterButtonClasses() }}">Clear</button>
 * </div>
 */

import { cn } from '../utils/cn.ts';
import { focusRing } from '../tokens/colors.ts';

// =============================================================================
// FILTER BAR CONTAINER
// =============================================================================

export interface FilterBarProps {
  /** Alignment */
  align?: 'left' | 'center' | 'right' | 'between';
  /** Background style */
  variant?: 'default' | 'subtle' | 'none';
  class?: string;
}

const alignStyles: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
};

const variantStyles: Record<string, string> = {
  default: 'bg-slate-50 border border-slate-200 rounded-lg',
  subtle: 'bg-slate-50/50',
  none: '',
};

/**
 * Get classes for filter bar container
 */
export function getFilterBarClasses(props: FilterBarProps = {}): string {
  const {
    align = 'right',
    variant = 'none',
    class: className,
  } = props;

  return cn(
    'flex items-center gap-3',
    'px-0 py-0', // No padding by default, add if variant has background
    variant !== 'none' && 'px-4 py-3',
    alignStyles[align],
    variantStyles[variant],
    className,
  );
}

// =============================================================================
// FILTER LABEL
// =============================================================================

/**
 * Get classes for filter labels
 */
export function getFilterLabelClasses(props: { class?: string } = {}): string {
  return cn(
    'text-sm font-medium text-slate-600',
    'whitespace-nowrap',
    props.class,
  );
}

// =============================================================================
// FILTER SELECT
// =============================================================================

export interface FilterSelectProps {
  /** Size variant */
  size?: 'sm' | 'md';
  class?: string;
}

/**
 * Get classes for filter select/dropdown
 */
export function getFilterSelectClasses(props: FilterSelectProps = {}): string {
  const { size = 'md', class: className } = props;

  const sizeStyles = {
    sm: 'h-8 text-sm pl-2.5 pr-7',
    md: 'h-9 text-sm pl-3 pr-8',
  };

  return cn(
    // Base
    'appearance-none',
    'bg-white',
    'border border-slate-300',
    'rounded-md',
    'text-slate-700',
    // Size
    sizeStyles[size],
    // States
    'hover:border-slate-400',
    focusRing.default,
    // Arrow indicator (using background image)
    'bg-no-repeat bg-right',
    'bg-[length:1.25rem_1.25rem]',
    'bg-[right_0.375rem_center]',
    // Custom arrow SVG as data URI
    `bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")]`,
    className,
  );
}

// =============================================================================
// FILTER SEARCH INPUT
// =============================================================================

export interface FilterSearchProps {
  /** Size variant */
  size?: 'sm' | 'md';
  /** Width */
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'full';
  class?: string;
}

/**
 * Get classes for search input container (includes icon)
 */
export function getFilterSearchContainerClasses(props: FilterSearchProps = {}): string {
  const { width = 'md', class: className } = props;

  const widthStyles = {
    auto: '',
    sm: 'w-40',
    md: 'w-56',
    lg: 'w-72',
    full: 'w-full',
  };

  return cn(
    'relative',
    widthStyles[width],
    className,
  );
}

/**
 * Get classes for search input field
 */
export function getFilterSearchInputClasses(props: FilterSearchProps = {}): string {
  const { size = 'md', class: className } = props;

  const sizeStyles = {
    sm: 'h-8 text-sm pl-8 pr-3',
    md: 'h-9 text-sm pl-9 pr-3',
  };

  return cn(
    'w-full',
    'bg-white',
    'border border-slate-300',
    'rounded-md',
    'text-slate-700',
    'placeholder:text-slate-400',
    sizeStyles[size],
    'hover:border-slate-400',
    focusRing.default,
    className,
  );
}

/**
 * Get classes for search icon
 */
export function getFilterSearchIconClasses(props: { size?: 'sm' | 'md' } = {}): string {
  const { size = 'md' } = props;

  const sizeStyles = {
    sm: 'left-2 w-4 h-4',
    md: 'left-2.5 w-4 h-4',
  };

  return cn(
    'absolute top-1/2 -translate-y-1/2',
    'text-slate-400',
    'pointer-events-none',
    sizeStyles[size],
  );
}

// =============================================================================
// FILTER BUTTON
// =============================================================================

export interface FilterButtonProps {
  /** Button variant */
  variant?: 'default' | 'primary' | 'danger';
  /** Size */
  size?: 'sm' | 'md';
  class?: string;
}

/**
 * Get classes for filter action buttons (Clear, Apply, etc.)
 */
export function getFilterButtonClasses(props: FilterButtonProps = {}): string {
  const {
    variant = 'default',
    size = 'md',
    class: className,
  } = props;

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-9 px-4 text-sm',
  };

  const variantStyles = {
    default: [
      'bg-slate-600 text-white',
      'hover:bg-slate-700',
      'active:bg-slate-800',
    ].join(' '),
    primary: [
      'bg-blue-600 text-white',
      'hover:bg-blue-700',
      'active:bg-blue-800',
    ].join(' '),
    danger: [
      'bg-red-600 text-white',
      'hover:bg-red-700',
      'active:bg-red-800',
    ].join(' '),
  };

  return cn(
    'inline-flex items-center justify-center',
    'font-medium',
    'rounded-md',
    'transition-colors duration-150',
    sizeStyles[size],
    variantStyles[variant],
    focusRing.default,
    className,
  );
}

// =============================================================================
// SEARCH ICON SVG
// =============================================================================

export const searchIcon =
  `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>`;

// =============================================================================
// DOM HELPERS
// =============================================================================

export interface CreateFilterSearchOptions extends FilterSearchProps {
  placeholder?: string;
  value?: string;
  onInput?: (value: string) => void;
  onClear?: () => void;
}

/**
 * Create a search input with icon
 */
export function createFilterSearch(options: CreateFilterSearchOptions = {}): HTMLDivElement {
  const {
    placeholder = 'Search...',
    value = '',
    onInput,
    size = 'md',
    width = 'md',
  } = options;

  const container = document.createElement('div');
  container.className = getFilterSearchContainerClasses({ width });

  // Icon
  const iconSpan = document.createElement('span');
  iconSpan.className = getFilterSearchIconClasses({ size });
  iconSpan.innerHTML = searchIcon;
  container.appendChild(iconSpan);

  // Input
  const input = document.createElement('input');
  input.type = 'search';
  input.className = getFilterSearchInputClasses({ size });
  input.placeholder = placeholder;
  input.value = value;

  if (onInput) {
    input.addEventListener('input', (e) => {
      onInput((e.target as HTMLInputElement).value);
    });
  }

  container.appendChild(input);

  return container;
}

export interface CreateFilterSelectOptions extends FilterSelectProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

/**
 * Create a filter select dropdown
 */
export function createFilterSelect(options: CreateFilterSelectOptions): HTMLSelectElement {
  const {
    options: selectOptions,
    value = '',
    placeholder,
    onChange,
    size = 'md',
    class: className,
  } = options;

  const select = document.createElement('select');
  select.className = getFilterSelectClasses({ size, class: className });

  // Placeholder option
  if (placeholder) {
    const placeholderOpt = document.createElement('option');
    placeholderOpt.value = '';
    placeholderOpt.textContent = placeholder;
    select.appendChild(placeholderOpt);
  }

  // Options
  selectOptions.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    if (opt.value === value) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  if (onChange) {
    select.addEventListener('change', (e) => {
      onChange((e.target as HTMLSelectElement).value);
    });
  }

  return select;
}

export default {
  // Container
  getFilterBarClasses,
  getFilterLabelClasses,
  // Select
  getFilterSelectClasses,
  // Search
  getFilterSearchContainerClasses,
  getFilterSearchInputClasses,
  getFilterSearchIconClasses,
  searchIcon,
  // Button
  getFilterButtonClasses,
  // DOM helpers
  createFilterSearch,
  createFilterSelect,
};
