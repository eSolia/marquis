import { assertEquals, assertExists } from 'jsr:@std/assert@1';
import * as marquis from '../mod.ts';

Deno.test('public API surface — utility exports are present', () => {
  assertExists(marquis.cn);
  assertExists(marquis.clsx);
});

Deno.test('public API surface — token exports are present', () => {
  assertExists(marquis.theme);
  assertExists(marquis.createTheme);
  assertExists(marquis.primaryColors);
  assertExists(marquis.statusColors);
  assertExists(marquis.interactiveColors);
});

Deno.test('public API surface — UI component exports are present', () => {
  // Badge
  assertExists(marquis.getBadgeClasses);
  assertExists(marquis.createBadge);
  // Button
  assertExists(marquis.getButtonClasses);
  assertExists(marquis.createButton);
  // Card
  assertExists(marquis.getCardClasses);
  assertExists(marquis.createCard);
});

Deno.test('public API surface — asset exports are present', () => {
  assertExists(marquis.brandColors);
  assertExists(marquis.logoSymbol);
  assertExists(marquis.logoHorizontal);
  assertExists(marquis.favicon);
});

Deno.test('public API surface — favicon helpers are present', () => {
  assertExists(marquis.getFaviconHtml);
  assertExists(marquis.getCompleteFaviconHtml);
  assertExists(marquis.getFaviconPaths);
  assertExists(marquis.FAVICON_SIZES);
  assertExists(marquis.FAVICON_VARIANTS);
});

Deno.test('cn() — concatenates class names', () => {
  const result = marquis.cn('foo', 'bar', false && 'skipped', 'baz');
  assertEquals(typeof result, 'string');
  assertEquals(result.includes('foo'), true);
  assertEquals(result.includes('bar'), true);
  assertEquals(result.includes('baz'), true);
  assertEquals(result.includes('skipped'), false);
});

Deno.test('getButtonClasses() — returns a non-empty class string', () => {
  const classes = marquis.getButtonClasses({ variant: 'primary', size: 'md' });
  assertEquals(typeof classes, 'string');
  assertEquals(classes.length > 0, true);
});

Deno.test('getBadgeClasses() — returns a non-empty class string', () => {
  const classes = marquis.getBadgeClasses({ variant: 'success' });
  assertEquals(typeof classes, 'string');
  assertEquals(classes.length > 0, true);
});
