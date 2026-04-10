import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { count: 5, barW: 3, maxH: 24 },
  md: { count: 5, barW: 5, maxH: 36 },
  lg: { count: 5, barW: 7, maxH: 52 },
};

const BARS_KEYFRAMES = `
@keyframes rla-bars {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}`;

let injected = false;
function injectBarsKeyframes() {
  if (injected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = BARS_KEYFRAMES;
  document.head.appendChild(style);
  injected = true;
}

export const BarsLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'bars-loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1,
}: LoaderProps) => {
  if (!visible) return null;
  injectBarsKeyframes();
  const { count, barW, maxH } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={wrapperClass}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: barW,
        height: maxH,
        ...wrapperStyle,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: barW,
            height: maxH,
            backgroundColor: c,
            borderRadius: barW,
            transformOrigin: 'bottom',
            animation: `rla-bars ${animationDuration}s ease-in-out ${(i * 0.15).toFixed(2)}s infinite`,
          }}
        />
      ))}
    </div>
  );
});
BarsLoader.displayName = 'BarsLoader';
