import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { cell: 8, gap: 4 },
  md: { cell: 11, gap: 5 },
  lg: { cell: 14, gap: 6 },
};

// 3x3 grid — cells pulse outward from center
const DIST = [
  [1.41, 1, 1.41],
  [1,    0,    1],
  [1.41, 1, 1.41],
];

export const GridPulseLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.6,
}: LoaderProps) => {
  ;
  if (!visible) return null;
  const { cell, gap } = CONFIGS[size];
  const c = resolveColor(variant, color);

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(3, ${cell}px)`, gap }}>
        {DIST.flat().map((dist, idx) => {
          const delay = dist * (animationDuration / 3);
          return (
            <div key={idx} style={{
              width: cell,
              height: cell,
              background: c,
              borderRadius: '3px',
              animation: `rla-gridpulse ${animationDuration}s ease-in-out ${delay}s infinite`,
            }} />
          );
        })}
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
