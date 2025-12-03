/**
 * Avatar Component
 *
 * Display user profile images, initials, or placeholders.
 * Supports various sizes, shapes, and status indicators.
 *
 * @example
 * // Image avatar
 * const avatar = createAvatar({ src: 'https://...', alt: 'John Doe' });
 *
 * // Initials avatar
 * const avatar = createAvatar({ name: 'John Doe' });
 *
 * // With status indicator
 * const avatar = createAvatar({ name: 'John', status: 'online' });
 */

import { cn } from '../utils/cn.ts';
import { getPrimaryClasses, type PrimaryColor } from '../tokens/theme.ts';

// =============================================================================
// TYPES
// =============================================================================

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type AvatarShape = 'circle' | 'square' | 'rounded';

export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Name to generate initials from */
  name?: string;
  /** Size */
  size?: AvatarSize;
  /** Shape */
  shape?: AvatarShape;
  /** Status indicator */
  status?: AvatarStatus;
  /** Theme color for initials background */
  themeColor?: PrimaryColor;
  /** Enable dark mode */
  darkMode?: boolean;
  /** Additional classes */
  class?: string;
}

export interface AvatarGroupProps {
  /** Maximum avatars to show before "+N" */
  max?: number;
  /** Size of avatars */
  size?: AvatarSize;
  /** Overlap amount */
  overlap?: 'sm' | 'md' | 'lg';
  /** Enable dark mode */
  darkMode?: boolean;
  /** Additional classes */
  class?: string;
}

// =============================================================================
// SIZE STYLES
// =============================================================================

const sizeStyles: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-[10px]', status: 'w-1.5 h-1.5' },
  sm: { container: 'w-8 h-8', text: 'text-xs', status: 'w-2 h-2' },
  md: { container: 'w-10 h-10', text: 'text-sm', status: 'w-2.5 h-2.5' },
  lg: { container: 'w-12 h-12', text: 'text-base', status: 'w-3 h-3' },
  xl: { container: 'w-16 h-16', text: 'text-xl', status: 'w-4 h-4' },
  '2xl': { container: 'w-20 h-20', text: 'text-2xl', status: 'w-5 h-5' },
};

const shapeStyles: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-lg',
};

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get initials from a name
 */
export function getInitials(name: string, maxLength: number = 2): string {
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].substring(0, maxLength).toUpperCase();
  }

  return words
    .slice(0, maxLength)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

/**
 * Generate a consistent color based on a string (for initials avatars)
 */
