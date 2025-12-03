/**
 * Toast Component
 *
 * Non-intrusive notification messages that appear temporarily.
 * Supports various variants, positions, and auto-dismiss.
 *
 * @example
 * // Show a success toast
 * showToast('Changes saved successfully', { variant: 'success' });
 *
 * // Show an error toast
 * showToast('Failed to save changes', { variant: 'error', duration: 5000 });
 *
 * // With action button
 * showToast('File deleted', {
 *   variant: 'info',
 *   action: { label: 'Undo', onClick: () => undoDelete() }
 * });
 */

import { cn } from '../utils/cn.ts';

// =============================================================================
// TYPES
// =============================================================================

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastProps {
  /** Message content */
  message: string;
  /** Title (optional) */
  title?: string;
  /** Variant */
  variant?: ToastVariant;
  /** Duration in ms (0 for no auto-dismiss) */
  duration?: number;
  /** Dismissible */
  dismissible?: boolean;
  /** Enable dark mode */
  darkMode?: boolean;
  /** Icon (HTML string, false to hide, undefined for default) */
  icon?: string | false;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Additional classes */
  class?: string;
}

export interface ToastContainerProps {
  /** Position of toast container */
  position?: ToastPosition;
  /** Enable dark mode */
  darkMode?: boolean;
  /** Additional classes */
  class?: string;
}

// =============================================================================
// ANIMATION CSS
// =============================================================================

/**
 * Get CSS for toast animations
 */
export function getToastCSS(): string {
  return `
/* Toast container positioning */
.toast-container {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  max-height: 100vh;
  overflow: hidden;
}

.toast-container.top-left { top: 0; left: 0; align-items: flex-start; }
.toast-container.top-center { top: 0; left: 50%; transform: translateX(-50%); align-items: center; }
.toast-container.top-right { top: 0; right: 0; align-items: flex-end; }
.toast-container.bottom-left { bottom: 0; left: 0; align-items: flex-start; flex-direction: column-reverse; }
.toast-container.bottom-center { bottom: 0; left: 50%; transform: translateX(-50%); align-items: center; flex-direction: column-reverse; }
.toast-container.bottom-right { bottom: 0; right: 0; align-items: flex-end; flex-direction: column-reverse; }

/* Toast enter animation */
@keyframes toast-enter {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes toast-enter-bottom {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Toast exit animation */
@keyframes toast-exit {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
}

@keyframes toast-exit-bottom {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
}

.toast-enter {
  animation: toast-enter 0.3s ease-out forwards;
}

.toast-enter-bottom {
  animation: toast-enter-bottom 0.3s ease-out forwards;
}

.toast-exit {
  animation: toast-exit 0.2s ease-in forwards;
}

.toast-exit-bottom {
  animation: toast-exit-bottom 0.2s ease-in forwards;
}

/* Toast item */
.toast {
  pointer-events: auto;
  max-width: 24rem;
  width: 100%;
}
`.trim();
}

// =============================================================================
// VARIANT STYLES
// =============================================================================

function getVariantStyles(variant: ToastVariant, darkMode: boolean = true): {
  container: string;
  icon: string;
  iconHtml: string;
} {
  const variants: Record<ToastVariant, {
    container: { light: string; dark: string };
    icon: { light: string; dark: string };
    iconHtml: string;
  }> = {
    default: {
      container: {
        light: 'bg-white border-slate-200',
        dark: 'dark:bg-slate-800 dark:border-slate-700',
      },
      icon: {
        light: 'text-slate-500',
        dark: 'dark:text-slate-400',
      },
      iconHtml: '<i class="ph ph-info"></i>',
    },
    success: {
      container: {
        light: 'bg-white border-emerald-200',
        dark: 'dark:bg-slate-800 dark:border-emerald-800',
      },
      icon: {
        light: 'text-emerald-500',
        dark: 'dark:text-emerald-400',
      },
      iconHtml: '<i class="ph ph-check-circle"></i>',
    },
    warning: {
      container: {
        light: 'bg-white border-amber-200',
        dark: 'dark:bg-slate-800 dark:border-amber-800',
      },
      icon: {
        light: 'text-amber-500',
        dark: 'dark:text-amber-400',
      },
      iconHtml: '<i class="ph ph-warning"></i>',
    },
    error: {
      container: {
        light: 'bg-white border-red-200',
        dark: 'dark:bg-slate-800 dark:border-red-800',
      },
      icon: {
        light: 'text-red-500',
        dark: 'dark:text-red-400',
      },
      iconHtml: '<i class="ph ph-x-circle"></i>',
    },
    info: {
      container: {
        light: 'bg-white border-blue-200',
        dark: 'dark:bg-slate-800 dark:border-blue-800',
      },
      icon: {
        light: 'text-blue-500',
        dark: 'dark:text-blue-400',
      },
      iconHtml: '<i class="ph ph-info"></i>',
    },
  };

  const style = variants[variant];
  return {
    container: darkMode
      ? `${style.container.light} ${style.container.dark}`
      : style.container.light,
    icon: darkMode ? `${style.icon.light} ${style.icon.dark}` : style.icon.light,
    iconHtml: style.iconHtml,
  };
}

