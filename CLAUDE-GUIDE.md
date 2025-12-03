# Marquis - Claude Code Guide

This guide helps Claude Code understand and use the Marquis component library effectively.

## Overview

Marquis is eSolia's vanilla TypeScript component library providing Tailwind CSS class generation and
DOM element creation. It's framework-agnostic and works with any web project.

## Key Concepts

### 1. Dual API Pattern

Every component provides two types of exports:

```typescript
// 1. Class getters - return Tailwind CSS class strings
import { getBadgeClasses, getButtonClasses } from '@esolia/marquis';
const classes = getButtonClasses({ variant: 'primary', size: 'md' });
// Returns: "inline-flex items-center justify-center px-4 py-2 ..."

// 2. DOM creators - return HTMLElement instances
import { createBadge, createButton } from '@esolia/marquis';
const button = createButton('Click me', { variant: 'primary' });
document.body.appendChild(button);
```

### 2. Theme System

The library supports 13 customizable primary colors:

```typescript
type PrimaryColor =
  | 'blue'
  | 'violet'
  | 'indigo'
  | 'teal'
  | 'cyan'
  | 'emerald'
  | 'rose'
  | 'amber'
  | 'orange'
  | 'sky'
  | 'purple'
  | 'fuchsia'
  | 'pink';
```

Apply theme colors to any component:

```typescript
// Button with violet theme
const btn = createButton('Submit', { themeColor: 'violet' });

// Badge with emerald theme
const badge = createBadge('Success', { themeColor: 'emerald' });

// Progress bar with rose theme
const progress = createProgress({ value: 75, themeColor: 'rose' });
```

### 3. Dark Mode Support

All components support dark mode via the `darkMode` prop (default: `true`):

```typescript
// Dark mode enabled (default)
const classes = getButtonClasses({ variant: 'primary', darkMode: true });
// Returns classes like: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"

// Light mode only (no dark: prefixes)
const classes = getButtonClasses({ variant: 'primary', darkMode: false });
// Returns classes like: "bg-blue-600 hover:bg-blue-700"
```

## Components Reference

### Button

```typescript
import { createButton, createIconOnlyButton, getButtonClasses } from '@esolia/marquis';

// Props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  themeColor?: PrimaryColor;
  darkMode?: boolean;
}

// Examples
const primaryBtn = createButton('Submit', { variant: 'primary', themeColor: 'violet' });
const iconBtn = createIconOnlyButton('<i class="ph ph-trash"></i>', {
  variant: 'danger',
  size: 'sm',
  ariaLabel: 'Delete',
});
```

### Badge

```typescript
import { createBadge, createBadgeWithIcon, createDotBadge, getBadgeClasses } from '@esolia/marquis';

// Props
interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  style?: 'subtle' | 'solid' | 'outline';
  themeColor?: PrimaryColor;
  darkMode?: boolean;
  removable?: boolean;
  dot?: boolean;
}

// Examples
const badge = createBadge('New', { variant: 'success', style: 'solid' });
const dotBadge = createDotBadge('Active', { variant: 'success' });
const iconBadge = createBadgeWithIcon('Settings', '<i class="ph ph-gear"></i>');
```

### Card

```typescript
import {
  createCard,
  createStatCard,
  getCardBodyClasses,
  getCardClasses,
  getCardFooterClasses,
  getCardHeaderClasses,
} from '@esolia/marquis';

// Props
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  interactive?: boolean;
  darkMode?: boolean;
}

// Examples
const card = createCard({
  title: 'Card Title',
  content: 'Card content here',
  hoverable: true,
});

const statCard = createStatCard({
  label: 'Total Users',
  value: '1,234',
  trend: { value: '+12%', direction: 'up' },
  themeColor: 'emerald',
});
```

### Alert

```typescript
import {
  createAlert,
  createErrorAlert,
  createSuccessAlert,
  getAlertClasses,
} from '@esolia/marquis';

// Props
interface AlertProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dismissible?: boolean;
  darkMode?: boolean;
}

// Examples
const alert = createAlert('Operation completed', { variant: 'success' });
const errorAlert = createErrorAlert('Something went wrong', { dismissible: true });
```

### Progress

