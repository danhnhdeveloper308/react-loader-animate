import { memo, useEffect, useState } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { cell: 9, gap: 4 },
  md: { cell: 12, gap: 5 },
  lg: { cell: 16, gap: 6 },
};

// Snake path through 3x3 grid: row 0 L→R, row 1 R→L, row 2 L→R
const SNAKE_ORDER = [0, 1, 2, 5, 4, 3, 6, 7, 8];

export const GridSnakeLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 0.18,
}: LoaderProps) => {
  const { cell, gap } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const ms = animationDuration * 1000;
    const id = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % SNAKE_ORDER.length);
    }, ms);
    return () => clearInterval(id);
  }, [visible, animationDuration]);

  if (!visible) return null;

  const activeCell = SNAKE_ORDER[activeIdx];

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(3, ${cell}px)`, gap }}>
        {Array.from({ length: 9 }, (_, idx) => {
          const snakePos = SNAKE_ORDER.indexOf(idx);
          const isActive = idx === activeCell;
          const isTrail = (snakePos === (SNAKE_ORDER.indexOf(activeCell) - 1 + 9) % 9) ||
                          (snakePos === (SNAKE_ORDER.indexOf(activeCell) - 2 + 9) % 9);
          return (
            <div key={idx} style={{
              width: cell,
              height: cell,
              background: c,
              borderRadius: '3px',
              opacity: isActive ? 1 : isTrail ? 0.45 : 0.1,
              transform: isActive ? 'scale(1.15)' : 'scale(1)',
              transition: `opacity ${animationDuration * 0.8}s ease, transform ${animationDuration * 0.5}s ease`,
            }} />
          );
        })}
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
GridSnakeLoader.displayName = 'GridSnakeLoader';
