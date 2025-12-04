/**
 * Alert Component
 *
 * Display contextual feedback messages for user actions.
 * Supports info, success, warning, and error variants.
 *
 * @example
 * // Get classes for use in templates
 * <div class="{{ getAlertClasses({ variant: 'success' }) }}">
 *   Changes saved successfully!
 * </div>
 *
 * // Create DOM element or HTML string
 * const alert = createAlert('Operation completed', { variant: 'success' });
 */

import { cn } from '../utils/cn.ts';

/**
 * Alert variants - semantic meaning
 */
export type AlertVariant =
  | 'info' // Informational messages
  | 'success' // Positive confirmation
  | 'warning' // Caution, attention needed
  | 'error'; // Error, failure

/**
 * Alert size
 */
export type AlertSize = 'sm' | 'md' | 'lg';

/**
 * Alert props
 */
export interface AlertProps {
  /** Semantic variant */
  variant?: AlertVariant;
  /** Alert size */
  size?: AlertSize;
  /** Whether the alert is dismissible */
  dismissible?: boolean;
  /** Icon HTML or class */
  icon?: string;
  /** Title text (optional, for prominent alerts) */
  title?: string;
  /** Enable dark mode */
  darkMode?: boolean;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Variant styles with dark mode support
 *
 * Design notes:
 * - Backgrounds use very light tints (50 weight)
 * - Borders provide definition without being harsh
 * - Icons match the semantic color
 */
function getVariantStyles(variant: AlertVariant, darkMode: boolean = true): {
  container: string;
  icon: string;
  dismiss: string;
} {
  const variants: Record<AlertVariant, {
    container: { light: string; dark: string };
    icon: { light: string; dark: string };
    dismiss: { light: string; dark: string };
  }> = {
    info: {
      container: {
        light: 'bg-blue-50 border-blue-200 text-blue-800',
        dark: 'dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-200',
      },
      icon: {
        light: 'text-blue-500',
        dark: 'dark:text-blue-400',
      },
      dismiss: {
        light: 'hover:bg-blue-100',
        dark: 'dark:hover:bg-blue-900/50',
      },
    },
    success: {
      container: {
        light: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        dark: 'dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-200',
      },
      icon: {
        light: 'text-emerald-500',
        dark: 'dark:text-emerald-400',
      },
      dismiss: {
        light: 'hover:bg-emerald-100',
        dark: 'dark:hover:bg-emerald-900/50',
      },
    },
    warning: {
      container: {
        light: 'bg-amber-50 border-amber-200 text-amber-800',
        dark: 'dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-200',
      },
      icon: {
        light: 'text-amber-500',
        dark: 'dark:text-amber-400',
      },
      dismiss: {
        light: 'hover:bg-amber-100',
        dark: 'dark:hover:bg-amber-900/50',
      },
    },
    error: {
      container: {
        light: 'bg-red-50 border-red-200 text-red-800',
        dark: 'dark:bg-red-950/50 dark:border-red-800 dark:text-red-200',
      },
      icon: {
        light: 'text-red-500',
        dark: 'dark:text-red-400',
      },
      dismiss: {
        light: 'hover:bg-red-100',
        dark: 'dark:hover:bg-red-900/50',
      },
    },
  };

  const style = variants[variant];
  return {
    container: darkMode
      ? `${style.container.light} ${style.container.dark}`
      : style.container.light,
    icon: darkMode ? `${style.icon.light} ${style.icon.dark}` : style.icon.light,
    dismiss: darkMode ? `${style.dismiss.light} ${style.dismiss.dark}` : style.dismiss.light,
  };
}

/**
 * Default icons for each variant
 */
const variantIcons: Record<AlertVariant, string> = {
  info: '<i class="ph ph-info"></i>',
  success: '<i class="ph ph-check-circle"></i>',
  warning: '<i class="ph ph-warning"></i>',
  error: '<i class="ph ph-x-circle"></i>',
};

/**
 * Size styles
 */
const sizeStyles: Record<AlertSize, string> = {
  sm: 'py-2 px-3 text-sm',
  md: 'py-3 px-4 text-sm',
  lg: 'py-4 px-5 text-base',
};

/**
 * Base styles for all alerts
 */
const baseStyles = [
  'flex',
  'items-center',
  'gap-3',
  'rounded-lg',
  'border',
].join(' ');

/**
 * Get Tailwind classes for an alert
 *
 * @param props - Alert configuration
 * @returns Tailwind class string
 *
 * @example
 * <div class="{{ getAlertClasses({ variant: 'warning' }) }}">
 *   Please review before proceeding
 * </div>
 */
export function getAlertClasses(props: AlertProps = {}): string {
  const {
    variant = 'info',
    size = 'md',
    darkMode = true,
    class: className,
  } = props;

  const styles = getVariantStyles(variant, darkMode);

  return cn(
    baseStyles,
    styles.container,
    sizeStyles[size],
    className,
  );
}

/**
 * Get icon classes for an alert
 */
export function getAlertIconClasses(
  variant: AlertVariant = 'info',
  darkMode: boolean = true,
): string {
  const styles = getVariantStyles(variant, darkMode);
  return cn('flex-shrink-0 text-lg', styles.icon);
}

/**
 * Get content wrapper classes
 */
export function getAlertContentClasses(): string {
  return 'flex-1';
}

/**
 * Get title classes for alerts with titles
 */
export function getAlertTitleClasses(): string {
  return 'font-semibold mb-1';
}

/**
 * Get dismiss button classes
 */
export function getAlertDismissClasses(
  variant: AlertVariant = 'info',
  darkMode: boolean = true,
): string {
  const styles = getVariantStyles(variant, darkMode);

  return cn(
    'flex-shrink-0',
    'p-1',
    'rounded',
    'transition-colors',
    'cursor-pointer',
    'opacity-70',
    'hover:opacity-100',
    styles.dismiss,
  );
}

/**
 * Create alert HTML string
 *
 * @param message - Alert message content
 * @param props - Alert configuration
 * @returns HTML string for the alert
 *
 * @example
 * const html = createAlert('Your changes have been saved.', {
 *   variant: 'success',
 *   dismissible: true
 * });
 */
export function createAlert(message: string, props: AlertProps = {}): string {
  const {
    variant = 'info',
    icon,
    title,
    dismissible = false,
    darkMode = true,
  } = props;

  const alertClasses = getAlertClasses(props);
  const iconClasses = getAlertIconClasses(variant, darkMode);
  const contentClasses = getAlertContentClasses();
  const titleClasses = getAlertTitleClasses();
  const dismissClasses = getAlertDismissClasses(variant, darkMode);

  // Use provided icon or default for variant
  const iconHtml = icon || variantIcons[variant];

  // Build content
  let contentHtml = '';
  if (title) {
    contentHtml = `
      <div class="${contentClasses}">
        <div class="${titleClasses}">${title}</div>
        <div>${message}</div>
      </div>
    `;
  } else {
    contentHtml = `<div class="${contentClasses}">${message}</div>`;
  }

  // Dismiss button
  const dismissHtml = dismissible
    ? `<button type="button" class="${dismissClasses}" onclick="this.parentElement.remove()" aria-label="Dismiss">
        <i class="ph ph-x"></i>
      </button>`
    : '';

  return `
<div class="${alertClasses}" role="alert">
  <span class="${iconClasses}">${iconHtml}</span>
  ${contentHtml}
  ${dismissHtml}
</div>`.trim();
}

/**
 * Create alert DOM element
 *
 * @param message - Alert message content
 * @param props - Alert configuration
 * @returns HTMLDivElement
 */
export function createAlertElement(message: string, props: AlertProps = {}): HTMLDivElement {
  const div = document.createElement('div');
  div.innerHTML = createAlert(message, props);
  return div.firstElementChild as HTMLDivElement;
}

/**
 * Convenience functions for common alert types
 */
export function createInfoAlert(message: string, props: Omit<AlertProps, 'variant'> = {}): string {
  return createAlert(message, { ...props, variant: 'info' });
}

export function createSuccessAlert(
  message: string,
  props: Omit<AlertProps, 'variant'> = {},
): string {
  return createAlert(message, { ...props, variant: 'success' });
}

export function createWarningAlert(
  message: string,
  props: Omit<AlertProps, 'variant'> = {},
): string {
  return createAlert(message, { ...props, variant: 'warning' });
}

export function createErrorAlert(message: string, props: Omit<AlertProps, 'variant'> = {}): string {
  return createAlert(message, { ...props, variant: 'error' });
}

export default {
  getAlertClasses,
  getAlertIconClasses,
  getAlertContentClasses,
  getAlertTitleClasses,
  getAlertDismissClasses,
  createAlert,
  createAlertElement,
  createInfoAlert,
  createSuccessAlert,
  createWarningAlert,
  createErrorAlert,
};
