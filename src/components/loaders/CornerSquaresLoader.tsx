import { memo } from 'react';
import { LoaderProps, resolveColorStyle, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const CORNERS = [
  { x: '-120%', y: '-120%', phase: 0 },
  { x: '120%', y: '-120%', phase: 0.25 },
  { x: '-120%', y: '120%', phase: 0.5 },
  { x: '120%', y: '120%', phase: 0.75 },
] as const;

export const CornerSquaresLoader = /* @__PURE__ */ memo(({ size = 'md', variant = 'primary', color, visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '', animationDuration = 2 }: LoaderProps) => {
  if (!visible) return null;
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} relative ${wrapperClass}`}
      style={{ ...wrapperStyle, ...resolveColorStyle(variant, color) }}
    >
      {/* Ghost shape */}
      <div
        className={`absolute w-1/2 h-1/2 ${bg} rounded-sm opacity-20`}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      {CORNERS.map((corner, i) => (
        <div
          key={i}
          className={`absolute w-1/4 h-1/4 ${bg} rounded-sm animate-corner-split`}
          style={{
            top: '50%',
            left: '50%',
            '--corner-x': corner.x,
            '--corner-y': corner.y,
            animationDelay: `${-corner.phase * animationDuration}s`,
            animationDuration: `${animationDuration}s`,
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform, opacity',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});
