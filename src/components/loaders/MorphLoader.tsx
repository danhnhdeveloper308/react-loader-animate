import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 28 },
  md: { size: 40 },
  lg: { size: 56 },
};

let rlaInjMorph = false;
function injectMorphKF() {
  if (rlaInjMorph || typeof document === 'undefined') return;
  rlaInjMorph = true;
  const s = document.createElement('style');
  s.textContent = `
    @keyframes rla-morph {
      0%,100% { border-radius: 50%; transform: rotate(0deg) scale(1); }
      25% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; transform: rotate(90deg) scale(0.95); }
      50% { border-radius: 8%; transform: rotate(180deg) scale(1.05); }
      75% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; transform: rotate(270deg) scale(0.95); }
    }
  `;
  document.head.appendChild(s);
}

export const MorphLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.8,
}: LoaderProps) => {
  injectMorphKF();
  if (!visible) return null;
  const { size: s } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <div style={{
        width: s, height: s,
        background: c,
        boxShadow: `0 0 ${Math.round(s / 3)}px ${c}`,
        animation: `rla-morph ${animationDuration}s ease-in-out infinite`,
      }} />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
MorphLoader.displayName = 'MorphLoader';
