# Marquis — Claude Code Guide

## Purpose of This Document

This guide provides context for Claude Code when working with **Marquis**, eSolia's UI component
library. It explains the **why** behind design decisions, not just the **what**. When making changes
or additions to this library, refer to this document to maintain consistency and intent.

_The name "Marquis" evokes "marquee" (prominent display) and "marque" (brand mark) — fitting for a
library focused on visual presentation and brand consistency._

## Project Context

### What This Library Is

A vanilla TypeScript component library for eSolia's internal applications, designed to:

1. **Provide visual polish** comparable to framework-based UI libraries (like Bits UI for Svelte)
   without requiring a framework
2. **Work directly with Deno Deploy** and vanilla TypeScript — no build step, no framework overhead
3. **Establish eSolia's corporate visual identity** as reusable, composable pieces
4. **Bridge the quality gap** between quick vanilla implementations and polished SaaS-quality
   interfaces

### What This Library Is Not

- Not a general-purpose open-source UI library
- Not framework-specific (no React, Svelte, Vue dependencies)
- Not a CSS framework replacement — it builds _on top of_ Tailwind CSS
- Not trying to replicate every component imaginable — focused on what eSolia actually needs

### The Problem We're Solving

eSolia maintains two application stacks:

| Application  | Stack                 | UI Approach          | Deployment  |
| ------------ | --------------------- | -------------------- | ----------- |
| **Pulse**    | SvelteKit + Bits UI   | Framework components | Cloudflare  |
| **Periodic** | Vanilla TS + Tailwind | Hand-rolled          | Deno Deploy |

Pulse benefits from Bits UI's pre-composed, polished components. Periodic, while functional, lacks
that same visual cohesion. This library brings Periodic (and future Deno Deploy apps) up to the same
quality standard.

**Visual reference:** Compare the "Control Reference Library" page in Pulse (tabs with counts,
refined badges, balanced table layout) to Periodic's "All DNS Checks" page. Both are functional, but
Pulse has a "SaaS product" feel that comes from consistent component design.

## Design Philosophy

### Core Principles

**1. Refinement Over Features**

A small set of well-crafted components beats a large set of mediocre ones. Each component should
feel _finished_ — not like a starting point that needs customization.

**2. Tailwind-Native**

Components output Tailwind utility classes, not custom CSS. This keeps the styling system unified
and allows easy customization through Tailwind's configuration.

**3. Composition Over Configuration**

Prefer simple, single-purpose components that compose together rather than complex components with
many options. A `Badge` is just a badge — it doesn't try to be a button, link, or notification.

**4. Semantic Variants**

Component variants map to meaning, not appearance. Use `variant="success"` rather than
`variant="green"`. This allows the color palette to evolve without changing component usage.

**5. Accessible by Default**

Components include appropriate ARIA attributes, keyboard handling, and focus states. Accessibility
is not an afterthought.

### Visual Identity

**Typography:** IBM Plex Sans JP — chosen for consistent glyph rendering across English and Japanese
content. This is non-negotiable for eSolia's bilingual context.

**Color Palette:** Subtle, professional tones. Avoid high-saturation colors except for intentional
emphasis (alerts, critical badges). The palette uses Tailwind's slate/gray scale as a foundation
with carefully chosen accent colors.

**Spacing:** Generous but not wasteful. Components should "breathe" without feeling sparse. Use
Tailwind's spacing scale consistently (avoid arbitrary values).

**Borders & Shadows:** Subtle depth cues. Prefer `shadow-sm` and light borders over heavy drop
shadows. Cards and containers should feel elevated without floating.

**Transitions:** 150ms ease-in-out as the default. Interactions should feel responsive but not
jarring.

## Architecture

### File Structure

```
/components
  /ui                 # Core UI primitives
    badge.ts          # Status/label badges
    button.ts         # Button variants
    icon-button.ts    # Square icon action buttons
    card.ts           # Container cards
    stat-card.ts      # Dashboard statistic display
  /data               # Data display components
    table.ts          # Table styling utilities
    table-header.ts   # Table header row
    table-row.ts      # Table body row
  /navigation         # Navigation components
    tabs.ts           # Tab groups
    tab-item.ts       # Individual tab
  /forms              # Form components
    select.ts         # Dropdown select
    search-input.ts   # Search field with icon
    filter-bar.ts     # Filter container
  /feedback           # User feedback
    dialog.ts         # Modal dialog
    toast.ts          # Toast notifications
  /tokens             # Design tokens
    colors.ts         # Color definitions
    spacing.ts        # Spacing scale
    typography.ts     # Type scale
  /utils              # Utilities
    cn.ts             # Class name merging
    create-element.ts # DOM helper

/styles
  base.css            # Base Tailwind imports + custom properties

/docs
  CLAUDE-GUIDE.md     # This document
  USAGE.md            # Usage examples
  CHANGELOG.md        # Version history
```

