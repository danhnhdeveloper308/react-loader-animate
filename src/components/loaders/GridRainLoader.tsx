import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { cell: 6, gap: 3 },
  md: { cell: 9, gap: 4 },
  lg: { cell: 12, gap: 5 },
};

export const GridRainLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.2,
}: LoaderProps) => {
  ;
  if (!visible) return null;
  const { cell, gap } = CONFIGS[size];
  const cols = 4, rows = 5;
  const c = resolveColor(variant, color);

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${cell}px)`,
        gap,
      }}>
        {Array.from({ length: rows * cols }, (_, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          // Rain falls column by column, then row within column
          const delay = col * (animationDuration / cols) + row * (animationDuration / (rows * cols * 2));
          return (
            <div key={idx} style={{
              width: cell,
              height: cell,
              background: c,
              borderRadius: '50%',
              animation: `rla-gridrain ${animationDuration}s ease-in-out ${delay}s infinite`,
            }} />
          );
        })}
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
