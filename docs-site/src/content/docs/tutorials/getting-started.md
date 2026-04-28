---
title: "Marquis Usage Guide"
---

Practical examples for using Marquis, eSolia's UI component library.

## Quick Start

### Installation

Clone or copy the `marquis` repository to your project, or import directly from GitHub.

```typescript
// In deno.json (recommended: pin to version)
{
  "imports": {
    "@esolia/marquis": "https://raw.githubusercontent.com/esolia/marquis/v0.3.2/mod.ts"
  }
}
```

### Basic Import

```typescript
// Import specific functions
import { createBadge, getBadgeClasses } from '@esolia/marquis';

// Or import with namespace
import { Badge, Button, Table } from '@esolia/marquis';
```

## Component Examples

### Badges

**In Templates (Vento/HTML):**

```html
<!-- Status badges -->
<span class="{{ getBadgeClasses({ variant: 'success' }) }}">OK</span>
<span class="{{ getBadgeClasses({ variant: 'error' }) }}">Failed</span>
<span class="{{ getBadgeClasses({ variant: 'warning' }) }}">Pending</span>

<!-- With size variants -->
<span class="{{ getBadgeClasses({ variant: 'info', size: 'sm' }) }}">New</span>
<span class="{{ getBadgeClasses({ variant: 'draft', size: 'lg' }) }}">Draft</span>
```

**In TypeScript:**

```typescript
import { createBadge, createBadges } from './esolia-ui/ui/badge.ts';

// Single badge
const statusBadge = createBadge('Active', { variant: 'success' });
document.querySelector('.status').appendChild(statusBadge);

// Multiple badges
const tags = createBadges([
  ['Production', 'success'],
  ['Featured', 'info'],
  ['Beta', 'draft'],
]);
document.querySelector('.tags').appendChild(tags);
```

### Buttons

**In Templates:**

```html
<!-- Primary action -->
<button class="{{ getButtonClasses({ variant: 'primary' }) }}">
  Save Changes
</button>

<!-- Secondary -->
<button class="{{ getButtonClasses({ variant: 'secondary' }) }}">
  Cancel
</button>

<!-- Danger with custom class -->
<button class="{{ getButtonClasses({ variant: 'danger', size: 'sm', class: 'ml-2' }) }}">
  Delete
</button>

<!-- Full width -->
<button class="{{ getButtonClasses({ variant: 'primary', fullWidth: true }) }}">
  Submit Application
</button>
```

**In TypeScript:**

```typescript
import { createButton, createButtonGroup } from './esolia-ui/ui/button.ts';

// With click handler
const saveBtn = createButton('Save', {
  variant: 'primary',
  onClick: () => handleSave(),
});

// Button group
const actions = createButtonGroup([
  createButton('Cancel', { variant: 'secondary' }),
  createButton('Save', { variant: 'primary' }),
]);
```

### Icon Buttons (Action Buttons)

**For table row actions:**

```typescript
import { createActionGroup, icons } from './esolia-ui/ui/icon-button.ts';

// Create view/edit/delete action group
const actions = createActionGroup([
  {
    icon: icons.eye,
    variant: 'info',
    title: 'View details',
    onClick: () => viewItem(id),
  },
  {
    icon: icons.pencil,
    variant: 'warning',
    title: 'Edit',
    onClick: () => editItem(id),
  },
  {
    icon: icons.trash,
    variant: 'danger',
    title: 'Delete',
    onClick: () => confirmDelete(id),
  },
]);

row.querySelector('.actions-cell').appendChild(actions);
```

**In Templates:**

```html
<div class="inline-flex items-center gap-1.5">
  <button
    class="{{ getIconButtonClasses({ variant: 'info' }) }}"
    title="View"
    aria-label="View details"
  >
    {{ icons.eye |> safe }}
  </button>
  <button
    class="{{ getIconButtonClasses({ variant: 'warning' }) }}"
    title="Edit"
  >
    {{ icons.pencil |> safe }}
  </button>
  <button
    class="{{ getIconButtonClasses({ variant: 'danger' }) }}"
    title="Delete"
  >
    {{ icons.trash |> safe }}
  </button>
</div>
```

