import { memo } from 'react';
import { LoaderProps, resolveColorStyle, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const DiamondLoader = /* @__PURE__ */ memo(({ size = 'md', variant = 'primary', color, visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} flex items-center justify-center ${wrapperClass}`}
      style={{ ...wrapperStyle, ...resolveColorStyle(variant, color) }}
    >
      <div className={`w-3/4 h-3/4 ${LOADER_BG_VARIANTS[variant]} animate-diamond-pulse`} />
    </div>
  );
});
