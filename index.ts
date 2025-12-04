/**
 * Marquis - eSolia UI Component Library
 *
 * A vanilla TypeScript component library providing polished,
 * professional UI components for eSolia applications.
 *
 * Features:
 * - Customizable theme colors (13 primary colors)
 * - Full dark mode support
 * - Tailwind CSS class generation
 * - Both class getters and DOM creators
 * - Phosphor Icons integration
 *
 * @example
 * // Import specific components
 * import { getBadgeClasses, createBadge } from '@esolia/marquis';
 * import { getButtonClasses, createButton } from '@esolia/marquis';
 *
 * // Or import from namespaces
 * import { Badge, Button, Table } from '@esolia/marquis';
 *
 * // Use custom theme color
 * const btn = createButton('Submit', { themeColor: 'violet' });
 */

// =============================================================================
// UTILITIES
// =============================================================================

export { clsx, cn } from './utils/cn.ts';

// =============================================================================
// ASSETS
// =============================================================================

export {
  brandColors,
  favicon,
  getLogoDataUri,
  logoHorizontal,
  logoHorizontalLight,
  // Legacy aliases (deprecated)
  logoMark,
  logoMarkLight,
  // Primary exports
  logoSymbol,
  logoSymbolLight,
  type LogoVariant,
  logoWordmark,
  logoWordmarkLight,
} from './assets/index.ts';

// Favicons (pre-generated PNG assets)
export {
  FAVICON_SIZES,
  FAVICON_THEME_COLORS,
  FAVICON_VARIANTS,
  type FaviconPaths,
  type FaviconSize,
  type FaviconVariant,
  getCompleteFaviconHtml,
  getFaviconHtml,
  getFaviconPaths,
  getFaviconThemeColor,
} from './assets/favicons.ts';

// =============================================================================
// TOKENS
// =============================================================================

export {
  draftColors,
  focusRing,
  getInteractiveColorClasses,
  getNeutralColorClasses,
  getStatusColorClasses,
  type InteractiveColorKey,
  interactiveColors,
  neutralColors,
  type StatusColorKey,
  statusColors,
} from './tokens/colors.ts';

// Theme system
export {
  type ColorScale,
  createTheme,
  getNeutralClasses,
  getPrimaryClasses,
  getStatusClasses,
  neutralColors as neutralColorsDark,
  type PrimaryColor,
  primaryColors,
  type StatusColorKey as ThemeStatusColorKey,
  statusColors as statusColorsDark,
  type Theme as ThemeConfig,
  theme,
  type ThemeMode,
} from './tokens/theme.ts';

// =============================================================================
// UI COMPONENTS
// =============================================================================

// Badge
export {
  type BadgeProps,
  type BadgeSize,
  type BadgeStyle,
  type BadgeVariant,
  createBadge,
  createBadges,
  createBadgeWithIcon,
  createDotBadge,
  getBadgeClasses,
} from './ui/badge.ts';

// Button
export {
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
  createButton,
  createButtonGroup,
  type CreateButtonOptions,
  createIconOnlyButton,
  getButtonClasses,
} from './ui/button.ts';

// Icon Button
export {
  type ActionDefinition,
  createActionGroup,
  createIconButton,
  type CreateIconButtonOptions,
  getIconButtonClasses,
  type IconButtonProps,
  type IconButtonSize,
  type IconButtonVariant,
  icons,
} from './ui/icon-button.ts';

// Card
export {
  type CardPadding,
  type CardProps,
  type CardSectionProps,
  type CardVariant,
  createCard,
  createStatCard,
  createStatCardRow,
  // Card
  getCardBodyClasses,
  getCardClasses,
  getCardFooterClasses,
  getCardHeaderClasses,
  // Stat Card
  getStatCardClasses,
  getStatCardLabelClasses,
  getStatCardValueClasses,
  getTrendClasses,
  type StatCardProps,
  type StatCardVariant,
} from './ui/card.ts';