// =============================================================================
// CLASS GETTERS
// =============================================================================

/**
 * Get classes for toast element
 */
export function getToastClasses(
  props: Pick<ToastProps, 'variant' | 'darkMode' | 'class'> = {},
): string {
  const { variant = 'default', darkMode = true, class: className } = props;
  const styles = getVariantStyles(variant, darkMode);

  return cn(
    'toast',
    'flex items-start gap-3 p-4 rounded-lg border shadow-lg',
    styles.container,
    className,
  );
}

/**
 * Get classes for toast icon
 */
export function getToastIconClasses(
  variant: ToastVariant = 'default',
  darkMode: boolean = true,
): string {
  const styles = getVariantStyles(variant, darkMode);
  return cn('flex-shrink-0 text-lg', styles.icon);
}

/**
 * Get classes for toast content
 */
export function getToastContentClasses(): string {
  return 'flex-1 min-w-0';
}

/**
 * Get classes for toast title
 */
export function getToastTitleClasses(darkMode: boolean = true): string {
  return cn(
    'font-medium',
    darkMode ? 'text-slate-900 dark:text-white' : 'text-slate-900',
  );
}

/**
 * Get classes for toast message
 */
export function getToastMessageClasses(darkMode: boolean = true): string {
  return cn(
    'text-sm',
    darkMode ? 'text-slate-600 dark:text-slate-300' : 'text-slate-600',
  );
}

/**
 * Get classes for toast dismiss button
 */
export function getToastDismissClasses(darkMode: boolean = true): string {
  return cn(
    'flex-shrink-0 p-1 rounded transition-colors',
    darkMode
      ? 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-700'
      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100',
  );
}

/**
 * Get classes for toast action button
 */
export function getToastActionClasses(darkMode: boolean = true): string {
  return cn(
    'text-sm font-medium rounded px-2 py-1 transition-colors',
    darkMode
      ? 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30'
      : 'text-blue-600 hover:bg-blue-50',
  );
}

// =============================================================================
// CREATORS
// =============================================================================

/**
 * Create a toast element
 */
export function createToast(props: ToastProps): HTMLDivElement {
  const {
    message,
    title,
    variant = 'default',
    dismissible = true,
    darkMode = true,
    icon,
    action,
    onDismiss,
    class: className,
  } = props;

  const toast = document.createElement('div');
  toast.className = getToastClasses({ variant, darkMode, class: className });

  const styles = getVariantStyles(variant, darkMode);

  // Icon
  if (icon !== false) {
    const iconEl = document.createElement('span');
    iconEl.className = getToastIconClasses(variant, darkMode);
    iconEl.innerHTML = icon || styles.iconHtml;
    toast.appendChild(iconEl);
  }

  // Content
  const content = document.createElement('div');
  content.className = getToastContentClasses();

  if (title) {
    const titleEl = document.createElement('div');
    titleEl.className = getToastTitleClasses(darkMode);
    titleEl.textContent = title;
    content.appendChild(titleEl);
  }

  const messageEl = document.createElement('div');
  messageEl.className = cn(
    getToastMessageClasses(darkMode),
    title && 'mt-1',
  );
  messageEl.textContent = message;
  content.appendChild(messageEl);

  // Action button
  if (action) {
    const actionEl = document.createElement('button');
    actionEl.type = 'button';
    actionEl.className = cn(getToastActionClasses(darkMode), 'mt-2');
    actionEl.textContent = action.label;
    actionEl.addEventListener('click', action.onClick);
    content.appendChild(actionEl);
  }

  toast.appendChild(content);

  // Dismiss button
  if (dismissible) {
    const dismissBtn = document.createElement('button');
    dismissBtn.type = 'button';
    dismissBtn.className = getToastDismissClasses(darkMode);
    dismissBtn.setAttribute('aria-label', 'Dismiss');
    dismissBtn.innerHTML = '<i class="ph ph-x"></i>';
    dismissBtn.addEventListener('click', () => {
      if (onDismiss) onDismiss();
    });
    toast.appendChild(dismissBtn);
  }

  return toast;
}