### Component Pattern

Each component follows this pattern:

```typescript
// badge.ts
import { cn } from '../utils/cn.ts';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'draft';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  class?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700 ring-slate-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  // ... etc
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-sm',
};

export function getBadgeClasses(props: BadgeProps = {}): string {
  const { variant = 'default', size = 'md', class: className } = props;

  return cn(
    // Base styles
    'inline-flex items-center font-medium rounded-full ring-1 ring-inset',
    // Variant
    variantStyles[variant],
    // Size
    sizeStyles[size],
    // Custom overrides
    className,
  );
}

// Optional: DOM element creator for vanilla JS usage
export function createBadge(text: string, props: BadgeProps = {}): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = getBadgeClasses(props);
  span.textContent = text;
  return span;
}
```

**Key aspects:**

1. **Type exports** — TypeScript interfaces for props, variant unions for type safety
2. **Class getter function** — Returns class string for use in templates (Vento, etc.)
3. **Optional DOM creator** — For vanilla JS usage where you're building DOM imperatively
4. **cn() utility** — Merges class names, handles conflicts (uses clsx + tailwind-merge pattern)

### Integration Patterns

**With Vento templates (.vto files):**

```vento
{{ import { getBadgeClasses } from '/components/ui/badge.ts' }}

<span class="{{ getBadgeClasses({ variant: 'success' }) }}">
  {{ status }}
</span>
```

**With vanilla TypeScript:**

```typescript
import { createBadge } from './components/ui/badge.ts';

const badge = createBadge('OK', { variant: 'success' });
container.appendChild(badge);
```

**With server-rendered HTML (Deno):**

```typescript
import { getBadgeClasses } from './components/ui/badge.ts';

const html = `<span class="${getBadgeClasses({ variant: 'success' })}">${status}</span>`;
```

## Component Specifications

### Badge

**Purpose:** Display status, category, or label information in a compact, visually distinct format.

**Variants:**

- `default` — Neutral, for general labels
- `success` — Positive status (OK, Active, Complete)
- `warning` — Caution status (Pending, Review)
- `error` — Negative status (Failed, Error, Disabled)
- `info` — Informational (Note, Info)
- `draft` — Work-in-progress indicator

**Sizes:**

- `sm` — Compact, for dense tables
- `md` — Default, for most uses
- `lg` — Emphasized, for page headers

**Visual notes:**

- Fully rounded (pill shape)
- Subtle ring border (ring-1 ring-inset) for definition without heaviness
- Muted background colors, stronger text colors
- No hover states (badges are display-only)

### Button

**Purpose:** Trigger actions. The primary interactive element.

**Variants:**

- `primary` — Main call-to-action (blue)
- `secondary` — Secondary actions (slate/gray)
- `ghost` — Minimal, for toolbars and less prominent actions
- `danger` — Destructive actions (red)
- `success` — Positive confirmation actions (green)

**Sizes:**

- `sm` — Compact, for inline or toolbar use
- `md` — Default
- `lg` — Prominent CTAs

**States:**

- Default, hover, focus, active, disabled
- Focus ring visible for keyboard navigation

**Visual notes:**

- Rounded corners (rounded-md, not fully rounded like badges)
- Subtle shadow on primary/secondary
- Transition on hover (150ms)
- Disabled state reduces opacity

### Icon Button

**Purpose:** Action buttons containing only an icon (view, edit, delete row actions).

**Variants:** Same semantic variants as Button

**Sizes:**

- `sm` — 1.75rem square
- `md` — 2rem square
- `lg` — 2.5rem square

**Visual notes:**

- Square aspect ratio
- Icons should be 1rem (16px) for md size
- Subtle hover lift effect (translateY -1px + shadow)
- Group together with small gap (0.375rem)

### Card

**Purpose:** Container for grouped content.

**Variants:**

- `default` — White background, subtle border and shadow
- `elevated` — Stronger shadow for more prominence
- `outline` — Border only, no shadow
- `ghost` — No border or shadow, just padding

**Visual notes:**

- Rounded corners (rounded-lg)
- Consistent padding (p-6 default)
- Optional header/footer sections with dividers

### Stat Card

**Purpose:** Display a key metric with label.

**Props:**

- `value` — The number/metric (large, prominent)
- `label` — Description (smaller, muted)
- `variant` — Optional color coding (success, warning, error)
- `icon` — Optional icon

**Visual notes:**

- Value is large and bold (text-3xl or text-4xl, font-semibold)
- Label is smaller and muted (text-sm, text-slate-500)
- Optional subtle gradient background for color variants
- Centered layout by default