// Table
export {
  createTable,
  createTableWrapper,
  getTableBodyClasses,
  getTableCellClasses,
  getTableClasses,
  getTableClassSet,
  getTableHeaderCellClasses,
  getTableHeaderClasses,
  getTableRowClasses,
  getTableWrapperClasses,
  type TableCellProps,
  type TableHeaderProps,
  type TableProps,
  type TableRowProps,
  type TableWrapperProps,
} from './ui/table.ts';

// Tabs
export {
  createTabs,
  type CreateTabsOptions,
  getTabClasses,
  getTabCountClasses,
  getTabDraftClasses,
  getTabsContainerClasses,
  type TabItem,
  type TabProps,
  type TabsProps,
  type TabsVariant,
} from './ui/tabs.ts';

// Filter Bar
export {
  createFilterSearch,
  type CreateFilterSearchOptions,
  createFilterSelect,
  type CreateFilterSelectOptions,
  type FilterBarProps,
  type FilterButtonProps,
  type FilterSearchProps,
  type FilterSelectProps,
  getFilterBarClasses,
  getFilterButtonClasses,
  getFilterLabelClasses,
  getFilterSearchContainerClasses,
  getFilterSearchIconClasses,
  getFilterSearchInputClasses,
  getFilterSelectClasses,
  searchIcon,
} from './ui/filter-bar.ts';

// Dropdown
export {
  createDropdown,
  type CreateDropdownOptions,
  createUserDropdown,
  type DropdownAlign,
  type DropdownItem,
  type DropdownItemVariant,
  type DropdownProps,
  type DropdownVariant,
  getDropdownClasses,
  getDropdownCSS,
  getDropdownDividerClasses,
  getDropdownHeaderClasses,
  getDropdownItemClasses,
  getDropdownMenuClasses,
  getDropdownTriggerClasses,
  type UserDropdownOptions,
} from './ui/dropdown.ts';

// Alert
export {
  type AlertProps,
  type AlertSize,
  type AlertVariant,
  createAlert,
  createAlertElement,
  createErrorAlert,
  createInfoAlert,
  createSuccessAlert,
  createWarningAlert,
  getAlertClasses,
  getAlertContentClasses,
  getAlertDismissClasses,
  getAlertIconClasses,
  getAlertTitleClasses,
} from './ui/alert.ts';

// Header
export {
  createHeader,
  getHeaderClasses,
  getHeaderCSS,
  getLanguageButtonClasses,
  getNavLinkClasses,
  type HeaderProps,
  type LanguageConfig,
  type LogoConfig,
  type NavLink,
  type SwitcherConfig,
  type UserConfig,
} from './ui/header.ts';

// Code & Kbd
export {
  type CodeBlockProps,
  type CodeProps,
  type CodeSize,
  type CodeVariant,
  createCode,
  createCodeBlock,
  createKbd,
  createShortcut,
  getCodeBlockClasses,
  getCodeClasses,
  getKbdClasses,
  type KbdProps,
} from './ui/code.ts';

// Spinner
export {
  createButtonLoading,
  createLoadingOverlay,
  createSpinner,
  createSpinnerWithLabel,
  getSpinIconClasses,
  getSpinnerAnimationClass,
  getSpinnerClasses,
  getSpinnerCSS,
  type SpinnerProps,
  type SpinnerSize,
  type SpinnerSpeed,
  type SpinnerVariant,
} from './ui/spinner.ts';

// Progress (NEW)
export {
  type CircularProgressProps,
  createCircularProgress,
  createProgress,
  createSimpleProgress,
  getCircularProgressCSS,
  getProgressBarClasses,
  getProgressClasses,
  getProgressCSS,
  type ProgressProps,
  type ProgressSize,
  type ProgressVariant,
} from './ui/progress.ts';

