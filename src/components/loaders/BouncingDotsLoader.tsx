import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { dotR: 4, gap: 6 },
  md: { dotR: 6, gap: 9 },
  lg: { dotR: 8, gap: 12 },
};

const KF = `@keyframes rla-bounce-dot{0%,80%,100%{transform:scale(0);opacity:0.3}40%{transform:scale(1);opacity:1}}`;
let inj = false;
function inject() {
  if (inj || typeof document === 'undefined') return;
  const s = document.createElement('style'); s.textContent = KF;
  document.head.appendChild(s); inj = true;
}

export const BouncingDotsLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.4,
}: LoaderProps) => {
  if (!visible) return null;
  inject();
  const { dotR, gap } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ display: 'flex', alignItems: 'center', gap, ...wrapperStyle }}>
      {[0, 0.16, 0.32].map((delay, i) => (
        <div key={i} style={{
          width: dotR * 2, height: dotR * 2,
          borderRadius: '50%',
          backgroundColor: c,
          animation: `rla-bounce-dot ${animationDuration}s ease-in-out ${delay}s infinite both`,
        }} />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
BouncingDotsLoader.displayName = 'BouncingDotsLoader';
