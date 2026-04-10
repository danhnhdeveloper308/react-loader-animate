import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 36, stroke: 3 },
  md: { size: 52, stroke: 4.5 },
  lg: { size: 68, stroke: 6 },
};

let rlaInjBreath = false;
function injectBreathKF() {
  if (rlaInjBreath || typeof document === 'undefined') return;
  rlaInjBreath = true;
  const s = document.createElement('style');
  s.textContent = `
    @keyframes rla-breath-outer {
      0%,100% { transform: scale(1);    opacity: 0.8; }
      50%      { transform: scale(1.18); opacity: 0.2; }
    }
    @keyframes rla-breath-mid {
      0%,100% { transform: scale(1);    opacity: 0.55; }
      50%      { transform: scale(1.1);  opacity: 0.15; }
    }
    @keyframes rla-breath-inner {
      0%,100% { transform: scale(1);    opacity: 1; }
      50%      { transform: scale(0.85); opacity: 0.6; }
    }
  `;
  document.head.appendChild(s);
}

export const BreathingRingLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 2.2,
}: LoaderProps) => {
  injectBreathKF();
  if (!visible) return null;
  const { size: s, stroke: sw } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const cx = s / 2;

  const rings = [
    { r: cx - sw * 0.5, kf: 'rla-breath-outer', delay: 0 },
    { r: cx * 0.68, kf: 'rla-breath-mid', delay: 0.25 },
    { r: cx * 0.38, kf: 'rla-breath-inner', delay: 0.5 },
  ];

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ overflow: 'visible' }}>
        {rings.map((ring, i) => (
          <circle key={i} cx={cx} cy={cx} r={ring.r}
            fill="none" stroke={c} strokeWidth={sw}
            style={{
              transformOrigin: `${cx}px ${cx}px`,
              animation: `${ring.kf} ${animationDuration}s ease-in-out ${ring.delay}s infinite`,
            }}
          />
        ))}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
BreathingRingLoader.displayName = 'BreathingRingLoader';
