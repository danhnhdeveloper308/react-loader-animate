import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { cell: 8, gap: 4 },
  md: { cell: 11, gap: 5 },
  lg: { cell: 14, gap: 6 },
};

export const GridBounceLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.4,
}: LoaderProps) => {
  ;
  if (!visible) return null;
  const { cell, gap } = CONFIGS[size];
  const cols = 3;
  const c = resolveColor(variant, color);

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${cell}px)`,
        gap,
      }}>
        {Array.from({ length: 9 }, (_, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          // Center-out spiral delay
          const distFromCenter = Math.max(Math.abs(col - 1), Math.abs(row - 1));
          const delay = distFromCenter * (animationDuration / 4);
          return (
            <div key={idx} style={{
              width: cell,
              height: cell,
              background: c,
              borderRadius: '50%',
              animation: `rla-gridbounce ${animationDuration}s ease-in-out ${delay}s infinite`,
            }} />
          );
        })}
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