```typescript
import {
  createCircularProgress,
  createProgress,
  createSimpleProgress,
  getCircularProgressCSS,
  getProgressClasses,
  getProgressCSS,
} from '@esolia/marquis';

// Props
interface ProgressProps {
  value?: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'primary';
  themeColor?: PrimaryColor;
  darkMode?: boolean;
  indeterminate?: boolean;
  showLabel?: boolean;
  animated?: boolean;
  striped?: boolean;
}

// IMPORTANT: Include CSS for animations
document.head.insertAdjacentHTML('beforeend', `<style>${getProgressCSS()}</style>`);

// Examples
const progress = createProgress({ value: 75, showLabel: true });
const indeterminate = createProgress({ indeterminate: true, themeColor: 'violet' });
const circular = createCircularProgress({ value: 60, size: 80 });
```

### Toggle

```typescript
import {
  createToggle,
  createToggleWithInput,
  getToggleClasses,
  getToggleThumbClasses,
} from '@esolia/marquis';

// Props
interface ToggleProps {
  checked?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  themeColor?: PrimaryColor;
  darkMode?: boolean;
}

interface CreateToggleOptions extends ToggleProps {
  onChange?: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  description?: string;
}

// Examples
const toggle = createToggle({
  checked: true,
  label: 'Enable notifications',
  themeColor: 'violet',
  onChange: (checked) => console.log('Toggle:', checked),
});

// For forms (includes hidden checkbox input)
const { toggle, input } = createToggleWithInput({
  name: 'notifications',
  checked: true,
});
```

### Skeleton

```typescript
import {
  createAvatarSkeleton,
  createCardSkeleton,
  createSkeleton,
  createTableSkeleton,
  createTextSkeleton,
  getSkeletonClasses,
  getSkeletonCSS,
} from '@esolia/marquis';

// Props
interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
  width?: string;
  height?: string;
  darkMode?: boolean;
  animate?: boolean;
  animation?: 'pulse' | 'wave' | 'none';
}

// IMPORTANT: Include CSS for animations
document.head.insertAdjacentHTML('beforeend', `<style>${getSkeletonCSS()}</style>`);

// Examples
const textSkeleton = createTextSkeleton({ lines: 3 });
const cardSkeleton = createCardSkeleton({ showImage: true, showActions: true });
const avatarSkeleton = createAvatarSkeleton({ size: 'lg' });
const tableSkeleton = createTableSkeleton({ rows: 5, columns: 4 });
```

### Avatar

```typescript
import {
  createAvatar,
  createAvatarGroup,
  createAvatarWithInfo,
  getAvatarClasses,
  getColorFromString,
  getInitials,
} from '@esolia/marquis';

// Props
interface AvatarProps {
  src?: string; // Image URL
  alt?: string; // Alt text
  name?: string; // Name for initials
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'busy' | 'away';
  themeColor?: PrimaryColor;
  darkMode?: boolean;
}

// Examples
// Image avatar
const avatar = createAvatar({
  src: 'https://example.com/avatar.jpg',
  alt: 'John Doe',
});

// Initials avatar (auto-generates color from name)
const initialsAvatar = createAvatar({ name: 'John Doe' });

// With status indicator
const statusAvatar = createAvatar({
  name: 'Jane Smith',
  status: 'online',
  size: 'lg',
});

// Avatar group (stacked)
const group = createAvatarGroup([
  { name: 'John' },
  { name: 'Jane' },
  { src: 'https://...' },
], { max: 3 });

// Avatar with name and subtitle
const userAvatar = createAvatarWithInfo({
  name: 'John Doe',
  subtitle: 'john@example.com',
  status: 'online',
});

// Helper functions
getInitials('John Doe'); // 'JD'
getColorFromString('John'); // Returns consistent PrimaryColor
```

### Toast

```typescript
import {
  dismissAllToasts,
  getToastContainer,
  getToastCSS,
  showErrorToast,
  showInfoToast,
  showSuccessToast,
  showToast,
  showWarningToast,
} from '@esolia/marquis';

// Props
interface ToastProps {
  message: string;
  title?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  duration?: number; // ms, 0 for no auto-dismiss
  dismissible?: boolean;
  darkMode?: boolean;
  icon?: string | false;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
}

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

// IMPORTANT: Include CSS for animations
document.head.insertAdjacentHTML('beforeend', `<style>${getToastCSS()}</style>`);

// Examples
// Simple toast
showToast('Hello!');

// With options
showToast('Changes saved', { variant: 'success', duration: 3000 });

// Convenience functions
showSuccessToast('Saved!');
showErrorToast('Failed to save', { duration: 5000 });
showWarningToast('Low disk space');
showInfoToast('New update available');

// With action button
showToast('File deleted', {
  variant: 'info',
  action: { label: 'Undo', onClick: () => undoDelete() },
});

// Returns dismiss function
const dismiss = showToast('Loading...', { duration: 0 });
// Later: dismiss();

// Dismiss all
dismissAllToasts();
```

