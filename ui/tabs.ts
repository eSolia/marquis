/**
 * Tabs Component
 *
 * Switch between views or filter content sections.
 * Supports counts, icons, and multiple visual styles.
 *
 * @example
 * // Underline style tabs
 * <div class="{{ getTabsContainerClasses() }}">
 *   <button class="{{ getTabClasses({ active: true }) }}">
 *     Systems <span class="{{ getTabCountClasses() }}">5</span>
 *   </button>
 *   <button class="{{ getTabClasses() }}">
 *     Frameworks <span class="{{ getTabCountClasses() }}">2</span>
 *   </button>
 * </div>
 */

import { cn } from '../utils/cn.ts';
import { focusRing } from '../tokens/colors.ts';

// =============================================================================
// TYPES
// =============================================================================

export type TabsVariant = 'underline' | 'pills' | 'buttons';

export interface TabItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional count badge */
  count?: number;
  /** Optional icon (SVG string) */
  icon?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Draft/beta indicator */
  draft?: boolean;
}

export interface TabsProps {
  /** Visual style variant */
  variant?: TabsVariant;
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Full width tabs */
  fullWidth?: boolean;
  class?: string;
}

export interface TabProps {
  /** Active state */
  active?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Tab variant (should match container) */
  variant?: TabsVariant;
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

// =============================================================================
// CONTAINER STYLES
// =============================================================================

const containerVariantStyles: Record<TabsVariant, string> = {
  underline: 'border-b border-slate-200',
  pills: 'bg-slate-100 p-1 rounded-lg',
  buttons: 'bg-slate-100 p-1 rounded-lg',
};

/**
 * Get classes for tabs container
 */
export function getTabsContainerClasses(props: TabsProps = {}): string {
  const {
    variant = 'underline',
    fullWidth = false,
    class: className,
  } = props;

  return cn(
    'inline-flex items-center',
    variant === 'underline' ? 'gap-0' : 'gap-1',
    containerVariantStyles[variant],
    fullWidth && 'w-full',
    className,
  );
}

// =============================================================================
// TAB STYLES
// =============================================================================

const tabSizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

const tabBaseStyles = [
  'inline-flex items-center gap-2',
  'font-medium',
  'transition-all duration-150',
  focusRing.default,
].join(' ');

/**
 * Underline tab styles
 */
function getUnderlineTabStyles(active: boolean, disabled: boolean): string {
  if (disabled) {
    return 'text-slate-300 cursor-not-allowed border-b-2 border-transparent';
  }

  if (active) {
    return [
      'text-blue-600',
      'border-b-2 border-blue-600',
      '-mb-px', // Overlap container border
    ].join(' ');
  }

  return [
    'text-slate-600',
    'border-b-2 border-transparent',
    'hover:text-slate-900',
    'hover:border-slate-300',
    '-mb-px',
  ].join(' ');
}

/**
 * Pill tab styles
 */
function getPillTabStyles(active: boolean, disabled: boolean): string {
  if (disabled) {
    return 'text-slate-300 cursor-not-allowed';
  }

  if (active) {
    return [
      'bg-white text-slate-900',
      'shadow-sm',
      'rounded-md',
    ].join(' ');
  }

  return [
    'text-slate-600',
    'hover:text-slate-900',
    'hover:bg-white/50',
    'rounded-md',
  ].join(' ');
}

/**
 * Button tab styles (similar to pills but more distinct)
 */
function getButtonTabStyles(active: boolean, disabled: boolean): string {
  if (disabled) {
    return 'text-slate-300 cursor-not-allowed';
  }

  if (active) {
    return [
      'bg-blue-600 text-white',
      'shadow-sm',
      'rounded-md',
    ].join(' ');
  }

  return [
    'text-slate-600',
    'hover:text-slate-900',
    'hover:bg-white/50',
    'rounded-md',
  ].join(' ');
}

/**
 * Get classes for individual tab button
 */
export function getTabClasses(props: TabProps = {}): string {
  const {
    active = false,
    disabled = false,
    variant = 'underline',
    size = 'md',
    class: className,
  } = props;

  let variantStyles: string;

  switch (variant) {
    case 'pills':
      variantStyles = getPillTabStyles(active, disabled);
      break;
    case 'buttons':
      variantStyles = getButtonTabStyles(active, disabled);
      break;
    default:
      variantStyles = getUnderlineTabStyles(active, disabled);
  }

  return cn(
    tabBaseStyles,
    tabSizeStyles[size],
    variantStyles,
    className,
  );
}

// =============================================================================
// TAB COUNT BADGE
// =============================================================================

/**
 * Get classes for count badge within tab
 */
export function getTabCountClasses(props: { active?: boolean } = {}): string {
  const { active = false } = props;

  return cn(
    'inline-flex items-center justify-center',
    'min-w-[1.25rem] h-5 px-1.5',
    'text-xs font-medium',
    'rounded-full',
    active ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600',
  );
}

/**
 * Get classes for draft indicator
 */
export function getTabDraftClasses(): string {
  return cn(
    'text-xs font-medium',
    'text-orange-600',
  );
}

// =============================================================================
// DOM HELPERS
// =============================================================================

export interface CreateTabsOptions extends TabsProps {
  /** Tab items */
  items: TabItem[];
  /** Currently active tab ID */
  activeId: string;
  /** Tab change handler */
  onTabChange?: (id: string) => void;
}

/**
 * Create a tabs component
 *
 * @example
 * const tabs = createTabs({
 *   items: [
 *     { id: 'systems', label: 'Systems', count: 5 },
 *     { id: 'frameworks', label: 'Frameworks', count: 2 },
 *   ],
 *   activeId: 'systems',
 *   onTabChange: (id) => setActiveTab(id),
 * });
 */
export function createTabs(options: CreateTabsOptions): HTMLDivElement {
  const {
    items,
    activeId,
    onTabChange,
    variant = 'underline',
    size = 'md',
    ...containerProps
  } = options;

  const container = document.createElement('div');
  container.className = getTabsContainerClasses({ variant, ...containerProps });
  container.setAttribute('role', 'tablist');

  items.forEach((item) => {
    const isActive = item.id === activeId;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = getTabClasses({
      active: isActive,
      disabled: item.disabled,
      variant,
      size,
    });
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(isActive));
    button.setAttribute('aria-controls', `panel-${item.id}`);
    button.id = `tab-${item.id}`;

    if (item.disabled) {
      button.disabled = true;
    }

    // Icon
    if (item.icon) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'w-4 h-4 flex-shrink-0';
      iconSpan.innerHTML = item.icon;
      button.appendChild(iconSpan);
    }

    // Label
    const labelSpan = document.createElement('span');
    labelSpan.textContent = item.label;
    button.appendChild(labelSpan);

    // Count
    if (item.count !== undefined) {
      const countSpan = document.createElement('span');
      countSpan.className = getTabCountClasses({ active: isActive });
      countSpan.textContent = String(item.count);
      button.appendChild(countSpan);
    }

    // Draft indicator
    if (item.draft) {
      const draftSpan = document.createElement('span');
      draftSpan.className = getTabDraftClasses();
      draftSpan.textContent = 'Draft';
      button.appendChild(draftSpan);
    }

    // Click handler
    if (!item.disabled && onTabChange) {
      button.addEventListener('click', () => onTabChange(item.id));
    }

    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
      const tabs = container.querySelectorAll('[role="tab"]:not([disabled])');
      const currentIndex = Array.from(tabs).indexOf(button);

      let nextIndex: number | null = null;

      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        (tabs[nextIndex] as HTMLElement).focus();
      }
    });

    container.appendChild(button);
  });

  return container;
}

export default {
  getTabsContainerClasses,
  getTabClasses,
  getTabCountClasses,
  getTabDraftClasses,
  createTabs,
};
