/**
 * Code & Kbd Components
 *
 * Inline code and keyboard shortcut styling.
 *
 * @example
 * // Inline code
 * <code class="{{ getCodeClasses() }}">npm install</code>
 *
 * // Keyboard shortcut
 * <kbd class="{{ getKbdClasses() }}">Ctrl</kbd>+<kbd class="{{ getKbdClasses() }}">C</kbd>
 *
 * // Code block
 * <pre class="{{ getCodeBlockClasses() }}"><code>const x = 1;</code></pre>
 */

import { cn } from '../utils/cn.ts';

/**
 * Code variant
 */
export type CodeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

/**
 * Code size
 */
export type CodeSize = 'sm' | 'md' | 'lg';

/**
 * Code props
 */
export interface CodeProps {
  /** Code variant */
  variant?: CodeVariant;
  /** Code size */
  size?: CodeSize;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Kbd props
 */
export interface KbdProps {
  /** Kbd size */
  size?: CodeSize;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Code block props
 */
export interface CodeBlockProps {
  /** Whether to show line numbers */
  lineNumbers?: boolean;
  /** Maximum height with scroll */
  maxHeight?: string;
  /** Additional CSS classes */
  class?: string;
}

/**
 * Variant styles for inline code
 */
const codeVariantStyles: Record<CodeVariant, string> = {
  default: 'bg-slate-100 text-slate-800 ring-slate-200',
  primary: 'bg-blue-50 text-blue-800 ring-blue-200',
  success: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-800 ring-amber-200',
  error: 'bg-red-50 text-red-800 ring-red-200',
};

/**
 * Size styles for inline code
 */
const codeSizeStyles: Record<CodeSize, string> = {
  sm: 'px-1 py-0.5 text-xs',
  md: 'px-1.5 py-0.5 text-sm',
  lg: 'px-2 py-1 text-base',
};

/**
 * Base styles for inline code
 */
const codeBaseStyles = [
  'font-mono',
  'rounded',
  'ring-1',
  'ring-inset',
  'whitespace-nowrap',
].join(' ');

/**
 * Base styles for kbd
 */
const kbdBaseStyles = [
  'inline-flex',
  'items-center',
  'justify-center',
  'font-mono',
  'font-medium',
  'rounded',
  'border',
  'border-b-2',
  'border-slate-300',
  'bg-slate-50',
  'text-slate-700',
  'shadow-sm',
].join(' ');

/**
 * Size styles for kbd
 */
const kbdSizeStyles: Record<CodeSize, string> = {
  sm: 'px-1 py-0.5 text-xs min-w-[1.25rem]',
  md: 'px-1.5 py-0.5 text-xs min-w-[1.5rem]',
  lg: 'px-2 py-1 text-sm min-w-[2rem]',
};

/**
 * Base styles for code block
 */
const codeBlockBaseStyles = [
  'bg-slate-900',
  'text-slate-100',
  'rounded-lg',
  'p-4',
  'overflow-x-auto',
  'font-mono',
  'text-sm',
  'leading-relaxed',
].join(' ');

/**
 * Get Tailwind classes for inline code
 *
 * @param props - Code configuration
 * @returns Tailwind class string
 *
 * @example
 * <code class="{{ getCodeClasses() }}">npm install</code>
 */
export function getCodeClasses(props: CodeProps = {}): string {
  const {
    variant = 'default',
    size = 'md',
    class: className,
  } = props;

  return cn(
    codeBaseStyles,
    codeVariantStyles[variant],
    codeSizeStyles[size],
    className,
  );
}

/**
 * Get Tailwind classes for keyboard shortcuts
 *
 * @param props - Kbd configuration
 * @returns Tailwind class string
 *
 * @example
 * <kbd class="{{ getKbdClasses() }}">Ctrl</kbd>
 */
export function getKbdClasses(props: KbdProps = {}): string {
  const {
    size = 'md',
    class: className,
  } = props;

  return cn(kbdBaseStyles, kbdSizeStyles[size], className);
}

/**
 * Get Tailwind classes for code blocks
 *
 * @param props - Code block configuration
 * @returns Tailwind class string
 *
 * @example
 * <pre class="{{ getCodeBlockClasses() }}"><code>const x = 1;</code></pre>
 */
export function getCodeBlockClasses(props: CodeBlockProps = {}): string {
  const {
    maxHeight,
    class: className,
  } = props;

  return cn(
    codeBlockBaseStyles,
    maxHeight && `max-h-[${maxHeight}] overflow-y-auto`,
    className,
  );
}

/**
 * Create inline code HTML string
 *
 * @param text - Code content
 * @param props - Code configuration
 * @returns HTML string
 *
 * @example
 * const html = createCode('npm install');
 */
export function createCode(text: string, props: CodeProps = {}): string {
  const classes = getCodeClasses(props);
  return `<code class="${classes}">${escapeHtml(text)}</code>`;
}

/**
 * Create kbd HTML string
 *
 * @param key - Keyboard key
 * @param props - Kbd configuration
 * @returns HTML string
 *
 * @example
 * const html = createKbd('Ctrl');
 */
export function createKbd(key: string, props: KbdProps = {}): string {
  const classes = getKbdClasses(props);
  return `<kbd class="${classes}">${escapeHtml(key)}</kbd>`;
}

/**
 * Create keyboard shortcut HTML (multiple keys)
 *
 * @param keys - Array of keys
 * @param props - Kbd configuration
 * @returns HTML string
 *
 * @example
 * const html = createShortcut(['Ctrl', 'C']);
 * // Returns: <kbd>Ctrl</kbd>+<kbd>C</kbd>
 */
export function createShortcut(keys: string[], props: KbdProps = {}): string {
  return keys.map((key) => createKbd(key, props)).join('+');
}

/**
 * Create code block HTML string
 *
 * @param code - Code content
 * @param props - Code block configuration
 * @returns HTML string
 *
 * @example
 * const html = createCodeBlock('const x = 1;\nconst y = 2;');
 */
export function createCodeBlock(code: string, props: CodeBlockProps = {}): string {
  const classes = getCodeBlockClasses(props);
  const { lineNumbers = false } = props;

  if (lineNumbers) {
    const lines = code.split('\n');
    const numberedLines = lines
      .map((line, i) => {
        const num = String(i + 1).padStart(3, ' ');
        return `<span class="text-slate-500 select-none mr-4">${num}</span>${escapeHtml(line)}`;
      })
      .join('\n');
    return `<pre class="${classes}"><code>${numberedLines}</code></pre>`;
  }

  return `<pre class="${classes}"><code>${escapeHtml(code)}</code></pre>`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default {
  getCodeClasses,
  getKbdClasses,
  getCodeBlockClasses,
  createCode,
  createKbd,
  createShortcut,
  createCodeBlock,
};
