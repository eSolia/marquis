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
import { getPrimaryClasses, type PrimaryColor } from '../tokens/theme.ts';

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
  /** Theme color for active state */
  themeColor?: PrimaryColor;
  /** Enable dark mode */
  darkMode?: boolean;
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
  /** Theme color for active state */
  themeColor?: PrimaryColor;
  /** Enable dark mode */
  darkMode?: boolean;
  class?: string;
}

// =============================================================================
// CONTAINER STYLES
// =============================================================================

function getContainerVariantStyles(variant: TabsVariant, darkMode: boolean = true): string {
  const variants: Record<TabsVariant, { light: string; dark: string }> = {
    underline: {
      light: 'border-b border-slate-200',
      dark: 'dark:border-slate-700',
    },
    pills: {
      light: 'bg-slate-100 p-1 rounded-lg',
      dark: 'dark:bg-slate-800',
    },
    buttons: {
      light: 'bg-slate-100 p-1 rounded-lg',
      dark: 'dark:bg-slate-800',
    },
  };

  const style = variants[variant];
  return darkMode ? `${style.light} ${style.dark}` : style.light;
}

/**
 * Get classes for tabs container
 */
export function getTabsContainerClasses(props: TabsProps = {}): string {
  const {
    variant = 'underline',
    fullWidth = false,
    darkMode = true,
    class: className,
  } = props;

  return cn(
    'inline-flex items-center',
    variant === 'underline' ? 'gap-0' : 'gap-1',
    getContainerVariantStyles(variant, darkMode),
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
function getUnderlineTabStyles(
  active: boolean,
  disabled: boolean,
  themeColor: PrimaryColor,
  darkMode: boolean,
): string {
  const theme = getPrimaryClasses(themeColor);

  if (disabled) {
    return darkMode
      ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed border-b-2 border-transparent'
      : 'text-slate-300 cursor-not-allowed border-b-2 border-transparent';
  }

  if (active) {
    return cn(
      theme.text,
      'border-b-2',
      theme.border,
      '-mb-px',
    );
  }

  return cn(
    darkMode
      ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
      : 'text-slate-600 hover:text-slate-900',
    'border-b-2 border-transparent',
    darkMode ? 'hover:border-slate-300 dark:hover:border-slate-600' : 'hover:border-slate-300',
    '-mb-px',
  );
}

/**
 * Pill tab styles
 */
function getPillTabStyles(
  active: boolean,
  disabled: boolean,
  _themeColor: PrimaryColor,
  darkMode: boolean,
): string {
  if (disabled) {
    return darkMode
      ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
      : 'text-slate-300 cursor-not-allowed';
  }

  if (active) {
    return cn(
      darkMode
        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white'
        : 'bg-white text-slate-900',
      'shadow-sm',
      'rounded-md',
    );
  }

  return cn(
    darkMode
      ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
      : 'text-slate-600 hover:text-slate-900',
    darkMode ? 'hover:bg-white/50 dark:hover:bg-slate-700/50' : 'hover:bg-white/50',
    'rounded-md',
  );
}

/**
 * Button tab styles (similar to pills but more distinct)
 */
function getButtonTabStyles(
  active: boolean,
  disabled: boolean,
  themeColor: PrimaryColor,
  darkMode: boolean,
): string {
  const theme = getPrimaryClasses(themeColor);

  if (disabled) {
    return darkMode
      ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
      : 'text-slate-300 cursor-not-allowed';
  }

  if (active) {
    return cn(
      theme.bgSolid,
      'text-white',
      'shadow-sm',
      'rounded-md',
    );
  }

  return cn(
    darkMode
      ? 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
      : 'text-slate-600 hover:text-slate-900',
    darkMode ? 'hover:bg-white/50 dark:hover:bg-slate-700/50' : 'hover:bg-white/50',
    'rounded-md',
  );
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
    themeColor = 'blue',
    darkMode = true,
    class: className,
  } = props;

  let variantStyles: string;

  switch (variant) {
    case 'pills':
      variantStyles = getPillTabStyles(active, disabled, themeColor, darkMode);
      break;
    case 'buttons':
      variantStyles = getButtonTabStyles(active, disabled, themeColor, darkMode);
      break;
    default:
      variantStyles = getUnderlineTabStyles(active, disabled, themeColor, darkMode);
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
export function getTabCountClasses(props: {
  active?: boolean;
  themeColor?: PrimaryColor;
  darkMode?: boolean;
} = {}): string {
  const { active = false, themeColor = 'blue', darkMode = true } = props;
  const theme = getPrimaryClasses(themeColor);

  const inactiveClasses = darkMode
    ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
    : 'bg-slate-200 text-slate-600';

  return cn(
    'inline-flex items-center justify-center',
    'min-w-[1.25rem] h-5 px-1.5',
    'text-xs font-medium',
    'rounded-full',
    active ? `${theme.bgSubtle} ${theme.text}` : inactiveClasses,
  );
}

/**
 * Get classes for draft indicator
 */
export function getTabDraftClasses(darkMode: boolean = true): string {
  return cn(
    'text-xs font-medium',
    darkMode ? 'text-orange-600 dark:text-orange-400' : 'text-orange-600',
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
  onChange?: (id: string) => void;
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
 *   onChange: (id) => setActiveTab(id),
 *   themeColor: 'violet'
 * });
 */
export function createTabs(options: CreateTabsOptions): HTMLDivElement {
  const {
    items,
    activeId,
    onChange,
    variant = 'underline',
    size = 'md',
    themeColor = 'blue',
    darkMode = true,
    ...containerProps
  } = options;

  const container = document.createElement('div');
  container.className = getTabsContainerClasses({ variant, darkMode, ...containerProps });
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
      themeColor,
      darkMode,
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
      countSpan.className = getTabCountClasses({ active: isActive, themeColor, darkMode });
      countSpan.textContent = String(item.count);
      button.appendChild(countSpan);
    }

    // Draft indicator
    if (item.draft) {
      const draftSpan = document.createElement('span');
      draftSpan.className = getTabDraftClasses(darkMode);
      draftSpan.textContent = 'Draft';
      button.appendChild(draftSpan);
    }

    // Click handler
    if (!item.disabled && onChange) {
      button.addEventListener('click', () => onChange(item.id));
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
