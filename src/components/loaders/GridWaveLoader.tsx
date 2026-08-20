import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { cell: 7, gap: 3 },
  md: { cell: 10, gap: 4 },
  lg: { cell: 13, gap: 5 },
};

export const GridWaveLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.2,
}: LoaderProps) => {
  ;
  if (!visible) return null;
  const { cell, gap } = CONFIGS[size];
  const cols = 4, rows = 4;
  const c = resolveColor(variant, color);

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${cell}px)`,
        gridTemplateRows: `repeat(${rows}, ${cell}px)`,
        gap,
        alignItems: 'center',
      }}>
        {Array.from({ length: rows * cols }, (_, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          // Diagonal wave delay
          const delay = (col + row) * (animationDuration / (cols + rows - 1));
          return (
            <div key={idx} style={{
              width: cell,
              height: cell,
              background: c,
              borderRadius: '2px',
              animation: `rla-gridwave ${animationDuration}s ease-in-out ${delay}s infinite`,
            }} />
          );
        })}
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
