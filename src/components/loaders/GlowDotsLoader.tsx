import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { dotR: 4, gap: 6 },
  md: { dotR: 6, gap: 9 },
  lg: { dotR: 8, gap: 12 },
};

const KF = `@keyframes rla-glow{0%,100%{transform:scale(0.6);opacity:0.2;box-shadow:none}50%{transform:scale(1);opacity:1;box-shadow:var(--rla-glow-shadow)}}`;
let inj = false;
function inject() {
  if (inj || typeof document === 'undefined') return;
  const s = document.createElement('style'); s.textContent = KF;
  document.head.appendChild(s); inj = true;
}

export const GlowDotsLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.5,
}: LoaderProps) => {
  if (!visible) return null;
  inject();
  const { dotR, gap } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{
        display: 'flex', alignItems: 'center', gap,
        '--rla-glow-shadow': `0 0 ${dotR * 2}px ${c}, 0 0 ${dotR * 4}px ${c}40`,
        ...wrapperStyle,
      } as React.CSSProperties}>
      {[0, 0.25, 0.5].map((delay, i) => (
        <div key={i} style={{
          width: dotR * 2, height: dotR * 2,
          borderRadius: '50%',
          backgroundColor: c,
          animation: `rla-glow ${animationDuration}s ease-in-out ${delay}s infinite`,
        }} />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
GlowDotsLoader.displayName = 'GlowDotsLoader';
