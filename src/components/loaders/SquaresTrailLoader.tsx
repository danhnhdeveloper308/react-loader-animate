import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 8, count: 5 },
  md: { size: 12, count: 5 },
  lg: { size: 16, count: 5 },
};

export const SquaresTrailLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.6,
}: LoaderProps) => {
  if (!visible) return null;
  ;
  const { size: sq, count } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const gap = sq * 0.6;
  const totalW = count * sq + (count - 1) * gap;
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ display: 'flex', alignItems: 'center', gap, ...wrapperStyle }}>
      {Array.from({ length: count }).map((_, i) => {
        const delay = ((count - 1 - i) / count) * animationDuration;
        return (
          <div key={i} style={{
            width: sq, height: sq,
            borderRadius: 2,
            backgroundColor: c,
            animation: `rla-sq-trail ${animationDuration}s ease-in-out ${delay.toFixed(2)}s infinite`,
          }} />
        );
      })}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
