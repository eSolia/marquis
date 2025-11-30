/**
 * @module favicons
 *
 * Pre-generated favicon assets for eSolia applications.
 *
 * Favicons are available in multiple color variants to match different site themes.
 * Each variant includes standard sizes for browser tabs, mobile devices, and PWA icons.
 *
 * @example
 * ```typescript
 * import { getFaviconPaths, getFaviconHtml } from '@esolia/marquis';
 *
 * // Get paths for a specific variant
 * const paths = getFaviconPaths('darkblue', 'https://example.com/assets');
 *
 * // Generate HTML for <head>
 * const headHtml = getFaviconHtml('darkblue', '/assets/favicons');
 * ```
 */

/**
 * Available favicon color variants
 *
 * - `darkblue` - Dark blue symbol on transparent background (default, for light themes)
 * - `white` - White symbol on transparent background (for dark themes)
 * - `darkblue-orange` - Dark blue symbol on orange background (accent variant)
 * - `darkblue-yellow` - Dark blue symbol on soft yellow background (warm variant)
 */
export type FaviconVariant = 'darkblue' | 'white' | 'darkblue-orange' | 'darkblue-yellow';

/**
 * Standard favicon sizes included in each variant
 */
export const FAVICON_SIZES = [16, 32, 48, 180, 192, 512] as const;

/**
 * Favicon size type
 */
export type FaviconSize = (typeof FAVICON_SIZES)[number];

/**
 * Favicon file paths for a variant
 */
export interface FaviconPaths {
  /** 16x16 PNG for browser tab */
  favicon16: string;
  /** 32x32 PNG for browser tab (high DPI) */
  favicon32: string;
  /** 48x48 PNG for Windows/shortcuts */
  favicon48: string;
  /** 180x180 PNG for Apple Touch Icon */
  appleTouchIcon: string;
  /** 192x192 PNG for Android Chrome */
  android192: string;
  /** 512x512 PNG for PWA splash screens */
  android512: string;
  /** Web manifest file */
  manifest: string;
  /** Original SVG source */
  svg: string;
}

/**
 * Mapping of variant names to their directory names
 */
const VARIANT_DIRS: Record<FaviconVariant, string> = {
  darkblue: 'darkblue',
  white: 'white',
  'darkblue-orange': 'darkblue-orange',
  'darkblue-yellow': 'darkblue-yellow',
};

/**
 * Mapping of variants to their source SVG filenames
 */
const VARIANT_SVGS: Record<FaviconVariant, string> = {
  darkblue: 'symbol_darkblue_bgtransparent.svg',
  white: 'symbol_white_bgtransparent.svg',
  'darkblue-orange': 'symbol_darkblue_bgorange.svg',
  'darkblue-yellow': 'symbol_darkblue_bgsoftyellow.svg',
};

/**
 * Get the file paths for a favicon variant
 *
 * @param variant - The color variant to use
 * @param baseUrl - Base URL/path where favicons are hosted (no trailing slash)
 * @returns Object containing paths to all favicon files
 *
 * @example
 * ```typescript
 * // For local development
 * const paths = getFaviconPaths('darkblue', '/assets/favicons');
 *
 * // For CDN/GitHub raw URL
 * const paths = getFaviconPaths('darkblue',
 *   'https://raw.githubusercontent.com/eSolia/marquis/v0.1.0/assets/favicons'
 * );
 *
 * // Use in HTML
 * const link = `<link rel="icon" href="${paths.favicon32}">`;
 * ```
 */
export function getFaviconPaths(
  variant: FaviconVariant = 'darkblue',
  baseUrl: string = '/assets/favicons',
): FaviconPaths {
  const dir = VARIANT_DIRS[variant];
  const base = `${baseUrl}/${dir}`;

  return {
    favicon16: `${base}/favicon-16x16.png`,
    favicon32: `${base}/favicon-32x32.png`,
    favicon48: `${base}/favicon-48x48.png`,
    appleTouchIcon: `${base}/favicon-180x180.png`,
    android192: `${base}/favicon-192x192.png`,
    android512: `${base}/favicon-512x512.png`,
    manifest: `${base}/site.webmanifest`,
    svg: `${baseUrl.replace('/favicons', '')}/${VARIANT_SVGS[variant]}`,
  };
}