### Table

```typescript
import {
  createTable,
  createTableWrapper,
  getTableClasses,
  getTableClassSet,
  getTableWrapperClasses,
} from '@esolia/marquis';

// Props
interface TableProps {
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
  bordered?: boolean;
  darkMode?: boolean;
}

// Get all table classes at once
const classes = getTableClassSet({ striped: true, hoverable: true });
// Returns: { wrapper, table, header, headerCell, body, row, cell }
```

### Tabs

```typescript
import { createTabs, getTabClasses, getTabsContainerClasses } from '@esolia/marquis';

// Props
interface TabsProps {
  variant?: 'underline' | 'pills' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  darkMode?: boolean;
}

const tabs = createTabs({
  items: [
    { id: 'tab1', label: 'First', count: 5 },
    { id: 'tab2', label: 'Second', draft: true },
    { id: 'tab3', label: 'Third', disabled: true },
  ],
  activeId: 'tab1',
  onChange: (id) => console.log('Tab:', id),
});
```

### Spinner

```typescript
import {
  createButtonLoading,
  createLoadingOverlay,
  createSpinner,
  createSpinnerWithLabel,
  getSpinnerClasses,
  getSpinnerCSS,
} from '@esolia/marquis';

// Props
interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  speed?: 'slow' | 'normal' | 'fast';
  themeColor?: PrimaryColor;
  darkMode?: boolean;
}

// IMPORTANT: Include CSS for animations
document.head.insertAdjacentHTML('beforeend', `<style>${getSpinnerCSS()}</style>`);

// Examples
const spinner = createSpinner({ size: 'lg', themeColor: 'violet' });
const labeled = createSpinnerWithLabel('Loading...', { size: 'md' });
const overlay = createLoadingOverlay();
```

### Dropdown

```typescript
import {
  createDropdown,
  createUserDropdown,
  getDropdownClasses,
  getDropdownCSS,
} from '@esolia/marquis';

// Props
interface DropdownProps {
  variant?: 'default' | 'compact';
  align?: 'left' | 'right' | 'center';
  darkMode?: boolean;
}

// IMPORTANT: Include CSS for dropdown behavior
document.head.insertAdjacentHTML('beforeend', `<style>${getDropdownCSS()}</style>`);

const dropdown = createDropdown({
  trigger: 'Options',
  items: [
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {}, variant: 'danger' },
    { type: 'divider' },
    { label: 'Settings', onClick: () => {} },
  ],
});
```

### Header

```typescript
import { createHeader, getHeaderClasses, getHeaderCSS } from '@esolia/marquis';

const header = createHeader({
  logo: { src: '/logo.svg', alt: 'Logo', href: '/' },
  nav: [
    { label: 'Home', href: '/', active: true },
    { label: 'About', href: '/about' },
  ],
  user: { name: 'John Doe', avatar: '/avatar.jpg' },
  language: { current: 'en', options: ['en', 'ja'] },
});
```

### Code & Kbd

```typescript
import {
  createCode,
  createCodeBlock,
  createKbd,
  createShortcut,
  getCodeClasses,
  getKbdClasses,
} from '@esolia/marquis';

const code = createCode('const x = 1');
const codeBlock = createCodeBlock('function hello() {\n  return "world";\n}');
const kbd = createKbd('Ctrl');
const shortcut = createShortcut(['Ctrl', 'S']); // Shows "Ctrl + S"
```

## Theme System Deep Dive

### Using Theme Module

```typescript
import { Theme } from '@esolia/marquis';

// Create a custom theme
const violetTheme = Theme.createTheme('violet');

// Get primary color classes
const primaryClasses = Theme.getPrimaryClasses('violet');
// Returns: { bg, bgHover, bgSolid, bgSolidHover, text, textOnSolid, border, ring }

// Get status color classes
const successClasses = Theme.getStatusClasses('success');

// Get neutral color classes
const neutralClasses = Theme.getNeutralClasses();
```

### Available Primary Colors

| Color   | Use Case                 |
| ------- | ------------------------ |
| blue    | Default, professional    |
| violet  | Creative, modern         |
| indigo  | Corporate, trustworthy   |
| teal    | Healthcare, wellness     |
| cyan    | Technology, innovation   |
| emerald | Success, growth, finance |
| rose    | Attention, love, care    |
| amber   | Warning, caution         |
| orange  | Energy, enthusiasm       |
| sky     | Open, friendly           |
| purple  | Luxury, creativity       |
| fuchsia | Bold, playful            |
| pink    | Soft, feminine           |

