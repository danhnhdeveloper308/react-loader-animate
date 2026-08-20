import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { dot: 7, gap: 4 },
  md: { dot: 10, gap: 5 },
  lg: { dot: 14, gap: 7 },
};

export const FlipDotsLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.2,
}: LoaderProps) => {
  if (!visible) return null;
  ;
  const { dot, gap } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap, ...wrapperStyle }}>
      {Array.from({ length: 9 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const delay = (row * 0.1 + col * 0.15).toFixed(2);
        return (
          <div key={i} style={{
            width: dot, height: dot,
            borderRadius: 2,
            backgroundColor: c,
            animation: `rla-flip-dot ${animationDuration}s ease-in-out ${delay}s infinite`,
          }} />
        );
      })}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