### Stat Cards

**Dashboard stats row:**

```typescript
import { createStatCardRow } from './esolia-ui/ui/card.ts';

const stats = createStatCardRow([
  { value: 6, label: 'Total Checks' },
  { value: 6, label: 'Healthy', variant: 'success' },
  { value: 0, label: 'Alerts', variant: 'error' },
]);

document.querySelector('.dashboard-stats').appendChild(stats);
```

**In Templates:**

```html
<div class="grid grid-cols-3 gap-6">
  <!-- Neutral stat -->
  <div class="{{ getStatCardClasses() }}">
    <div class="{{ getStatCardValueClasses() }}">{{ totalChecks }}</div>
    <div class="{{ getStatCardLabelClasses() }}">Total Checks</div>
  </div>

  <!-- Success stat -->
  <div class="{{ getStatCardClasses('success') }}">
    <div class="{{ getStatCardValueClasses('success') }}">{{ healthyCount }}</div>
    <div class="{{ getStatCardLabelClasses() }}">Healthy</div>
  </div>

  <!-- Error stat -->
  <div class="{{ getStatCardClasses('error') }}">
    <div class="{{ getStatCardValueClasses('error') }}">{{ alertCount }}</div>
    <div class="{{ getStatCardLabelClasses() }}">Alerts</div>
  </div>
</div>
```

### Tables

**Complete table example:**

```html
{{ set classes = getTableClassSet({ hoverable: true }) }}

<div class="{{ classes.wrapper }}">
  <table class="{{ classes.table }}">
    <thead class="{{ classes.header }}">
      <tr>
        <th class="{{ classes.headerCell }}">Domain</th>
        <th class="{{ classes.headerCell }}">Type</th>
        <th class="{{ classes.headerCell }}">Status</th>
        <th class="{{ classes.headerCell }}">Last Check</th>
        <th class="{{ classes.headerCellRight }}">Actions</th>
      </tr>
    </thead>
    <tbody class="{{ classes.body }}">
      {{ for check in checks }}
      <tr class="{{ classes.row }}">
        <td class="{{ classes.cellPrimary }}">{{ check.domain }}</td>
        <td class="{{ classes.cell }}">
          <span class="{{ getBadgeClasses({ variant: 'info', size: 'sm' }) }}">
            {{ check.type }}
          </span>
        </td>
        <td class="{{ classes.cell }}">
          <span
            class="{{ getBadgeClasses({ variant: check.status === 'OK' ? 'success' : 'error' }) }}"
          >
            {{ check.status }}
          </span>
        </td>
        <td class="{{ classes.cellMuted }}">{{ check.lastCheck }}</td>
        <td class="{{ classes.cellRight }}">
          <!-- Action buttons here -->
        </td>
      </tr>
      {{ /for }}
    </tbody>
  </table>
</div>
```

### Tabs

**In Templates:**

```html
<div class="{{ getTabsContainerClasses() }}">
  <button class="{{ getTabClasses({ active: activeTab === 'systems' }) }}">
    <span>Systems</span>
    <span class="{{ getTabCountClasses({ active: activeTab === 'systems' }) }}">5</span>
  </button>
  <button class="{{ getTabClasses({ active: activeTab === 'frameworks' }) }}">
    <span>Frameworks</span>
    <span class="{{ getTabCountClasses({ active: activeTab === 'frameworks' }) }}">2</span>
  </button>
</div>
```

**In TypeScript:**

```typescript
import { createTabs } from './esolia-ui/ui/tabs.ts';

const tabs = createTabs({
  items: [
    { id: 'systems', label: 'Systems', count: 5 },
    { id: 'frameworks', label: 'Frameworks', count: 2 },
    { id: 'netlify', label: 'Netlify', count: 6, draft: true },
    { id: 'deno', label: 'Deno Deploy', count: 6, draft: true },
  ],
  activeId: 'systems',
  variant: 'underline',
  onTabChange: (id) => {
    setActiveTab(id);
    loadTabContent(id);
  },
});

document.querySelector('.tab-container').appendChild(tabs);
```

**Pill variant:**

