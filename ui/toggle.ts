/**
 * Toggle (Switch) Component
 *
 * A toggle switch for binary on/off states.
 * Supports custom theme colors and dark mode.
 *
 * @example
 * // Get classes for custom implementation
 * <button class="{{ getToggleClasses({ checked: true }) }}">
 *   <span class="{{ getToggleThumbClasses({ checked: true }) }}"></span>
 * </button>
 *
 * // Create toggle element
 * const toggle = createToggle({ checked: true, onChange: (v) => console.log(v) });
 */

import { cn } from '../utils/cn.ts';
import { focusRing } from '../tokens/colors.ts';
import { getPrimaryClasses, type PrimaryColor } from '../tokens/theme.ts';

// =============================================================================
// TYPES
// =============================================================================

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps {
  /** Checked/on state */
  checked?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Size */
  size?: ToggleSize;
  /** Theme color when checked */
  themeColor?: PrimaryColor;
  /** Enable dark mode */
  darkMode?: boolean;
  /** ID attribute */
  id?: string;
  /** Name attribute (for forms) */
  name?: string;
  /** Additional classes */
  class?: string;
}

export interface CreateToggleOptions extends ToggleProps {
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Description text below label */
  description?: string;
}

// =============================================================================
// SIZE STYLES
// =============================================================================

const trackSizes: Record<ToggleSize, string> = {
  sm: 'w-8 h-4',
  md: 'w-11 h-6',
  lg: 'w-14 h-7',
};

