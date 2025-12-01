/**
 * Header Component
 *
 * Application header with logo, navigation, and user controls.
 * Designed for dark backgrounds (typically brand color).
 *
 * @example
 * const header = createHeader({
 *   logo: { src: '/logo.svg', alt: 'App Name', href: '/' },
 *   nav: [
 *     { label: 'Dashboard', href: '/dashboard' },
 *     { label: 'Reports', href: '/reports' }
 *   ],
 *   user: { name: 'John Doe', email: 'john@example.com' }
 * });
 */

import { cn } from '../utils/cn.ts';
import { createDropdown, type DropdownItem, getDropdownCSS } from './dropdown.ts';

/**
 * Navigation link
 */
export interface NavLink {
  /** Link text */
  label: string;
  /** Link URL */
  href: string;
  /** Whether this link is active */
  active?: boolean;
  /** Icon HTML (optional) */
  icon?: string;
}

/**
 * Logo configuration
 */
export interface LogoConfig {
  /** Logo image source */
  src: string;
  /** Logo alt text */
  alt: string;
  /** Logo link href (defaults to '/') */
  href?: string;
  /** Logo height class (defaults to 'h-10') */
  heightClass?: string;
  /** App name to display next to logo */
  appName?: string;
}

/**
 * User info for dropdown
 */
export interface UserConfig {
  /** User display name */
  name: string;
  /** User email */
  email: string;
  /** Custom avatar initials */
  initials?: string;
  /** User role (optional) */
  role?: string;
}

/**
 * Language toggle config
 */
export interface LanguageConfig {
  /** Current language */
  current: 'en' | 'ja';
  /** Base URL pattern (use {lang} placeholder) */
  urlPattern?: string;
}

/**
 * Switcher config (e.g., client switcher)
 */
export interface SwitcherConfig {
  /** Switcher label */
  label: string;
  /** Currently selected item name */
  selectedName: string;
  /** Icon HTML */
  icon?: string;
  /** Dropdown items */
  items: DropdownItem[];
}

/**
 * Header props
 */
export interface HeaderProps {
  /** Logo configuration */
  logo?: LogoConfig;
  /** Navigation links */
  nav?: NavLink[];
  /** User configuration (shows dropdown) */
  user?: UserConfig;
  /** Settings href for user dropdown */
  settingsHref?: string;
  /** Logout href for user dropdown */
  logoutHref?: string;
  /** Language toggle */
  language?: LanguageConfig;
  /** Additional switcher (e.g., client switcher) */
  switcher?: SwitcherConfig;
  /** Custom labels */
  labels?: {
    settings?: string;
    logout?: string;
  };
  /** Additional CSS classes for header */
  class?: string;
  /** Background color class (defaults to 'bg-slate-800') */
  bgClass?: string;
}

/**
 * Get CSS required for header functionality
 * Includes dropdown CSS
 */
export function getHeaderCSS(): string {
  return getDropdownCSS();
}

/**
 * Base header styles
 */
const headerBaseStyles = [
  'text-white',
  'py-4',
  'shadow-md',
].join(' ');

/**
 * Container styles
 */
const containerStyles = [
  'max-w-6xl',
  'mx-auto',
  'px-5',
].join(' ');

/**
 * Inner flex container
 */
const innerContainerStyles = [
  'flex',
  'justify-between',
  'items-center',
  'gap-4',
  'flex-wrap',
  'md:flex-nowrap',
].join(' ');

/**
 * Nav pill container
 */
const navContainerStyles = [
  'flex',
  'items-center',
  'gap-1',
  'bg-white/15',
  'rounded-full',
  'py-1.5',
  'px-2',
  'flex-wrap',
  'justify-center',
].join(' ');

/**
 * Nav link styles
 */
const navLinkStyles = [
  'text-white',
  'no-underline',
  'opacity-90',
  'hover:opacity-100',
  'text-sm',
  'py-1.5',
  'px-3.5',
  'rounded-full',
  'transition-all',
  'hover:bg-white/10',
].join(' ');

/**
 * Active nav link additional styles
 */
const navLinkActiveStyles = 'bg-white/20 opacity-100';

/**
 * Language toggle button styles
 */
const langButtonStyles = [
  'py-0.5',
  'px-2',
  'rounded',
  'no-underline',
  'text-xs',
].join(' ');

const langButtonActiveStyles = 'bg-white/20 text-white';
const langButtonInactiveStyles = 'text-white/70 hover:text-white';

/**
 * Get header classes
 */
export function getHeaderClasses(props: Pick<HeaderProps, 'class' | 'bgClass'> = {}): string {
  const { class: className, bgClass = 'bg-slate-800' } = props;
  return cn(headerBaseStyles, bgClass, className);
}

/**
 * Get nav link classes
 */
export function getNavLinkClasses(active: boolean = false): string {
  return cn(navLinkStyles, active && navLinkActiveStyles);
}

/**
 * Get language button classes
 */