```typescript
const pillTabs = createTabs({
  items: [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'archived', label: 'Archived' },
  ],
  activeId: 'all',
  variant: 'pills',
  onTabChange: handleFilter,
});
```

### Filter Bar

**Client filter with clear button:**

```html
<div class="{{ getFilterBarClasses({ align: 'right' }) }}">
  <label class="{{ getFilterLabelClasses() }}">Client:</label>
  <select class="{{ getFilterSelectClasses() }}">
    <option value="">All Clients</option>
    {{ for client in clients }}
    <option value="{{ client.id }}">{{ client.name }}</option>
    {{ /for }}
  </select>
  <button class="{{ getFilterButtonClasses() }}">Clear</button>
</div>
```

**Search with filters:**

```typescript
import {
  createFilterSearch,
  createFilterSelect,
  getFilterBarClasses,
  getFilterButtonClasses,
  getFilterLabelClasses,
} from './esolia-ui/ui/filter-bar.ts';

// Container
const filterBar = document.createElement('div');
filterBar.className = getFilterBarClasses({ variant: 'subtle' });

// Search
const search = createFilterSearch({
  placeholder: 'Search controls...',
  width: 'md',
  onInput: (value) => filterBySearch(value),
});

// Category select
const categorySelect = createFilterSelect({
  options: [
    { value: '', label: 'All Categories' },
    { value: 'identity', label: 'Identity' },
    { value: 'data', label: 'Data Protection' },
    { value: 'network', label: 'Network' },
  ],
  onChange: (value) => filterByCategory(value),
});

// Assemble
filterBar.appendChild(search);
filterBar.appendChild(categorySelect);
```

### Alerts

**In Templates:**

```html
<!-- Info alert -->
<div class="{{ getAlertClasses({ variant: 'info' }) }}">
  <div class="{{ getAlertContentClasses() }}">
    Your session will expire in 5 minutes.
  </div>
</div>

<!-- Success alert with title -->
<div class="{{ getAlertClasses({ variant: 'success' }) }}">
  <div class="{{ getAlertTitleClasses() }}">Success!</div>
  <div class="{{ getAlertContentClasses() }}">
    Your changes have been saved.
  </div>
</div>

<!-- Dismissible error alert -->
<div class="{{ getAlertClasses({ variant: 'error', dismissible: true }) }}">
  <div class="{{ getAlertContentClasses() }}">
    Failed to connect to server.
  </div>
  <button class="{{ getAlertDismissClasses() }}" aria-label="Dismiss">×</button>
</div>
```

**In TypeScript:**

```typescript
import {
  createAlert,
  createErrorAlert,
  createInfoAlert,
  createSuccessAlert,
  createWarningAlert,
} from '@esolia/marquis';

// Simple alert
const alert = createAlert('Operation completed', { variant: 'success' });

// Convenience functions
const success = createSuccessAlert('Changes saved!');
const error = createErrorAlert('Connection failed', { title: 'Error' });
const info = createInfoAlert('New version available');
const warning = createWarningAlert('Disk space low');

document.querySelector('.alerts').appendChild(success);
```

### Dropdown Menus

Dropdowns are CSS-only (no JavaScript required for basic functionality).

**In Templates:**

```html
<!-- Add CSS (once per page) -->
<style>${getDropdownCSS()}</style>

<!-- User dropdown in header -->
<div class="{{ getDropdownClasses({ variant: 'header', align: 'right' }) }}">
  <button class="{{ getDropdownTriggerClasses() }}">
    <span>John Doe</span>
    <svg><!-- chevron icon --></svg>
  </button>
  <div class="{{ getDropdownMenuClasses() }}">
    <a href="/profile" class="{{ getDropdownItemClasses() }}">Profile</a>
    <a href="/settings" class="{{ getDropdownItemClasses() }}">Settings</a>
    <div class="{{ getDropdownDividerClasses() }}"></div>
    <a href="/logout" class="{{ getDropdownItemClasses({ variant: 'danger' }) }}">Logout</a>
  </div>
</div>
```

**In TypeScript:**

