/**
 * Class name merging utility
 *
 * Combines class names and handles Tailwind class conflicts.
 * This is a simplified version of the clsx + tailwind-merge pattern.
 *
 * @example
 * cn('px-4 py-2', 'px-6') // => 'py-2 px-6' (px-6 wins)
 * cn('bg-blue-500', condition && 'bg-red-500') // conditional classes
 * cn('base-class', undefined, null, 'another-class') // filters falsy
 */

type ClassValue = string | undefined | null | false | ClassValue[];

/**
 * Filters and joins class names, removing falsy values
 */
export function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      const nested = clsx(...input);
      if (nested) classes.push(nested);
    }
  }

  return classes.join(' ');
}

/**
 * Simple Tailwind class conflict resolution
 *
 * Handles common conflicts like:
 * - Spacing: px-4 vs px-6
 * - Colors: bg-blue-500 vs bg-red-500
 * - Display: block vs hidden
 *
 * For a production app, consider using tailwind-merge package.
 * This simplified version handles the most common cases.
 */
function resolveTailwindConflicts(classes: string): string {
  const classArray = classes.split(/\s+/).filter(Boolean);
  const classMap = new Map<string, string>();

  // Patterns that indicate class "groups" that conflict
  const conflictPatterns = [
    // Spacing
    /^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml)-/,
    // Width/Height
    /^(w|h|min-w|min-h|max-w|max-h)-/,
    // Background colors
    /^bg-/,
    // Text colors (text-{color}-{shade} or text-white/black/inherit/etc)
    /^text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black|inherit|current|transparent)/,
    // Text sizes (text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, etc)
    /^text-(xs|sm|base|lg|xl|[2-9]xl)$/,
    // Border colors
    /^border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black|inherit|current|transparent)/,
    // Border width
    /^border(-[0-9])?$/,
    // Ring colors
    /^ring-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black|inherit|current|transparent)/,
    // Ring width
    /^ring(-[0-9])?$/,
    // Outline
    /^outline-/,
    // Display
    /^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|hidden)$/,
    // Position
    /^(static|fixed|absolute|relative|sticky)$/,
    // Flex/Grid
    /^(justify|items|content|self|place)-/,
    // Font family and weight
    /^font-/,
    // Line height
    /^leading-/,
    // Letter spacing
    /^tracking-/,
    // Border radius
    /^rounded/,
    // Shadow
    /^shadow/,
    // Opacity
    /^opacity-/,
    // Z-index
    /^z-/,
  ];

  for (const cls of classArray) {
    let key = cls;

    // Find the conflict group for this class
    for (const pattern of conflictPatterns) {
      const match = cls.match(pattern);
      if (match) {
        // Use the matched prefix as the key (e.g., "px-" for "px-4")
        key = match[0].replace(/-$/, '');
        break;
      }
    }

    // Later classes override earlier ones in the same group
    classMap.set(key, cls);
  }

  return Array.from(classMap.values()).join(' ');
}

/**
 * Combines class names and resolves Tailwind conflicts
 *
 * @param inputs - Class names, conditionals, or arrays of class names
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * // Basic usage
 * cn('px-4 py-2', 'px-6') // => 'py-2 px-6'
 *
 * // Conditional classes
 * cn('base', isActive && 'bg-blue-500', isDisabled && 'opacity-50')
 *
 * // With custom overrides
 * cn(getButtonClasses(), 'my-custom-class')
 */
export function cn(...inputs: ClassValue[]): string {
  const combined = clsx(...inputs);
  return resolveTailwindConflicts(combined);
}

export default cn;
