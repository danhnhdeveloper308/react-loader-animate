import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 32, rings: 2 },
  md: { size: 48, rings: 2 },
  lg: { size: 64, rings: 2 },
};

const KF = `@keyframes rla-ripple{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:0}}`;
let injectedRipple = false;
function inject() {
  if (injectedRipple || typeof document === 'undefined') return;
  const s = document.createElement('style'); s.textContent = KF;
  document.head.appendChild(s); injectedRipple = true;
}

export const RippleLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'ripple-loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.4,
}: LoaderProps) => {
  if (!visible) return null;
  inject();
  const { size: s, rings } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ position: 'relative', width: s, height: s, ...wrapperStyle }}>
      {Array.from({ length: rings }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          border: `2px solid ${c}`,
          borderRadius: '50%',
          animation: `rla-ripple ${animationDuration}s ease-out ${i * (animationDuration / rings)}s infinite`,
        }} />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
RippleLoader.displayName = 'RippleLoader';
