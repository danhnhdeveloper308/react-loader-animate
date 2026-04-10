import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const DOT_SIZE = { sm: 6, md: 10, lg: 14 };
const GAP = { sm: 3, md: 5, lg: 7 };

export const Grid3x3Loader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'grid-loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1,
}: LoaderProps) => {
  if (!visible) return null;
  const c = resolveColor(variant, color);
  const dot = DOT_SIZE[size];
  const gap = GAP[size];
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={wrapperClass}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap,
        ...wrapperStyle,
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="animate-bounce-dot"
          style={{
            width: dot,
            height: dot,
            borderRadius: '50%',
            backgroundColor: c,
            animationDelay: `${(Math.floor(i / 3) * 0.15 + (i % 3) * 0.1).toFixed(2)}s`,
            animationDuration: `${animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
});
Grid3x3Loader.displayName = 'Grid3x3Loader';