```typescript
import { createDropdown, createUserDropdown, getDropdownCSS } from '@esolia/marquis';

// Add CSS to page
document.head.insertAdjacentHTML('beforeend', `<style>${getDropdownCSS()}</style>`);

// Create a dropdown menu
const dropdown = createDropdown({
  trigger: '<span>Actions</span>',
  items: [
    { label: 'Edit', href: '/edit' },
    { label: 'Duplicate', href: '/duplicate' },
    { divider: true },
    { label: 'Delete', variant: 'danger', onclick: 'confirmDelete()' },
  ],
  align: 'right',
});

// User dropdown (convenience function)
const userDropdown = createUserDropdown({
  userName: 'John Doe',
  userEmail: 'john@example.com',
  items: [
    { label: 'Profile', href: '/profile', icon: '<i class="ph ph-user"></i>' },
    { label: 'Settings', href: '/settings', icon: '<i class="ph ph-gear"></i>' },
    { divider: true },
    { label: 'Logout', href: '/logout', variant: 'danger' },
  ],
});
```

### Application Header

**In Templates:**

```html
<!-- Add CSS (once per page) -->
<style>${getHeaderCSS()}</style>

<header class="{{ getHeaderClasses() }}">
  <!-- Logo -->
  <div class="logo">
    ${logoSymbol}
  </div>

  <!-- Navigation -->
  <nav class="flex items-center gap-6">
    <a href="/dashboard" class="{{ getNavLinkClasses({ active: true }) }}">Dashboard</a>
    <a href="/reports" class="{{ getNavLinkClasses() }}">Reports</a>
    <a href="/settings" class="{{ getNavLinkClasses() }}">Settings</a>
  </nav>

  <!-- Right side: language switcher + user menu -->
  <div class="flex items-center gap-4">
    <button class="{{ getLanguageButtonClasses({ active: lang === 'en' }) }}">EN</button>
    <button class="{{ getLanguageButtonClasses({ active: lang === 'ja' }) }}">日本語</button>
    <!-- User dropdown here -->
  </div>
</header>
```

**In TypeScript:**

```typescript
import { createHeader, getHeaderCSS } from '@esolia/marquis';

// Add CSS
document.head.insertAdjacentHTML('beforeend', `<style>${getHeaderCSS()}</style>`);

// Create complete header
const header = createHeader({
  logo: {
    svg: logoSymbol,
    href: '/',
    alt: 'eSolia',
  },
  navLinks: [
    { label: 'Dashboard', href: '/dashboard', active: true },
    { label: 'Reports', href: '/reports' },
    { label: 'Settings', href: '/settings' },
  ],
  language: {
    current: 'en',
    options: [
      { code: 'en', label: 'EN' },
      { code: 'ja', label: '日本語' },
    ],
    onChange: (code) => switchLanguage(code),
  },
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    menuItems: [
      { label: 'Profile', href: '/profile' },
      { label: 'Logout', href: '/logout', variant: 'danger' },
    ],
  },
});

document.body.prepend(header);
```

### Code and Keyboard Shortcuts

**Inline Code:**

```html
<p>
  Run <code class="{{ getCodeClasses() }}">deno task dev</code> to start the server.
</p>

<!-- With variant -->
<code class="{{ getCodeClasses({ variant: 'info' }) }}">GET /api/users</code>
```

**Code Blocks:**

```html
<pre
  class="{{ getCodeBlockClasses() }}"
>
<code>const greeting = "Hello, World!";
console.log(greeting);</code></pre>
```

**Keyboard Shortcuts (kbd):**

```html
<p>
  Press <kbd class="{{ getKbdClasses() }}">⌘</kbd> +
  <kbd class="{{ getKbdClasses() }}">S</kbd> to save.
</p>
```

**In TypeScript:**

```typescript
import { createCode, createCodeBlock, createKbd, createShortcut } from '@esolia/marquis';

// Inline code
const code = createCode('npm install');

// Code block
const codeBlock = createCodeBlock(`function greet(name) {
  return \`Hello, \${name}!\`;
}`);

// Keyboard key
const cmdKey = createKbd('⌘');

// Keyboard shortcut (multiple keys)
const shortcut = createShortcut(['⌘', 'Shift', 'P']);
```

### Loading Spinners

**In Templates:**

```html
<!-- Add CSS (once per page) -->
<style>${getSpinnerCSS()}</style>

