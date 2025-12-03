# Marquis

**Marquis** — eSolia's UI component library. A vanilla TypeScript component library providing
polished, professional UI components that work with Tailwind CSS and require no framework.

_The name evokes "marquee" (prominent display) and "marque" (brand mark) — fitting for a library
focused on visual presentation and brand consistency._

## Features

- **Framework-agnostic**: Works with vanilla TypeScript, Deno, and any templating system
- **Tailwind-native**: Components output Tailwind utility classes
- **Two APIs**: Class getters for templates, DOM creators for imperative code
- **Type-safe**: Full TypeScript support with exported types
- **Accessible**: ARIA attributes, keyboard navigation, focus states
- **Brand Assets**: Official eSolia logos (SVG) and pre-generated favicons (PNG)

## Installation

### From GitHub (Pinned to Release)

```typescript
// In deno.json
{
  "imports": {
    "@esolia/marquis": "https://raw.githubusercontent.com/esolia/marquis/v0.3.1/mod.ts"
  }
}
```

Then import:

```typescript
import { Badge, Button, Table } from '@esolia/marquis';
```

### From GitHub (Latest)

```typescript
// In deno.json — use main branch (not recommended for production)
{
  "imports": {
    "@esolia/marquis": "https://raw.githubusercontent.com/esolia/marquis/main/mod.ts"
  }
}
```

### Local Copy

Copy the `marquis` directory to your project's `components/` folder.

## Quick Start

### In Templates (Vento, etc.)

```html
<!-- Badge -->
<span class="{{ Badge.getBadgeClasses({ variant: 'success' }) }}">
  Active
</span>

<!-- Button -->
<button class="{{ Button.getButtonClasses({ variant: 'primary' }) }}">
  Save Changes
</button>

<!-- Table -->
{{ set tc = Table.getTableClassSet() }}
<div class="{{ tc.wrapper }}">
  <table class="{{ tc.table }}">
    <thead class="{{ tc.header }}">
      <tr>
        <th class="{{ tc.headerCell }}">Name</th>
      </tr>
    </thead>
    <tbody class="{{ tc.body }}">
      <tr class="{{ tc.row }}">
        <td class="{{ tc.cell }}">Item</td>
      </tr>
    </tbody>
  </table>
</div>
```

### In TypeScript

```typescript
import { createActionGroup, createBadge, createButton, icons } from '@esolia/ui';

// Create elements
const badge = createBadge('OK', { variant: 'success' });
const button = createButton('Submit', { variant: 'primary', onClick: handleSubmit });

// Action button group for table rows
const actions = createActionGroup([
  { icon: icons.eye, variant: 'info', title: 'View', onClick: () => view(id) },
  { icon: icons.pencil, variant: 'warning', title: 'Edit', onClick: () => edit(id) },
  { icon: icons.trash, variant: 'danger', title: 'Delete', onClick: () => del(id) },
]);
```

## Components

| Component      | Description                                               |
| -------------- | --------------------------------------------------------- |
| **Badge**      | Status/label badges with semantic variants                |
| **Button**     | Buttons with primary, secondary, ghost, danger variants   |
| **IconButton** | Square icon buttons for row actions                       |
| **Card**       | Container cards with multiple styles                      |
| **StatCard**   | Dashboard metric display cards                            |
| **Table**      | Table styling utilities                                   |
| **Tabs**       | Tab groups with counts and icons                          |
| **FilterBar**  | Filter controls (select, search, buttons)                 |
| **Dropdown**   | CSS-only dropdown menus (no JavaScript required)          |
| **Alert**      | Contextual feedback messages (info/success/warning/error) |
| **Header**     | Application header with nav, language switcher, user menu |
| **Code**       | Inline code, code blocks, and keyboard shortcuts (kbd)    |
| **Spinner**    | Loading indicators with multiple sizes and variants       |
| **Progress**   | Progress bars (linear/circular) with determinate/indeterminate modes |
| **Toggle**     | Toggle switches with labels and descriptions              |
| **Skeleton**   | Loading placeholder animations for content                |
| **Avatar**     | User avatars with initials fallback and status indicators |
| **Toast**      | Non-intrusive notification messages with auto-dismiss     |

## Design Tokens

### Badge Variants

- `default` - Neutral (slate)
- `success` - Positive (emerald)
- `warning` - Caution (amber)
- `error` - Negative (red)
- `info` - Informational (blue)
- `draft` - Work-in-progress (orange)

### Button Variants

- `primary` - Main CTA (blue)
- `secondary` - Secondary actions (slate)
- `ghost` - Minimal, no background
- `outline` - Bordered, no fill
- `danger` - Destructive (red)
- `success` - Positive (green)

## Brand Assets

### Logos

```typescript
import { getLogoDataUri, logoHorizontal, logoSymbol } from '@esolia/marquis';

// Inline SVG
element.innerHTML = logoSymbol;

// As image src
img.src = getLogoDataUri('symbol'); // or 'horizontal', 'symbol-light', etc.
```

### Favicons

Pre-generated PNG favicons in 4 color variants (darkblue, white, darkblue-orange, darkblue-yellow):

```typescript
import { getCompleteFaviconHtml } from '@esolia/marquis';

// Generate all <head> tags for favicons
const headTags = getCompleteFaviconHtml('darkblue', '/assets/favicons');
```

Or reference directly from GitHub:

```html
<link
  rel="icon"
  href="https://raw.githubusercontent.com/eSolia/marquis/v0.3.1/assets/favicons/darkblue/favicon-32x32.png"
>
```

## Project Structure

```
marquis/
├── mod.ts              # Main entry point
├── index.ts            # All exports
├── deno.json           # Deno configuration
├── tokens/
│   └── colors.ts       # Color definitions
├── ui/
│   ├── alert.ts
│   ├── avatar.ts
│   ├── badge.ts
│   ├── button.ts
│   ├── card.ts
│   ├── code.ts
│   ├── dropdown.ts
│   ├── filter-bar.ts
│   ├── header.ts
│   ├── icon-button.ts
│   ├── progress.ts
│   ├── skeleton.ts
│   ├── spinner.ts
│   ├── table.ts
│   ├── tabs.ts
│   ├── toast.ts
│   └── toggle.ts
├── utils/
│   └── cn.ts           # Class name merging
├── assets/
│   ├── index.ts        # Logo exports (SVG strings)
│   ├── favicons.ts     # Favicon path helpers
│   ├── *.svg           # Original SVG logos
│   └── favicons/       # Pre-generated PNGs
│       ├── darkblue/
│       ├── white/
│       ├── darkblue-orange/
│       └── darkblue-yellow/
└── docs/
    ├── api/            # Generated API docs
    ├── USAGE.md
    └── CLAUDE-GUIDE.md
```

## Documentation

- [USAGE.md](./docs/USAGE.md) - Practical examples
- [CLAUDE-GUIDE.md](./docs/CLAUDE-GUIDE.md) - Context for Claude Code

## Requirements

- Tailwind CSS 3.x or 4.x
- Deno 1.x+ (or any TypeScript runtime)

## License

Private - eSolia Inc. internal use only.