// Toggle (NEW)
export {
  createToggle,
  type CreateToggleOptions,
  createToggleWithInput,
  getToggleClasses,
  getToggleCSS,
  getToggleDescriptionClasses,
  getToggleLabelClasses,
  getToggleThumbClasses,
  getToggleWithLabelClasses,
  type ToggleProps,
  type ToggleSize,
} from './ui/toggle.ts';

// Skeleton (NEW)
export {
  createAvatarSkeleton,
  createCardSkeleton,
  createSkeleton,
  createTableRowSkeleton,
  createTableSkeleton,
  createTextSkeleton,
  getSkeletonClasses,
  getSkeletonCSS,
  type SkeletonProps,
  type SkeletonVariant,
} from './ui/skeleton.ts';

// Avatar (NEW)
export {
  type AvatarGroupProps,
  type AvatarProps,
  type AvatarShape,
  type AvatarSize,
  type AvatarStatus,
  createAvatar,
  createAvatarGroup,
  createAvatarWithInfo,
  getAvatarClasses,
  getAvatarImageClasses,
  getAvatarInitialsClasses,
  getAvatarPlaceholderClasses,
  getAvatarStatusClasses,
  getAvatarTextClasses,
  getColorFromString,
  getInitials,
} from './ui/avatar.ts';

// Toast (NEW)
export {
  createToast,
  dismissAllToasts,
  getToastActionClasses,
  getToastClasses,
  getToastContainer,
  getToastContentClasses,
  getToastCSS,
  getToastDismissClasses,
  getToastIconClasses,
  getToastMessageClasses,
  getToastTitleClasses,
  showErrorToast,
  showInfoToast,
  showSuccessToast,
  showToast,
  showWarningToast,
  type ToastContainerProps,
  type ToastPosition,
  type ToastProps,
  type ToastVariant,
} from './ui/toast.ts';

// =============================================================================
// NAMESPACE EXPORTS (Alternative API)
// =============================================================================

import * as BadgeModule from './ui/badge.ts';
import * as ButtonModule from './ui/button.ts';
import * as IconButtonModule from './ui/icon-button.ts';
import * as CardModule from './ui/card.ts';
import * as TableModule from './ui/table.ts';
import * as TabsModule from './ui/tabs.ts';
import * as FilterBarModule from './ui/filter-bar.ts';
import * as DropdownModule from './ui/dropdown.ts';
import * as AlertModule from './ui/alert.ts';
import * as HeaderModule from './ui/header.ts';
import * as CodeModule from './ui/code.ts';
import * as SpinnerModule from './ui/spinner.ts';
import * as ProgressModule from './ui/progress.ts';
import * as ToggleModule from './ui/toggle.ts';
import * as SkeletonModule from './ui/skeleton.ts';
import * as AvatarModule from './ui/avatar.ts';
import * as ToastModule from './ui/toast.ts';
import * as ThemeModule from './tokens/theme.ts';

/**
 * Namespace exports for grouped imports
 *
 * @example
 * import { Badge, Button, Table, Theme } from '@esolia/marquis';
 *
 * const classes = Badge.getBadgeClasses({ variant: 'success' });
 * const btn = Button.createButton('Click me', { variant: 'primary' });
 * const theme = Theme.createTheme('violet');
 */
import * as AssetsModule from './assets/index.ts';
import * as FaviconsModule from './assets/favicons.ts';

export const Assets = AssetsModule;
export const Favicons = FaviconsModule;
export const Badge = BadgeModule;
export const Button = ButtonModule;
export const IconButton = IconButtonModule;
export const Card = CardModule;
export const Table = TableModule;
export const Tabs = TabsModule;
export const FilterBar = FilterBarModule;
export const Dropdown = DropdownModule;
export const Alert = AlertModule;
export const Header = HeaderModule;
export const Code = CodeModule;
export const Spinner = SpinnerModule;
export const Progress = ProgressModule;
export const Toggle = ToggleModule;
export const Skeleton = SkeletonModule;
export const Avatar = AvatarModule;
export const Toast = ToastModule;
export const Theme = ThemeModule;
