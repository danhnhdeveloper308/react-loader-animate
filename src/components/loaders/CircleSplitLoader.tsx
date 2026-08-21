import { memo } from 'react';
import { LoaderProps, resolveColorStyle, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const PIECES = [
  { x: '0%', y: '-88%', phase: 0 },
  { x: '88%', y: '0%', phase: 0.025 },
  { x: '0%', y: '88%', phase: 0.05 },
  { x: '-88%', y: '0%', phase: 0.075 },
] as const;

export const CircleSplitLoader = /* @__PURE__ */ memo(({ size = 'md', variant = 'primary', color, visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '', animationDuration = 2 }: LoaderProps) => {
  if (!visible) return null;
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} relative ${wrapperClass}`}
      style={{ ...wrapperStyle, ...resolveColorStyle(variant, color) }}
    >
      {/* Ghost */}
      <div className={`absolute inset-[10%] ${bg} rounded-full opacity-15`} />
      {PIECES.map((piece, i) => (
        <div
          key={i}
          className={`absolute w-[45%] h-[45%] ${bg} rounded-full animate-split-out`}
          style={{
            top: '50%',
            left: '50%',
            '--split-x': piece.x,
            '--split-y': piece.y,
            animationDelay: `${-piece.phase * animationDuration}s`,
            animationDuration: `${animationDuration}s`,
            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform, opacity',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});