export function getColorFromString(str: string): PrimaryColor {
  const colors: PrimaryColor[] = [
    'blue',
    'violet',
    'indigo',
    'teal',
    'cyan',
    'emerald',
    'rose',
    'amber',
    'orange',
    'purple',
  ];

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

// =============================================================================
// CLASS GETTERS
// =============================================================================

/**
 * Get classes for avatar container
 */
export function getAvatarClasses(props: AvatarProps = {}): string {
  const {
    size = 'md',
    shape = 'circle',
    class: className,
  } = props;

  return cn(
    'relative inline-flex items-center justify-center',
    'overflow-hidden',
    sizeStyles[size].container,
    shapeStyles[shape],
    className,
  );
}

/**
 * Get classes for avatar image
 */
export function getAvatarImageClasses(): string {
  return 'w-full h-full object-cover';
}

/**
 * Get classes for initials avatar background
 */
export function getAvatarInitialsClasses(
  themeColor: PrimaryColor = 'blue',
  _darkMode: boolean = true,
): string {
  const theme = getPrimaryClasses(themeColor);

  return cn(
    'w-full h-full flex items-center justify-center font-medium',
    theme.bgSolid,
    theme.textOnSolid,
  );
}

/**
 * Get classes for initials text
 */
export function getAvatarTextClasses(size: AvatarSize = 'md'): string {
  return sizeStyles[size].text;
}

/**
 * Get classes for status indicator
 */
export function getAvatarStatusClasses(
  status: AvatarStatus,
  size: AvatarSize = 'md',
  shape: AvatarShape = 'circle',
  darkMode: boolean = true,
): string {
  const statusColors: Record<AvatarStatus, { light: string; dark: string }> = {
    online: {
      light: 'bg-emerald-500',
      dark: 'dark:bg-emerald-400',
    },
    offline: {
      light: 'bg-slate-400',
      dark: 'dark:bg-slate-500',
    },
    busy: {
      light: 'bg-red-500',
      dark: 'dark:bg-red-400',
    },
    away: {
      light: 'bg-amber-500',
      dark: 'dark:bg-amber-400',
    },
  };

  const colors = statusColors[status];
  const colorClasses = darkMode ? `${colors.light} ${colors.dark}` : colors.light;

  // Position based on shape
  const position = shape === 'circle' ? 'absolute bottom-0 right-0' : 'absolute bottom-0 right-0';

  return cn(
    'rounded-full border-2',
    darkMode ? 'border-white dark:border-slate-900' : 'border-white',
    sizeStyles[size].status,
    colorClasses,
    position,
  );
}

/**
 * Get classes for placeholder avatar (no image, no name)
 */
export function getAvatarPlaceholderClasses(darkMode: boolean = true): string {
  return cn(
    'w-full h-full flex items-center justify-center',
    darkMode
      ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
      : 'bg-slate-200 text-slate-500',
  );
}

// =============================================================================
// CREATORS
// =============================================================================

/**
 * Create an avatar element
 *
 * @example
 * // Image avatar
 * const avatar = createAvatar({
 *   src: 'https://example.com/avatar.jpg',
 *   alt: 'John Doe',
 *   size: 'lg'
 * });
 *
 * @example
 * // Initials avatar
 * const avatar = createAvatar({
 *   name: 'John Doe',
 *   themeColor: 'violet'
 * });
 *
 * @example
 * // With status
 * const avatar = createAvatar({
 *   name: 'Jane Smith',
 *   status: 'online'
 * });
 */
export function createAvatar(props: AvatarProps = {}): HTMLDivElement {
  const {
    src,
    alt,
    name,
    size = 'md',
    shape = 'circle',
    status,
    themeColor,
    darkMode = true,
    class: className,
  } = props;

  const container = document.createElement('div');
  container.className = getAvatarClasses({ size, shape, class: className });

  if (src) {
    // Image avatar
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || name || 'Avatar';
    img.className = getAvatarImageClasses();

    // Fallback to initials on error
    if (name) {
      img.onerror = () => {
        container.removeChild(img);
        const initials = createInitialsContent(
          name,
          size,
          themeColor || getColorFromString(name),
          darkMode,
        );
        container.insertBefore(initials, container.firstChild);
      };
    }

    container.appendChild(img);
  } else if (name) {
    // Initials avatar
    const initials = createInitialsContent(
      name,
      size,
      themeColor || getColorFromString(name),
      darkMode,
    );
    container.appendChild(initials);
  } else {
    // Placeholder avatar
    const placeholder = document.createElement('div');
    placeholder.className = getAvatarPlaceholderClasses(darkMode);
    placeholder.innerHTML = '<i class="ph ph-user"></i>';
    container.appendChild(placeholder);
  }

  // Status indicator
  if (status) {
    const statusEl = document.createElement('span');
    statusEl.className = getAvatarStatusClasses(status, size, shape, darkMode);
    container.appendChild(statusEl);
  }

  return container;
}

/**
 * Create initials content element
 */
function createInitialsContent(
  name: string,
  size: AvatarSize,
  themeColor: PrimaryColor,
  darkMode: boolean,
): HTMLDivElement {
  const div = document.createElement('div');
  div.className = getAvatarInitialsClasses(themeColor, darkMode);

  const span = document.createElement('span');
  span.className = getAvatarTextClasses(size);
  span.textContent = getInitials(name);
  div.appendChild(span);

  return div;
}

/**
 * Create an avatar group (stacked avatars)
 *
 * @example
 * const avatars = [
 *   { name: 'John Doe' },
 *   { name: 'Jane Smith' },
 *   { src: 'https://...', alt: 'Bob' },
 * ];
 * const group = createAvatarGroup(avatars, { max: 3 });
 */
export function createAvatarGroup(
  avatars: AvatarProps[],
  options: AvatarGroupProps = {},
): HTMLDivElement {
  const {
    max = 5,
    size = 'md',
    overlap = 'md',
    darkMode = true,
    class: className,
  } = options;

  const overlapStyles: Record<string, string> = {
    sm: '-space-x-1',
    md: '-space-x-2',
    lg: '-space-x-3',
  };

  const container = document.createElement('div');
  container.className = cn(
    'inline-flex items-center',
    overlapStyles[overlap],
    className,
  );

  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  // Create visible avatars
  visibleAvatars.forEach((avatarProps) => {
    const avatar = createAvatar({
      ...avatarProps,
      size,
      darkMode,
    });
    avatar.classList.add(
      'ring-2',
      darkMode ? 'ring-white dark:ring-slate-900' : 'ring-white',
    );
    container.appendChild(avatar);
  });

  // Create "+N" indicator if there are more
  if (remainingCount > 0) {
    const moreContainer = document.createElement('div');
    moreContainer.className = cn(
      getAvatarClasses({ size, shape: 'circle' }),
      'ring-2',
      darkMode
        ? 'ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-700'
        : 'ring-white bg-slate-200',
    );

    const moreText = document.createElement('span');
    moreText.className = cn(
      sizeStyles[size].text,
      'font-medium',
      darkMode ? 'text-slate-600 dark:text-slate-300' : 'text-slate-600',
    );
    moreText.textContent = `+${remainingCount}`;
    moreContainer.appendChild(moreText);

    container.appendChild(moreContainer);
  }

  return container;
}

/**
 * Create avatar with name and metadata (e.g., for user lists)
 *
 * @example
 * const user = createAvatarWithInfo({
 *   name: 'John Doe',
 *   subtitle: 'john@example.com',
 *   status: 'online'
 * });
 */
export function createAvatarWithInfo(
  props: AvatarProps & {
    subtitle?: string;
  },
): HTMLDivElement {
  const { name, subtitle, darkMode = true, ...avatarProps } = props;

  const container = document.createElement('div');
  container.className = 'inline-flex items-center gap-3';

  // Avatar
  const avatar = createAvatar({ ...avatarProps, name, darkMode });
  container.appendChild(avatar);

  // Info
  const info = document.createElement('div');
  info.className = 'flex flex-col';

  if (name) {
    const nameEl = document.createElement('span');
    nameEl.className = cn(
      'text-sm font-medium',
      darkMode ? 'text-slate-900 dark:text-white' : 'text-slate-900',
    );
    nameEl.textContent = name;
    info.appendChild(nameEl);
  }

  if (subtitle) {
    const subtitleEl = document.createElement('span');
    subtitleEl.className = cn(
      'text-sm',
      darkMode ? 'text-slate-500 dark:text-slate-400' : 'text-slate-500',
    );
    subtitleEl.textContent = subtitle;
    info.appendChild(subtitleEl);
  }

  container.appendChild(info);

  return container;
}

export default {
  getInitials,
  getColorFromString,
  getAvatarClasses,
  getAvatarImageClasses,
  getAvatarInitialsClasses,
  getAvatarTextClasses,
  getAvatarStatusClasses,
  getAvatarPlaceholderClasses,
  createAvatar,
  createAvatarGroup,
  createAvatarWithInfo,
};