/**
 * Create or get toast container
 */
export function getToastContainer(
  position: ToastPosition = 'top-right',
  _darkMode: boolean = true,
): HTMLDivElement {
  const containerId = `toast-container-${position}`;
  let container = document.getElementById(containerId) as HTMLDivElement | null;

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = cn('toast-container', position);
    document.body.appendChild(container);
  }

  return container;
}

// =============================================================================
// TOAST MANAGER
// =============================================================================

interface ToastInstance {
  id: string;
  element: HTMLDivElement;
  timeoutId?: ReturnType<typeof setTimeout>;
}

const toasts: Map<string, ToastInstance> = new Map();

/**
 * Show a toast notification
 *
 * @example
 * // Simple usage
 * showToast('Hello!');
 *
 * // With options
 * showToast('Success!', { variant: 'success', duration: 3000 });
 *
 * // Returns a function to dismiss the toast
 * const dismiss = showToast('Loading...', { duration: 0 });
 * // Later...
 * dismiss();
 */
export function showToast(
  message: string,
  options: Omit<ToastProps, 'message'> & {
    position?: ToastPosition;
  } = {},
): () => void {
  const {
    position = 'top-right',
    duration = 4000,
    darkMode = true,
    onDismiss,
    ...toastOptions
  } = options;

  const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const container = getToastContainer(position, darkMode);
  const isBottom = position.startsWith('bottom');

  const dismiss = () => {
    const instance = toasts.get(id);
    if (!instance) return;

    // Clear timeout if exists
    if (instance.timeoutId) {
      clearTimeout(instance.timeoutId);
    }

    // Add exit animation
    instance.element.classList.remove('toast-enter', 'toast-enter-bottom');
    instance.element.classList.add(isBottom ? 'toast-exit-bottom' : 'toast-exit');

    // Remove after animation
    setTimeout(() => {
      if (instance.element.parentNode) {
        instance.element.parentNode.removeChild(instance.element);
      }
      toasts.delete(id);

      // Remove container if empty
      if (container.children.length === 0) {
        container.parentNode?.removeChild(container);
      }

      if (onDismiss) onDismiss();
    }, 200);
  };

  const toast = createToast({
    message,
    darkMode,
    onDismiss: dismiss,
    ...toastOptions,
  });

  // Add enter animation
  toast.classList.add(isBottom ? 'toast-enter-bottom' : 'toast-enter');

  // Add to container
  container.appendChild(toast);

  // Auto dismiss
  const timeoutId = duration > 0 ? setTimeout(dismiss, duration) : undefined;

  // Store instance
  toasts.set(id, { id, element: toast, timeoutId });

  return dismiss;
}

/**
 * Dismiss all toasts
 */
export function dismissAllToasts(): void {
  toasts.forEach((instance) => {
    if (instance.timeoutId) {
      clearTimeout(instance.timeoutId);
    }
    if (instance.element.parentNode) {
      instance.element.parentNode.removeChild(instance.element);
    }
  });
  toasts.clear();

  // Remove all containers
  document.querySelectorAll('[id^="toast-container-"]').forEach((el) => {
    el.parentNode?.removeChild(el);
  });
}

/**
 * Convenience functions for common toast types
 */
export function showSuccessToast(
  message: string,
  options?: Omit<ToastProps, 'message' | 'variant'>,
): () => void {
  return showToast(message, { ...options, variant: 'success' });
}

export function showErrorToast(
  message: string,
  options?: Omit<ToastProps, 'message' | 'variant'>,
): () => void {
  return showToast(message, { ...options, variant: 'error', duration: options?.duration ?? 5000 });
}

export function showWarningToast(
  message: string,
  options?: Omit<ToastProps, 'message' | 'variant'>,
): () => void {
  return showToast(message, { ...options, variant: 'warning' });
}

export function showInfoToast(
  message: string,
  options?: Omit<ToastProps, 'message' | 'variant'>,
): () => void {
  return showToast(message, { ...options, variant: 'info' });
}

export default {
  getToastCSS,
  getToastClasses,
  getToastIconClasses,
  getToastContentClasses,
  getToastTitleClasses,
  getToastMessageClasses,
  getToastDismissClasses,
  getToastActionClasses,
  createToast,
  getToastContainer,
  showToast,
  dismissAllToasts,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
};