export function getLanguageButtonClasses(isActive: boolean): string {
  return cn(langButtonStyles, isActive ? langButtonActiveStyles : langButtonInactiveStyles);
}

/**
 * Create header HTML string
 *
 * @param props - Header configuration
 * @returns HTML string for the header
 *
 * @example
 * const html = createHeader({
 *   logo: { src: '/logo.svg', alt: 'MyApp', appName: 'MyApp' },
 *   nav: [
 *     { label: 'Dashboard', href: '/dashboard', active: true },
 *     { label: 'Settings', href: '/settings' }
 *   ],
 *   user: { name: 'John', email: 'john@example.com' },
 *   language: { current: 'en' }
 * });
 */
export function createHeader(props: HeaderProps): string {
  const {
    logo,
    nav = [],
    user,
    settingsHref = '/settings',
    logoutHref = '/logout',
    language,
    switcher,
    labels = {},
    bgClass,
  } = props;

  const headerClasses = getHeaderClasses({ class: props.class, bgClass });

  // Logo section
  let logoHtml = '';
  if (logo) {
    const logoHref = logo.href || '/';
    const heightClass = logo.heightClass || 'h-10';
    const appNameHtml = logo.appName
      ? `<span class="text-2xl font-bold text-white tracking-tight">${logo.appName}</span>`
      : '';

    logoHtml = `
      <div class="shrink-0">
        <a href="${logoHref}" class="flex items-center gap-2 no-underline">
          <img src="${logo.src}" alt="${logo.alt}" class="${heightClass}">
          ${appNameHtml}
        </a>
      </div>
    `;
  }

  // Navigation
  let navHtml = '';
  if (nav.length > 0) {
    const navLinks = nav
      .map((link) => {
        const linkClasses = getNavLinkClasses(link.active);
        const iconHtml = link.icon ? `${link.icon} ` : '';
        return `<a href="${link.href}" class="${linkClasses}">${iconHtml}${link.label}</a>`;
      })
      .join('\n          ');

    navHtml = `
      <nav class="flex-1 flex justify-center order-3 md:order-none w-full md:w-auto">
        <div class="${navContainerStyles}">
          ${navLinks}
        </div>
      </nav>
    `;
  }

  // Right side controls
  const controls: string[] = [];

  // Switcher (e.g., client switcher)
  if (switcher) {
    const switcherIcon = switcher.icon || '<i class="ph ph-buildings"></i>';
    const switcherHtml = createDropdown({
      trigger: `
        ${switcherIcon}
        <span>${switcher.selectedName}</span>
        <i class="ph ph-caret-down ml-auto"></i>
      `,
      items: [{ header: switcher.label }, ...switcher.items],
      variant: 'header',
      align: 'left',
      triggerClass: 'min-w-[120px]',
    });
    controls.push(switcherHtml);
  }

  // Language toggle
  if (language) {
    const enClasses = getLanguageButtonClasses(language.current === 'en');
    const jaClasses = getLanguageButtonClasses(language.current === 'ja');
    const urlPattern = language.urlPattern || '?lang={lang}';

    const langToggleHtml = `
      <div class="flex gap-1 text-xs">
        <a href="${urlPattern.replace('{lang}', 'en')}" class="${enClasses}">English</a>
        <a href="${urlPattern.replace('{lang}', 'ja')}" class="${jaClasses}">日本語</a>
      </div>
    `;
    controls.push(langToggleHtml);
  }

  // User dropdown
  if (user) {
    const userInitials = user.initials || user.name.substring(0, 2).toUpperCase();
    const settingsLabel = labels.settings || 'Settings';
    const logoutLabel = labels.logout || 'Logout';

    const userDropdown = createDropdown({
      trigger: `
        <div class="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center font-semibold text-xs">${userInitials}</div>
        <i class="ph ph-caret-down"></i>
      `,
      items: [
        {
          header: `<div class="py-1">
            <strong class="block text-slate-700 text-sm">${user.name}</strong>
            <small class="text-slate-500 text-xs">${user.email}</small>
          </div>`,
        },
        {
          label: settingsLabel,
          href: settingsHref,
          icon: '<i class="ph ph-gear text-slate-500"></i>',
        },
        { divider: true },
        {
          label: logoutLabel,
          href: logoutHref,
          variant: 'danger',
          icon: '<i class="ph ph-sign-out text-red-600"></i>',
        },
      ],
      variant: 'header',
      align: 'right',
    });
    controls.push(userDropdown);
  }

  const controlsHtml = controls.length > 0
    ? `
      <div class="flex items-center gap-4 shrink-0">
        ${controls.join('\n        ')}
      </div>
    `
    : '';

  return `
<header class="${headerClasses}">
  <div class="${containerStyles}">
    <div class="${innerContainerStyles}">
      ${logoHtml}
      ${navHtml}
      ${controlsHtml}
    </div>
  </div>
</header>`.trim();
}

export default {
  getHeaderCSS,
  getHeaderClasses,
  getNavLinkClasses,
  getLanguageButtonClasses,
  createHeader,
};
