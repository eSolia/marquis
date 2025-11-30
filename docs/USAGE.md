# Marquis Usage Guide

Practical examples for using Marquis, eSolia's UI component library.

## Quick Start

### Installation

Clone or copy the `marquis` repository to your project, or import directly from GitHub.

```typescript
// In deno.json (recommended: pin to version)
{
  "imports": {
    "@esolia/marquis": "https://raw.githubusercontent.com/esolia/marquis/v0.1.0/mod.ts"
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
const baseUrl = 'https://raw.githubusercontent.com/eSolia/marquis/v0.1.0/assets/favicons';
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
