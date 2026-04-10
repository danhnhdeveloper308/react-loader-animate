import type { CSSProperties } from 'react';

export interface LoaderProps {
  /** Preset size — overridden by height/width if provided. Default: 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Colour theme token. Default: 'primary' */
  variant?: 'primary' | 'accent' | 'success' | 'warning';

  // ── Extended customisation ──────────────────────────────────────────────────
  /** Custom hex/rgba/hsl colour. Overrides variant when provided. */
  color?: string;
  /** Extra CSS class(es) on the root element. */
  className?: string;
  /** Custom height (px number or CSS string). Overrides size. */
  height?: number | string;
  /** Custom width (px number or CSS string). Overrides size. */
  width?: number | string;
  /** Accessible label for screen-readers (role="status"). */
  ariaLabel?: string;
  /** Inline styles applied to the outermost wrapper div. */
  wrapperStyle?: CSSProperties;
  /** Extra CSS class(es) on the outermost wrapper div. */
  wrapperClass?: string;
  /** When false the loader is hidden (returns null). Default: true */
  visible?: boolean;
  /** SVG stroke width in px. Relevant only for SVG-based loaders. Default: 4 */
  strokeWidth?: number;
  /** Animation duration in seconds. Default: 1 */
  animationDuration?: number;
  /** Array of custom colours used by multi-colour loaders (e.g. ColorRingLoader). */
  colors?: string[];
}

export const LOADER_SIZES = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
} as const;

export const LOADER_BG_VARIANTS = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning'
} as const;

export const LOADER_BORDER_VARIANTS = {
  primary: 'border-primary',
  accent: 'border-accent',
  success: 'border-success',
  warning: 'border-warning'
} as const;

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns a CSS colour string from either a direct `color` prop or the variant token.
 */
export function resolveColor(
  variant: LoaderProps['variant'] = 'primary',
  color?: string
): string {
  return color ?? `hsl(var(--${variant}))`;
}

/**
 * Resolves the size class + inline style taking height/width overrides into account.
 */
export function resolveSizeClass(
  size: LoaderProps['size'] = 'md',
  height?: number | string,
  width?: number | string
): { sizeClass: string; sizeStyle: CSSProperties | undefined } {
  if (height !== undefined || width !== undefined) {
    const h = typeof height === 'number' ? `${height}px` : height;
    const w = typeof width  === 'number' ? `${width}px`  : width;
    return { sizeClass: '', sizeStyle: { height: h ?? w, width: w ?? h } };
  }
  return { sizeClass: LOADER_SIZES[size], sizeStyle: undefined };
}