/**
 * Generate HTML link tags for favicons
 *
 * Returns a complete set of link tags for the <head> section,
 * including browser icons, Apple Touch Icon, and web manifest.
 *
 * @param variant - The color variant to use
 * @param baseUrl - Base URL/path where favicons are hosted (no trailing slash)
 * @returns HTML string with all necessary link tags
 *
 * @example
 * ```typescript
 * // In a Vento/HTML template
 * const html = `
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   ${getFaviconHtml('darkblue', '/assets/favicons')}
 *   <title>My App</title>
 * </head>
 * ...
 * `;
 *
 * // For GitHub raw URLs (versioned)
 * const baseUrl = 'https://raw.githubusercontent.com/eSolia/marquis/v0.1.0/assets/favicons';
 * const html = getFaviconHtml('darkblue', baseUrl);
 * ```
 */
export function getFaviconHtml(
  variant: FaviconVariant = 'darkblue',
  baseUrl: string = '/assets/favicons',
): string {
  const paths = getFaviconPaths(variant, baseUrl);

  return `<link rel="icon" type="image/png" sizes="16x16" href="${paths.favicon16}">
<link rel="icon" type="image/png" sizes="32x32" href="${paths.favicon32}">
<link rel="icon" type="image/png" sizes="48x48" href="${paths.favicon48}">
<link rel="apple-touch-icon" sizes="180x180" href="${paths.appleTouchIcon}">
<link rel="manifest" href="${paths.manifest}">`;
}

/**
 * Theme colors for each variant (for meta theme-color tag)
 */
export const FAVICON_THEME_COLORS: Record<FaviconVariant, string> = {
  darkblue: '#2D2F63',
  white: '#ffffff',
  'darkblue-orange': '#2D2F63',
  'darkblue-yellow': '#2D2F63',
};

/**
 * Get the theme color for a favicon variant
 *
 * Useful for the `<meta name="theme-color">` tag.
 *
 * @param variant - The favicon variant
 * @returns Hex color string
 *
 * @example
 * ```typescript
 * const themeColor = getFaviconThemeColor('darkblue');
 * // '<meta name="theme-color" content="#2D2F63">'
 * ```
 */
export function getFaviconThemeColor(variant: FaviconVariant = 'darkblue'): string {
  return FAVICON_THEME_COLORS[variant];
}

/**
 * Generate complete meta and link tags for favicons including theme color
 *
 * @param variant - The color variant to use
 * @param baseUrl - Base URL/path where favicons are hosted
 * @returns HTML string with meta theme-color and all link tags
 *
 * @example
 * ```typescript
 * const headTags = getCompleteFaviconHtml('darkblue', '/assets/favicons');
 * // Includes: theme-color meta + all favicon links
 * ```
 */
export function getCompleteFaviconHtml(
  variant: FaviconVariant = 'darkblue',
  baseUrl: string = '/assets/favicons',
): string {
  const themeColor = getFaviconThemeColor(variant);
  const faviconLinks = getFaviconHtml(variant, baseUrl);

  return `<meta name="theme-color" content="${themeColor}">
${faviconLinks}`;
}

/**
 * List of all available favicon variants
 */
export const FAVICON_VARIANTS: FaviconVariant[] = [
  'darkblue',
  'white',
  'darkblue-orange',
  'darkblue-yellow',
];

export default {
  getFaviconPaths,
  getFaviconHtml,
  getFaviconThemeColor,
  getCompleteFaviconHtml,
  FAVICON_SIZES,
  FAVICON_VARIANTS,
  FAVICON_THEME_COLORS,
};
