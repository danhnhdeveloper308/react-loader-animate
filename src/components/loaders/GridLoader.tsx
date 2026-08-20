import { memo } from 'react';
import { LoaderProps, resolveColorStyle, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const GridLoader = /* @__PURE__ */ memo(({ size = 'md', variant = 'primary', color, visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} grid grid-cols-2 gap-1 ${wrapperClass}`}
      style={{ ...wrapperStyle, ...resolveColorStyle(variant, color) }}
    >
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`w-full h-full ${LOADER_BG_VARIANTS[variant]} rounded-sm animate-bounce-dot`}
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      ))}
    </div>
  );
});