### Table Components

**Table Header:**

- Subtle background (slate-50)
- Uppercase, small, tracked text for column labels
- Strong bottom border

**Table Row:**

- Hover state (subtle background change)
- Consistent cell padding
- Bottom border (except last row)

**Visual notes:**

- Avoid zebra striping (dated pattern)
- Use hover for row identification instead
- Action buttons right-aligned in last column

### Tabs

**Purpose:** Switch between views/sections.

**Props:**

- `items` — Array of tab definitions
- `activeId` — Currently active tab
- `variant` — Visual style ('underline' | 'pills' | 'buttons')

**Tab Item Props:**

- `id` — Unique identifier
- `label` — Display text
- `count` — Optional count badge
- `icon` — Optional leading icon
- `disabled` — Disabled state

**Visual notes:**

- Active tab clearly distinguished (color, underline, or background)
- Counts displayed as small badges within tab
- Keyboard navigation (arrow keys, Enter/Space to activate)
- Clear focus states

### Filter Bar

**Purpose:** Container for filter controls (dropdowns, search, buttons).

**Visual notes:**

- Subtle background (slate-50)
- Rounded container
- Consistent internal spacing
- Items aligned with gap

## Color System

### Semantic Colors

```typescript
export const colors = {
  // Status
  success: {
    bg: 'bg-emerald-50',
    bgStrong: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    ring: 'ring-emerald-200',
  },
  warning: {
    bg: 'bg-amber-50',
    bgStrong: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
    ring: 'ring-amber-200',
  },
  error: {
    bg: 'bg-red-50',
    bgStrong: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
    ring: 'ring-red-200',
  },
  info: {
    bg: 'bg-blue-50',
    bgStrong: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    ring: 'ring-blue-200',
  },

  // UI
  neutral: {
    bg: 'bg-slate-50',
    bgStrong: 'bg-slate-100',
    text: 'text-slate-700',
    textMuted: 'text-slate-500',
    border: 'border-slate-200',
    ring: 'ring-slate-200',
  },

  // Interactive
  primary: {
    bg: 'bg-blue-600',
    bgHover: 'hover:bg-blue-700',
    text: 'text-white',
    border: 'border-blue-600',
  },
};
```

### Usage Guidelines

- Use semantic names (`success`, `error`) not color names (`green`, `red`)
- Backgrounds are subtle (50 weight), text is strong (700 weight)
- Rings/borders use mid-weight (200) for subtle definition
- Primary actions use 600 weight with white text

## When Extending This Library

### Adding a New Component

1. **Check if it's needed** — Can existing components compose to achieve the goal?
2. **Define the purpose** — What problem does this component solve? Document it.
3. **Identify variants** — What semantic variations exist? (Not color variations)
4. **Consider states** — Hover, focus, active, disabled, loading?
5. **Write the types first** — Props interface and variant unions
6. **Implement class getter** — The core function that returns Tailwind classes
7. **Add DOM creator if useful** — For vanilla JS scenarios
8. **Document in this guide** — Add a specification section
9. **Add usage examples** — Update USAGE.md

### Modifying Existing Components

1. **Understand the original intent** — Read the specification in this guide
2. **Preserve backward compatibility** — Don't change existing variant behavior
3. **Add, don't replace** — New variants rather than changing existing ones
4. **Update documentation** — Keep this guide in sync

### Style Decisions

When making visual decisions, prefer:

- **Subtlety over boldness** — Professional tools should feel calm
- **Consistency over novelty** — Match existing patterns
- **Tailwind defaults** — Use standard Tailwind classes where possible
- **Semantic meaning** — Variants tied to meaning, not appearance

## Testing Components

### Visual Testing

For any component changes:

1. Render all variants side-by-side
2. Check light and dark backgrounds
3. Verify hover/focus states
4. Test in both English and Japanese content contexts
5. Check responsive behavior

### Accessibility Testing

- Tab navigation reaches all interactive elements
- Focus states are visible
- ARIA attributes are correct
- Color contrast meets WCAG AA

## Questions for Humans

If you (Claude Code) encounter ambiguity, ask the human about:

1. **Intent** — "What problem is this solving?"
2. **Priority** — "Is this for Periodic specifically or all eSolia apps?"
3. **Variants** — "What states/variations does this need?"
4. **Existing patterns** — "Should this match how X works in Pulse?"

## Version History

| Version | Date    | Changes                                                                            |
| ------- | ------- | ---------------------------------------------------------------------------------- |
| 0.1.0   | 2024-11 | Initial component set: Badge, Button, IconButton, Card, StatCard, Table components |

---

_This document should evolve with the library. When patterns change or new insights emerge, update
this guide._