## CSS Requirements

Some components require CSS to be included for animations:

```typescript
import {
  getCircularProgressCSS,
  getDropdownCSS,
  getHeaderCSS,
  getProgressCSS,
  getSkeletonCSS,
  getSpinnerCSS,
  getToastCSS,
} from '@esolia/marquis';

// Include in your HTML head or CSS file
const allCSS = [
  getSpinnerCSS(),
  getProgressCSS(),
  getCircularProgressCSS(),
  getSkeletonCSS(),
  getToastCSS(),
  getDropdownCSS(),
  getHeaderCSS(),
].join('\n');

document.head.insertAdjacentHTML('beforeend', `<style>${allCSS}</style>`);
```

## Utilities

```typescript
import { clsx, cn } from '@esolia/marquis';

// cn - Combines class names with tailwind-merge
const classes = cn('px-4 py-2', condition && 'bg-blue-500', 'px-6');
// Result: 'py-2 px-6 bg-blue-500' (px-6 overrides px-4)

// clsx - Simple class name concatenation
const classes = clsx('btn', isActive && 'btn-active', size === 'lg' && 'btn-lg');
```

## Assets

```typescript
import {
  favicon,
  getFaviconHtml,
  getLogoDataUri,
  logoHorizontal,
  logoSymbol,
  logoWordmark,
} from '@esolia/marquis';

// Logo SVGs (data URIs)
const logo = logoSymbol; // eSolia logo mark
const fullLogo = logoHorizontal; // Logo + text horizontal

// Favicon utilities
const faviconHtml = getFaviconHtml();
```

## Common Patterns

### Loading State Button

```typescript
const submitBtn = createButton('Submit', {
  variant: 'primary',
  loading: true,
  disabled: true,
});
```

### Status Badges

```typescript
const statuses = ['online', 'offline', 'busy', 'away'];
const badges = statuses.map((status) =>
  createDotBadge(status, { variant: status === 'online' ? 'success' : 'default' })
);
```

### Form with Toggle

```typescript
const { toggle, input } = createToggleWithInput({
  name: 'darkMode',
  label: 'Enable Dark Mode',
  description: 'Use dark theme throughout the application',
  checked: localStorage.getItem('darkMode') === 'true',
  onChange: (checked) => localStorage.setItem('darkMode', String(checked)),
});

form.appendChild(input);
form.appendChild(toggle);
```

### Skeleton Loading Pattern

```typescript
function showLoading(container: HTMLElement) {
  const skeleton = createCardSkeleton({ showImage: true });
  container.appendChild(skeleton);
  return () => container.removeChild(skeleton);
}

// Usage
const hideLoading = showLoading(container);
await fetchData();
hideLoading();
```

### Toast Notifications

```typescript
async function saveData(data: unknown) {
  try {
    await api.save(data);
    showSuccessToast('Data saved successfully');
  } catch (error) {
    showErrorToast('Failed to save data', {
      duration: 5000,
      action: {
        label: 'Retry',
        onClick: () => saveData(data),
      },
    });
  }
}
```

## TypeScript Types

All types are exported and can be imported:

```typescript
import type {
  // Badge
  BadgeProps,
  BadgeSize,
  BadgeStyle,
  BadgeVariant,
  // Button
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  // Theme
  PrimaryColor,
  Theme,
  ThemeMode,
  // And more...
} from '@esolia/marquis';
```

## Integration Examples

### With Svelte

```svelte
<script>
  import { getButtonClasses, getCardClasses } from '@esolia/marquis';

  let loading = false;
  const buttonClasses = getButtonClasses({ variant: 'primary', loading });
</script>

<button class={buttonClasses}>Submit</button>
```

### With vanilla HTML/JS

```html
<script type="module">
  import { createButton, createToast, getToastCSS } from '@esolia/marquis';

  // Add CSS
  document.head.insertAdjacentHTML('beforeend', `<style>${getToastCSS()}</style>`);

  // Create button
  const btn = createButton('Click me', {
    variant: 'primary',
    themeColor: 'violet',
  });
  btn.addEventListener('click', () => showSuccessToast('Clicked!'));
  document.body.appendChild(btn);
</script>
```

## Version Information

- **Current Version**: Uses Tailwind CSS v3/v4 compatible classes
- **Dark Mode**: Supports Tailwind's `dark:` variant
- **Icons**: Uses Phosphor Icons (`<i class="ph ph-*">`)
- **TypeScript**: Full type definitions included
