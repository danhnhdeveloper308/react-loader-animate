import { memo } from 'react';
import { LoaderProps, resolveColorStyle, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const TRIANGLE_CLIP = 'polygon(50% 0%, 0% 100%, 100% 100%)';

const PIECES = [
  { x: '0%', y: '-55%', delay: '0s' },
  { x: '-45%', y: '40%', delay: '0.5s' },
  { x: '45%', y: '40%', delay: '1s' },
] as const;

export const TriangleSplitLoader = /* @__PURE__ */ memo(({ size = 'md', variant = 'primary', color, visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
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
      <div className={`absolute inset-[5%] ${bg} opacity-15`} style={{ clipPath: TRIANGLE_CLIP }} />
      {PIECES.map((piece, i) => (
        <div
          key={i}
          className={`absolute w-[50%] h-[50%] ${bg} animate-split-out`}
          style={{
            top: '50%',
            left: '50%',
            clipPath: TRIANGLE_CLIP,
            '--split-x': piece.x,
            '--split-y': piece.y,
            animationDelay: piece.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});
