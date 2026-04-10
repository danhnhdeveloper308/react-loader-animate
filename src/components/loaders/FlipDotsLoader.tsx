import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { dot: 7, gap: 4 },
  md: { dot: 10, gap: 5 },
  lg: { dot: 14, gap: 7 },
};

const KF = `@keyframes rla-flip-dot{0%,100%{transform:perspective(120px) rotateX(0deg);opacity:1}50%{transform:perspective(120px) rotateX(-180deg);opacity:0.4}}`;
let inj = false;
function inject() {
  if (inj || typeof document === 'undefined') return;
  const s = document.createElement('style'); s.textContent = KF;
  document.head.appendChild(s); inj = true;
}

export const FlipDotsLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.2,
}: LoaderProps) => {
  if (!visible) return null;
  inject();
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
FlipDotsLoader.displayName = 'FlipDotsLoader';