<!-- Basic spinner -->
<div class="{{ getSpinnerClasses() }}">
  <svg class="{{ getSpinIconClasses() }}"><!-- spinner svg --></svg>
</div>

<!-- With label -->
<div class="flex items-center gap-2">
  <div class="{{ getSpinnerClasses({ size: 'sm' }) }}">
    <svg class="{{ getSpinIconClasses() }}"><!-- spinner svg --></svg>
  </div>
  <span>Loading...</span>
</div>

<!-- Different sizes -->
<div class="{{ getSpinnerClasses({ size: 'xs' }) }}">...</div>
<div class="{{ getSpinnerClasses({ size: 'sm' }) }}">...</div>
<div class="{{ getSpinnerClasses({ size: 'md' }) }}">...</div>
<div class="{{ getSpinnerClasses({ size: 'lg' }) }}">...</div>
<div class="{{ getSpinnerClasses({ size: 'xl' }) }}">...</div>
```

**In TypeScript:**

```typescript
import {
  createButtonLoading,
  createLoadingOverlay,
  createSpinner,
  createSpinnerWithLabel,
  getSpinnerCSS,
} from '@esolia/marquis';

// Add CSS
document.head.insertAdjacentHTML('beforeend', `<style>${getSpinnerCSS()}</style>`);

// Basic spinner
const spinner = createSpinner({ size: 'md', variant: 'primary' });

// Spinner with label
const loadingIndicator = createSpinnerWithLabel('Loading data...', { size: 'sm' });

// Button with loading state
const loadingButton = createButtonLoading('Saving...', { variant: 'primary' });

// Full-page loading overlay
const overlay = createLoadingOverlay('Please wait...');
document.body.appendChild(overlay);
// Remove when done: overlay.remove();
```

**Spinner Variants:**

- `default` - Slate/gray
- `primary` - Blue
- `success` - Emerald
- `warning` - Amber
- `error` - Red

**Speed Options:**

```typescript
createSpinner({ speed: 'slow' }); // 1.5s rotation
createSpinner({ speed: 'normal' }); // 1s rotation (default)
createSpinner({ speed: 'fast' }); // 0.5s rotation
```

## Combining Components

### Complete Page Section

```html
<!-- Page header -->
<div class="mb-8">
  <h1 class="text-2xl font-semibold text-slate-900">All DNS Checks</h1>
</div>

<!-- Stats row -->
<div class="grid grid-cols-3 gap-6 mb-8">
  <div class="{{ getStatCardClasses() }}">
    <div class="{{ getStatCardValueClasses() }}">{{ stats.total }}</div>
    <div class="{{ getStatCardLabelClasses() }}">Total Checks</div>
  </div>
  <div class="{{ getStatCardClasses('success') }}">
    <div class="{{ getStatCardValueClasses('success') }}">{{ stats.healthy }}</div>
    <div class="{{ getStatCardLabelClasses() }}">Healthy</div>
  </div>
  <div class="{{ getStatCardClasses('error') }}">
    <div class="{{ getStatCardValueClasses('error') }}">{{ stats.alerts }}</div>
    <div class="{{ getStatCardLabelClasses() }}">Alerts</div>
  </div>
</div>

<!-- Section with filter and table -->
<div class="{{ getCardClasses({ padding: 'none' }) }}">
  <!-- Section header with filter -->
  <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
    <h2 class="text-lg font-medium text-slate-900">DNS Checks</h2>
    <div class="{{ getFilterBarClasses() }}">
      <label class="{{ getFilterLabelClasses() }}">Client:</label>
      <select class="{{ getFilterSelectClasses() }}">
        <option>All Clients</option>
      </select>
      <button class="{{ getFilterButtonClasses() }}">Clear</button>
    </div>
  </div>

  <!-- Table -->
  {{ set tc = getTableClassSet() }}
  <table class="{{ tc.table }}">
    <!-- ... table content ... -->
  </table>
</div>
```

## TypeScript Tips

### Type-Safe Variants

```typescript
import type { BadgeVariant, ButtonVariant } from './esolia-ui/index.ts';

