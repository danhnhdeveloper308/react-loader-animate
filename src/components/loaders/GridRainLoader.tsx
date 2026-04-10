import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { cell: 6, gap: 3 },
  md: { cell: 9, gap: 4 },
  lg: { cell: 12, gap: 5 },
};

let rlaInjGridRain = false;
function injectGridRainKF() {
  if (rlaInjGridRain || typeof document === 'undefined') return;
  rlaInjGridRain = true;
  const s = document.createElement('style');
  s.textContent = `
    @keyframes rla-gridrain {
      0%    { opacity: 0;   transform: translateY(-4px); }
      20%   { opacity: 1;   transform: translateY(0); }
      80%   { opacity: 0.7; transform: translateY(0); }
      100%  { opacity: 0;   transform: translateY(4px); }
    }
  `;
  document.head.appendChild(s);
}

export const GridRainLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.2,
}: LoaderProps) => {
  injectGridRainKF();
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
GridRainLoader.displayName = 'GridRainLoader';
