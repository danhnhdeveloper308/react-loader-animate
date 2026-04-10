import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 8, count: 5 },
  md: { size: 12, count: 5 },
  lg: { size: 16, count: 5 },
};

const KF = `@keyframes rla-sq-trail{0%{opacity:1;transform:scale(1)}100%{opacity:0.05;transform:scale(0.4)}}`;
let inj = false;
function inject() {
  if (inj || typeof document === 'undefined') return;
  const s = document.createElement('style'); s.textContent = KF;
  document.head.appendChild(s); inj = true;
}

export const SquaresTrailLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.6,
}: LoaderProps) => {
  if (!visible) return null;
  inject();
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
SquaresTrailLoader.displayName = 'SquaresTrailLoader';
