import { memo } from 'react';
import { LoaderProps, resolveColorStyle, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const SegmentLoader = /* @__PURE__ */ memo(({ size = 'md', variant = 'primary', color, visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} relative ${wrapperClass}`}
      style={{ ...wrapperStyle, ...resolveColorStyle(variant, color) }}
    >
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={`absolute w-[25%] h-[8%] ${LOADER_BG_VARIANTS[variant]} rounded-full animate-segment-fade`}
          style={{
            top: '12%',
            left: '37.5%',
            transformOrigin: '50% 350%',
            transform: `rotate(${index * 60}deg)`,
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
});
