/**
 * Table Components
 *
 * Styling utilities and helpers for data tables.
 * Provides consistent header, row, and cell styling.
 *
 * @example
 * <table class="{{ getTableClasses() }}">
 *   <thead class="{{ getTableHeaderClasses() }}">
 *     <tr>
 *       <th class="{{ getTableHeaderCellClasses() }}">Name</th>
 *       <th class="{{ getTableHeaderCellClasses() }}">Status</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr class="{{ getTableRowClasses() }}">
 *       <td class="{{ getTableCellClasses() }}">Item 1</td>
 *       <td class="{{ getTableCellClasses() }}">Active</td>
 *     </tr>
 *   </tbody>
 * </table>
 */

import { cn } from '../utils/cn.ts';

// =============================================================================
// TABLE CONTAINER
// =============================================================================

export interface TableProps {
  /** Full width table */
  fullWidth?: boolean;
  /** Add outer border */
  bordered?: boolean;
  /** Compact cell padding */
  compact?: boolean;
  class?: string;
}

/**
 * Get classes for table element
 */
export function getTableClasses(props: TableProps = {}): string {
  const {
    fullWidth = true,
    bordered = false,
    compact = false,
    class: className,
  } = props;

  return cn(
    'min-w-full',
    'divide-y divide-slate-200',
    fullWidth && 'w-full',
    bordered && 'border border-slate-200 rounded-lg',
    compact && 'text-sm',
    className,
  );
}

// =============================================================================
// TABLE HEADER
// =============================================================================

export interface TableHeaderProps {
  /** Sticky header */
  sticky?: boolean;
  class?: string;
}

/**
 * Get classes for thead element
 */
export function getTableHeaderClasses(props: TableHeaderProps = {}): string {
  const { sticky = false, class: className } = props;

  return cn(
    'bg-slate-50',
    sticky && 'sticky top-0 z-10',
    className,
  );
}

/**
 * Get classes for th elements
 */
export function getTableHeaderCellClasses(props: {
  align?: 'left' | 'center' | 'right';
  class?: string;
} = {}): string {
  const { align = 'left', class: className } = props;

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return cn(
    'px-4 py-3',
    'text-xs font-semibold',
    'text-slate-500',
    'uppercase tracking-wider',
    alignStyles[align],
    className,
  );
}

// =============================================================================
// TABLE BODY
// =============================================================================

/**
 * Get classes for tbody element
 */
export function getTableBodyClasses(props: { class?: string } = {}): string {
  return cn(
    'bg-white',
    'divide-y divide-slate-100',
    props.class,
  );
}

// =============================================================================
// TABLE ROW
// =============================================================================

export interface TableRowProps {
  /** Enable hover highlighting */
  hoverable?: boolean;
  /** Selected state */
  selected?: boolean;
  /** Clickable row */
  clickable?: boolean;
  class?: string;
}

/**
 * Get classes for tr elements
 */
export function getTableRowClasses(props: TableRowProps = {}): string {
  const {
    hoverable = true,
    selected = false,
    clickable = false,
    class: className,
  } = props;

  return cn(
    'transition-colors duration-100',
    hoverable && 'hover:bg-slate-50',
    selected && 'bg-blue-50',
    clickable && 'cursor-pointer',
    className,
  );
}

// =============================================================================
// TABLE CELL
// =============================================================================

export interface TableCellProps {
  /** Cell alignment */
  align?: 'left' | 'center' | 'right';
  /** Truncate with ellipsis */
  truncate?: boolean;
  /** No wrap */
  nowrap?: boolean;
  /** Muted text color */
  muted?: boolean;
  /** Primary/emphasized cell */
  primary?: boolean;
  class?: string;
}

/**
 * Get classes for td elements
 */
export function getTableCellClasses(props: TableCellProps = {}): string {
  const {
    align = 'left',
    truncate = false,
    nowrap = false,
    muted = false,
    primary = false,
    class: className,
  } = props;

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return cn(
    'px-4 py-3',
    'text-sm',
    alignStyles[align],
    truncate && 'truncate max-w-xs',
    nowrap && 'whitespace-nowrap',
    muted && 'text-slate-500',
    primary && 'font-medium text-slate-900',
    !muted && !primary && 'text-slate-700',
    className,
  );
}

// =============================================================================
// COMPOSITE TABLE WRAPPER
// =============================================================================

export interface TableWrapperProps {
  /** Rounded corners with border */
  rounded?: boolean;
  /** Add shadow */
  shadow?: boolean;
  /** Horizontal scroll on overflow */
  scrollable?: boolean;
  class?: string;
}

/**
 * Get classes for a table wrapper/container
 *
 * Use this to wrap tables that need overflow handling or decoration
 */
export function getTableWrapperClasses(props: TableWrapperProps = {}): string {
  const {
    rounded = true,
    shadow = true,
    scrollable = true,
    class: className,
  } = props;

  return cn(
    'bg-white',
    rounded && 'rounded-lg',
    rounded && 'border border-slate-200',
    shadow && 'shadow-sm',
    scrollable && 'overflow-x-auto',
    className,
  );
}

// =============================================================================
// HELPER: Build complete table class set
// =============================================================================

/**
 * Get all table classes as an object for easy destructuring
 *
 * @example
 * const classes = getTableClassSet({ compact: true });
 *
 * <div class={classes.wrapper}>
 *   <table class={classes.table}>
 *     <thead class={classes.header}>
 *       <tr>
 *         <th class={classes.headerCell}>Col</th>
 *       </tr>
 *     </thead>
 *     <tbody class={classes.body}>
 *       <tr class={classes.row}>
 *         <td class={classes.cell}>Data</td>
 *       </tr>
 *     </tbody>
 *   </table>
 * </div>
 */
export function getTableClassSet(options: {
  compact?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
} = {}): {
  wrapper: string;
  table: string;
  header: string;
  headerCell: string;
  headerCellRight: string;
  body: string;
  row: string;
  cell: string;
  cellMuted: string;
  cellPrimary: string;
  cellRight: string;
} {
  const { compact = false, hoverable = true, bordered = true } = options;

  return {
    wrapper: getTableWrapperClasses({ rounded: bordered }),
    table: getTableClasses({ compact, bordered: false }),
    header: getTableHeaderClasses(),
    headerCell: getTableHeaderCellClasses(),
    headerCellRight: getTableHeaderCellClasses({ align: 'right' }),
    body: getTableBodyClasses(),
    row: getTableRowClasses({ hoverable }),
    cell: getTableCellClasses(),
    cellMuted: getTableCellClasses({ muted: true }),
    cellPrimary: getTableCellClasses({ primary: true }),
    cellRight: getTableCellClasses({ align: 'right' }),
  };
}

// =============================================================================
// DOM HELPERS
// =============================================================================

/**
 * Create a styled table element
 */
export function createTable(props: TableProps = {}): HTMLTableElement {
  const table = document.createElement('table');
  table.className = getTableClasses(props);
  return table;
}

/**
 * Create a table wrapper div
 */
export function createTableWrapper(
  table: HTMLTableElement,
  props: TableWrapperProps = {},
): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = getTableWrapperClasses(props);
  wrapper.appendChild(table);
  return wrapper;
}

export default {
  // Container
  getTableClasses,
  getTableWrapperClasses,
  // Header
  getTableHeaderClasses,
  getTableHeaderCellClasses,
  // Body
  getTableBodyClasses,
  getTableRowClasses,
  getTableCellClasses,
  // Helpers
  getTableClassSet,
  createTable,
  createTableWrapper,
};