const thumbSizes: Record<ToggleSize, string> = {
  sm: 'w-3 h-3',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const thumbTranslate: Record<ToggleSize, { off: string; on: string }> = {
  sm: { off: 'translate-x-0.5', on: 'translate-x-4' },
  md: { off: 'translate-x-0.5', on: 'translate-x-5' },
  lg: { off: 'translate-x-0.5', on: 'translate-x-7' },
};

// =============================================================================
// CLASS GETTERS
// =============================================================================

/**
 * Get classes for toggle track (background)
 */
export function getToggleClasses(props: ToggleProps = {}): string {
  const {
    checked = false,
    disabled = false,
    size = 'md',
    themeColor = 'blue',
    darkMode = true,
    class: className,
  } = props;

  const theme = getPrimaryClasses(themeColor);

  // Unchecked track color
  const uncheckedTrack = darkMode ? 'bg-slate-200 dark:bg-slate-700' : 'bg-slate-200';

  // Checked track color (theme color)
  const checkedTrack = checked ? theme.bgSolid : uncheckedTrack;

  return cn(
    'relative inline-flex shrink-0 cursor-pointer rounded-full',
    'transition-colors duration-200 ease-in-out',
    trackSizes[size],
    checkedTrack,
    disabled && 'opacity-50 cursor-not-allowed',
    focusRing.default,
    className,
  );
}

/**
 * Get classes for toggle thumb (the moving circle)
 */
export function getToggleThumbClasses(
  props: Pick<ToggleProps, 'checked' | 'size' | 'darkMode'> = {},
): string {
  const { checked = false, size = 'md', darkMode = true } = props;

  const translate = checked ? thumbTranslate[size].on : thumbTranslate[size].off;

  return cn(
    'pointer-events-none inline-block rounded-full shadow-lg ring-0',
    'transform transition duration-200 ease-in-out',
    thumbSizes[size],
    darkMode ? 'bg-white dark:bg-slate-100' : 'bg-white',
    translate,
  );
}

/**
 * Get classes for toggle with label container
 */
export function getToggleWithLabelClasses(
  labelPosition: 'left' | 'right' = 'right',
): string {
  return cn(
    'inline-flex items-center gap-3',
    labelPosition === 'left' && 'flex-row-reverse',
  );
}

/**
 * Get classes for toggle label
 */
export function getToggleLabelClasses(
  props: Pick<ToggleProps, 'disabled' | 'darkMode'> = {},
): string {
  const { disabled = false, darkMode = true } = props;

  return cn(
    'text-sm font-medium',
    darkMode ? 'text-slate-700 dark:text-slate-300' : 'text-slate-700',
    disabled && 'opacity-50',
  );
}

/**
 * Get classes for toggle description
 */
export function getToggleDescriptionClasses(props: Pick<ToggleProps, 'darkMode'> = {}): string {
  const { darkMode = true } = props;

  return cn(
    'text-sm',
    darkMode ? 'text-slate-500 dark:text-slate-400' : 'text-slate-500',
  );
}

// =============================================================================
// CREATORS
// =============================================================================

/**
 * Create a toggle switch element
 *
 * @example
 * const toggle = createToggle({
 *   checked: true,
 *   themeColor: 'violet',
 *   onChange: (checked) => console.log('Toggle:', checked)
 * });
 *
 * @example
 * // With label
 * const toggle = createToggle({
 *   label: 'Enable notifications',
 *   description: 'Receive email alerts for important updates',
 *   onChange: (checked) => saveSettings({ notifications: checked })
 * });
 */
export function createToggle(options: CreateToggleOptions = {}): HTMLElement {
  const {
    checked = false,
    disabled = false,
    size = 'md',
    themeColor = 'blue',
    darkMode = true,
    id,
    name,
    onChange,
    label,
    labelPosition = 'right',
    description,
    class: className,
  } = options;

  // If there's a label, create a wrapper
  if (label) {
    const wrapper = document.createElement('label');
    wrapper.className = cn(
      'inline-flex cursor-pointer',
      disabled && 'cursor-not-allowed',
      className,
    );

    if (description) {
      // Complex layout with description
      wrapper.className = cn(
        'flex items-start gap-3',
        labelPosition === 'left' && 'flex-row-reverse',
        disabled && 'cursor-not-allowed',
        className,
      );

      const toggle = createToggleButton({
        checked,
        disabled,
        size,
        themeColor,
        darkMode,
        id,
        name,
        onChange,
      });

      const textContainer = document.createElement('div');
      textContainer.className = 'flex flex-col';

      const labelEl = document.createElement('span');
      labelEl.className = getToggleLabelClasses({ disabled, darkMode });
      labelEl.textContent = label;
      textContainer.appendChild(labelEl);

      const descEl = document.createElement('span');
      descEl.className = getToggleDescriptionClasses({ darkMode });
      descEl.textContent = description;
      textContainer.appendChild(descEl);

      if (labelPosition === 'right') {
        wrapper.appendChild(toggle);
        wrapper.appendChild(textContainer);
      } else {
        wrapper.appendChild(textContainer);
        wrapper.appendChild(toggle);
      }

      return wrapper;
    }

    // Simple layout with just label
    wrapper.className = getToggleWithLabelClasses(labelPosition);

    const toggle = createToggleButton({
      checked,
      disabled,
      size,
      themeColor,
      darkMode,
      id,
      name,
      onChange,
    });

    const labelEl = document.createElement('span');
    labelEl.className = getToggleLabelClasses({ disabled, darkMode });
    labelEl.textContent = label;

    wrapper.appendChild(toggle);
    wrapper.appendChild(labelEl);

    return wrapper;
  }

  // Just the toggle button
  return createToggleButton({
    checked,
    disabled,
    size,
    themeColor,
    darkMode,
    id,
    name,
    onChange,
    class: className,
  });
}

/**
 * Create just the toggle button element (no label wrapper)
 */
function createToggleButton(options: CreateToggleOptions = {}): HTMLButtonElement {
  const {
    checked = false,
    disabled = false,
    size = 'md',
    themeColor = 'blue',
    darkMode = true,
    id,
    name,
    onChange,
    class: className,
  } = options;

  let isChecked = checked;

  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('role', 'switch');
  button.setAttribute('aria-checked', String(isChecked));

  if (id) button.id = id;
  if (name) button.setAttribute('data-name', name);
  if (disabled) button.disabled = true;

  const updateClasses = () => {
    button.className = getToggleClasses({
      checked: isChecked,
      disabled,
      size,
      themeColor,
      darkMode,
      class: className,
    });
    button.setAttribute('aria-checked', String(isChecked));

    const thumb = button.querySelector('span');
    if (thumb) {
      thumb.className = getToggleThumbClasses({ checked: isChecked, size, darkMode });
    }
  };

  // Create thumb
  const thumb = document.createElement('span');
  thumb.setAttribute('aria-hidden', 'true');
  button.appendChild(thumb);

  // Set initial classes
  updateClasses();

  // Click handler
  button.addEventListener('click', () => {
    if (disabled) return;

    isChecked = !isChecked;
    updateClasses();

    if (onChange) {
      onChange(isChecked);
    }
  });

  return button;
}

/**
 * Create a hidden checkbox input that syncs with a toggle
 * Useful for form submissions
 *
 * @example
 * const { toggle, input } = createToggleWithInput({
 *   name: 'notifications',
 *   checked: true
 * });
 * form.appendChild(input);
 * form.appendChild(toggle);
 */
export function createToggleWithInput(
  options: CreateToggleOptions & { name: string },
): { toggle: HTMLElement; input: HTMLInputElement } {
  const { name, checked = false, ...toggleOptions } = options;

  // Hidden input for form submission
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.name = name;
  input.checked = checked;
  input.className = 'sr-only'; // Screen reader only
  input.setAttribute('aria-hidden', 'true');
  input.tabIndex = -1;

  // Toggle that syncs with input
  const toggle = createToggle({
    ...toggleOptions,
    checked,
    onChange: (newChecked) => {
      input.checked = newChecked;
      if (toggleOptions.onChange) {
        toggleOptions.onChange(newChecked);
      }
    },
  });

  return { toggle, input };
}

export default {
  getToggleClasses,
  getToggleThumbClasses,
  getToggleWithLabelClasses,
  getToggleLabelClasses,
  getToggleDescriptionClasses,
  createToggle,
  createToggleWithInput,
};