// Type-safe variant mapping
const statusToBadge: Record<string, BadgeVariant> = {
  'OK': 'success',
  'WARN': 'warning',
  'FAIL': 'error',
  'PENDING': 'info',
};

function renderStatus(status: string) {
  const variant = statusToBadge[status] || 'default';
  return createBadge(status, { variant });
}
```

### Extending Components

```typescript
import { type BadgeProps, getBadgeClasses } from './esolia-ui/ui/badge.ts';

// Custom badge with additional defaults
function getMyAppBadgeClasses(props: BadgeProps = {}): string {
  return getBadgeClasses({
    size: 'sm', // Default to small in my app
    ...props,
  });
}
```

## CSS Setup

Ensure your base CSS includes Tailwind and the font:

```css
/* styles.css */
@import 'tailwindcss';

@theme {
  --font-sans: 'IBM Plex Sans JP', ui-sans-serif, system-ui, sans-serif;
}

/* Optional: Ensure icon SVGs scale properly */
button svg,
span svg {
  width: 100%;
  height: 100%;
}
```

## Accessibility Notes

All components include:

- Proper focus states (visible focus rings)
- ARIA attributes where appropriate
- Keyboard navigation for interactive components
- Sufficient color contrast

When using components:

- Always provide `title` or `aria-label` for icon buttons
- Ensure tab panels have matching `aria-labelledby`
- Use semantic HTML (buttons for actions, anchors for navigation)

## Logos and Brand Assets

### SVG Logos

Marquis includes the official eSolia logos as inline SVG strings:

```typescript
import { brandColors, logoHorizontal, logoSymbol } from '@esolia/marquis';

// Inline SVG in HTML
const header = `<div class="logo">${logoSymbol}</div>`;

// As data URI for img src
import { getLogoDataUri } from '@esolia/marquis';
const imgSrc = getLogoDataUri('symbol'); // or 'horizontal', 'symbol-light', etc.
```

**Available Logo Variants:**

- `logoSymbol` - Dark blue symbol (for light backgrounds)
- `logoSymbolLight` - White symbol (for dark backgrounds)
- `logoHorizontal` - Full wordmark with "eSolia" text
- `logoHorizontalLight` - White wordmark for dark backgrounds

### Favicons

Marquis includes pre-generated PNG favicons in multiple color variants. Simply reference them from
your HTML `<head>`:

**Using the helper function (recommended):**

```typescript
import { getCompleteFaviconHtml, getFaviconHtml } from '@esolia/marquis';

// Generate all favicon link tags
const faviconLinks = getFaviconHtml('darkblue', '/assets/favicons');

// Or include theme-color meta tag too
const headTags = getCompleteFaviconHtml('darkblue', '/assets/favicons');
```

**In your HTML template:**

```html
<!DOCTYPE html>
<html>
<head>
  ${getCompleteFaviconHtml('darkblue', '/assets/favicons')}
  <title>My eSolia App</title>
</head>
```

**Available Favicon Variants:**

| Variant           | Description              | Best for               |
| ----------------- | ------------------------ | ---------------------- |
| `darkblue`        | Dark blue on transparent | Light themes (default) |
| `white`           | White on transparent     | Dark themes            |
| `darkblue-orange` | Dark blue on orange      | Accent/branded pages   |
| `darkblue-yellow` | Dark blue on soft yellow | Warm/friendly themes   |

**Referencing from GitHub (for quick setup):**

```typescript
const baseUrl = 'https://raw.githubusercontent.com/eSolia/marquis/v0.3.2/assets/favicons';
const html = getCompleteFaviconHtml('darkblue', baseUrl);
```

**Manual HTML (if not using helpers):**

Copy the favicon files from `assets/favicons/{variant}/` to your project, then:

```html
<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/favicon-180x180.png">
<link rel="manifest" href="/favicons/site.webmanifest">
<meta name="theme-color" content="#2D2F63">
```

### Getting Favicon Paths Programmatically

```typescript
import { type FaviconPaths, getFaviconPaths } from '@esolia/marquis';

const paths: FaviconPaths = getFaviconPaths('darkblue', '/assets/favicons');
// paths.favicon16, paths.favicon32, paths.appleTouchIcon, etc.
```
