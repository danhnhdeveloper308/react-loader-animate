import { memo } from 'react';
import { LoaderProps, resolveColorStyle, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const SquareLoader = /* @__PURE__ */ memo(({ size = 'md', variant = 'primary', color, visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} animate-morph ${LOADER_BG_VARIANTS[variant]} ${wrapperClass}`}
      style={{ ...wrapperStyle, ...resolveColorStyle(variant, color) }}
    />
  );
});
