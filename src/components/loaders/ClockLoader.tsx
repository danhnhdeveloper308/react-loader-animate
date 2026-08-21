import { memo } from 'react';
import { LoaderProps, resolveColorStyle, LOADER_SIZES, LOADER_BORDER_VARIANTS } from './types';

export const ClockLoader = /* @__PURE__ */ memo(({ size = 'md', variant = 'primary', color, visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '', animationDuration = 2 }: LoaderProps) => {
  if (!visible) return null;
  const bg = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
  };
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} relative rounded-full border-2 ${LOADER_BORDER_VARIANTS[variant]} ${wrapperClass}`}
      style={{ ...wrapperStyle, ...resolveColorStyle(variant, color) }}
    >
      {/* Hour hand */}
      <div
        className={`absolute w-[3px] h-[30%] ${bg[variant]} rounded-full animate-spin-slow origin-bottom`}
        style={{ bottom: '50%', left: 'calc(50% - 1.5px)', animationDuration: `${animationDuration}s` }}
      />
      {/* Minute hand */}
      <div
        className={`absolute w-[2px] h-[40%] ${bg[variant]} rounded-full origin-bottom animate-spin-slow`}
        style={{ bottom: '50%', left: 'calc(50% - 1px)', animationDuration: `${animationDuration * 0.4}s` }}
      />
      {/* Center dot */}
      <div className={`absolute w-2 h-2 ${bg[variant]} rounded-full`} style={{ top: 'calc(50% - 4px)', left: 'calc(50% - 4px)' }} />
    </div>
  );
});
