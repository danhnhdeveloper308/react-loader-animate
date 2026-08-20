import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { cell: 9, gap: 4 },
  md: { cell: 12, gap: 5 },
  lg: { cell: 16, gap: 6 },
};

// Snake path through 3x3 grid: row 0 L→R, row 1 R→L, row 2 L→R
const SNAKE_ORDER = [0, 1, 2, 5, 4, 3, 6, 7, 8];

export const GridSnakeLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 0.18,
}: LoaderProps) => {
  const { cell, gap } = CONFIGS[size];
  const c = resolveColor(variant, color);
  if (!visible) return null;

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(3, ${cell}px)`, gap }}>
        {Array.from({ length: 9 }, (_, idx) => {
          const snakePos = SNAKE_ORDER.indexOf(idx);
          return (
            <div key={idx} style={{
              width: cell,
              height: cell,
              background: c,
              borderRadius: '3px',
              opacity: 0.12,
              transform: 'scale(0.82)',
              animation: `rla-grid-snake ${animationDuration * SNAKE_ORDER.length}s ease-in-out infinite`,
              animationDelay: `${snakePos * animationDuration}s`,
            }} />
          );
        })}
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
